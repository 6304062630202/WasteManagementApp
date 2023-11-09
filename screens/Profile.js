import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Profile = ({ route }) => {
  const userInfo = route.params.userInfo;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username:</Text>
      <Text style={styles.value}>{userInfo.username}</Text>
      <Text style={styles.label}>Displayname:</Text>
      <Text style={styles.value}>{userInfo.displayname}</Text>
      <Text style={styles.label}>Firstname EN:</Text>
      <Text style={styles.value}>{userInfo.firstname_en}</Text>
      <Text style={styles.label}>Lastname EN:</Text>
      <Text style={styles.value}>{userInfo.lastname_en}</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  value: {
    fontSize: 20,
    marginBottom: 10,
  },
});
