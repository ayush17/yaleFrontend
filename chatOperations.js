// chatOperations.js
import {StreamChat} from 'stream-chat';
import {chatApiKey} from './chatConfig';

const chatClient = StreamChat.getInstance(chatApiKey);

// Function to create a new user
export const createNewUser = async (userId, userName) => {
  try {
    const newUser = {
      id: userId,
      name: userName,
      // Add any other user properties as needed
    };

    // await chatClient.disconnectUser();sd

    const updateResponse = await chatClient.upsertUsers([
      {id: userId, name: userName},
    ]);
    // each user object is updated accordingly

    console.log('User created:', updateResponse);
    // Handle the successful creation of the user
  } catch (error) {
    console.error('Error creating user:', error);
    // Handle the error
  }
};

// Function to create a new channel
export const createNewChannel = async (channelid, channelName, members) => {
  try {
    const channelData = {
      members: members,
      name: channelName,
      // Add any other channel properties as needed
    };

    console.log('\nchannelData:', channelData);

    const channel = chatClient.channel('messaging', channelid, channelData);
    const response = await channel.create();
    console.log('Channel created:', response);
    // Handle the successful creation of the channel
  } catch (error) {
    console.error('Error creating channel:', error);
    // Handle the error
  }
};

// Function to add a user to a particular channel
export const addUserToChannel = async (channelId, userId) => {
  try {
    const channel = chatClient.channel('messaging', channelId);
    const response = await channel.addMembers([userId]);
    console.log('User added to channel:', response);
    // Handle the successful addition of the user
  } catch (error) {
    console.error('Error adding user to channel:', error);
    // Handle the error
  }
};

// Function to add a user as channel_admin to a particular channel
export const addAdminToChannel = async (channelId, userId) => {
  try {
    const channel = chatClient.channel('messaging', channelId);
    const response = await channel.addModerators([userId]);
    console.log('User added as admin to channel:', response);
    // Handle the successful addition of the user
  } catch (error) {
    console.error('Error adding user as admin to channel:', error);
    // Handle the error
  }
};
