import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ProductDetail = ({ route }) => {
  const navigation = useNavigation();
  const { wasteData, username } = route.params;
  const [isPointAdded, setIsPointAdded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  const addCoins = () => {
    if (isPointAdded) {
      Alert.alert('คุณได้สะสมเหรียญแล้ว');
    } else {
      navigation.navigate('ScanQR', {
        wasteData,
        username,
        setIsPointAdded,
      });
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // อาจจะทำการโหลดข้อมูลเพิ่มเติมที่ต้องการอยู่ในนี้
      setRefreshing(false);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการโหลดข้อมูลเพิ่มเติม:', error);
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Image
          source={
            wasteData.image_url
              ? { uri: wasteData.image_url }
              : require('../image/product.jpg')
          }
          style={styles.productImage}
        />

        <View style={styles.blockTextContainer}>
          <View style={styles.blockText}>
            {wasteData ? (
              <>
                <Text style={styles.title}>{wasteData.waste_name}</Text>
                <Text style={styles.detail}>{wasteData.detail}</Text>
                <Text style={styles.detail}>{wasteData.waste_no}</Text>
                <Text style={styles.description}>
                  ประเภท : {wasteData.waste_type}
                </Text>
                <Text style={[styles.description, { paddingBottom: 10 }]}>
                  เหรียญที่จะได้รับ : {wasteData.coin}
                </Text>

                <View style={styles.dataContainer}>
                  <Text style={styles.recycle}>{wasteData.recycle}</Text>
                  <Image
                    source={
                      wasteData.bin_url && wasteData.bin_url !== 'null'
                        ? { uri: wasteData.bin_url }
                        : require('../image/product.jpg')
                    }
                    style={styles.BinImage}
                  />
                </View>
                <View style={styles.greenBlock}>
                  <Text style={styles.text}>วิธีการจัดการ</Text>
                </View>
              </>
            ) : (
              <Text style={styles.errorText}>No data found</Text>
            )}
          </View>
        </View>

        <View style={styles.bottomButtons}>
          <TouchableOpacity
            onPress={addCoins}
            style={[
              styles.button,
              styles.addCoinButton,
              isPointAdded
                ? { backgroundColor: '#C6C6D1' }
                : { backgroundColor: '#F08080' },
            ]}
            disabled={isPointAdded}>
            <Text style={styles.buttonText}>
              {isPointAdded ? 'สะสมเหรียญแล้ว' : 'สแกนคิวอาร์โค้ด'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  blockTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    borderRadius: 30,
    backgroundColor: '#ffebcd',
    width: 330,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 30,
    marginTop: 20,
    color: '#000',
  },
  detail: {
    fontSize: 16,
    paddingLeft: 30,
    paddingRight: 30,
  },
  description: {
    fontSize: 16,
    paddingLeft: 30,
    fontWeight: 'bold',
  },
  dataContainer: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    borderColor: '#ccc',
    borderRadius: 50,
    marginTop: 50,
    marginBottom: 50,
    width: '90%',
    paddingTop: 20,
    paddingBottom: 50,
    backgroundColor: '#fff',
  },
  recycle: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    paddingBottom: 20,
  },
  BinImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
  },
  greenBlock: {
    position: 'absolute',
    top: 170,
    left: 80,
    backgroundColor: '#F86F03',
    width: 170,
    height: 50,
    borderColor: '#ccc',
    borderRadius: 50,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 35,
    paddingTop: 14,
    color: '#fff',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
  bottomButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    paddingBottom: 50,
  },
  button: {
    borderRadius: 20,
    height: 60,
    width: 330,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCoinButton: {
    backgroundColor: '#F08080',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
});

export default ProductDetail;