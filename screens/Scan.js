import { View, Text } from 'react-native'
import React, { useState } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const Scan = () => {
  const [data, Setdata] = useState('scan something')
  return (
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
            backgroundColor: 'pink',
            margin: 10,
          }}>{data}</Text>
        </View>
      }
      bottomContent={
        <View>
          <Text>Barcode scanner</Text>
        </View>
      }
    />
  )
}

export default Scan