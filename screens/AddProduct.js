import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddProduct = ({ route }) => {
  const navigation = useNavigation();
  const { barcode } = route.params;

  const [wasteName, setWasteName] = useState('');
  const [detail, setDetail] = useState('');
  const [type, setType] = useState('');
  const [bin, setBin] = useState('');
  const [recycle, setRecycle] = useState('');
  const [symbol, setSymbol] = useState('');

  const goBack = () => {
    navigation.goBack();
  };

  const handleAddProduct = async () => {
    try {
      const wasteRef = collection(db, 'WasteApp');
      await addDoc(wasteRef, { 
        waste_name: wasteName || 'ไม่มี',
        detail: detail || 'ไม่มี',
        waste_no: barcode,
        type: type || 'ไม่มี',
        bin: 'free',
        recycle: 'ไม่มีวิธีจัดการ',
        symbol: 'free',
        image: 'free',
      });
      console.log('เพิ่มสินค้าเรียบร้อยแล้ว');
      Alert.alert('เพิ่มสินค้าเรียบร้อยแล้ว', '', [
        { text: 'ตกลง' }
      ]);
    } catch (error) {
      console.error('Error adding product to Firestore:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>ชื่อสินค้า:</Text>
        <TextInput
          style={styles.input}
          value={wasteName}
          onChangeText={text => setWasteName(text)}
          placeholder="กรอกชื่อสินค้า"
        />
        <Text style={styles.label}>ยี่ห้อสินค้า:</Text>
        <TextInput
          style={styles.input}
          value={detail}
          onChangeText={text => setDetail(text)}
          placeholder="กรอกยี่ห้อสินค้า"
        />
        <Text style={styles.label}>ประเภท:</Text>
        <TextInput
          style={styles.input}
          value={type}
          onChangeText={text => setType(text)}
          placeholder="กรอกประเภท เช่น พลาสติก"
        />
        <Text style={styles.label}>เลขบาร์โค้ด:</Text>
        <TextInput style={styles.disabledInput} value={barcode} editable={false} />
        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>เพิ่มข้อมูลสินค้า</Text>
        </TouchableOpacity>
      </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  disabledInput: {
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  addButton: {
    backgroundColor: '#F86F03',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddProduct;
