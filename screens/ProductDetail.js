import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ProductDetail = ({ route }) => {
  const navigation = useNavigation();
  const { wasteData } = route.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.254.76:5000/api/waste/${wasteData}`);
        const result = await response.json();
        setWasteData(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);  

  const goBack = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <FontAwesomeIcon icon={faArrowLeft} size={24} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: wasteData.image_url }}
          style={styles.productImage}
        />

        <View style={styles.blockText}>
          {wasteData ? (
            <>
              <Text style={styles.title}>{wasteData.waste_name}</Text>
              <Text style={styles.detail}>{wasteData.detail}</Text>
              <Text style={styles.detail}>{wasteData.waste_no}</Text>
              <View style={styles.typeContainer}>
                <Text style={[styles.description, {marginRight: 80}]}>
                  ประเภท : {wasteData.waste_type}
                </Text>
              </View>
              <View style={styles.dataContainer}>
                <Text style={styles.recycle}>{wasteData.recycle}</Text>
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
    </ScrollView>
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
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  blockText: {
    borderRadius: 30,
    backgroundColor: '#ffebcd',
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
  },
  description: {
    fontSize: 16,
    paddingLeft: 30,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  typeContainer: {
    flexDirection: 'row',
  },
  dataContainer: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    borderColor: '#ccc',
    borderRadius: 50,
    marginBottom: 50,
    marginTop: 50,
    width: '90%',
    paddingTop: 20,
    paddingBottom: 50,
    backgroundColor: '#fff',
  },
  recycle: {
    paddingTop: 20,
    padding: 10,
    fontSize: 16,
  },
  greenBlock: {
    position: 'absolute',
    top: 150,
    left: 100,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingText: {
    color: '#ffffff',
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
});

export default ProductDetail;
