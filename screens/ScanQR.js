import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

const ScanQR = ({ route }) => {
  const { wasteData, username, setIsPointAdded } = route.params;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const handleBarCodeScanned = async ({ data }) => {
 
    setLoading(true);
    try {
      if (data === 'https://get-qr.com/xwU0e8') {
        Alert.alert('คุณได้สะสมเหรียญแล้ว');

        const response = await axios.post(
          'https://wasteappmanage.sci.kmutnb.ac.th/updateCoins.php',
          {
            username,
            coin: wasteData.coin,
            waste_type: wasteData.waste_type,
            waste_no: wasteData.waste_no,
            image_url: wasteData.image_url,
          }
        );

        if (response.data.success) {
          setIsPointAdded(true);
        //   Alert.alert('คุณได้สะสมเหรียญแล้ว');
          navigation.goBack();
        } else {
          Alert.alert('สะสมเหรียญไม่สำเร็จ','วันนี้คุณสะสมเหรียญชิ้นนี้ครบ 3 ครั้งแล้ว');
          navigation.goBack();
        }
      } else {
        Alert.alert('บาร์โค้ดไม่ถูกต้อง');
      }
    } catch (error) {
      // console.error('เกิดข้อผิดพลาดในการสะสมเหรียญ:', error);
      Alert.alert('เกิดข้อผิดพลาดในการสะสมเหรียญ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
            <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>สแกนคิวอาร์โค้ด</Text>
      </View>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={handleBarCodeScanned}
        captureAudio={false}
      >
        <View style={styles.overlay} />
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle} />
        </View>
      </RNCamera>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>กำลังประมวลผล...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#ffebcd',
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
    marginRight: 150,
    color: '#000',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  rectangleContainer: {
    flex: 550,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingText: {
    color: '#ffffff',
    marginTop: 10,
  },
});

export default ScanQR;