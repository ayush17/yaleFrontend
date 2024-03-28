import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar} from '@rneui/themed';
import 'react-native-url-polyfill/auto';

function Card({
  owner,
  isProfileId,
  description,
  topic,
  members,
  maxCount,
  address,
  currentlocation,
  destinationLocation,
  navigation,
}): React.JSX.Element {
  const handlePress = () => {
    // Your button press logic here
    console.log('Button pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar
          size={67}
          rounded
          source={{
            uri: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg',
          }}
          titleStyle={{color: 'green'}}
          iconStyle={{backgroundColor: 'green'}}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.owner}>{owner}'s Room</Text>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MapScreen', {
              from: 'home-screen',
              currentlocation: currentlocation,
              destinationLocation: destinationLocation,
            });
          }}>
          <View style={styles.locationContainer}>
            <Image source={require('../icons/location.jpg')} />
            <Text style={styles.address} numberOfLines={2}>
              {address}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Image source={require('../icons/Group.png')} />
          <Text style={styles.memberCount}>
            {members}/{maxCount}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Image source={require('../icons/Book_open.jpg')} />
          <Text style={styles.topic}>{topic}</Text>
        </View>
        {/* Button */}
        <View
          style={[
            styles.buttonContainer,
            {backgroundColor: isProfileId ? '#D3D3D3' : '#5DB075'},
          ]}>
          <TouchableOpacity onPress={handlePress} style={styles.button}>
            <Text style={styles.buttonText}>
              {isProfileId ? 'Edit' : 'Join'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 11,
    width: '100%',
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 10,
  },
  avatarContainer: {
    marginTop: 30,
    marginLeft: 11,
  },
  detailsContainer: {
    marginLeft: 25,
  },
  owner: {
    fontSize: 20,
  },
  description: {
    width: '60%',
    marginTop: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  address: {
    fontSize: 12,
    flex: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberCount: {
    marginLeft: 7,
  },
  topic: {
    marginLeft: 7,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    width: '60%',
  },
  button: {
    padding: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Card;
