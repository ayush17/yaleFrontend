// App.js
import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';
import {useChatClient} from '../useChatClient';
import {Chat, OverlayProvider} from 'stream-chat-expo';

import {StreamChat} from 'stream-chat';
import {chatApiKey, chatUserId, chatUserName} from '../chatConfig';

import {Button, View} from 'react-native';
import {
  createNewUser,
  createNewChannel,
  addUserToChannel,
} from '../chatOperations';

import {
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
} from 'stream-chat-expo';

const Stack = createStackNavigator();

const ChatStack = ({navigation, userid, username}) => {
  console.log('Inside chatStack userID ', userid);
  const {clientIsReady} = useChatClient(userid, username);
  const chatClient = StreamChat.getInstance(chatApiKey);
  // const handleCreateNewUser = (userId, userName) => {
  //   // Call the createNewUser function with the desired userId and userName
  //   createNewUser(userId, userName);
  // };
  // const handleCreateNewChannel = (channelName, participants) => {
  //   // Call the createNewChannel function with the desired channelName and members
  //   createNewChannel(channelName, channelName, participants);
  // };
  // useEffect(() => {
  //   console.log('inside chat', userid, username);
  //   fetch('https://yalehack-production.up.railway.app/api/rooms')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch rooms');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       // for (let i = 0; i < data.length; i++) {
  //       //   const obj = data[i];
  //       //   let arrayOfUserIds = [];
  //       //   for (let participant in obj.participants) {
  //       //     const userId = obj.participants[participant].userId;
  //       //     const userName = obj.participants[participant].userName;
  //       //     handleCreateNewUser(`${userId}`, userName);
  //       //     arrayOfUserIds.push(`${userId}`);
  //       //   }
  //       //   handleCreateNewChannel(obj.topic, arrayOfUserIds);
  //       //   addUserToChannel(obj.topic, 'user1');
  //       // }
  //       // Handle the fetched data here
  //     })
  //     .catch(error => {
  //       console.error('Error fetching rooms:', error);
  //       // Handle error, e.g., display an error message to the user
  //     });
  // }, []);

  // if (isLoading) {
  //   return <Text>Loading chat...</Text>;
  // }

  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <Stack.Navigator>
          {/* Your existing screens */}
          <Stack.Screen
            name="ChannelList"
            component={({navigation}) => (
              <ChannelListScreen
                navigation={navigation}
                userId={userid}
                userName={username}
              />
            )}
          />
          <Stack.Screen
            name="ChannelScreen"
            component={ChannelScreen}
            initialParams={{navigation, userid, username}}
          />
        </Stack.Navigator>
        <View>
          {/* <Button title="Create New User" onPress={handleCreateNewUser} />
          <Button title="Create New Channel" onPress={handleCreateNewChannel} />
          <Button
            title="Add User to Channel"
            onPress={handleAddUserToChannel}
          /> */}
        </View>
      </Chat>
    </OverlayProvider>
  );
};

const ChannelListScreen = ({navigation, userId, userName}) => {
  console.log('UserID in ChannelScreen ', userId);
  // console.log('Props in ChannelListScreen:', );
  const filters = {
    members: {$in: [userId]},
  };

  return (
    <ChannelList
      filters={filters}
      onSelect={channel => {
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
// if (connectionError) {
//   console.error('Connection error:', connectionError);
//   return <Text>Failed to connect to chat</Text>;
// }

// if (!clientIsReady) {
//   console.log(clientIsReady);
//   return <Text>Failed to load chat</Text>;
// }

// const handleAddUserToChannel = (channelName, user) => {
//   // Call the addUserToChannel function with the desired channelId and userId
//   addUserToChannel(channelName, user);
// };

export default ChatStack;
