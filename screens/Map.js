import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import rubbish_bins from '../data_map.json';
import styles from '../styles/Home-style';

const Map = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>จุดทิ้งขยะ</Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 13.8210501, //อาคาร 40 ปี มจพ.
          longitude: 100.5140554,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}>

        {rubbish_bins.map(rubbish_bin => (
          <Marker
            key={rubbish_bin.id.toString()}
            coordinate={{latitude: rubbish_bin.latitude, longitude: rubbish_bin.longitude}}
            title={rubbish_bin.title}
            description={rubbish_bin.description}
          />
        ))}
        
      </MapView>
    </View>
  );
};

export default Map;
