import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const access_token = 'C6a8DV5dQo_UkF3-uucgxN5faKh4DQZF';

      const api_url =
        'https://api.account.kmutnb.ac.th/api/account-api/user-authen';
      const scopes = 'personel,student,templecturer';

      const post_data = {
        scopes: scopes,
        username: username,
        password: password,
      };

      const response = await fetch(api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + access_token,
        },
        body: new URLSearchParams(post_data).toString(),
        timeout: 10000, // 10 seconds
      });

      const data = await response.json();

      if (!data.api_status) {
        Alert.alert('API Error', JSON.stringify(data));
      } else if (data.api_status === 'success') {
        // Alert.alert('Login success', JSON.stringify(data.userInfo));
        await AsyncStorage.setItem('@access_token', access_token);
        navigation.navigate('Profile', {userInfo: data.userInfo});
      } else {
        Alert.alert(
          'API Error',
          data.api_status_code + ' - ' + data.api_message,
        );
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Network Error', 'Unable to connect to the server.', [
        {text: 'OK', onPress: () => console.log('Network Error')},
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../image/logo-green.png')}
          style={{width: 300, height: 110}}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          label="Username"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          label="Password"
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleLogin}>
          Login
        </Button>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignSelf: 'center',
    paddingBottom: 60,
  },
  inputContainer: {
    paddingBottom: 15,
  },
  buttonContainer: {
    width: '50%',
    alignSelf: 'center',
  },
});
