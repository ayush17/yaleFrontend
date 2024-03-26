import {Text} from 'react-native';
import React from 'react';

// const profileId = 1;
const ProfileTab = ({chatUserName}) => {
  console.log('chatUserName', chatUserName);
  
  return <Text style= {{fontSize: 20, textAlign: 'center', marginTop: 20}} 
  >This is the profile of {chatUserName}</Text>;
};
export default ProfileTab;
