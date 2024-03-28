import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Login = ({isLogin, setLogin, loginOrSignUP, setloginOrSignUP}) => {
  const [email, setEmail] = useState('');
  const [userName, setuserName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Create a payload object with email and password
    const payload = {
      email: email,
      password: password,
    };
    // Make a GET request
    fetch('https://yalehack-production.up.railway.app/api/users/login', {
    // fetch('http://localhost:3000/api/users/login', {
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
        // Handle successful signup response here
      })
      .catch(error => {
        console.error('Login Failed:', error);
        // Handle error, e.g., display an error message to the user
      });
    setLogin(!isLogin);
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
        // Handle successful signup response here
      })
      .catch(error => {
        console.error('Error signing up:', error);
        // Handle error, e.g., display an error message to the user
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {loginOrSignUP == 'login' ? 'Login' : 'Sign Up'}
      </Text>
      {loginOrSignUP == 'signup' && (
        <TextInput
          style={styles.input}
          placeholder="userId"
          value={userId}
          onChangeText={setUserId}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    backgroundColor: 'green',
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
  switchText: {
    marginTop: 10,
    color: '#007bff',
  },
});

export default Login;
