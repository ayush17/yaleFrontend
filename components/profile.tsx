import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const ProfileTab = ({userId, userName}) => {
  console.log('this is profiletab', userName);
  return (
    <View style={styles.container}>
      <View style={{backgroundColor: '#5DB075', height: '40%'}}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.headerText}>Settings</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity>
            <Text style={styles.headerText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.centerContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileMantra}>A mantra goes here</Text>
          <View style={styles.tabContainer}>
            <TouchableOpacity>
              <Text style={[styles.tabText, styles.activeTab]}>Rooms</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.tabText}>Ratings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.headerDots}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 30,
    backgroundColor: '#5DB075',
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    bottom: '17%',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    // backgroundColor: '#5DB075',
  },
  profileImageContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  profileMantra: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  tabText: {
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  activeTab: {
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  headerDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4CAF50',
  },
});

export default ProfileTab;
