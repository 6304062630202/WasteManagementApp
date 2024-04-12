import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

const History = ({route}) => {
  const navigation = useNavigation();
  const {username} = route.params;
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
        },
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

  const goBack = () => {
    navigation.goBack();
  };

  const renderHistoryItem = ({item}) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyText}>
        คุณได้สแกนขยะประเภท "{item.waste_type}"
      </Text>
      <Text style={styles.historyText}>ได้รับ {item.coins} คะแนน</Text>
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
    }, [username]),
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>ประวัติการสแกน</Text>
      </View>
      {isLoading ? (
        <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
      ) : history.length === 0 ? (
        <Text style={styles.noHistoryText}>ไม่มีประวัติการสแกน</Text>
      ) : (
        <FlatList
          data={history.slice().reverse()}
          renderItem={renderHistoryItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#ffebcd',
    shadowColor: '#000',
    elevation: 5,
  },
  backButton: {
    marginRight: 'auto',
  },
  icon: {
    marginRight: 10,
    color: '#000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 140,
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

export default History;
