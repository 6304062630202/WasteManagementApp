import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from '../styles/Home-style';

const Map = () => {
  return (
    <View style={styles.map_img}>
      <Text style={styles.title}>จุดทิ้งขยะ</Text>
      <Image
        source={require('../image/kmutnb_map.png')}
        style={{width: 300, height: 200}}
      />
    </View>
  );
};

export default Map;
