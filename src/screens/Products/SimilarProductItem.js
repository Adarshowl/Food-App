import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo, useContext } from 'react';
import { COLORS } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import GlobalStyle from '../../styles/GlobalStyle';
import { STRING } from '../../constants';
import themeContext from '../../constants/themeContext';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
import { icons, SIZES } from '../../constants';
import { IMAGE_BASE_URL } from '../../network/ApiEndPoints';
import { FONTS } from '../../constants/Fonts'
import AntDesign from 'react-native-vector-icons/AntDesign'

const SimilarProductItem = ({ item }) => {

  console.log('images', item)
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        // ShowConsoleLogMessage(item?.flash_enddate);

        navigation.navigate('ProductDetail11', {
          item,
          isFavorite: !item.fav,
          endDate: item?.flash_enddate,
        });
      }}
      activeOpacity={0.9}
      style={[
        styles.wrapper,
        {
          // backgroundColor: theme.colors.,
          backgroundColor: theme.colors.colorimageback,
          padding:10
        },
      ]}
    // onPress={() => {
    //   navigation.navigate('ProductDetail1', { item: item });
    // }}
    >
      {/* <Image
        source={{
          uri: item?.image,
        }}
        style={styles.image}
      /> */}
      <VegUrbanImageLoader
        source={IMAGE_BASE_URL + item?.thumbnail_image}
        // source={
        //   item?.thumbnail_image?.length > 0
        //     ? IMAGE_BASE_URL + item
        //     : IMAGE_BASE_URL + item?.thumbnail_image
        // }
        styles={[styles.sliderImage, {}]}
      />
      <Text
        style={[
          styles.itemName,
          {
            color: theme.colors.textColor,
            marginTop: 10,
            fontFamily: FONTS?.semi_old,
            marginLeft: 5,

          },
        ]}
        numberOfLines={1}>
        {item?.product_name}
      </Text>
      <Text
        style={[
          styles.itemPrice,
          {
            color: theme.colors.textColor,
            marginLeft: 5,
            alignItems: 'center',
            // marginBottom: 5
          },
        ]}>
        {item?.subcategory}
      </Text>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 5,

        }}
      // style={GlobalStyle.flexRowAlignCenter}
      >
        <AntDesign name={'star'} size={20} color={theme?.colors?.textColor} />
        <Text
          style={[
            styles.itemPrice,
            {
              color: theme.colors.textColor,
              marginLeft: 5,
              alignItems: 'center',
              // marginBottom: 5
            },
          ]}>
          {item?.quantity}
        </Text>
        <View
          style={{
            paddingVertical: 6,
            borderWidth: 0.8,
            borderColor: theme?.colors?.white,
            marginStart: 7,
            marginEnd: 10,
          }}
        />
        <View
          style={{
            backgroundColor: theme?.colors?.colorimageback,
            // paddingHorizontal: 15,
            borderRadius: 5,
            // padding: 5,
            // marginTop: 5,
          }}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: FONTS?.medium,
              color: theme?.colors?.textColor,
            }}>
            {item?.sold} sold
          </Text>
        </View>
      </View>
      <Text style={[styles.itemPrice, {
        color: theme.colors.white,
        marginLeft: 5,

      }
      ]}>
        {STRING.APP_CURRENCY}
        {item?.amount}
      </Text>
      <View
        style={{
          paddingBottom: 5,
        }}
      />
    </TouchableOpacity>
  );
};

export default memo(SimilarProductItem);

const styles = StyleSheet.create({
  imageStyle: {
    height: 150,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,
    // resizeMode: 'stretch',

  },
  wrapper: {
    // width: 100,
    flex: 1,

    backgroundColor: COLORS.white,
    // marginBottom: 5,
    borderRadius: 10,
    marginHorizontal: 7,
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf:'center'
    // borderWidth:0.1,
    // paddingBottom: 10,
    // paddingHorizontal: 10
  },
  priceText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 13,
    color: COLORS.colorPrimary,
  },
  originalPriceText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    textDecorationLine: 'line-through',
    color: COLORS.black,
    marginStart: 5,
    textDecorationColor: COLORS.black,
  },
  text: {
    maxHeight: 35,
    minHeight: 35,
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'OpenSans-Bold',
    color: COLORS.black,
    backgroundColor: COLORS.search_bg_grey,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  image: {
    height: 75,
    // borderRadius: 5,
    // width: '60%',
    width: '100%',
    // borderRadius:100,
    margin: 20,
    resizeMode: 'stretch',

  },
  sliderImage: {
    width: 170,
    // width:'100%',
    // width:270,
    height: 160,
    flex: 1,

    // width: 300,
    // overflow: 'hidden',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf:'center',
    resizeMode: 'stretch',

  },
  productName: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
    color: COLORS.black,
    textAlign: 'center',
    marginTop: 2,
  },
});
