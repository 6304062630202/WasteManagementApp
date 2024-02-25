import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Eco_knowledge = ({ route }) => {
  const navigation = useNavigation();
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const itemId = route.params.item.id;
        const itemDocRef = doc(db, 'Eco_knowledge', itemId);
        const itemDocSnapshot = await getDoc(itemDocRef);
        if (itemDocSnapshot.exists()) {
          const data = itemDocSnapshot.data();
          const imageUrl = await getDownloadURL(ref(storage, `knowledge/${data.image}.jpg`));
          setItemData({ ...data, imageUrl });
        } else {
          console.error('Document does not exist');
        }
      } catch (error) {
        console.error('Error fetching item data:', error);
      }
    };
  
    fetchItemData();
  }, [route.params.item.id]);  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>{itemData?.title}</Text>
      </View>
      
      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: itemData?.imageUrl }} style={[styles.image, { resizeMode: 'contain' }]} />
        <Text style={styles.title_data}>{itemData?.title}</Text>
        <View style={styles.dataContainer}>
          {/* ใช้ map เพื่อแสดงข้อมูลใน array */}
          {itemData?.informations.map((data, index) => (
            <View key={index}>
              <Text style={styles.itemTitle}>
                {data.data !== null ? (
                  <Text style={styles.boldText}>{data.data}</Text>
                ) : (
                  <Text style={styles.descriptionText}>{data.description}</Text>
                )}
              </Text>
              {data.data !== null && (
                <Text style={[styles.itemTitle, { paddingTop: 16 }]}>{data.description}</Text>
              )}
            </View>
          ))}
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
    backgroundColor: '#fff',
    shadowColor: '#000',
    elevation: 5,
  },
  backButton: {
    marginRight: 'auto',
  },
  backIcon: {
    marginRight: 10,
    color: '#000'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 25,
    color: '#000'
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 20,
  },
  dataContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    paddingTop: 20,
    paddingBottom: 30,
  },
  title_data: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    margin: 16,
  },
  itemTitle: {
    fontSize: 16,
    color: '#000',
    paddingTop: 10,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  descriptionText: {
    color: '#000',
  },
});

export default Eco_knowledge;
