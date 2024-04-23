import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';

const Scan = ({ route }) => {
  const { username } = route.params;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleBarCodeRead = async ({ data }) => {
    setLoading(true);

    try {
      const response = await fetch(
        'https://wasteappmanage.sci.kmutnb.ac.th/wastes.php'
      );

      const result = await response.json();

      const foundWaste = result.find((waste) => waste.waste_no === data);

      if (foundWaste) {
        navigation.navigate('ProductDetail', {
          wasteData: foundWaste,
          username: username,
        });
      } else {
        Alert.alert(
          'ไม่พบข้อมูล',
          'ไม่พบข้อมูลสำหรับบาร์โค้ดที่สแกน',
          [
            {
              text: 'เพิ่มข้อมูล',
              onPress: () =>
                Linking.openURL(
                  'https://wasteappmanage.sci.kmutnb.ac.th/webform.php?fbclid=IwAR3jZopLm-85Qa7pYd0IepsKTyHuIVd8NB15CtcWDlAvYQfCT4D_HzCTBT8_aem_AZuJQH0iYE4VosRiOl0mOwMPIlQWfVR09jAQU8t3Is4bhbLHXb4hZxs4xoe09B61y3RxHx303v8b_So6c0t_V5KY'
                ),
            },
            {
              text: 'ยกเลิก',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error checking barcode:', error);
      Alert.alert(
        'เกิดข้อผิดพลาด',
        'ไม่สามารถตรวจสอบบาร์โค้ดได้ กรุณาลองใหม่อีกครั้ง'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        onBarCodeRead={handleBarCodeRead}
        captureAudio={false}>
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

export default Scan;
