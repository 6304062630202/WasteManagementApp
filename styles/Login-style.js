import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
    // justifyContent: 'center',
  },

  imageContainer: {
    alignSelf: 'flex-start',
    paddingTop: 100,
  },

  tiltle: {
    fontSize: 14,
    color: 'green',
    padding: 20,
    textDecorationLine: 'underline',
  },

  inputContainer: {
    paddingBottom: 18,
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    backgroundColor: 'white',
  },

  passwordInput: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    backgroundColor: 'white',
    position: 'relative', 
  },

  iconContainer: {
    position: 'absolute', 
    right: 10, 
    top: '50%', 
    transform: [{ translateY: -10 }], 
    zIndex: 1,
  },

  buttonContainer: {
    width: '100%',
    alignSelf: 'center',
    fontWeight: 'bold',
  },

  textContainer: {
    paddingBottom: 30,
  },

  label: {
    fontSize: 16,
    padding: 4,
    color: '#3333CC',
    fontWeight: 'bold',
  },

  errorInput: {
    borderColor: 'red',
  },
});

export default styles;
