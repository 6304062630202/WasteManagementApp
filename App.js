import { LogBox } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Home from './screens/Home';
import Search from './screens/Search';
import Setting from './screens/Setting';
import Eco_knowledge from './screens/Eco_knowledge';
import MyAccount from './screens/MyAccount';
import History from './screens/History';
import Scan from './screens/Scan';
import ProductDetail from './screens/ProductDetail';
import NavBar from './screens/NavBar';
import ProductSearch from './screens/ProductSearch';
import ScanQR from './screens/ScanQR';
import Condition from './screens/Condition';

// ละเว้นคำเตือนที่เราต้องการ
LogBox.ignoreLogs(['Warning: ...']);

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Eco_knowledge"
          component={Eco_knowledge}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyAccount"
          component={MyAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Scan"
          component={Scan}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NavBar"
          component={NavBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductSearch"
          component={ProductSearch}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ScanQR"
          component={ScanQR}
          options={{ headerShown: false }}
        />
      <Stack.Screen
          name="Condition"
          component={Condition}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
