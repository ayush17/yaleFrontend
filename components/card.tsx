import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar} from '@rneui/themed';
import {LinearGradient} from 'expo-linear-gradient'; // Import LinearGradient
import {MaterialIcons} from '@expo/vector-icons'; // Import MaterialIcons from expo vector icons
import { addUserToChannel } from '../chatOperations';

function Card({
  userId,
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
  const [isJoined, setIsJoined] = useState(false); // State to track if the card is joined

  const handleJoin = () => {
    addUserToChannel(topic,userId); // Add user to channel when join button is clicked
    setIsJoined(true); // Set isJoined to true when the join button is clicked

  };

  return (
    <LinearGradient // Add LinearGradient as the outermost component
      colors={['#C7F6C7', '#FFFFFF', '#FFFFFF']}
      style={styles.container}>
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
        onPress={handleJoin}
        style={[
          styles.buttonContainer,
          {
            backgroundColor: isProfileId
              ? '#D3D3D3'
              : isJoined
              ? '#FFA500'
              : '#5DB075',
          }, // Change button color to orange when joined
        ]}>
        <Text style={styles.buttonText}>
          {isProfileId ? 'Edit' : isJoined ? 'Joined' : 'Join'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ChatTab')} // Handle chat button press
        style={styles.chatButton}>
        <MaterialIcons name="chat" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.timeLeft}>{timeLeft}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
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
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
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
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
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
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
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
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
  },
  chatButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#5DB075',
    borderRadius: 20,
    padding: 10,
  },
  timeLeft: {
    alignSelf: 'flex-end',
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
  },
});

export default Card;
