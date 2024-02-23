import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Login-style';
import {
  doc,
  getDocs,
  collection,
  addDoc,
  query,
  where,
} from 'firebase/firestore';
import {db} from '../firebase';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(faEyeSlash);
  const [error, setError] = useState(false);

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
        setError(true); // ข้อมูลไม่ถูกต้อง
        Alert.alert('เกิดข้อผิดพลาด', 'ไม่พบ Username/Password');
      } else if (data.api_status === 'success') {
        setError(false); // ข้อมูลถูกต้อง
        await AsyncStorage.setItem('@access_token', access_token);

        // ตรวจสอบว่ามีข้อมูลผู้ใช้นี้ใน Firestore หรือไม่
        const userQuery = query(
          collection(db, 'Users'),
          where('username', '==', data.userInfo.username),
        );
        const userQuerySnapshot = await getDocs(userQuery);

        if (userQuerySnapshot.empty) {
          // ถ้ายังไม่มีข้อมูลผู้ใช้นี้ใน Firestore ให้เพิ่มข้อมูล
          addDoc(collection(db, 'Users'), {
            username: data.userInfo.username,
            email: data.userInfo.email,
            displayname: data.userInfo.displayname,
            firstname_en: data.userInfo.firstname_en,
            lastname_en: data.userInfo.lastname_en,
          })
            .then(() => {
              console.log('User data submitted to Firestore');
            })
            .catch(error => {
              console.error('Error adding user data: ', error);
            });
        }

        navigation.navigate('NavBar', {username: data.userInfo.username});
      } else {
        setError(true);
        Alert.alert('เกิดข้อผิดพลาด', 'ไม่พบ Username/Password');
      }
    } catch (error) {
      setError(true); // เกิดข้อผิดพลาด
      Alert.alert('เกิดข้อผิดพลาด', 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setEyeIcon(showPassword ? faEyeSlash : faEye);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../image/icit_account_logo.png')}
          style={{width: 250, height: 100}}
        />
      </View>
      <Text style={styles.tiltle}>
        ชื่อผู้ใช้งาน & รหัสผ่านของ ICIT Account
      </Text>

      {/* form */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          placeholder="ชื่อผู้ใช้"
          value={username}
          onChangeText={text => {
            setUsername(text);
            setError(false);
          }}
        />
        <View style={[styles.passwordInput, error && styles.errorInput]}>
          <TextInput
            style={[
              {flex: 1, backgroundColor: 'white'},
              error && styles.errorInput,
            ]}
            placeholder="รหัสผ่าน"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={text => {
              setPassword(text);
              setError(false);
            }}
          />
          <TouchableWithoutFeedback onPress={toggleShowPassword}>
            <View style={styles.iconContainer}>
              <FontAwesomeIcon icon={eyeIcon} size={20} color="black" />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      {/* ลืมรหัสผ่าน */}
      <View style={styles.textContainer}>
        <TouchableWithoutFeedback
          onPress={() =>
            Linking.openURL('https://account.kmutnb.ac.th/web/recovery/index')
          }>
          <Text style={styles.label}>• ลืมรหัสผ่าน</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            Linking.openURL(
              'https://account.kmutnb.ac.th/web/personnel/activation',
            )
          }>
          <Text style={styles.label}>• เปิดการใช้งานบัญชี</Text>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleLogin}
          style={{backgroundColor: '#F86F03'}}>
          เข้าสู่ระบบ
        </Button>
      </View>
    </View>
  );
};

export default Login;
