/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {Avatar} from '@rneui/themed';
import 'react-native-url-polyfill/auto';

function Card({name, isProfileId, description, topic}): React.JSX.Element {
  const handlePress = () => {
    // Your button press logic here
    console.log('Button pressed');
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        padding: 11,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 10,
        marginTop: 10,
      }}>
      <View style={{marginTop: 30, marginLeft: 11}}>
        <Avatar
          size={67}
          rounded
          source={{
            uri: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg',
          }}
          titleStyle={{color: 'green'}}
          iconStyle={{backgroundColor: 'green'}}
        />
      </View>
      <View style={{marginLeft: 25}}>
        <Text style={{fontSize: 20}}>{name}'s Room</Text>
        <Text style={{width: '60%', marginTop: 1}}>{description}</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
          }}>
          <Image source={require('../icons/location.jpg')} />
          <Text style={{marginLeft: 7}}>Umassd Library</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image source={require('../icons/Group.png')} />
          <Text style={{marginLeft: 7}}>1/8</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image source={require('../icons/Book_open.jpg')} />
          <Text style={{marginLeft: 7}}>{topic}</Text>
        </View>
        {/* Button */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isProfileId ? '#D3D3D3' : '#5DB075',
            borderRadius: 10,
            marginTop: 10,
            width: '60%',
          }}>
          <TouchableOpacity
            onPress={handlePress}
            style={{
              padding: 12,
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
              }}>
              {isProfileId ? 'Edit' : 'Join'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default Card;
