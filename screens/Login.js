import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Alert, TouchableWithoutFeedback, Linking} from 'react-native';
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
          'เกิดข้อผิดพลาด',
          // data.api_status_code + ' - ' + data.api_message,
          'กรอก Username/Password ผิด'
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
          source={require('../image/icit_account_logo.png')}
          style={{width: 300, height: 120}}
        />
      </View>
      <Text style={styles.tiltle}>ชื่อผู้ใช้งาน & รหัสผ่าน ชอง ICIT Account</Text>

      {/* form */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="ชื่อผู้ใช้"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="รหัสผ่าน"
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      
      {/* ลืมรหัสผ่าน */}
      <View style={styles.textContainer}>
        <TouchableWithoutFeedback onPress={() => Linking.openURL('https://account.kmutnb.ac.th/web/recovery/index')}>
          <Text style={styles.label}>ลืมรหัสผ่าน</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => Linking.openURL('https://account.kmutnb.ac.th/web/personnel/activation')}>
          <Text style={styles.label}>เปิดการใช้งานบัญชี</Text>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleLogin}>
          เข้าสู่ระบบ
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
    paddingBottom: 10,
  },
  tiltle: {
    fontSize: 16,
    color: 'green',
    padding: 10,
    textDecorationLine: 'underline',
  },
  inputContainer: {
    paddingBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    paddingVertical: 0,
    backgroundColor: 'white',
  },
  buttonContainer: {
    width: '100%',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  textContainer: {
    paddingBottom: 20,
  },
  label: {
    fontSize: 16,
    padding: 3,
    color: 'black',
    fontWeight: 'bold',
  },
});
