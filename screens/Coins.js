import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import Condition from './Condition';

const Coins = ({ route }) => {
  const { username } = route.params;
  const [coins, setCoins] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await axios.post(
        'https://wasteappmanage.sci.kmutnb.ac.th/userData.php',
        {
          username: username,
        },
      );

      const userData = response.data;

      if (userData && userData.length > 0) {
        const currentUser = userData.find(user => user.username === username);
        if (currentUser) {
          setCoins(currentUser.coins);
        } else {
          console.log('ไม่พบข้อมูลผู้ใช้');
        }
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

  useFocusEffect(() => {
    fetchUserData();
    return () => {};
  });

  const fetchHistoryData = async () => {
    try {
      const response = await axios.post(
        'https://wasteappmanage.sci.kmutnb.ac.th/getHistory.php',
        { username },
      );

      const { success, history } = response.data;
      if (success) {
        setHistory(history);
      } else {
        // console.log('ไม่พบประวัติการสแกนสำหรับผู้ใช้นี้');
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, [username]);

  useFocusEffect(() => {
    fetchHistoryData();
    return () => {};
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.coinsBox}>
          <View style={styles.coins}>
            <Image
              source={require('../image/coin.png')}
              style={{ width: 70, height: 70, marginLeft: 20 }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.text}>คะแนนของฉัน :</Text>
              <Text style={styles.coin}>{coins !== null ? coins : '0'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.boxContainer}>
          <Text style={styles.title}>การสแกนเพื่อรับคะแนนล่าสุด :</Text>
          {history.length > 0 ? (
            <FlatList
              data={history.slice().reverse().slice(0, 10)}
              renderItem={({ item }) => (
                <View style={styles.historyItem}>
                  <Image
                    source={{ uri: item.image_url }}
                    style={styles.historyImage}
                  />
                  <Text style={styles.historyText}>รหัสขยะ: {item.waste_no}</Text>
                  <Text style={styles.historyText}>
                    ประเภท: {item.waste_type}
                  </Text>
                  {item.date_created && (
                    <Text style={styles.historyTextDate}>
                      วันที่: {new Date(item.date_created).toLocaleString()}
                    </Text>
                  )}
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.noHistoryText}>ไม่มีประวัติการสแกน</Text>
          )}
        </View>

        <Condition />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  coinsBox: {
    backgroundColor: '#FFDFA1',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    elevation: 5,
  },
  coins: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 30,
    marginRight: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  coin: {
    fontSize: 30,
    marginRight: 30,
    fontWeight: 'bold',
    padding: 5,
  },
  boxContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    padding: 16,
    color: '#000',
    fontFamily: '',
  },
  historyItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    height: 200,
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  historyImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  historyText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  historyTextDate: {
    fontSize: 11,
    color: '#666',
    paddingTop: 3,
  },
  noHistoryText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Coins;
