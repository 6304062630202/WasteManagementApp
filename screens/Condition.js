import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Condition = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>เงื่อนไข :</Text>
      <View style={styles.itemContainer}>
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>
          1. สแกนบาร์โค้ดของสินค้าประเภทเครื่องดื่มเช่นน้ำดื่ม, น้ำอัดลม, ชา, นม ฯลฯ
          เพื่อบอกวิธีจัดการกับขยะชิ้นนั้น
        </Text>
        <Text style={styles.text}>
          2. คุณสามารถสะสมคะแนนได้โดยการสแกน QR code หน้าถุงขยะ Big bag
          ที่ตั้งอยู่บริเวณโรงอาหารตึก 40 และหอพักนักศึกษา
        </Text>
        <Text style={styles.Subtext}>
          - ขยะประเภทขวดน้ำพลาสติกสามารถสแกน QR code และทิ้งในถุงขยะ Big bag
          ได้เลย
        </Text>
        <Text style={styles.Subtext}>
          - ขยะประเภทกระป๋องอลูมิเนียม, กล่องเครื่องดื่ม สามารถสแกน QR code
          หน้าถุงขยะ Big bag และนำไปทิ้งที่ถังขยะบริเวณใกล้ๆหรือสามารถดูบริเวณทิ้งขยะได้ที่แผนที่ในหน้าหลัก
        </Text>
        <Text style={styles.text}>
          3. คุณสามารถค้นหาชื่อสินค้าเพื่อดูวิธีจัดการกับขยะชิ้นนั้นได้
        </Text>
        <Text style={styles.text}>
          4.
          คะแนนที่สะสมจะสามารถนำมาแลกสิทธิประโยชน์ต่างๆภายในมหาวิทยาลัยได้ในอนาคต
        </Text>
        <Text style={styles.textRed}>
         * ขยะแต่ละชิ้นสามารถสแกนเพื่อรับคะแนนได้ 5 ครั้ง/วัน
        </Text>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
  },
  title: {
    paddingBottom: 10,
    marginLeft: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'flex-start',
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: 340,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonContainer: {
    // padding: 10,
    margin: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  Subtext: {
    fontSize: 16,
    marginBottom: 2,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  textRed: {
    fontSize: 16,
    marginBottom: 2,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default Condition;
