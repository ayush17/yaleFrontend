import React, {useCallback, useRef, useState, useEffect} from 'react';
import {LatLng} from 'react-native-maps';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import moment from 'moment';
import {Button} from '@rneui/themed';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useForm, Controller} from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  createNewUser,
  createNewChannel,
  addUserToChannel,
  addAdminToChannel,
} from '../chatOperations';
import {MaterialIcons} from '@expo/vector-icons';

const profileId = 4;
const CreateRoomTab = ({navigation, data, route}) => {
  const {
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [origin, setOrigin] = useState<LatLng | null>();
  const [destination, setDestination] = useState<LatLng | null>();
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [address, setAddress] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [userId, setUserId] = useState('');
  const [userName, setUsername] = useState('');
  const [participantsCount, setParticipantsCount] = useState(1);
  useEffect(() => {
    // console.log('Inside create Room tab', route.params);
    // console.log('=======BEFORE=========');
    // console.log('User', userId);
    // console.log('User', userName);
    if (route?.params?.data) {
      setAddress(route?.params?.data);
      setOrigin(route?.params?.currentLocation);
      setDestination(route?.params?.destinationLocation);
    }
    if (route?.params?.userId) {
      setUserId(route?.params?.userId);
      setUsername(route?.params?.userName);
    }
  }, [route.params]);
  const incrementParticipantCount = () => {
    setParticipantsCount(prevCount => prevCount + 1);
  };

  const decrementParticipantCount = () => {
    setParticipantsCount(prevCount => Math.max(1, prevCount - 1)); // Ensure count never goes below 1
  };
  const Submit = async data => {
    console.log('this is the user Id');
    try {
      const response = await fetch(
        'https://yalehack-production.up.railway.app/api/rooms',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            room: {
              currentLocation: origin,
              destinationLocation: destination,
              roomId: 9,
              ownerId: userId,
              owner: userName,
              topic: data.topic,
              address: address,
              maxCount: participantsCount,
              time: '2022',
              description: data.description,
            },
          }),
        },
      );
      if (!response.ok) {
        throw new Error('Failed to submit room data');
      }
      bottomSheetRef?.current?.close();
      await createNewChannel(data.topic, data.topic);
      await addUserToChannel(data.topic, userId);
      // await addAdminToChannel(data.topic, userId);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error, e.g., display an error message to the user
    }
  };

  const handleLocation = () => {
    navigation.navigate('MapScreen');
  };
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
    setValue('dateOfBirth', currentDate); // Update form value
  };
  // Function to handle time change
  const handleTimeChange = selectedTime => {
    setShowTimePicker(false);
    if (selectedTime) {
      setSelectedTime(selectedTime.nativeEvent.timestamp);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };
  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };
  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      animateOnMount={true}
      snapPoints={['100%']}>
      <BottomSheetView style={styles.contentContainer}>
        <TextInput
          placeholder="Topic"
          onChangeText={text => setValue('topic', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          onChangeText={text => setValue('description', text)}
          style={[styles.input, styles.descriptionInput]}
          multiline
        />
        <View style={styles.locationContainer}>
          <TextInput
            placeholder="Location"
            value={address}
            onChangeText={text => setValue('location', text)}
            style={[styles.input, styles.locationInput]}
          />
          <TouchableOpacity
            onPress={handleLocation}
            style={styles.locationButton}>
            <MaterialIcons name="location-on" size={24} color="white" />
            <Text style={styles.locationButtonText}>Select Location</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.participantsContainer}>
          <Text style={styles.participantsCount}>Max Count:</Text>
          <TouchableOpacity
            onPress={incrementParticipantCount}
            style={styles.participantsButton}>
            <MaterialIcons name="add" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.participantsCount}>{participantsCount}</Text>
          <TouchableOpacity
            onPress={decrementParticipantCount}
            style={styles.participantsButton}>
            <MaterialIcons name="remove" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={showDatePickerModal}
          style={styles.datePickerContainer}>
          <MaterialIcons name="date-range" size={24} color="black" />
          <Text style={styles.datePickerText}>
            {selectedDate.toDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <TouchableOpacity
          onPress={showTimePickerModal}
          style={styles.datePickerContainer}>
          <MaterialIcons name="access-time" size={24} color="black" />
          <Text style={styles.datePickerText}>
            {selectedTime
              ? moment(selectedTime).format('hh:mm A')
              : 'Select Time'}
          </Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={new Date(selectedTime)}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
        <Button title="Submit" onPress={handleSubmit(Submit)} />
      </BottomSheetView>
    </BottomSheet>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationInput: {
    flex: 1,
  },
  locationButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationButtonText: {
    color: 'white',
    marginLeft: 5,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  datePickerText: {
    marginLeft: 10,
  },
  participantsContainer: {
    flexDirection: 'row',

    alignItems: 'center',
    marginBottom: 10,
  },
  participantsButton: {
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 5,
  },
  participantsCount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default CreateRoomTab;
