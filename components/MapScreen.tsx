import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
// import {GOOGLE_API_KEY} from './environments';
import Constants from 'expo-constants';
import {useRef, useState, useEffect} from 'react';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import Done from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');
import {FloatingAction} from 'react-native-floating-action';
const GOOGLE_API_KEY = 'AIzaSyCRFt7ZjyXEXfSliSCfK7Uzc-iH179V_6M';
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 40.76711,
  longitude: -73.979704,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

type InputAutocompleteProps = {
  label: string;
  placeholder?: string;
  onPlaceSelected: (details: GooglePlaceDetail | null) => void;
};
function openDirections(destination, origin) {
  const url = `https://www.google.com/maps/dir/?api=1&origin=${origin?.latitude},${origin?.longitude}&destination=${destination?.latitude},${destination?.longitude}`;
  Linking.openURL(url);
}
function InputAutocomplete({
  label,
  placeholder,
  onPlaceSelected,
}: InputAutocompleteProps) {
  return (
    <>
      <Text>{label}</Text>
      <GooglePlacesAutocomplete
        styles={{textInput: styles.input}}
        placeholder={placeholder || ''}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: 'pt-BR',
        }}
      />
    </>
  );
}

export default function MapScreen({navigation, route}) {
  const [origin, setOrigin] = useState<LatLng | null>();
  const [destination, setDestination] = useState<LatLng | null>();
  const [showDirections, setShowDirections] = useState(false);
  const [address, setAddress] = useState('');
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [from, setFrom] = useState('');
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      let location = await Location.getCurrentPositionAsync({});
      const position = {
        latitude: location?.coords?.latitude || 0,
        longitude: location?.coords?.longitude || 0,
      };
      setOrigin(position);
      moveTo(position);
      if (route && route.params && route.params.from == 'home-screen') {
        setFrom(route.params.from);
        setDestination(route.params.destinationLocation);
      }
    })();
  }, []);
  const moveTo = async (position: LatLng) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, {duration: 1000});
    }
  };
  const goBackWithData = () => {
    navigation.navigate('CreateRoom', {
      data: address,
      currentLocation: origin,
      destinationLocation: destination,
    });
  };
  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const traceRouteOnReady = (args: any) => {
    if (args) {
      // args.distance
      // args.duration
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };
  const actions = [];

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], {edgePadding});
    }
  };

  const onPlaceSelected = (
    details: GooglePlaceDetail | null,
    flag: 'origin' | 'destination',
  ) => {
    const set = flag === 'origin' ? setOrigin : setDestination;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    set(position);
    moveTo(position);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}>
        {origin && <Marker coordinate={origin} />}
        {destination && (
          <Marker
            coordinate={destination}
            onPress={() => openDirections(destination, origin)}
          />
        )}
        {showDirections && origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeColor="#6644ff"
            strokeWidth={4}
            onReady={traceRouteOnReady}
          />
        )}
      </MapView>
      <View style={styles.searchContainer}>
        {from != 'home-screen' ? (
          <InputAutocomplete
            label="Choose Place"
            onPlaceSelected={details => {
              const adr =
                `${details?.name}` + ' ' + `${details?.formatted_address}`;
              setAddress(adr);
              onPlaceSelected(details, 'destination');
            }}
          />
        ) : null}
        <TouchableOpacity style={styles.button} onPress={traceRoute}>
          <Text style={styles.buttonText}>Trace route</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={traceRoute}>
          <Text style={styles.buttonText}>Get Directions</Text>
        </TouchableOpacity>
        {distance && duration ? (
          <View>
            <Text>Distance: {distance.toFixed(2)}</Text>
            <Text>Duration: {Math.ceil(duration)} min</Text>
          </View>
        ) : null}
      </View>
      {from != 'home-screen' ? (
        <View style={styles.fabContainer}>
          <FloatingAction
            floatingIcon={<Done name="done" size={15} color="white" />}
            actions={actions}
            buttonSize={62}
            onPressMain={goBackWithData}
            color="black"
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    zIndex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  searchContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight - 22,
  },
  input: {
    borderColor: '#888',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#bbb',
    paddingVertical: 12,
    marginTop: 5,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
  },
});
