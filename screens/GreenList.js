import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

const GreenList = () => {

  const handlePressWebsite = () => {
    Linking.openURL('https://green.kmutnb.ac.th/');
  };

  const handlePressFanpage = () => {
    Linking.openURL('https://web.facebook.com/GreenKMUTNB/?_rdc=1&_rdr');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Green Kmutnb :</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePressWebsite} style={styles.itemContainer}>
          <Image
            source={require('../image/logo-green.png')}
            style={styles.itemImage}
            resizeMode="contain"
          />
          <Text style={styles.itemTitle}>Website GreenKmutnb</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressFanpage} style={styles.itemContainer}>
          <Image
            source={require('../image/logo-fanpage.jpg')}
            style={styles.itemImage}
            resizeMode="contain"
          />
          <Text style={styles.itemTitle}>Fanpage GreenKmutnb</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 120,
  },
  title: {
    paddingBottom: 10,
    marginTop: 10,
    paddingLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'flex-start',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: 160,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default GreenList;
