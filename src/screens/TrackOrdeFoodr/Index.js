import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import React, { useContext, useState } from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import { STRING } from '../../constants';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import themeContext from '../../constants/themeContext';
import { FONTS } from '../../constants/Fonts';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const TrackOrdeFoodr = () => {

  const theme = useContext(themeContext);

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
            elevation: 0
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
            backgroundColor: theme.colors.toolbar_icon_bg,
            borderRadius: 20
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <VegUrbanCommonToolBar
          title="Track Order"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
          }}
        />


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
          <View style={{ marginTop: 20,flex:1,marginHorizontal:10,
          marginTop:10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              Order Details
            </Text>

            {/* Individual Order Information */}
            <Text>Order ID: {orderDetails.orderId}</Text>
            <Text>Order Date: {orderDetails.orderDate}</Text>
            <Text>Delivery Address: {orderDetails.deliveryAddress}</Text>
            <Text>Total Amount: {orderDetails.totalAmount}</Text>
            {/* Add other order details */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrackOrdeFoodr;
