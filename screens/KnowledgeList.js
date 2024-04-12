import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/Home-style';
import { useNavigation } from '@react-navigation/native';

const KnowledgeList = () => {
  const navigation = useNavigation();
  const [ecoKnowledge, setEcoKnowledge] = useState([]);

  useEffect(() => {
    const fetchEcoKnowledge = async () => {
      try {
        const response = await fetch('https://wasteappmanage.sci.kmutnb.ac.th/knowledge.php');
        const knowledgeData = await response.json();
        setEcoKnowledge(knowledgeData);
      } catch (error) {
        console.error('Error fetching eco knowledge:', error);
      }
    };

    fetchEcoKnowledge();
  }, []);

  const handleItemPress = (item) => {
    // ส่งข้อมูลไปยังหน้า Eco_knowledge
    navigation.navigate('Eco_knowledge', { item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
      <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={styles.title}>เรื่องน่ารู้เกี่ยวกับขยะ :</Text>
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
