import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const Coins = () => {
  return (
    <View style={styles.container}>
      <View style={styles.coinsBox}>
        <Image
          source={require('../image/coin.png')}
          style={{width: 90, height: 90, marginLeft: 20}}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>My coin :</Text>
          <Text style={styles.text}>150</Text>
        </View>
      </View>
    </View>
  )
}

export default Coins

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFDFA1',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    elevation: 5,
  },
  coinsBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 35,
    marginRight: 20,
    fontWeight: 'bold',
    padding: 5,
  },
});
