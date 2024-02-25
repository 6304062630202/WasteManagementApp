import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Login';
import NavBar from './screens/NavBar';
import Search from './screens/Search';
import Scan from './screens/Scan';
import ProductDetail from './screens/ProductDetail';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NavBar"
          component={NavBar}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={Search} 
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Scan"
          component={Scan} 
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail} 
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
