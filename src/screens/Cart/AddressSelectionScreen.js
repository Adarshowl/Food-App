// AddressSelectionScreen.js
import {
  FlatList,
  I18nManager,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { icons, SIZES } from '../../constants';
import { FONTS } from '../../constants/Fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';
import themeContext from '../../constants/themeContext';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import { ShowConsoleLogMessage, ShowToastMessage } from '../../utils/Utility';
import { showProgressBar } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  getUserSavedAddress,
  removeUserAddress,
} from '../../redux/actions/CartApi';

const AddressSelectionScreen = ({ addresses, onSelectAddress, onClose }) => {

  const theme = useContext(themeContext);

  const navigation = useNavigation();
  const renderAddressItem = ({ item }) => {
    return (

      <TouchableOpacity
        style={{
          flex: 1,
          padding: 10,
          // borderBottomWidth: 1,
          // borderBottomColor: '#ccc',
          borderWidth: item?.selected ? 1 : 0.3,
          marginHorizontal: 3,
          marginVertical: 8,
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderColor: item?.selected ? theme?.colors?.colorPrimary : theme?.colors?.gray,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <View style={{
          // flex: 1,
          // padding: 10,
          // // borderBottomWidth: 1,
          // // borderBottomColor: '#ccc',
          // borderWidth: 0.2,
          // marginHorizontal: 3,
          // marginVertical: 8,
          // borderRadius: 10,
          // paddingHorizontal: 20,
          // paddingVertical: 15,
          flexDirection: 'row',

        }}>
          <View
            style={{
              backgroundColor: '#F6DDCC',
              width: 60,
              height: 60,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <MaterialIcons
              name="location-on"
              color={theme?.colors?.colorPrimary}
              size={35}
              style={{
                alignSelf: 'center'
              }}
            />
          </View>
          <View
            style={{
              marginLeft: 10,
              marginTop: 5
            }}
          >
            <Text style={{
              color: COLORS?.black,
              fontFamily: FONTS?.bold,
              fontSize: 18
            }}>{item.label}</Text>
            <Text>{item.address}</Text>
          </View>

        </View>
        <View
          style={{
            alignSelf: 'center',
            // justifyContent: 'flex-end',
            alignItems: 'center',

          }}>
          <MaterialCommunityIcons
            // name={'circle-outline'}
            name={item?.selected ? 'circle-slice-8' : 'circle-outline'}
            size={25}
            color={theme.colors.colorPrimary}
          // onPress={onSelect}
          // onPress={() => {
          //   onItemClick(index, item);
          // }}
          />
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <View>
      <View style={{ padding: 20 }}>

        <View
          style={{
            width: '40%',
            height: 6,
            backgroundColor: theme?.colors?.white,
            justifyContent: 'center',
            alignSelf: 'center',
            marginBottom: 30,
            borderRadius: 10
          }}
        />
        <Text style={{
          fontSize: 20,
          marginBottom: 10,
          color: theme?.colors?.black,
          fontFamily: FONTS?.bold

        }}>Deliver To</Text>
        <FlatList
          data={addresses}
          keyExtractor={(item) => item.id}
          renderItem={renderAddressItem}
        />
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
          }}>
          <VegUrbanCommonBtn
            height={45}
            width={'100%'}
            borderRadius={20}
            textSize={16}
            textColor={theme?.colors?.white}
            text={'Add New Address'}
            backgroundColor={theme?.colors?.bg}
            onPress={() => {
              onClose()

              navigation.navigate('AddNewAddress');
            }}
            textStyle={{
              fontFamily: FONTS?.bold,
              color: theme?.colors?.white,
            }}
          />
        </View>
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
          }}>
          <VegUrbanCommonBtn
            height={45}
            width={'100%'}
            borderRadius={20}
            textSize={16}
            textColor={theme?.colors?.text}
            text={'Apply'}
            backgroundColor={theme?.colors?.colorPrimary}
            onPress={() => {
              onClose()
              navigation.navigate('Payment');
            }}
            textStyle={{
              fontFamily: FONTS?.bold,
              color: theme?.colors?.white,
            }}
          />


        </View>
        {/* <TouchableOpacity
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: '#3498db',
            borderRadius: 5,
            alignItems: 'center',
          }}
          onPress={() => {
            const newAddress = {
              id: 'new-home', 
              label: 'New Home',
              address: '789 New Home Lane, New Home City',
            };
            setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add New Home Address</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default AddressSelectionScreen;
const styles = StyleSheet.create({
  buttoninvite: {
    // flex:0.4,
    width: '28%',
    alignItems: 'center',
    borderRadius: 80,
    // paddingVertical:5,
    height: 28,
    justifyContent: 'center',
    // height:10,
    alignSelf: 'center',
  },
  wrapper: {
    padding: 15,
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    // marginVertical: 20,
    borderRadius: 12,
    // paddingBottom: 60

    // paddingVertical:5
  },
  amountwrapper: {
    padding: 15,
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    marginVertical: 20,
    borderRadius: 12,
    marginBottom: 30,
    // paddingBottom: 60

    paddingVertical: 5,
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
    // padding: 5,
    // margin: 2,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    // paddingVertical:5
  },
  imagestyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 5,
  },
  itemImage: {
    width: '30%',
    height: 100,
    borderRadius: 20,
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
    fontFamily: FONTS.medium,
    color: COLORS?.black,
  },
  modalBackground: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#00000080',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    width: SIZES.width,
    display: 'flex',
    flexDirection: 'column',
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
    fontFamily: FONTS?.semi_old,
    fontSize: 18,
    color: COLORS.black,
  },
  discountPrice: {
    // fontFamily: 'OpenSans-SemiBold',
    fontFamily: FONTS?.regular,

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
    fontFamily: FONTS.medium,
    // fontFamily: FONTS.semi_bold,
  },
});
