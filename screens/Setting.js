import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faHistory,
  faPhone,
  faSignOutAlt,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import {collection, query, where, getDocs} from 'firebase/firestore';
import {db} from '../firebase';
import {useFocusEffect} from '@react-navigation/native';

const Setting = ({route, navigation}) => {
  const {username} = route.params;
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const usersCollectionRef = collection(db, 'Users');
      const userQuery = query(
        usersCollectionRef,
        where('username', '==', username),
      );
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        // ถ้าพบข้อมูลผู้ใช้
        const userData = querySnapshot.docs[0].data();
        setUserData(userData);
      } else {
        console.log('ไม่พบข้อมูลผู้ใช้');
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [username]);

  // เรียกใช้ useFocusEffect เพื่อโหลดข้อมูลเมื่อหน้าจอมีการโฟกัส
  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
      return () => {};
    }, [username])
  );

  const handleLogout = () => {
    // ให้กลับไปที่หน้า Login เมื่อคลิกที่ออกจากระบบ
    navigation.navigate('Login');
  };

  const handleContactUs = () => {
    Linking.openURL('https://green.kmutnb.ac.th');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.profileSection, styles.shadow]}>
        <Image
          source={userData?.profileImage ? {uri: userData.profileImage} : require('../image/user.png')}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.displayName}>{userData?.displayname}</Text>
          <Text style={styles.email}>{userData?.email}</Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        <MenuItem
          icon={faUser}
          label="บัญชีของฉัน"
          onPress={() => navigation.navigate('MyAccount', { username: username })}
        />
        <MenuItem
          icon={faHistory}
          label="ประวัติการสแกน"
          onPress={() => navigation.navigate('History', { username: username })}
        />
        <MenuItem
          icon={faPhone}
          label="ติดต่อเรา"
          onPress={handleContactUs}
        />
        <MenuItem
          icon={faSignOutAlt}
          label="ออกจากระบบ"
          onPress={handleLogout}
        />
      </View>
    </View>
  );
};

const MenuItem = ({icon, label, onPress}) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <FontAwesomeIcon icon={icon} style={styles.menuIcon} />
      <Text style={styles.menuLabel}>{label}</Text>
      {label !== 'ออกจากระบบ' && (
        <FontAwesomeIcon icon={faAngleRight} style={styles.arrowIcon} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 150,
  },
  shadow: {
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  profileInfo: {
    marginLeft: 20,
  },
  displayName: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: '#000'
  },
  email: {
    fontSize: 14,
    color: '#000',
  },
  menuSection: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuIcon: {
    marginRight: 15,
    fontSize: 20,
    color: '#333',
  },
  menuLabel: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
  arrowIcon: {
    fontSize: 18,
    color: '#666',
  },
});

export default Setting;
