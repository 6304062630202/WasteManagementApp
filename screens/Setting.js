import { View, Text } from 'react-native'
import React from 'react'

const Setting = () => {
  return (
    <View>
      <Text>Setting</Text>
    </View>
  )
}

export default Setting

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const Profile = ({ route }) => {
//   const userInfo = route.params.userInfo;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Username: <Text style={styles.value}>{userInfo.username}</Text></Text>
//       <Text style={styles.label}>Displayname: <Text style={styles.value}>{userInfo.displayname}</Text></Text>
//       <Text style={styles.label}>Firstname EN: <Text style={styles.value}>{userInfo.firstname_en}</Text></Text>
//       <Text style={styles.label}>Lastname EN: <Text style={styles.value}>{userInfo.lastname_en}</Text></Text>
//       <Text style={styles.label}>pid: <Text style={styles.value}>{userInfo.pid}</Text></Text>
//       <Text style={styles.label}>Email: <Text style={styles.value}>{userInfo.email}</Text></Text>
//       <Text style={styles.label}>Birthdate: <Text style={styles.value}>{userInfo.birthdate}</Text></Text>
//       <Text style={styles.label}>Account type: <Text style={styles.value}>{userInfo.account_type}</Text></Text>
//     </View>
//   );
// };

// export default Profile;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     // paddingTop: 50,
//     justifyContent: 'center',
//   },
//   label: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     color: 'black',
//     padding: 8,
//   },
//   value: {
//     fontSize: 18,
//     marginBottom: 15,
//     color: 'gray',
//   },
// });
