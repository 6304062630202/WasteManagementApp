import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const History = () => {
  const navigation = useNavigation();
  const [history, setHistory] = useState([
    { id: 1, item: 'ขวดพลาสติก', points: 1, date: new Date() },
    { id: 2, item: 'ขวดพลาสติก', points: 2, date: new Date() },
    // เพิ่มประวัติเพิ่มเติมตามต้องการ
  ]);

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyText}>
        คุณได้สแกนขยะประเภท "{item.item}"
      </Text>
      <Text style={styles.historyText}>
        ได้รับ เหรียญ {item.points} พอยต์
      </Text>
      <Text style={styles.historyTextDate}>
        วันที่: {item.date.toLocaleDateString()} เวลา: {item.date.toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>ประวัติการสแกน</Text>
      </View>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
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
  historyItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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