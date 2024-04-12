import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';
import styles from '../styles/Home-style';

const Map = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          'https://wasteappmanage.sci.kmutnb.ac.th/locations.php',
        );
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>จุดทิ้งขยะ :</Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 13.8210501,
          longitude: 100.5140554,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}>
        {locations.map(location => (
          <Marker
            key={location.id.toString()}
            coordinate={{
              latitude: parseFloat(location.latitude), // แปลง String เป็น Double
              longitude: parseFloat(location.longitude), // แปลง String เป็น Double
            }}
            title={location.title}
            description={location.description}
          />
        ))}
      </MapView>
    </View>
  );
};

export default Map;
