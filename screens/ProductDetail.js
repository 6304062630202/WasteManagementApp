import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { SIZE } from '../contrants/SIZE';
import { COLORS } from '../contrants/COLORS';
//import { Image } from 'react-native-svg';
//import database from '@react-native-firebase/database';

const ProductDetail = ({ route }) => {
  const { barcode } = route.params;
  const navigation = useNavigation();

  // นำ barcode ไปค้นหาข้อมูลสินค้าจากฐานข้อมูลหรือแหล่งข้อมูลอื่น ๆ และแสดงรายละเอียดของสินค้า

  // สมมติว่ามีข้อมูลสินค้าเป็นอย่างนี้
  const waste = {
    name: 'ยาดมพิมเสนน้ำ',
    detail: 'ตราหงส์ไทย',
    number: '8859126000911',
    type: 'พลาสติก PP',
    recycle: 'นำไปทิ้งที่ถังขยะสำหรับที่ทิ้งประเภทพลาสติก',
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.tabBack}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={24}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Image
        source={require('../image/8859126000089.jpg')}
        style={{ width: '100%', height: 300, resizeMode: 'contain' }}
      />

      <Text style={styles.title}>{waste.name}</Text>
      <Text style={styles.price}>{waste.detail}</Text>
      <Text style={styles.description}>{waste.number}</Text>

      <Text style={styles.description}>ประเภท : {waste.type}</Text>
      <Image
        source={require('../image/พลาสติก_รีไซเคิล_เบอร์_5.jpg')}
        style={{ width: '100%', height: 100, resizeMode: 'contain' }}
      />

      <Text style={styles.description}>วิธีการรีไซลเคิล : {waste.recycle}</Text>
      <Image
        source={require('../image/รีไซ.png')}
        style={{ width: '100%', height: 300, resizeMode: 'contain' }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    //marginBottom: 10,
    textAlign: 'left',
    paddingHorizontal: 10,
    color: 'green',
  },
  price: {
    fontSize: 18,
    //marginBottom: 10,
    textAlign: 'left',
    paddingHorizontal: 10,
    color: 'blue',
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
    paddingHorizontal: 10,
    color: 'blue',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingTop: 20,
    paddingLeft: 20,
    zIndex: 1,
  },
  icon: {
    marginRight: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default ProductDetail;
