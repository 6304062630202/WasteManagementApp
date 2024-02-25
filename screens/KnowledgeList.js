import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '../firebase';
import styles from '../styles/Home-style';

const KnowledgeList = () => {
  const [ecoKnowledge, setEcoKnowledge] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEcoKnowledge = async () => {
      try {
        const knowledgeCollectionRef = collection(db, 'Eco_knowledge');
        const querySnapshot = await getDocs(knowledgeCollectionRef);
        const knowledgeData = await Promise.all(querySnapshot.docs.map(async doc => {
          try {
            const imageUrl = await getDownloadURL(ref(storage, `knowledge/${doc.data().image}.jpg`));
            return {
              id: doc.id,
              title: doc.data().title,
              image: { uri: imageUrl }
            };
          } catch (error) {
            console.error(`Error fetching image for document ${doc.id}:`, error);
            return null;
          }
        }));
        setEcoKnowledge(knowledgeData.filter(Boolean));
      } catch (error) {
        console.error('Error fetching eco knowledge:', error);
      }
    };    

    fetchEcoKnowledge();
  }, []);

  const handleItemPress = (item) => {
    navigation.navigate('Eco_knowledge', { item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
      <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={styles.title}>เรื่องน่ารู้เกี่ยวกับขยะ</Text>
      <FlatList
        data={ecoKnowledge}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default KnowledgeList;
