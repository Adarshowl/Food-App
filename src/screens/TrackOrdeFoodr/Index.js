import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity
} from 'react-native';
import React, { useContext, useState } from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import { STRING } from '../../constants';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import themeContext from '../../constants/themeContext';
import { FONTS } from '../../constants/Fonts';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const TrackOrdeFoodr = () => {

  const theme = useContext(themeContext);
  const handlePhoneCall = () => {
    const phoneNumber = '+12345878649'; 
    const url = `tel:${phoneNumber}`;
    
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Unable to open phone call for ${phoneNumber}`);
      }
    });
  };
  const orderDetails = {
    orderId: '12345',
    orderDate: 'December 25, 2023',
    deliveryAddress: '1234 Street Name, City, Country',
    totalAmount: '$50.00',
    // ...other order details
  };

  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Dummy data for order details



  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme.colors.bg_color_onBoard,
        },
      ]}>
      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme.colors.bg_color_onBoard,
            elevation: 0,
            marginTop:10
          },
        ]}>
        <ToolBarIcon
          title={Ionicons}
          iconName={'chevron-back'}
          icSize={20}
          icColor={COLORS.black}
          borderRadius={20}
          style={{
            marginEnd: 10,
            backgroundColor: theme.colors.bg_color_onBoard,
            borderRadius: 20
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        {/* <VegUrbanCommonToolBar
          title="Track Order"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
          }}
        /> */}
        <Text style={{
          fontFamily: FONTS?.bold,
          color: theme?.colors?.white,
          fontSize: 20
        }}>
          Order Track
        </Text>


      </View>
      <ScrollView>
        <View style={{ flex: 1, }}>
          {/* Location Map (Assuming you have a map component to display location) */}
          <View style={{
            borderRadius: 10
          }}>

            <MapView
              provider={PROVIDER_GOOGLE}
              style={{
                height: 450,
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'center',
                bodrderRadius: 10
              }}
              region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >

            </MapView>
          </View>
          {/* Order Details */}
          <View style={{

          }}>
            <View style={{
              flex: 1,
              // borderTopLeftRadius: 20,
              // borderTopRightRadius: 20,
            }}>
              <View style={{
                marginTop: 20,
                flex: 1,
                marginHorizontal: 20,
              }}>
                <View
                  style={{
                    width: '40%',
                    height: 6,
                    backgroundColor: theme?.colors?.white,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginBottom: 20,
                    borderRadius: 10
                  }}
                />
                <Text style={[styles?.normalText, {
                  fontFamily: FONTS?.regular,
                  color: theme?.colors?.textColor,
                  fontSize: 15,
                  marginBottom: 15
                }]}>
                  Arrive in 20 min
                </Text>

                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: FONTS?.bold,
                      marginBottom: 10,
                      color: theme?.colors?.textColor
                    }}>
                    Food Pizza Campany Food Order
                  </Text>
                  <MaterialIcons
                    name='keyboard-arrow-right'
                    color={theme?.colors?.textColor}
                    size={25}
                  />

                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10
                }}>
                  <Ionicons
                    name='wallet-outline'
                    color={COLORS?.light_green}
                    size={25}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: FONTS?.medium,
                      color: theme?.colors?.textColor,
                      marginLeft: 10
                    }}>
                    $ 89.99 - Paid by Credit Card
                  </Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10
                }}>
                  <MaterialCommunityIcons
                    name='truck-fast-outline'
                    color={theme?.colors?.colorPrimary}
                    size={25}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: FONTS?.medium,
                      color: theme?.colors?.textColor,
                      marginLeft: 10
                    }}>
                    Ship to 9 West 45th Street, New York City
                  </Text>
                </View>

                <View
                  style={{
                    width: '70%',
                    borderWidth: 0.5,
                    borderColor: theme?.colors?.gray,
                    alignSelf: 'center',
                    marginTop: 15
                  }}
                />

                <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                  marginBottom: 20
                }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <Image
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/4140/4140037.png'
                      }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50
                      }}
                    />
                    <View style={{
                      marginLeft: 10
                    }}>
                      <Text style={{
                        fontFamily: FONTS?.medium,
                        color: theme?.colors?.textColor,
                        fontSize: 16
                      }}>
                        Habk Hirtha</Text>
                      <Text
                        style={{
                          fontFamily: FONTS?.regular,
                          color: theme?.colors?.grey,
                          fontSize: 13,
                        }}>Shipper - Delivering order</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={handlePhoneCall}>
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: theme?.colors?.colorPrimary,
                        borderRadius: 50,
                        marginTop: 5
                      }}
                    >
                      <Ionicons
                        name='call-outline'
                        color={COLORS?.white}
                        size={25}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrackOrdeFoodr;
const styles = StyleSheet.create({

  normalText: {
    fontFamily: FONTS?.regular,
    fontSize: 17,
    color: COLORS.black,
    // textAlign: 'center',
    marginVertical: 5,
  },
  boldText: {
    fontFamily: FONTS?.semi_old,
    fontSize: 17,
    color: COLORS.black,
    // textAlign: 'center',
    marginVertical: 5,
  },
});