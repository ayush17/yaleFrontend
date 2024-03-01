import React from 'react';
import 'react-native-url-polyfill/auto';
import Home from './screens/Home';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createStackNavigator();
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
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
        {/* <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details' }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
