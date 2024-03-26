import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';
import {useChatClient} from './useChatClient';
import {Chat, OverlayProvider} from 'stream-chat-expo';
import ChatTab from './components/chat';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const Stack = createStackNavigator();
import Home from './screens/Home';
import JoinedRooms from './components/joinedRoom';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StreamChat} from 'stream-chat';
import {chatApiKey, chatUserId, chatUserName} from './chatConfig';
import MapScreen from './components/MapScreen';
import {Button, View} from 'react-native';
import {
  createNewUser,
  createNewChannel,
  addUserToChannel,
} from './chatOperations';

import {
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
} from 'stream-chat-expo';
import {useAppContext} from './components/AppContext';
import ProfileTab from './components/profile';
import CreateRoomTab from './components/createRoom';

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

const ChannelListScreen = props => {
  const filters = {
    members: {$in: [chatUserId]},
  };

  return (
    <ChannelList
      filters={filters}
      onSelect={channel => {
        const {navigation} = props;
        if (navigation) {
          console.log('Navigation prop:', navigation);
          navigation.navigate('ChannelScreen', {
            channel,
          });
        } else {
          console.warn('Navigation prop is missing.');
        }
      }}
    />
  );
};

const ChannelScreen = props => {
  const {route} = props;
  const {
    params: {channel},
  } = route;
  // const {channel} = useAppContext();
  //console log props
  console.log('Props in ChannelScreen:', props);
  console.log('Channel in ChannelScreen:', channel);
  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

const ChatStack = () => {
  const {clientIsReady, isLoading, connectionError} = useChatClient();
  const chatClient = StreamChat.getInstance(chatApiKey);

  if (isLoading) {
    return <Text>Loading chat...</Text>;
  }

  if (connectionError) {
    console.error('Connection error:', connectionError);
    return <Text>Failed to connect to chat</Text>;
  }

  if (!clientIsReady) {
    console.log(clientIsReady);
    return <Text>Failed to load chat</Text>;
  }

  const handleCreateNewUser = () => {
    // Call the createNewUser function with the desired userId and userName
    createNewUser('jd11', 'John Doe');
  };

  const handleCreateNewChannel = () => {
    // Call the createNewChannel function with the desired channelName and members
    createNewChannel('personal', 'Personal Channel', ['jd11', 'user2']);
  };

  const handleAddUserToChannel = () => {
    // Call the addUserToChannel function with the desired channelId and userId
    addUserToChannel('personal', 'user1');
  };

  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <Stack.Navigator>
          {/* Your existing screens */}
          <Stack.Screen name="ChannelList" component={ChannelListScreen} />
          <Stack.Screen name="ChannelScreen" component={ChannelScreen} />
        </Stack.Navigator>
        <View>
          <Button title="Create New User" onPress={handleCreateNewUser} />
          <Button title="Create New Channel" onPress={handleCreateNewChannel} />
          <Button
            title="Add User to Channel"
            onPress={handleAddUserToChannel}
          />
        </View>
      </Chat>
    </OverlayProvider>
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
