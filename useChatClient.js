import {useEffect, useState} from 'react';
import {StreamChat} from 'stream-chat';
import {
  chatApiKey,
  chatUserId,
  chatUserName,
  chatUserToken,
} from './chatConfig';

const chatClient = StreamChat.getInstance(chatApiKey);

export const useChatClient = (userId, userName) => {
  const [clientIsReady, setClientIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(null);

  const user = {
    id: userId,
    name: userName,
  };

  useEffect(() => {
    const setupClient = async () => {
      try {
        setIsLoading(true); // Set the loading state to true before connecting the user
        setClientIsReady(false); // Reset the clientIsReady state to false
        console.log('Before connectUser');
        await chatClient.connectUser(user, chatClient.devToken(user.id));
        console.log('After connectUser');
        //check who is connected
        console.log('chatClient:', chatClient._user);
        setClientIsReady(true);
        setConnectionError(null); // Clear any previous connection error
      } catch (error) {
        setConnectionError(error); // Set the connection error
        console.error(
          `An error occurred while connecting the user: ${error.message}`,
        );
      } finally {
        setIsLoading(false); // Set the loading state to false after the connection attempt
      }
    };

    if (!chatClient.userID) {
      setupClient();
    }
  }, []);

  return {clientIsReady, isLoading, connectionError};
};
