import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ChatStack from './components/chat';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const Stack = createStackNavigator();
import Home from './screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MapScreen from './components/MapScreen';
import ProfileTab from './components/profile';
import CreateRoomTab from './components/createRoom';
import Login from './screens/Authentication';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
          title: 'Cubes',
          headerStyle: {
            backgroundColor: '#C7F6C7',
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
          title: 'Create Cube',
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

const ProfileStack = ({userid, username}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileRoom">
        {props => <ProfileTab {...props} userId={userid} userName={username} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setuserId] = useState('');
  const [userName, setuserName] = useState('');
  const [loginOrSignUP, setloginOrSignUP] = useState('login');
  const setLogin = prevState => {
    setIsLogin(prevState);
  };

  if (!isLogin) {
    return (
      <Login
        isLogin={isLogin}
        userId={userId}
        userName={userName}
        loginOrSignUP={loginOrSignUP}
        setloginOrSignUP={setloginOrSignUP}
        setLogin={setLogin}
        setuserId={setuserId}
        setuserName={setuserName}
      />
    );
  }
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        {isLogin && ( // Render Tab.Navigator only if user is logged in
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({color, size}) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = 'home';
                } else if (route.name === 'ChatTab') {
                  iconName = 'message';
                } else if (route.name === 'Profile') {
                  iconName = 'account-circle';
                }

                // Return the icon component with the specified name
                return <Icon name={iconName} size={size} color={color} />;
              },
              headerShown: false, // Hide the header
            })}
            tabBarOptions={{
              activeTintColor: 'green',
              inactiveTintColor: 'gray',
            }}>
            <Tab.Screen
              name="Home"
              component={() => {
                console.log('userid:', userId);
                console.log('username:', userName);
                return <HomeStack userid={userId} username={userName} />;
              }}
            />
            <Tab.Screen
              name="ChatTab"
              component={() => {
                return <ChatStack userid={userId} username={userName} />;
              }}
            />
            <Tab.Screen
              name="Profile"
              component={() => {
                return <ProfileStack userid={userId} username={userName} />;
              }}
            />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
