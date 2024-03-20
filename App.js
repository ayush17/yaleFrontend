import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';
import {useChatClient} from './useChatClient';
import {OverlayProvider} from 'stream-chat-expo';
import ChatTab from './components/chat';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const Stack = createStackNavigator();
import Home from './screens/Home';
import JoinedRooms from './components/joinedRoom';
import ProfileTab from './components/profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Rooms',
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

const JoinedRoomsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide the header
      }}>
      <Stack.Screen name="JoinedRooms" component={JoinedRooms} />
    </Stack.Navigator>
  );
};
const ChatStack = () => {
  const {clientIsReady} = useChatClient();

  if (!clientIsReady) {
    console.log(clientIsReady);
    return <Text>Loading chat ...</Text>;
  }

  return (
    <OverlayProvider>
      <Stack.Navigator>
        <Stack.Screen name="ChatTab" component={ChatTab} />
      </Stack.Navigator>
    </OverlayProvider>
  );
};
const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide the header
      }}>
      <Stack.Screen name="ProfileRoom" component={ProfileTab} />
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false, // Hide the header
          }}>
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="JoinedRooms" component={JoinedRoomsStack} />
          <Tab.Screen name="ChatTab" component={ChatStack} />
          <Tab.Screen name="Profile" component={ProfileStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
