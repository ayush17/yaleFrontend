import React from 'react';
import {SafeAreaView, Text, View, ScrollView, StyleSheet} from 'react-native';
import 'react-native-url-polyfill/auto';
import {Input} from '@rneui/themed';
import {FloatingAction} from 'react-native-floating-action';
import data from '../components/data.json';
import Card from '../components/card';

function Home() {
  const profileId = 1;
  const actions = [];
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Input
          placeholder="Search"
          inputContainerStyle={{
            backgroundColor: '#E8E8E8',
            width: '100%',
            borderBottomWidth: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          inputStyle={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 30,
            borderBottomWidth: 0,
          }}
        />
        <View style={styles.cardsContainer}>
          {data.map(data => (
            <Card
              name={data.owner}
              description={data.description}
              isProfileId={profileId == data.ownerId}
              topic={data.topic}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.fabContainer}>
        <FloatingAction
          actions={actions}
          buttonSize={72}
          color="green"
          onPressItem={name => {
            console.log(`selected button: ${name}`);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardsContainer: {
    flexGrow: 1,
    backgroundColor: '#E8E8E8',
    padding: 12,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export default Home;
