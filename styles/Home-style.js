import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 20,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderColor: 'gray',
    flex: 1,
    padding: 16,
    borderRadius: 30,
    backgroundColor: '#D3D3D3',
  },

  title: {
    paddingBottom: 10,
    paddingLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'flex-start',
  },
  
  map_img: {
    alignItems: 'center',
    paddingBottom: 30,
  },

  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  
  itemImage: {
    width: 150,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default styles;
