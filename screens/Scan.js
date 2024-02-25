import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
//import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';

const Scan = () => {
  const [scannedData, setScannedData] = useState(null);
  const navigation = useNavigation();

  const handleBarCodeRead = ({ data }) => {
    setScannedData(data);
    navigation.navigate('ProductDetail', { barcode: data });
  };

  /*return (
    <QRCodeScanner
      onRead={({ data }) => Setdata(data)}
      reactivate={true}
      reactivateTimeout={500}
      showMarker={true}
      topContent={
        <View>
          <Text style={{
            color: 'black',
            padding: 20,
            fontSize: 20,
            backgroundColor: 'blue',
            margin: 10,
          }}>{data}</Text>
        </View>
      }
    />
  )*/
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
  text: {
    color: 'white',
    fontSize: 15,
  },
});
//}

export default Scan;