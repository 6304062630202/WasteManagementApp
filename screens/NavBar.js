import {View, Text} from 'react-native';
import React from 'react';
import Home from './Home';
import Coins from './Coins';
import Scan from './Scan';
import Notification from './Notification';
import Profile from './Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faCoins, faBarcode, faBell, faUser } from '@fortawesome/free-solid-svg-icons';


const Tab = createBottomTabNavigator();

const tabBarStyle = {
  padding: 10,
  height: 80,
  position: 'absolute',
  borderTopLeftRadius: 40,
  borderTopRightRadius: 40,
};

const COLORS = {
  blue: '#87CEFA',
  gray: '#BEBEBE',
};

const NavBar = () => {
  return (
    <Tab.Navigator
      initalRouteName="Home"
      activeColor="#EB6A58"
      tabBarHideKeyBoard={true}
      headerShown={false}
      inactiveColor="#3e2465"
      barStyle={{paddingBottom: 48}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faHome}
              color={focused ? COLORS.blue : COLORS.gray}
              size={28}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Coins"
        component={Coins}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faCoins}
              color={focused ? COLORS.blue : COLORS.gray}
              size={28}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Scan"
        component={Scan}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faBarcode}
              color={focused ? COLORS.blue : COLORS.gray}
              size={28}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faBell}
              color={focused ? COLORS.blue : COLORS.gray}
              size={28}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faUser}
              color={focused ? COLORS.blue : COLORS.gray}
              size={28}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavBar;
