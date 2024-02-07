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
import OrderItem from './OrderItem';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import themeContext from '../../constants/themeContext';
import { FONTS } from '../../constants/Fonts';

const CancelledOrderScreen = ({ navigation }) => {
  const theme = useContext(themeContext);

  const [cartData, setCartData] = useState([
    {
      name: 'fresh veg',
      image:
        'https://media.istockphoto.com/id/467328250/photo/mango.jpg?s=612x612&w=0&k=20&c=cYSHeExkHZVYQM6xkWehclgYDqkmB7o4E494xz5GbXs=',

      price: '10',
      old_price: '5',
      ori_price: '5',
      qty: '1 kg',
      count: '2',
      via: 'COD',
    },
    {
      name: 'fresh fruit',
      image:
        'https://t4.ftcdn.net/jpg/02/71/66/91/360_F_271669174_2dHs4FO3SV83lQ4MjswEBa4LQTGjMO4E.jpg',

      price: '20',
      ori_price: '15',
      old_price: '10',
      qty: '2 kg',
      count: '2',
      via: 'ONLINE',
    },

    {
      name: 'fresh vegied',
      image:
        'https://media.istockphoto.com/id/171575811/photo/guava.jpg?s=612x612&w=0&k=20&c=cjVDpisFrT8JlqFbSEImkfsXgQbtrNCdSTILGAzIj2Q=',

      price: '15',
      ori_price: '5',
      qty: '1 kg',
      old_price: '15',
      via: 'Cash',
      count: '1',
    },
  ]);

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
            marginTop: 10,

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
          title="Cancel Order"
          style={{
            // backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
            fontFamily: FONTS?.bold,
            fontSize: 18
          }}
        /> */}

        <Text style={{
          fontFamily: FONTS?.bold,
          color: theme?.colors?.white,
          fontSize: 20
        }}>
          Cancel Order
        </Text>


      </View>
      <ScrollView
        style={{
          flex: 1,
        }}>

        <View style={{ padding: 20 }}>
          {/* Reason for cancellation */}
          {/* <Text style={[styles?.boldText, {
            fontSize: 17
          }]}>
            Reason for cancellation:
          </Text> */}
          <Text style={{
            marginBottom: 20,
            fontSize: 16,
            color: theme?.colors?.gray,
            fontFamily: FONTS?.regular,
            marginEnd: 15
          }}>
            {/* Add cancellation reason here */}
            Your food in the bag and on the moval
            so we'll beed to change you for the order if you cancel
          </Text>

          {/* Image */}
          <View style={{
            alignItems: 'center',
            marginBottom: 20,
            backgroundColor: "#FEE9E8",
            borderRadius: 100,
            width: 150,
            height: 150,
            alignSelf: 'center',
            justifyContent: 'center'
          }}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/3759/3759129.png'
              }}
              style={{ width: 80, height: 80, }}
            />
          </View>

          {/* Details */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text
              style={[styles?.normalText, {
                color: theme?.colors?.grey,
                fontFamily:FONTS?.regular
              }]}
            >Services</Text>
            <Text
              style={styles?.boldText}
            >$0.30</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text
              style={[styles?.normalText, {
                color: theme?.colors?.grey
              }]}
            >Delivery fee:</Text>
            <Text
              style={styles?.boldText}
            >$3.49</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text
              style={[styles?.normalText, {
                color: theme?.colors?.grey
              }]}
            >Product Cost</Text>
            <Text
              style={styles?.boldText}
            >$25.00</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <View>
              <Text
                style={[styles?.normalText, {
                  color: theme?.colors?.grey
                }]}
              >Surcharges for orders below</Text>
              <Text
                style={[styles?.normalText, {
                  color: theme?.colors?.grey
                }]}
              >$10.00 in this store</Text>
            </View>
            <Text
              style={styles?.boldText}
            >$5.00</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20
          }}>
            <Text
              style={[styles?.boldText, {
                fontSize: 20,
              }]}
            >Cancellation Total</Text>
            <Text
              style={[styles?.boldText, {
                fontFamily: FONTS?.bold,
                fontSize: 20
              }]}
            >$12.50</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            marginBottom: 10,
            alignItems: 'center',
            marginTop:10
          }}>
            <MaterialIcons
              name="payment"
              size={20}
              color={theme?.colors?.colorPrimary}
            />
            <Text
              numberOfLines={2}
              style={{
                fontSize: 13.5,
                marginLeft: 10,
                color: theme?.colors?.grey,
                fontFamily:FONTS?.semi_old
              }}
            >Will be changed to your card ending in 2756</Text>
          </View>

        </View>


      </ScrollView>
      <View
        style={{
          backgroundColor: theme.colors.bg_color_onBoard,
          padding: 10,
          alignItems: 'center',
          marginHorizontal: 10
        }}>
        <VegUrbanCommonBtn
          height={50}
          width={'100%'}
          borderRadius={30}
          textSize={20}
          textColor={theme?.colors?.text}
          text="Cancel and Pay"
          backgroundColor={theme.colors.colorPrimary}
          onPress={() => {
            navigation.goBack('TrackOrder');
          }}
          textStyle={{
            fontFamily: FONTS?.semi_old
          }}
        />

      </View>
    </SafeAreaView>
  );
};

export default CancelledOrderScreen;
const styles = StyleSheet.create({
  orderOtp: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    paddingHorizontal: 10,
    marginEnd: 2,
    color: COLORS.colorPrimary,
  },
  orderStatWrapper: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 25,
  },
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
