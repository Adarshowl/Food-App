import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { lazy, useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { icons, STRING } from '../constants';
import Home from '../screens/Home';
import themeContext from '../constants/themeContext';
import Order from '../screens/Order';
import Profile from '../screens/Profile';
import Wallet from '../screens/Wallet/Index';
import { FONTS } from '../constants/Fonts';
import { useSelector } from 'react-redux';
import { COLORS } from '../constants/Colors';
import OrderList from '../screens/Order/OrderList';
import TabOfferScreen from '../screens/Flash/TabOfferScreen';
import FlashSale from '../screens/Flash/FlashSale';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Category = lazy(() => import('../screens/Category'));
const Favorite = lazy(() => import('../screens/Favorite'));
const Cart = lazy(() => import('../screens/Cart'));

const Tab = createBottomTabNavigator();
const BottomTabNav = () => {
  const theme = useContext(themeContext);

  const cartDataLength = useSelector(
    state => state?.homeReducer?.cartDataLength,
  );

  return (
    <View
      style={{
        backgroundColor: theme?.colors.bg_color_onBoard,
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 100,

      }}
    >

    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme?.colors.bg_color_onBoard,
          height: 80,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          borderTopWidth: 0,
          elevation: 3,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: 18,

          overflow: 'hidden',
        },
        tabBarItemStyle: {},
      }}
      style={{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

        overflow: 'hidden',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',

                flexGrow: 1,
              }}>
              <Entypo
                name="home"
                size={25}
                color={
                  focused ? theme?.colors.colorPrimary : theme?.colors.grey
                }
              />
              {/* <Image
                  source={icons.tab_home}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: focused
                      ? theme?.colors.colorPrimary
                      : theme?.colors.grey,
                  }}
                /> */}
              <Text
                style={[
                  styles.text,
                  {
                    color: focused
                      ? theme?.colors.colorPrimary
                      : theme?.colors.textColor,
                    // fontFamily:FONTS?.bold
                  },
                ]}>
                {STRING.home}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',

                flexGrow: 1,
              }}>
              <Fontisto
                name="shopping-basket"
                size={25}
                color={
                  focused ? theme?.colors.colorPrimary : theme?.colors.grey
                }
              />
              {/* <Image
                source={icons.tab_cart}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused
                    ? theme?.colors.colorPrimary
                    : theme?.colors.grey,
                }}
              /> */}
              <Text
                style={[
                  styles.text,
                  {
                    color: focused
                      ? theme?.colors.colorPrimary
                      : theme?.colors.textColor,
                  },
                ]}>
                {STRING.cart}
              </Text>
              {cartDataLength > 0 ? (
                <Text
                  style={{
                    color: COLORS.white,

                    fontSize: 14,
                    fontFamily: FONTS.semi_old,
                    position: 'absolute',
                    right: -10,
                    backgroundColor: theme.colors.colorPrimary,
                    paddingHorizontal: 2,
                    borderRadius: 25,
                  }}>
                  {' '}
                  {cartDataLength}{' '}
                </Text>
              ) : null}
              {/* {focused ? (
                <Text
                  style={[
                    styles.text,
                    {
                      color: focused
                        ? theme?.colors.colorPrimary
                        : theme?.colors.grey,
                    },
                  ]}>
                  {STRING.cart}
                </Text>
              ) : null} */}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="OrderList"
        component={OrderList}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',

                flexGrow: 1,
                // backgroundColor: 'red',
              }}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/2891/2891516.png'
                }}
                // source={icons.tab_order}
                style={{
                  height: 28,
                  width: 28,
                  tintColor: focused
                    ? theme?.colors.colorPrimary
                    : theme?.colors.grey,
                }}
              />
              <Text
                style={[
                  styles.text,
                  {
                    color: focused
                      ? theme?.colors.colorPrimary
                      : theme?.colors.textColor,
                  },
                ]}>
                Order
              </Text>
              {/* {focused ? (
                <Text
                  style={[
                    styles.text,
                    {
                      color: focused
                        ? theme?.colors.colorPrimary
                        : theme?.colors.grey,
                    },
                  ]}>
                  {STRING.cart}
                </Text>
              ) : null} */}
            </View>
          ),
        }}
      />



      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',

                flexGrow: 1,
              }}>
              {/*<AntDesign*/}
              {/*  name="user"*/}
              {/*  // name={focused ? 'heart' : 'hearto'}*/}
              {/*  size={20}*/}
              {/*  color={*/}
              {/*    focused ? theme?.colors.colorPrimary : theme?.colors.grey*/}
              {/*  }*/}
              {/*/>*/}
              <FontAwesome
                name="user"
                size={25}
                color={
                  focused ? theme?.colors.colorPrimary : theme?.colors.grey
                }
              />
              {/* <Image
                  source={icons.tab_profile}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: focused
                      ? theme?.colors.colorPrimary
                      : theme?.colors.grey,
                  }}
                /> */}
              <Text
                style={[
                  styles.text,
                  {
                    color: focused
                      ? theme?.colors.colorPrimary
                      : theme?.colors.textColor,
                  },
                ]}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
   </View>

  );
};
export default BottomTabNav;

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    marginTop: 3,
    fontFamily: FONTS?.regular,
  },
});
