import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/Auth/Splash';
import Home from '../screens/Home';
import RestaurantDetails from '../screens/RestaurantDetails';
import CategoryDetails from '../screens/CategoryDetails';

const RootStack = createNativeStackNavigator();

function Nav() {
  return (
    <RootStack.Navigator
      // initialRouteName={initiatingRoute?.name}
      initialRouteName={'Splash'}
      screenOptions={{animationEnabled: true}}>
      <RootStack.Screen
        name={'Splash'}
        component={Splash}
        options={{
          // headerTitle: 'Splash',
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={'Home'}
        component={Home}
        options={{
          headerShown: false,
          // headerTitle: 'Home',
        }}
      />

      <RootStack.Screen
        name={'RestaurantDetails'}
        component={RestaurantDetails}
        options={{
          headerShown: false,
          // headerTitle: 'Home',
        }}
      />
      <RootStack.Screen
        name={'CategoryDetails'}
        component={CategoryDetails}
        options={{
          headerShown: false,
          // headerTitle: 'Home',
        }}
      />
    </RootStack.Navigator>
  );
}

export default Nav;
