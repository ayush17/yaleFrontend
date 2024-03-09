// App.tsx
import React from 'react';
import 'react-native-url-polyfill/auto';
import Home from './screens/Home';
import JoinedRooms from './components/joinedRoom';
// import Settings from './screens/Settings'; // Import your Settings screen
// import Notifications from './screens/Notifications'; // Import your Notifications screen
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
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
    </Stack.Navigator>
  );
};

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // Hide the header
        }}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="JoinedRooms" component={JoinedRoomsStack} />
        {/* <Tab.Screen name="Settings" component={Settings} /> */}
        {/* <Tab.Screen name="Notifications" component={Notifications} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
