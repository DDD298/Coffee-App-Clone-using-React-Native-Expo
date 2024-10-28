import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import {FontAwesome5, AntDesign} from "@expo/vector-icons";
import { StyleSheet} from 'react-native';
import colors from '../theme/colors';
import { BlurView } from 'expo-blur';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
   <Tab.Navigator
   screenOptions={{
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarShowLabel: false,
    tabBarStyle: styles.tabBarStyle,
    }}>
      <Tab.Screen name='Home' component={HomeScreen} options={{
        tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5 name="home" color={focused ? colors.primary : colors.secondary} 
            size={27} />
            )
      }}></Tab.Screen>
      <Tab.Screen name='Cart' component={CartScreen} options={{
        tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5 name="shopping-cart" color={focused ? colors.primary : colors.secondary} 
            size={25} />
            )
      }}></Tab.Screen>
      <Tab.Screen name='Favorites' component={FavoritesScreen} options={{
        tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="heart" color={focused ? colors.primary : colors.secondary} 
            size={27} />
            )
      }}></Tab.Screen>
      <Tab.Screen name='History' component={OrderHistoryScreen} options={{
        tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5 name="history" color={focused ? colors.primary : colors.secondary} 
            size={25} />
            )
      }}></Tab.Screen>
   </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
 tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: colors.dark,
    borderTopWidth:0,
    elevation:0,
    borderTopColor: "transparent",
 },
});