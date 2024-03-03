import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Button, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ImagePicker from 'react-native-image-crop-picker';

const MyAccount = ({ route }) => {
  const navigation = useNavigation();
  const { username } = route.params;
  const [userData, setUserData] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, 'Users', username);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserData(userData);
          setDisplayName(userData.displayname);
          setPhoneNumber(userData.phoneNumber || '');
          // Set profile image if available
          if (userData.profileImage) {
            setProfileImage(userData.profileImage);
          }
        } else {
          console.log('ไม่พบข้อมูลผู้ใช้');
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error);
      }
    };

    fetchUserData();
  }, [username]);

  const goBack = () => {
    navigation.goBack();
  };

  const saveUserData = async () => {
    try {
      const userDocRef = doc(db, 'Users', username);
      await updateDoc(userDocRef, {
        displayname: displayName,
        phoneNumber: phoneNumber,
        profileImage: profileImage 
      });
      console.log('บันทึกข้อมูลผู้ใช้เรียบร้อยแล้ว');
      Alert.alert('บันทึกข้อมูลผู้ใช้เรียบร้อย')

      // อัปเดตข้อมูลที่แสดงใน TextInput เมื่อมีการบันทึกข้อมูล
      setUserData({
        ...userData,
        displayname: displayName,
        phoneNumber: phoneNumber,
        profileImage: profileImage
      });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูลผู้ใช้:', error);
    }
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 1200,
      cropping: true,
    }).then((image) => {
      if (!image) {
        // ผู้ใช้ยกเลิกการเลือกรูปภาพ
        return;
      }
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setProfileImage(imageUri);
    }).catch((error) => {
      console.error('เกิดข้อผิดพลาดในการเลือกรูปภาพ:', error);
    });
  };  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>บัญชีของฉัน</Text>
      </View>

      {userData && (
        <View style={styles.userDataContainer}>
          <TouchableOpacity onPress={choosePhotoFromLibrary}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Image source={require('../image/user.png')} style={styles.profileImage} />
            )}
            <Text style={{ textAlign: 'center' }}>เปลี่ยนรูปโปรไฟล์</Text>
          </TouchableOpacity>
          <View style={styles.userData}>
            <Text style={styles.label}>ชื่อผู้ใช้ :</Text>
            <TextInput
              style={styles.input}
              value={displayName}
              onChangeText={setDisplayName}
            />
            <Text style={styles.label}>อีเมล :</Text>
            <TextInput style={styles.disabledInput} value={userData.email} editable={false} />
            <Text style={styles.label}>ชื่อภาษาอังกฤษ :</Text>
            <TextInput style={styles.disabledInput} value={userData.firstname_en} editable={false} />
            <Text style={styles.label}>นามสกุลภาษาอังกฤษ :</Text>
            <TextInput style={styles.disabledInput} value={userData.lastname_en} editable={false} />
            <Text style={styles.label}>ประเภทบัญชีผู้ใช้งาน :</Text>
            <TextInput style={styles.disabledInput} value={userData.account_type} editable={false} />
            <Text style={styles.label}>เลขประจำตัวประชาชน :</Text>
            <TextInput style={styles.disabledInput} value={userData.pid} editable={false} />
            <Text style={styles.label}>เบอร์โทร :</Text>
            <TextInput
              style={styles.input}
              placeholder="เบอร์โทร"
              onChangeText={setPhoneNumber}
              value={phoneNumber}
            />
            <TouchableOpacity style={styles.button} onPress={saveUserData}>
              <Text style={styles.buttonText}>บันทึก</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    shadowColor: '#000',
    elevation: 5,
  },
  backButton: {
    marginRight: 'auto',
  },
  icon: {
    marginRight: 10,
    color: '#000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 170,
    color: '#000',
  },
  userDataContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userData: {
    marginLeft: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  input: {
    height: 50,
    width: 300,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  disabledInput: {
    height: 50,
    width: 300,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#F86F03',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 100,
    height: 50,
    width: 300,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MyAccount;
