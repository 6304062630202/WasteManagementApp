import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Search = () => {
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  const handleSearch = async text => {
    try {
      setLoading(true);
      const response = await axios.get('https://wasteappmanage.sci.kmutnb.ac.th/wastes.php');
      const result = response.data;
      
      // กรองข้อมูลที่มีคำใกล้เคียงหรือเหมือนกับคำค้นหา
      const filteredResults = result.filter(item => {
        return (
          item.waste_name.includes(searchInput) ||
          item.detail.includes(searchInput)
        );
      });

      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error searching:', error);
      Alert.alert('Error', 'เกิดข้อผิดพลาดในการค้นหา');
    } finally {
      setLoading(false);
    }
  };  

  useEffect(() => {
    if (searchInput !== '') {
      handleSearch(searchInput);
    } else {
      setSearchResults([]);
    }
  }, [searchInput]);
  
  const navigateToProduct = wasteData => {
    navigation.navigate('ProductSearch', { wasteData: wasteData });
  };

  // ฟังก์ชันสำหรับเน้นข้อความที่ตรงกับคำค้นหาด้วยสีแดง
  const highlightText = (text, query) => {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, index) =>
      regex.test(part) ? <Text key={index} style={styles.highlight}>{part}</Text> : part
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>ค้นหา</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="พิมพ์ชื่อขยะประเภทเครื่องดื่ม..."
            value={searchInput}
            onChangeText={text => setSearchInput(text)}
          />

          <TouchableOpacity onPress={() => handleSearch(searchInput)}>
            <FontAwesomeIcon
              icon={faSearch}
              size={24}
              color="gray"
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Display Search Results */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : searchInput === '' ? (
        <View style={styles.imageContainer}>
          <Image source={require('../image/search.png')} style={styles.image} />
        </View>
      ) : searchResults.length === 0 ? (
        <View style={styles.noResultContainer}>
          <Text style={styles.noResultText}>ไม่พบข้อมูล</Text>
        </View>
      ) : (
        <ScrollView style={styles.resultsContainer}>
          {searchResults.map((result, idx) => (
            <TouchableOpacity key={idx} onPress={() => navigateToProduct(result)}>
              <View style={styles.resultItem}>
                <Text style={styles.boldText}>
                  {highlightText(result.waste_name, searchInput)}
                </Text>
                <Text>{highlightText(result.detail, searchInput)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingLeft: 20,
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 250,
    color: '#000',
  },
  searchContainer: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#ffebcd',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  imageContainer: {
    flex: 1,
    marginTop: 130,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 230,
    opacity: 0.5,
  },
  noResultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultText: {
    fontSize: 16,
  },
  resultsContainer: {
    flex: 1,
  },
  resultItem: {
    padding: 10,
    paddingLeft: 40,
    borderBottomWidth: 1.2,
    borderBottomColor: '#ccc',
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  normalText: {
    fontSize: 14,
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
  highlight: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default Search;
