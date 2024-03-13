import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faSearch} from '@fortawesome/free-solid-svg-icons';
import {db} from '../firebase';
import {collection, getDocs} from 'firebase/firestore';

const Search = () => {
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // เพิ่ม state เก็บข้อมูลที่เลือก

  const goBack = () => {
    navigation.goBack();
  };

  const handleSearch = async text => {
    try {
      const usersCollection = collection(db, 'WasteApp');
      const querySnapshot = await getDocs(usersCollection);
      const results = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        if (data.waste_name.includes(text) || data.type.includes(text)) {
          results.push(data);
        }
      });

      setSearchResults(results);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const navigateToProduct = item => {
    // เพิ่มพารามิเตอร์ item
    setSelectedItem(item); // เก็บข้อมูลที่เลือก
    navigation.navigate('ProductDetail', {wasteData: item}); // นำข้อมูลที่เลือกไปยังหน้า ProductDetail
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>ค้นหา</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="พิมพ์เพื่อค้นหา..."
            value={searchInput}
            onChangeText={text => {
              setSearchInput(text);
              handleSearch(text);
            }}
          />

          <TouchableOpacity onPress={() => handleSearch(searchInput)}>
            <FontAwesomeIcon
              icon={faSearch}
              size={24}
              color="black"
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {searchInput === '' ? (
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
            <TouchableOpacity
              key={idx}
              onPress={() => navigateToProduct(result)}>
              <View style={styles.resultItem}>
                <Text style={[styles.normalText, styles.boldText]}>
                  {result.waste_name.split(searchInput).map((part, index) => (
                    <Text key={index}>
                      {index > 0 ? (
                        <Text style={styles.blackText}>{searchInput}</Text>
                      ) : null}
                      {part}
                    </Text>
                  ))}
                </Text>
                <Text style={styles.normalText}>{result.type}</Text>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 220,
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
  blackText: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Search;
