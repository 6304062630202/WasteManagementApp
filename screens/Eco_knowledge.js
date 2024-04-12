import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { WebView } from 'react-native-webview';

const Eco_knowledge = ({ route }) => {
  const navigation = useNavigation();
  const [itemData, setItemData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const itemId = route.params.item.id;
        const response = await fetch(`https://wasteappmanage.sci.kmutnb.ac.th/knowledge.php`);
        const data = await response.json();

        // ค้นหาข้อมูลของ item จาก JSON ที่ได้รับจาก MySQL
        const selectedItem = data.find(item => item.id === itemId);

        if (selectedItem) {
          setItemData(selectedItem);
        } else {
          console.error('Item not found in database');
        }
      } catch (error) {
        console.error('Error fetching item data:', error);
      } finally {
        setIsLoading(false);
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
      {isLoading ? ( 
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {itemData?.url_knowledge && (
            <WebView source={{ uri: itemData.url_knowledge }} style={{ flex: 1, width: '100%' }} />
          )}
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
  backIcon: {
    marginRight: 10,
    color: '#000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 25,
    color: '#000',
  },
  scrollContent: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Eco_knowledge;
