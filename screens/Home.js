import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Home-style';
import { useNavigation } from '@react-navigation/native';
import { SIZE } from '../contrants/SIZE';
import { COLORS } from '../contrants/COLORS';
import Map from '../screens/Map';
import KnowledgeList from '../screens/KnowledgeList';

const Home = () => {
  const navigation = useNavigation();

  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* แถบค้นหา */}
      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.searchInput}
          onPress={handleSearchPress}>
          <FontAwesomeIcon
            icon={faSearch}
            size={SIZE.FONT_SIZE_LARGE}
            color={COLORS.SECONDARY_COLOR}
          />
          <Text>วิธีการแยกขยะ, จัดการขยะ...</Text>
        </TouchableOpacity>
      </View>

      <Map />
      <KnowledgeList />

    </ScrollView>
  );
};

export default Home;
