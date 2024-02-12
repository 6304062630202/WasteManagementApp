import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Notification = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>แจ้งเตือน</Text>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    elevation: 5,
  },
  text: {
    fontSize: 26,
    padding: 6,
    color: '#000',
  },
});
