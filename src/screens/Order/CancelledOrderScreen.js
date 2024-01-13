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
          title="Cancel Order"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
          }}
        />


      </View>
      <ScrollView
        style={{
          flex: 1,
        }}>

        <View style={{ padding: 20 }}>
          {/* Reason for cancellation */}
          <Text style={[styles?.boldText, {
            fontSize: 17
          }]}>
            Reason for cancellation:
          </Text>
          <Text style={{ marginBottom: 20 }}>
            {/* Add cancellation reason here */}
            Your food in the bag and on the moval
            so we'll beed to change you for the order if you cancel
          </Text>

          {/* Image */}
          <View style={{
             alignItems: 'center', 
             marginBottom: 20 ,
             backgroundColor:theme?.colors?.bg,
             borderRadius:100,
             width:150,
             height:150,
             alignSelf:'center',
             justifyContent:'center'
             }}>
            <Image
              source={{ uri: 'data:image/png;base64,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' }}
              style={{ width: 80, height: 80, }}
            />
          </View>

          {/* Details */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text
              style={styles?.normalText}
            >Service:</Text>
            <Text
              style={styles?.boldText}
            >$0.30</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text
              style={styles?.normalText}
            >Product Cost:</Text>
            <Text
              style={styles?.boldText}
            >$25.00</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text
              style={styles?.normalText}
            >Delivery Fees:</Text>
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
            >$30.00</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            marginBottom: 10,
            alignItems: 'center'
          }}>
            <MaterialIcons
              name="payment"
              size={20}
              color={COLORS?.gray}
            />
            <Text
            numberOfLines={2}
              style={{
                fontSize:13,
                marginLeft:10,
                color:COLORS?.black,
                fontFamily:FONTS?.regular
              }}
            >Wil BE CHANGED TO YOUR CARD ENDING IN 2756</Text>
          </View>

        </View>


      </ScrollView>
      <View
        style={{
          backgroundColor: theme.colors.bg_color_onBoard,
          padding: 10,
          alignItems: 'center',
          marginHorizontal:10
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
            fontFamily: FONTS?.bold
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
    fontSize: 16,
    color: COLORS.black,
    // textAlign: 'center',
    marginVertical: 5,
  },
  boldText: {
    fontFamily: FONTS?.semi_old,
    fontSize: 16,
    color: COLORS.black,
    // textAlign: 'center',
    marginVertical: 5,
  },
});
