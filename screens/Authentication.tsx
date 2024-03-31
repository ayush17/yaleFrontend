import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  createNewUser,
  createNewChannel,
  addUserToChannel,
} from '../chatOperations';
import {useChatClient} from '../useChatClient';
import {Avatar} from '@rneui/themed';
import {StreamChat} from 'stream-chat';
import {chatApiKey, chatUserId, chatUserName} from '../chatConfig';
import {set} from 'react-hook-form';
import {LinearGradient} from 'expo-linear-gradient';
// Import the logo image
import logo from '../assets/logo.png';

const Login = ({
  isLogin,
  userId,
  userName,
  loginOrSignUP,
  setloginOrSignUP,
  setLogin,
  setuserId,
  setuserName,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useChatClient('user1', 'Pranshu');

  const chatClient = StreamChat.getInstance(chatApiKey);
  const handleLogin = () => {
    // Create a payload object with email and password
    const payload = {
      email: email,
      password: password,
    };
    // Make a POST request
    fetch('https://yalehack-production.up.railway.app/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to log in: ' + response.text);
        }
        return response.json();
      })
      .then(data => {
        console.log('Login successful:', data);

        setuserId(data[0].userId);
        console.log('Setting userID state as  ', data[0].userId);
        setuserName(data[0].name);
        console.log('Setting userName state as  ', data[0].name);
        setLogin(!isLogin);

        // Handle successful signup response here
      })
      .catch(error => {
        console.error('Login Failed:', error);
        // Handle error, e.g., display an error message to the user
      });
  };

  const handleSignup = () => {
    // Create a payload object with email and password
    const payload = {
      userId: userId,
      name: userName,
      email: email,
      password: password,
      role: 'member',
    };
    // Make a POST request
    fetch('https://yalehack-production.up.railway.app/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (!response.ok) {
          console.log(response);
          throw new Error('Failed to sign up');
        } else {
          setLogin(!isLogin);
        }
        return response.json();
      })
      .then(data => {
        console.log('Signup successful:', data);
        setuserId(data.userId);
        setuserName(data.name);
        createNewUser(data.userId, data.name);
        // Handle successful signup response here
      })
      .catch(error => {
        console.error('Error signing up:', error);
        // Handle error, e.g., display an error message to the user
      });
  };

  return (
    <LinearGradient
      colors={['#C7F6C7', '#FFFFFF', '#FFFFFF']}
      style={{flex: 1}}>
      <View style={styles.content}>
        {/* Use the Avatar component with the logo image */}
        <Avatar
          size={370} // Adjust the size here
          rounded
          source={logo}
          titleStyle={{color: 'green'}}
          iconStyle={{backgroundColor: 'green'}}
        />
        {/* Other card content */}
      </View>
      <View style={styles.container}>
        <Text style={styles.titleStudy}>Study </Text>
        <Text style={styles.titleCube}>Cube</Text>
        {loginOrSignUP == 'signup' && (
          <TextInput
            style={styles.input}
            placeholder="userId"
            value={userId}
            onChangeText={setuserId}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
        {loginOrSignUP == 'signup' && (
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={userName}
            onChangeText={setuserName}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {loginOrSignUP == 'signup' ? (
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}

        <Text
          style={styles.switchText}
          onPress={() => {
            if (loginOrSignUP == 'login') {
              setloginOrSignUP('signup');
            } else {
              setloginOrSignUP('login');
            }
          }}>
          {loginOrSignUP == 'login'
            ? "Don't have an account? Sign Up"
            : 'Already have an account? Login'}
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleStudy: {
    fontSize: 33,
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    marginTop: 5,
    marginBottom: 12,
  },
  titleCube: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -25,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#5DB075',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 40,
    marginLeft: 5,
  },
  switchText: {
    marginTop: 10,
    color: '#007bff',
  },
});

export default Login;
