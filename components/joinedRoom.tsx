// JoinedRooms.tsx
import React from 'react';
import {View} from 'react-native';
import RoomCard from '../components/RoomCard';
import MapScreen from './MapScreen'; // Import the MapScreen component
import roomsData from './data.json'; // Update the path to your JSON data
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const JoinedRooms = ({navigation}) => {
  const handleCardPress = room => {
    navigation.navigate('MapScreen', {
      location: room.location,
      destinationLocation: room.destinationLocation,
    });
  };

  return (
    <View>
      {roomsData.map(room => (
        <RoomCard key={room.roomId} room={room} onCardPress={handleCardPress} />
      ))}
    </View>
  );
};

const JoinedRoomsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="JoinedRooms"
        component={JoinedRooms}

        // options={{
        //   title: 'Joined Rooms',
        //   headerStyle: {
        //     backgroundColor: '#E8E8E8',
        //   },
        //   headerTintColor: 'black',
        //   headerTitleAlign: 'center',
        //   headerTitleStyle: {
        //     fontWeight: 'bold',
        //   },
        // }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: 'Map Screen',
          headerStyle: {
            backgroundColor: '#E8E8E8',
          },
          headerTintColor: 'black',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default JoinedRoomsStack;
