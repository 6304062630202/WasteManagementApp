import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const Notification = ({ route }) => {
  const { username } = route.params;
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, [username]);

  const fetchHistory = async () => {
    try {
      const response = await axios.post(
        'https://wasteappmanage.sci.kmutnb.ac.th/getHistory.php',
        {
          username: username,
        }
      );

      if (response.data && response.data.success) {
        setHistory(response.data.history);
      } else {
        // console.error('ไม่พบประวัติการสแกนสำหรับผู้ใช้นี้');
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูลประวัติ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyText}>
        คุณได้สแกนขยะประเภท "{item.waste_type}"
      </Text>
      <Text style={styles.historyText}>ได้รับ {item.coins} เหรียญ</Text>
      <Text style={styles.historyTextDate}>
        วันที่: {new Date(item.date_created).toLocaleString()}
      </Text>
    </View>
  );

  // เรียกใช้ useFocusEffect เพื่อโหลดข้อมูลเมื่อหน้าจอมีการโฟกัส
  useFocusEffect(
    React.useCallback(() => {
      fetchHistory();
      return () => {};
    }, [username])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>แจ้งเตือน</Text>
      </View>
      {isLoading ? (
        <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
      ) : history.length === 0 ? (
        <Text style={styles.noHistoryText}>ไม่มีประวัติการสแกน</Text>
      ) : (
        <FlatList
          data={history.slice().reverse().slice(0, 15)}
          renderItem={renderHistoryItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 10 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#ffebcd',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    elevation: 5,
  },
  title: {
    fontSize: 26,
    padding: 5,
    color: '#000',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  noHistoryText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 250,
    color: '#666',
  },
  historyItem: {
    padding: 8,
    paddingLeft: 25,
    paddingRight: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  historyText: {
    fontSize: 16,
    color: '#000',
  },
  historyTextDate: {
    fontSize: 12,
    color: '#666',
    paddingTop: 3,
  },
});

export default Notification;
