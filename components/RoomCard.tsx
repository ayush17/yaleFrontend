// RoomCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const RoomCard = ({ room, onCardPress }) => {
  return (
    <TouchableOpacity onPress={() => onCardPress(room)}>
      <View style={{ padding: 16, margin: 8, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 }}>
        <Text>{room.topic}</Text>
        <Text>{room.location.latitude}, {room.location.longitude}</Text>
        {/* Add more details as needed */}
      </View>
    </TouchableOpacity>
  );
};

export default RoomCard;
