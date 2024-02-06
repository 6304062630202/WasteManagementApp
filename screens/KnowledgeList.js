import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../styles/Home-style';

const KnowledgeList = () => {
  // สมมติข้อมูล
  const garbageData = [
    { id: 1, title: 'ประโยชน์ของการแยกขยะ', image: require('../image/img1.jpg') },
    { id: 2, title: 'วิธีการทำลายขยะที่เป็นพิษ', image: require('../image/img1.jpg') },
    { id: 3, title: 'วิธีการแยกขยะ', image: require('../image/img1.jpg') },
    { id: 4, title: 'การรีไซเคิล', image: require('../image/img1.jpg') },
  ];

  const handleItemPress = (item) => {
    console.log(item);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={styles.title}>เรื่องน่ารู้เกี่ยวกับขยะ</Text>
      <FlatList
        data={garbageData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default KnowledgeList;
