import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ChatStack from './components/chat';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const Stack = createStackNavigator();
import Home from './screens/Home';
import JoinedRooms from './components/joinedRoom';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {chatUserName} from './chatConfig';
import MapScreen from './components/MapScreen';
import ProfileTab from './components/profile';
import CreateRoomTab from './components/createRoom';
import Login from './screens/Authentication';

const Tab = createBottomTabNavigator();

const HomeStack = ({userid, username}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={props => (
          <Home {...props} userId={userid} userName={username} />
        )}
        // initialParams={{userId: userid, username: username}}
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
      <Stack.Screen
        name="CreateRoom"
        component={CreateRoomTab}
        options={{
          title: 'CreateRoom',
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

const ProfileStack = () => {
  console.log('ChatUserName:', chatUserName);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileRoom">
        {props => <ProfileTab {...props} chatUserName={chatUserName} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userid, setuserid] = useState('');
  const [username, setusername] = useState('');
  const [loginOrSignUP, setloginOrSignUP] = useState('login');
  const setLogin = prevState => {
    setIsLogin(prevState);
  };

  if (!isLogin) {
    return (
      <Login
        isLogin={isLogin}
        loginOrSignUP={loginOrSignUP}
        setloginOrSignUP={setloginOrSignUP}
        setLogin={setLogin}
        setuserid={setuserid}
        setusername={setusername}
      />
    );
  }
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        {isLogin && ( // Render Tab.Navigator only if user is logged in
          <Tab.Navigator
            screenOptions={{
              headerShown: false, // Hide the header
            }}>
            <Tab.Screen
              name="Home"
              component={() => {
                return <HomeStack userid={userid} username={username} />;
              }}
            />
            <Tab.Screen name="JoinedRooms" component={JoinedRoomsStack} />
            <Tab.Screen
              name="ChatTab"
              component={() => {
                return <ChatStack userid={userid} username={username} />;
              }}
            />
            <Tab.Screen name="Profile" component={ProfileStack} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
