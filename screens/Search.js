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
  
  // ข้อมูลขยะ
  const garbageData = [
    { id: 1, title: 'ประโยชน์ของการแยกขยะ', description: 'การแยกขยะช่วยลดปริมาณขยะที่เกิดขึ้นในสิ่งแวดล้อม และสร้างวงจรเศรษฐกิจเพื่อการนำกลับของวัสดุรีไซเคิล' },
    { id: 2, title: 'วิธีการทำลายขยะที่เป็นพิษ', description: 'การทำลายขยะที่เป็นพิษต้องทำอย่างระมัดระวังเพื่อป้องกันการปล่อยสารพิษออกมาสู่สิ่งแวดล้อม' },
    { id: 3, title: 'การรีไซเคิล', description: 'การรีไซเคิลเป็นกระบวนการให้วัสดุที่ใช้งานแล้วกลับมาใช้ใหม่ ซึ่งช่วยลดปริมาณขยะที่เกิดขึ้นในสิ่งแวดล้อม' },
  ];

  const goBack = () => {
    navigation.goBack();
  };

  const handleSearch = () => {
    const searchResult = garbageData.filter(item => item.title.includes(searchInput));
    console.log(searchResult);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          size={24}
          style={styles.icon}
        />
        <Text style={styles.text}>ค้นหา</Text>
      </TouchableOpacity>

      <View style={styles.searchContainer}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
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
    marginRight: 10,
  },
});


export default Search;
