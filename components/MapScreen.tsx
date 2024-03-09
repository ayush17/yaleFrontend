// MapScreen.tsx
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import MapView, {Marker, Polyline, Callout} from 'react-native-maps';
import * as Location from 'expo-location';
import {ToastAndroid} from 'react-native';
import CustomMarkerImage from '../icons/images1.png';
import MapViewDirections from 'react-native-maps-directions';
const MapScreen = ({route}) => {
  const {location, destinationLocation} = route.params;
  const [loc, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [averageLatitude, setaverageLatitude] = useState(0);
  const [averageLongitude, setaverageLongitude] = useState(0);
  const [latitudeDelta, setlatitudeDelta] = useState(0);
  const [longitudeDelta, setlongitudeDelta] = useState(0);

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // setErrorMsg('Permission to access location was denied');
        console.log('this is the status', status);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setZoomLocation(location);
    })();
  }, []);
  if (!(Object.keys(loc).length > 0)) {
    return null; // or return a loading indicator
  }

  function setZoomLocation(loc) {
    // Calculate the average latitude and longitude of the markers
    const averageLatitude = loc.coords.latitude;
    const averageLongitude = loc.coords.longitude;
    setaverageLatitude(averageLatitude);
    setaverageLongitude(averageLongitude);

    // Calculate the difference between the latitude and longitude of the markers
    const latitudeDifference = Math.abs(37.78825 - loc.coords.latitude);
    const longitudeDifference = Math.abs(-122.4324 - loc.coords.longitude);

    // Calculate the zoom level by adding a buffer to the difference
    const latitudeDelta = latitudeDifference * 2; // Adjust the multiplier as needed
    const longitudeDelta = longitudeDifference * 2; // Adjust the multiplier as needed
    setlatitudeDelta(latitudeDelta);
    setlongitudeDelta(longitudeDelta);
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
        customMapStyle={mapStyle}>
        {/* <MapViewDirections
          origin={{
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          }}
          destination={{
            latitude: 41.6229059350947,
            longitude: -71.01139146046185,
          }}
          // set up environment variable for this
          strokeWidth={3}
          strokeColor="hotpink"
        /> */}
        <Marker
          draggable
          coordinate={{
            latitude: 41.6229059350947,
            longitude: -71.01139146046185,
          }}
          // onDragEnd={
          //   (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
          // }
          title={'Test Marker'}
          description={'This is a description of the marker'}>
          <Callout>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutTitle}>Test Marker</Text>
              <Text style={styles.calloutDescription}>
                This is where you are
              </Text>
            </View>
          </Callout>
        </Marker>
        {Object.keys(loc).length === 3 && loc.coords.latitude && (
          <Marker
            draggable
            coordinate={{
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            }}
            // onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
            image={CustomMarkerImage} // Use custom marker image
          >
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>Test Marker</Text>
                <Text style={styles.calloutDescription}>
                  This is where you are
                </Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
    </View>
  );
};

const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  calloutContainer: {
    width: 150,
  },
  calloutTitle: {
    fontWeight: 'bold',

    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 1,
  },
});

export default MapScreen;
