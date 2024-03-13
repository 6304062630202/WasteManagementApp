import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';

const Scan = () => {
  const [scannedData, setScannedData] = useState(null);
  const [loading, setLoading] = useState(false); 
  const navigation = useNavigation();

  const handleBarCodeRead = async ({ data }) => {
    setLoading(true);
    try {
      const response = await fetch(`http://192.168.254.76:5000/api/waste/${data}`);
      const result = await response.json();
  
      if (!result) {
        console.log('No data found');
        Alert.alert('ไม่พบข้อมูล', 'ไม่พบข้อมูลสำหรับบาร์โค้ดที่สแกน');
      } else {
        const wasteData = result;
  
        if (wasteData) {
          navigation.navigate('ProductDetail', { wasteData });
        } else {
          console.error('Invalid wasteData structure:', wasteData);
        }
      }
    } catch (error) {
      console.error('Error checking barcode:', error);
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถตรวจสอบบาร์โค้ดได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false); 
    }
  };  
  
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        onBarCodeRead={handleBarCodeRead}
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
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      )}
      <View style={styles.bottomView}>
        <Text style={styles.text}>Scanned Data: {scannedData}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
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
    height: 200,
    width: 200,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
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
  text: {
    color: 'white',
    fontSize: 15,
  },
});

export default Scan;
