import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, ScrollView, StyleSheet} from 'react-native';
import {Input} from '@rneui/base';
import Card from '../components/card';
import {useFocusEffect} from '@react-navigation/native';
import {FloatingAction} from 'react-native-floating-action';
import Logout from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';
import data from '../components/data.json';
const logoutIcon = <Logout name="logout" size={15} color="white" />;
const createIcon = <Icon2 name="create" size={15} color="white" />;

import {useChatClient} from '../useChatClient';
import {StreamChat} from 'stream-chat';
import {chatApiKey, chatUserId, chatUserName} from '../chatConfig';

import {Room} from '../model/room';

import CreateRoomTab from '../components/createRoom';

function Home({navigation, route, userId, userName}) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const profileId = 1;
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // State for filtered rooms
  const [filteredRooms, setFilteredRooms] = useState([]);

  const chatClient = StreamChat.getInstance(chatApiKey);
  useChatClient(userId, userName);

  useFocusEffect(
    React.useCallback(() => {
      const fetchRooms = async () => {
        try {
          const response = await fetch(
            'https://yalehack-production.up.railway.app/api/rooms',
          );
          const data = await response.json();
          setRooms(data);
          setFilteredRooms(data); // Initialize filteredRooms with all rooms
        } catch (error) {
          console.error('Error fetching rooms:', error);
        }
      };

      fetchRooms();
    }, []),
  );

  // Function to handle search query change
  const handleSearch = query => {
    setSearchQuery(query);
    // Filter rooms based on search query
    const filtered = rooms.filter(room =>
      room.topic.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredRooms(filtered);
  };

  const actions = [
    {
      text: 'logout',
      icon: logoutIcon,
      name: 'logout',
      position: 2,
      color: 'green',
    },
    {
      text: 'Create Room',
      icon: createIcon,
      name: 'createRoom',
      position: 1,
      color: 'green',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        colors={['#C7F6C7', '#FFFFFF', '#FFFFFF']}
        style={{flex: 1}}>
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <Input
              placeholder="Search"
              value={searchQuery} // Bind input value to searchQuery state
              onChangeText={handleSearch} // Handle search query change
              inputContainerStyle={{
                backgroundColor: '#C7F6C7',
                width: '100%',
                borderBottomWidth: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              inputStyle={{
                padding: 20,
                backgroundColor: 'white',
                borderRadius: 30,
                borderBottomWidth: 0,
              }}
            />
            <View style={styles.cardsContainer}>
              {filteredRooms.map(data => {
                const room = new Room(data); // Create a Room instance
                console.log('this is the user id', userId, data.ownerId);
                return (
                  <Card
                    key={room.roomId}
                    owner={data.owner}
                    address={data.address}
                    description={data.description}
                    isProfileId={userId === data.ownerId}
                    topic={data.topic}
                    maxCount={data.maxCount}
                    members="1" //need to map
                    currentlocation={data.currentlocation}
                    destinationLocation={data.destinationLocation}
                    navigation={navigation}
                    timeLeft={'50 mins left'}
                  />
                );
              })}
            </View>
          </ScrollView>
          <View style={styles.fabContainer}>
            <FloatingAction
              actions={actions}
              buttonSize={72}
              color="#5DB075"
              onPressItem={name => {
                if (name === 'createRoom') {
                  setIsBottomSheetOpen(true);
                  navigation.navigate('CreateRoom', {
                    userId: userId,
                    userName: userName,
                  });
                  // bottomSheetRef?.current?.expand(); // Expand the bottom drawer
                } else {
                  console.log(`selected ${name}`);
                }
              }}
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardsContainer: {
    flexGrow: 1,
    backgroundColor: '#E8E8E8',
    padding: 12,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Home;
