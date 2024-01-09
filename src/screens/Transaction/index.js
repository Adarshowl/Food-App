import {
  FlatList, SafeAreaView, StyleSheet, View,
  I18nManager,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,

} from 'react-native';
import React, { useContext, useState } from 'react';
import { SIZES } from '../../constants';
import GlobalStyle from '../../styles/GlobalStyle';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import { STRING } from '../../constants';
import TransactionItem from './TransactionItem';
import themeContext from '../../constants/themeContext';
import { FONTS } from '../../constants/Fonts'

const Transaction = ({ navigation }) => {
  const theme = useContext(themeContext);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([
    {
      id: '100',
      status: 'Success',
      amount: '150',
      message: 'Big Graden salad ',
      mode: 'Online',
      time: '16-10-2023 01:56 Pm',
    },
    {
      id: '101',
      status: 'Pending',
      amount: '100',
      message: 'React babu',
      mode: 'COD',
      time: '17-10-2023 02:56 Pm',
    },

    {
      id: '102',
      status: 'Success',
      amount: '1005',
      message: 'React Native Scroll To NOT',
      mode: 'CASH',
      time: '23-10-2023 03:56 Pm',
    },
    {
      id: '103',
      status: 'Pending',
      amount: '50',
      message: 'To Bottom',
      mode: 'Cheque',
      time: '20-10-2023 04:56 Pm',
    },
  ]);

  const renderItem = ({ item }) => {
    return (
      <View
        // activeOpacity={0.8}
        style={[
          styles.wrapperOrder,
          {
            // backgroundColor: '#F2F3F4',
            // elevation: 2,

            backgroundColor: theme?.colors?.bg_color_onBoard,
          },
        ]}>
        <View
          style={[
            GlobalStyle.flexRowAlignCenter,
            {
              paddingVertical: 5,
              alignItems: 'center',
            },
          ]}>
          {/* <Image
            source={{
              uri: item?.image,
            }}
            style={styles.image}
          /> */}

          <Image
            style={{
              width: 65,
              height: 65,
              alignItems: 'center',
              // alignSelf: 'center',
              resizeMode: 'center',
              // marginTop: 30,
              borderRadius: 100,
            }}
            // style={styles.itemImage}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/8231/8231679.png'
              // uri: item?.image,
            }}
          />
          <View style={styles.innnerWrapperOrder}>
            <View
              style={{
                flex: 1,
                // flexDirection: 'row',
                // justifyContent: 'space-between'
              }}>
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.white,
                  },
                ]}
                numberOfLines={1}>
                {item?.message}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  // styles.finalPriceText,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.textColor,
                    marginTop: 8,
                    fontFamily: FONTS?.regular,
                  },
                ]}>
                jun 3 v2024 | 14:00 PM
                {/* {item?.date} */}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles?.buttoninvite,
                {
                  // backgroundColor: theme?.colors?.bg,

                },
              ]}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: theme?.colors?.white,
                  fontSize: 14,
                  fontFamily: FONTS?.bold,
                }}>
                $10.30
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: theme?.colors?.white,
                  fontSize: 14,
                  fontFamily: FONTS?.regular,
                }}>
                order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };


  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme.colors.bg_color_onBoard,
          },
        ]}>
        <Ionicons
          name="ios-arrow-back"
          // color={COLORS.black}
          color={theme.colors.textColor}
          size={25}
          style={[
            styles.backIcon,
            {
              opacity: !show ? 1 : 0.0,
              transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
              marginStart: 10,
            },
          ]}
          onPress={() => {
            navigation.goBack();
            // ShowToastMessage('Coming Soon!');
          }}
        />

        <VegUrbanCommonToolBar
          title="Transaction  History"
          // title={route?.params?.item?.name + ''}

          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
          }}
          textStyle={{
            color: theme.colors.textColor,
            fontWeight: 'bold',
            fontSize: 20,
          }}
        />
      </View>

      <ScrollView>
        {/* <Text
                    style={[
                        styles.textName,
                        {
                            alignSelf: 'flex-start',
                            color: theme?.colors?.white,
                            fontSize: 20,
                            marginStart: 16,
                            marginTop: 10
                        },
                    ]}
                    numberOfLines={1}>
                    Order List
                </Text> */}
        <FlatList
          style={{
            paddingStart: 5,
            paddingEnd: 5,
          }}
          ListHeaderComponent={() => {
            return <View style={{}} />;
          }}
          ListHeaderComponentStyle={{
            paddingTop: 5,
          }}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
        />

        {/* <View style={styles.divLine} /> */}

        {/* <View
         style={{
           minHeight: '100%',
           width: '100%',
           marginTop: 5,
           marginBottom:30

         }}>
         <TopTabNav />
       </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Transaction;
const styles = StyleSheet.create({
  buttoninvite: {
    // flex:0.4,
    // width: '28%',
    alignItems: 'center',
    borderRadius: 80,
    // paddingVertical:5,

    // height: 28,
    // justifyContent: 'center',
    // height:10,
    // alignSelf: 'center',
  },
  wrapper: {
    padding: 15,
    borderRadius: 3,
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    // marginVertical: 20,
    borderRadius: 12,
    // paddingBottom: 60

    // paddingVertical:5
  },
  amountwrapper: {
    padding: 15,
    borderRadius: 3,
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    // marginVertical: 20,
    borderRadius: 12,
    marginBottom: 30,
    // paddingBottom: 60

    // paddingVertical:5
  },
  month: {
    fontSize: 22,
    // fontFamily: FONTS.medium,
    color: COLORS.black,
  },
  monthTitle: {
    fontSize: 14,
    // fontFamily: FONTS.regular,
    color: COLORS.black,
    marginBottom: 2.5,
  },
  wrapperOrder: {
    padding: 5,
    // borderRadius: 3,
    margin: 2,
    // backgroundColor: COLORS.white,
    marginHorizontal: 8,
    // marginVertical: 10,
    // borderRadius: 12,
    // paddingVertical:5
  },
  itemImage: {
    width: '30%',
    height: 100,
    borderRadius: 20,

    // resizeMode: 'center',
    // alignItems: 'center',
    // resizeMode: 'stretch',
    // marginBottom: 10
  },
  divLine: {
    height: 0.5,
    width: '95%',
    backgroundColor: COLORS.gray,
    alignSelf: 'center',
    marginVertical: 5,
    marginTop: 10,
  },
  textlable: {
    fontSize: 16,
    color: COLORS?.black,
  },
  amounttext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS?.black,
  },
  modalBackground: {
    flex: 1,
    // alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#00000080',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    // borderRadius: 15,
    width: SIZES.width,

    display: 'flex',
    flexDirection: 'column',
    // paddingVertical: 8,
  },
  qtyText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    color: COLORS.black,
    textAlign: 'center',
    flex: 0.3,
  },
  originalPrice: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    textDecorationLine: 'line-through',
    color: COLORS.black,
    marginStart: 8,

    textDecorationColor: COLORS.black,
  },
  deleteSaveText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
    color: COLORS.red,
    textAlign: 'center',
    flex: 1,
    marginTop: 5,
  },
  image: {
    height: 90,
    width: '28%',
    // margin:6,
    marginTop: 5,
    resizeMode: 'stretch',
    borderRadius: 5,
    // paddingTop:10
    // resizeMode:'contain',
  },
  innnerWrapper: {
    flex: 1,
    marginStart: 10,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innnerWrapperOrder: {
    flex: 1,
    marginStart: 10,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textName: {
    fontFamily: FONTS?.bold,
    fontSize: 16,
    color: COLORS.black,
  },
  discountPrice: {
    // fontFamily: 'OpenSans-SemiBold',
    fontFamily: 'OpenSans-Regular',

    fontSize: 13,
    color: COLORS.black,
  },
  // qtyText: {
  //   fontFamily: 'OpenSans-Regular',
  //   fontSize: 13,
  //   color: COLORS.black,
  // },
  finalPriceText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 17,
    color: COLORS.colorPrimary,
    marginTop: 3,
  },
  createProfile: {
    fontSize: 16,
    // fontFamily: FONTS.regular,
    color: COLORS.grey,
    lineHeight: 24,
    alignSelf: 'center',
  },
  label: {
    fontSize: 20,
    marginTop: 16,
    color: COLORS.black,

    fontWeight: 'bold',
    // fontFamily: FONTS.semi_bold,
  },
});
