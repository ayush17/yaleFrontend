// App.js

import { Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChatClient } from "../useChatClient";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const ChatTab = () => {
  return <Text>Chat Connected</Text>;
};
export default ChatTab;
