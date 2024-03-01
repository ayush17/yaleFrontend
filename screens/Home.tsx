import React from 'react';
import {SafeAreaView, Text, View, ScrollView} from 'react-native';
import 'react-native-url-polyfill/auto';
import {Input} from '@rneui/themed';

import Card from '../components/card';

function Home() {
  return (
    <ScrollView style={{height: '100%'}}>
      <Input
        placeholder="Search"
        //   errorStyle={{color: 'red', marginLeft: 15}}
        //   errorMessage="Enter Valid Name"
        inputContainerStyle={{
          backgroundColor: '#E8E8E8',

          width: '100%',
          //   padding: 10,
          borderBottomWidth: 0,
          alignItems: 'center',
          justifyContent: 'center',
          //   height: '20%',
        }}
        inputStyle={{
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 30,
          borderBottomWidth: 0,
        }}
      />
      <View
        style={{
          // flex: 1,
          backgroundColor: '#E8E8E8',
          height: '100%',
          padding: 12,
        }}>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </View>
    </ScrollView>
  );
}
export default Home;
