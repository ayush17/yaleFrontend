import React, {useState} from 'react';
import {SafeAreaView, View, ScrollView, StyleSheet} from 'react-native';
import {Input} from '@rneui/base';
import Card from '../components/card';

import {FloatingAction} from 'react-native-floating-action';
import Logout from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';

import data from '../components/data.json';
const logoutIcon = <Logout name="logout" size={15} color="white" />;
const createIcon = <Icon2 name="create" size={15} color="white" />;

import CreateRoomTab from '../components/createRoom';

function Home({navigation}) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const profileId = 1;
  // State for form inputs

  const actions = [
    {
      text: 'logout',
      icon: logoutIcon,
      name: 'logout',
      position: 2,
      color: 'green',
    },
    {
      text: 'Create Room',
      icon: createIcon,
      name: 'createRoom',
      position: 1,
      color: 'green',
    },
  ];

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
              isProfileId={profileId === data.ownerId}
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
            if (name === 'createRoom') {
              setIsBottomSheetOpen(true);
              navigation.navigate('CreateRoom');
              // bottomSheetRef?.current?.expand(); // Expand the bottom drawer
            } else {
              console.log(`selected ${name}`);
            }
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
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Home;
