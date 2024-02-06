import React from 'react';
import {View, Image} from 'react-native';
import Home from './Home';
import Coins from './Coins';
import Scan from './Scan';
import Notification from './Notification';
import Setting from './Setting';
import {COLORS} from '../contrants/COLORS';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faCoins,
  faBell,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

const tabBarStyle = {
  padding: 10,
  height: 80,
  position: 'absolute',
  borderTopLeftRadius: 40,
  borderTopRightRadius: 40,
  paddingBottom: 10,
};

const CircleIcon = ({children, focused}) => (
  <View
    style={{
      top: -35,
      backgroundColor: COLORS.BUTTON_COLOR,
      borderRadius: 70,
      width: 70,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    {children}
  </View>
);

const NavBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarHideKeyBoard={true}
      headerShown={false}
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
              color={focused ? COLORS.BUTTON_COLOR : COLORS.SECONDARY_COLOR}
              size={26}
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
              color={focused ? COLORS.BUTTON_COLOR : COLORS.SECONDARY_COLOR}
              size={26}
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
            <CircleIcon focused={focused}>
              <Image
                source={require('../image/barcode-icon.png')}
                style={{width: 30, height: 24}}
              />
            </CircleIcon>
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
              color={focused ? COLORS.BUTTON_COLOR : COLORS.SECONDARY_COLOR}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faUser}
              color={focused ? COLORS.BUTTON_COLOR : COLORS.SECONDARY_COLOR}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavBar;
