import React, { useState } from 'react';
import { View, Text, Image, Alert, TouchableWithoutFeedback, Linking } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Login-style';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(faEyeSlash);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
        setLoading(true);
        const access_token = 'C6a8DV5dQo_UkF3-uucgxN5faKh4DQZF';
        const api_url = 'https://api.account.kmutnb.ac.th/api/account-api/user-authen';
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
            timeout: 5000,
        });

        const data = await response.json();

        if (!data.api_status) {
            setError(true);
            setLoading(false);
            Alert.alert('เกิดข้อผิดพลาด', 'ไม่พบ Username/Password');
        } else if (data.api_status === 'success') {
            setError(false);

            // ส่งข้อมูลผู้ใช้ data ไปยังสคริปต์ PHP เพื่อบันทึกลงใน MySQL database
            const php_url = 'https://wasteappmanage.sci.kmutnb.ac.th/login.php';
            const php_response = await fetch(php_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const php_data = await php_response.json();

            // console.log(php_data.message);
            setLoading(false);
            navigation.navigate('NavBar', { username: data.userInfo.username });
        } else {
            setError(true);
            setLoading(false);
            Alert.alert('เกิดข้อผิดพลาด', 'ไม่พบ Username/Password');
        }
    } catch (error) {
        setError(true);
        setLoading(false);
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
          style={{ width: 250, height: 100 }}
        />
      </View>
      <Text style={styles.tiltle}>
        ชื่อผู้ใช้งาน & รหัสผ่านของ ICIT Account
      </Text>

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
              { flex: 1, backgroundColor: 'white' },
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
        {loading ? (
          <Button
            mode="contained"
            style={{ backgroundColor: '#F86F03' }}
            disabled={true}
            loading={true}
          />
        ) : (
          <Button
            mode="contained"
            onPress={handleLogin}
            style={{ backgroundColor: '#F86F03' }}>
            เข้าสู่ระบบ
          </Button>
        )}
      </View>
    </View>
  );
};

export default Login;