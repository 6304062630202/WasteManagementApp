import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { SIZE } from '../contrants/SIZE';
import { COLORS } from '../contrants/COLORS';

const Search = () => {
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState('');
  
  const goBack = () => {
    navigation.goBack();
  };

  const handleSearch = () => {
    const searchResult = garbageData.filter(item => item.title.includes(searchInput));
    console.log(searchResult);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>ค้นหา</Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="พิมพ์เพื่อค้นหา..."
          value={searchInput}
          onChangeText={setSearchInput}
        />
        <TouchableOpacity onPress={handleSearch}>
          <FontAwesomeIcon
            icon={faSearch}
            size={SIZE.FONT_SIZE_LARGE}
            color={COLORS.SECONDARY_COLOR}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
}

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
    color: '#000'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 230,
    color: '#000'
  },
  searchContainer: {
    paddingHorizontal: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
  },
  searchIcon: {
    marginLeft: 10,
  },
});


export default Search;
