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
  timeLeft,
}) {
  const handlePress = () => {
    console.log('Button pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Avatar
          size={67}
          rounded
          source={{
            uri: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg',
          }}
          titleStyle={{color: 'green'}}
          iconStyle={{backgroundColor: 'green'}}
        />
        <View style={styles.details}>
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
            <View style={styles.infoItem}>
              <Image source={require('../icons/Group.png')} />
              <Text style={styles.infoText}>
                {members}/{maxCount}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Image source={require('../icons/Book_open.jpg')} />
              <Text style={styles.infoText} numberOfLines={1}>
                {topic}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.buttonContainer,
          {backgroundColor: isProfileId ? '#D3D3D3' : '#5DB075'},
        ]}>
        <Text style={styles.buttonText}>{isProfileId ? 'Edit' : 'Join'}</Text>
      </TouchableOpacity>
      <Text style={styles.timeLeft}>{timeLeft}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    marginLeft: 15,
    flex: 1,
  },
  owner: {
    fontSize: 20,
    marginBottom: 5,
    fontFamily: 'System', // Change font family to System
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  address: {
    fontSize: 14,
    marginLeft: 5,
    flex: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 5,
    maxWidth: '75%',
    fontFamily: 'System', // Change font family to System
  },
  buttonContainer: {
    backgroundColor: '#5DB075',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'System', // Change font family to System
  },
  timeLeft: {
    alignSelf: 'flex-end',
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'System', // Change font family to System
  },
});

export default Card;
