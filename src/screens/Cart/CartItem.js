import React, { memo, useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { COLORS } from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { STRING } from '../../constants';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { FONTS } from '../../constants/Fonts';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
import { useNavigation } from '@react-navigation/native';
import { IMAGE_BASE_URL } from '../../network/ApiEndPoints';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'


const CartItem = ({
  item,
  onAdd,
  onMinus,
  onDelete,
  onSaveLater,
  fromSave,
  onSaveRemove,
}) => {
  const [count, setCount] = useState(1);
  const [lastPressedButton, setLastPressedButton] = useState(null);
  const handlePress = (operation) => {
    setLastPressedButton(operation);
    if (operation === 'minus') {
      setCount((prev) => (prev > 1 ? prev - 1 : prev));
    } else if (operation === 'plus') {
      setCount((prev) => prev + 1);
    }
  };
  // console.log(
  //   "items?.is_flash_deal == 'Active' ==amount ",
  //   parseInt(item?.product_id?.amount) +
  //     ' -- flash amount' +
  //     parseInt(item?.product_id?.flash_offer_percentage) +
  //     ' ---- ',
  // );
  // console.log(
  //   ((parseInt(item?.product_id?.amount) *
  //     parseInt(item?.product_id?.flash_offer_percentage)) /
  //     100) *
  //     parseInt(item?.quantity),
  // );
  // ShowConsoleLogMessage(parseInt(item?.product_id?.flash_offer_percentage));

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const theme = useContext(themeContext);
  const navigation = useNavigation();

  const fa =
    ((parseInt(item?.product_id?.amount) *
      parseInt(item?.product_id?.flash_offer_percentage)) /
      100) *
    parseInt(item?.quantity);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      // onPress={() => {
      //   navigation.navigate('BannerOfferDetails');
      // }}
      style={[
        styles.Wrapper,
        {
          // elevation: 2,
          backgroundColor: COLORS?.white,

          flex: 1,
        },
      ]}>
      {/* <View
      style={[
        // styles.itemWrapper,
        {
          backgroundColor: COLORS?.white,
        },
      ]}

    > */}
      <ImageBackground
        style={[
          styles.itemImage,
          {
            // backgroundColor:"#F2F4F4",
            backgroundColor: COLORS?.white,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          },
        ]}>
       
        <VegUrbanImageLoader
          styles={{
            width: 130,
            height: 150,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          // style={styles.itemImage}
          source={item?.image}
        />
        <View style={{
          position: 'absolute',
          //  top: 40, 
          //  left: 0,
          bottom: 20,
          alignSelf: 'center'
        }}>
          <LinearGradient
            colors={[COLORS?.white, 'white']}
            style={{
              padding: 3,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              width: 90,
              height: 30,
              justifyContent: 'center',
            }}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={{
              borderRadius: 20,
              width: 18,
              height: 18,
              backgroundColor: theme?.colors?.colorPrimary,
              alinItem: 'center',
              justifyContent: 'center',
              flex: 1
            }}>
              <AntDesign
                name="star"
                size={10}
                color={COLORS?.white}
                style={{
                  alignSelf: 'center'
                }}
              />
            </View>
            <Text style={{
              color: COLORS?.black,
              fontSize: 12,
              fontFamily: FONTS?.bold,
              marginLeft: 3
            }}>Best Seller</Text>
          </LinearGradient>
        </View>
      </ImageBackground>

      {/* </View> */}
      <View
        style={{
          flex: 1,
          marginStart: 15,
          marginTop: 2
        }}>
        <Text
          style={[
            // styles.itemName,
            {
              color: COLORS?.black,
              marginTop: 10,
              fontFamily: FONTS?.bold,
              fontSize: 18
            },
          ]}
          numberOfLines={1}>
          {item?.name}
        </Text>
        <Text
          style={[
            // styles.itemName,
            {
              color: COLORS?.grey,
              marginTop: 5,
              fontFamily: FONTS?.regular,
              fontSize: 15,
              marginBottom: 8

            },
          ]}
          numberOfLines={2}>
          10 skewers of safay + Rice + Sweet Tea
        </Text>


        {/* <View style={{
          flexDirection: 'row',
          marginVertical: 3,
          alinItem: 'center'
        }}>
          <MaterialCommunityIcons
            name="clock"
            color={COLORS?.gray}
            size={18}
          />
          <Text
            style={[
              {
                color: COLORS?.black,
                fontFamily: FONTS?.regular,
                fontSize: 14,
                marginLeft: 5
              },
            ]}
            numberOfLines={1}>
            12 min {`\u25CF 25 km`}
          </Text>
        </View> */}

        <View style={{
          flexDirection: 'row',
          marginVertical: 3,
          alinItem: 'center'
        }}>
          <Entypo
            name="star"
            color={"orange"}
            size={20}
          />
          <Text
            style={[
              // styles.itemName,
              {
                color: COLORS?.black,
                // marginTop: 2,
                fontFamily: FONTS?.semi_old,
                fontSize: 16,
                marginLeft: 5
              },
            ]}
            numberOfLines={1}>
            4.9 {`\u25CF 100`} + ratings
            {/* {item?.address} */}
          </Text>
        </View>
        <View style={{
          flexDirection: 'row',
          marginVertical: 8,
          alinItem: 'center',
          justifyContent: 'space-between',
          marginEnd: 10
        }}>
          {/* <MaterialCommunityIcons
            name="motorbike"
            color={COLORS?.black}
            size={20}
          />        */}
          <Text
            style={[
              // styles.itemName,
              {
                color: COLORS?.black,
                // marginTop: 2,
                fontFamily: FONTS?.bold,
                fontSize: 17,
                marginLeft: 5
              },
            ]}
            numberOfLines={1}>
            Rp 10.000
            {/* {item?.address} */}
          </Text>
          <View
            style={[
              GlobalStyle.flexRowAlignCenter,
              {
              },
            ]}>
            <TouchableOpacity
              style={{
                backgroundColor:
                  lastPressedButton === 'minus'
                    ? theme.colors.colorPrimary
                    : theme.colors.addtocart,
                borderRadius: 20,
                width: 24,
                height: 24
              }}
              onPress={() => handlePress('minus')}

            // onPress={() => {
            //   // onMinus();
            //   setCount(prev => (prev > 1 ? prev - 1 : prev));
            // }}
            >
              <AntDesign
                name="minus"
                size={16}
                color={
                  lastPressedButton === 'minus'
                    ? COLORS?.white
                    : theme.colors.white
                }
                style={{
                  // backgroundColor: 'red',
                  padding: 3,
                }}
              />
            </TouchableOpacity>

            <Text
              numberOfLines={1}
              style={[
                styles.qtyText,
                {
                  color: theme.colors.white,
                  paddingHorizontal: 10,
                },
              ]}>
              {/* {item?.quantity} */}
              {count}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor:
                  lastPressedButton === 'plus'
                    ? theme.colors.colorPrimary
                    : theme.colors.addtocart,
                borderRadius: 20,
                width: 24,
                height: 24
              }}
              onPress={() => handlePress('plus')}

            // onPress={() => {
            //   // onAdd();
            //   setCount(prev => prev + 1);
            // }}
            >
              <AntDesign
                name="plus"
                size={16}
                style={{
                  // backgroundColor: 'red',
                  padding: 3,
                }}
                color={
                  lastPressedButton === 'plus'
                    ? COLORS?.white
                    : theme.colors.white
                }
                onPress={() => {
                  // onAdd();
                  setCount(prev => prev + 1);
                }}
              />
            </TouchableOpacity>
          </View>

        </View>


        {/* <View style={{
        flexDirection: 'row',
        marginVertical: 3,
        alinItem: 'center',
        backgroundColor: '#D1D1EC',
        borderRadius: 10,
        width: '70%',
        paddingVertical: 3,
        justifyContent: 'center',
        marginTop: 3
      }}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDC1HCaAjRTm_8GGvGAiGuyUJDxKOTJ7Tdwg&usqp=CAU'
          }}
          style={{
            width: 20,
            height: 20,
            borderRadius: 20
          }}
        />
        <Text
          style={[
            {
              color: 'blue',
              fontFamily: FONTS?.bold,
              fontSize: 14,
              marginLeft: 5
            },
          ]}
          numberOfLines={1}>
          Free Delivery
        </Text>
      </View> */}
      </View>
    </TouchableOpacity>
    // <TouchableOpacity
    //   onPress={() => {
    //     navigation.navigate('ProductDetail', {item: item});
    //   }}
    //   // activeOpacity={0.8}
    //   style={[
    //     styles.wrapper,
    //     {
    //       // backgroundColor: '#F2F3F4',
    //       elevation: 5,
    //       backgroundColor: theme?.colors?.bg,
    //       // backgroundColor: theme?.colors?.bg_color_onBoard,
    //     },
    //   ]}>
    //   <View
    //     style={[
    //       GlobalStyle.flexRowAlignCenter,
    //       {
    //         paddingVertical: 5,
    //         alignItems: 'center',
    //         backgroundColor: theme?.colors?.bg,
    //       },
    //     ]}>
    //     {/*<ImageBackground*/}
    //     {/*  style={[*/}
    //     {/*    styles.itemImage,*/}
    //     {/*    {*/}
    //     {/*      backgroundColor: theme?.colors?.colorimageback,*/}
    //     {/*      alignItems: 'center',*/}
    //     {/*      justifyContent: 'center',*/}
    //     {/*    },*/}
    //     {/*  ]}>*/}
    //     <VegUrbanImageLoader
    //       source={
    //         item?.product_id?.thumbnail_image
    //           ? IMAGE_BASE_URL + item?.product_id?.thumbnail_image
    //           : IMAGE_BASE_URL + item?.thumbnail_image
    //       }
    //       styles={[
    //         {
    //           width: 90,
    //           height: 90,
    //           alignSelf: 'center',
    //           margin: 8,
    //           // resizeMode:'contain',
    //           borderRadius: 5,
    //           // marginTop: 30
    //         },
    //       ]}
    //     />
    //     {/*</ImageBackground>*/}
    //     <View style={styles.innnerWrapper}>
    //       <View
    //         style={{
    //           flexDirection: 'row',
    //           justifyContent: 'space-between',
    //         }}>
    //         <Text
    //           style={[
    //             styles.textName,
    //             {
    //               alignSelf: 'flex-start',
    //               color: theme?.colors?.white,
    //               marginEnd: 5,
    //             },
    //           ]}
    //           numberOfLines={1}>
    //           {item?.product_id?.product_name || item?.product_name}
    //           {/*{item?.product_id?.product_name || item?.product_name}*/}
    //         </Text>
    //         <MaterialIcons
    //           name="delete-outline"
    //           size={22}
    //           color={theme?.colors?.textColor}
    //           style={{
    //             marginEnd: 10,
    //           }}
    //           onPress={toggleModal}
    //         />
    //         <DeleteConfirmationModal
    //           visible={isModalVisible}
    //           onCancel={toggleModal}
    //           onConfirm={() => {
    //             // Handle delete action here
    //             toggleModal();
    //             onDelete();
    //           }}
    //           item={item}
    //         />
    //       </View>
    //       <View
    //         style={[
    //           {
    //             flexWrap: 'wrap',
    //             marginTop: 5,
    //           },
    //           GlobalStyle.flexRowAlignCenter,
    //         ]}>
    //         <View
    //           style={{
    //             borderRadius: 20,
    //             width: 12,
    //             height: 12,
    //             backgroundColor: item?.color || theme?.colors?.gray,
    //             // marginEnd: 10,
    //             marginTop: 8,
    //             marginBottom: 8,
    //           }}
    //         />
    //         <Text
    //           style={[
    //             styles.discountPrice,
    //             {
    //               // color: COLORS?.black,
    //               color: theme?.colors?.white,
    //               // color: theme?.colors?.,
    //               marginLeft: 5,
    //             },
    //           ]}>
    //           Color
    //         </Text>
    //         <View
    //           style={{
    //             // width: 0,
    //             // height: 13,
    //             paddingVertical: 6,
    //             borderWidth: 0.8,
    //             borderColor: theme?.colors?.white,
    //             marginStart: 7,
    //             marginEnd: 10,
    //           }}
    //         />
    //         <Text
    //           style={[
    //             styles.discountPrice,
    //             {
    //               color: theme?.colors?.white,
    //             },
    //           ]}>
    //           Size = {item?.size}
    //         </Text>
    //         <View
    //           style={{
    //             // width: 0,
    //             // height: 13,
    //             paddingVertical: 6,
    //             borderWidth: 0.8,
    //             borderColor: theme?.colors?.white,
    //             marginStart: 7,
    //             marginEnd: 10,
    //           }}
    //         />
    //         <Text
    //           style={[
    //             styles.discountPrice,
    //             {
    //               color: theme?.colors?.white,
    //             },
    //           ]}>
    //           Qty = {item?.quantity}
    //         </Text>
    //       </View>

    //       <View
    //         style={{
    //           flexDirection: 'row',
    //           justifyContent: 'space-between',
    //           alignItems: 'center',
    //         }}>
    //         {item?.product_id?.is_flash_deal == 'Active' ? (
    //           <Text
    //             style={[
    //               styles.finalPriceText,
    //               {
    //                 alignSelf: 'flex-start',
    //                 color: theme?.colors?.colorPrimary,
    //                 marginTop: 5,
    //               },
    //             ]}>
    //             {STRING.APP_CURRENCY}{' '}
    //             {parseInt(
    //               parseInt(item?.product_id?.amount) *
    //                 parseInt(item?.quantity) -
    //                 fa,
    //             )}
    //             {/*{parseInt(item?.product_id?.amount) -*/}
    //             {/*  ((parseInt(item?.product_id?.amount) **/}
    //             {/*    parseInt(item?.product_id?.flash_offer_percentage)) /*/}
    //             {/*    100) **/}
    //             {/*    parseInt(item?.quantity)}*/}
    //           </Text>
    //         ) : (
    //           <Text
    //             style={[
    //               styles.finalPriceText,
    //               {
    //                 alignSelf: 'flex-start',
    //                 color: theme?.colors?.colorPrimary,
    //                 marginTop: 5,
    //               },
    //             ]}>
    //             {STRING.APP_CURRENCY} {item?.amount}
    //           </Text>
    //         )}
    //         <View
    //           style={[
    //             GlobalStyle.flexRowAlignCenter,
    //             {
    //               // marginHorizontal: 15,
    //               alignSelf: 'center',
    //               // flex: 1,
    //               // width: '40%',
    //               marginTop: 5,
    //               backgroundColor: theme.colors.addtocart,

    //               // backgroundColor: "#E5E8E8",
    //               borderRadius: 20,
    //               justifyContent: 'space-between',
    //               paddingHorizontal: 10,
    //               paddingVertical: 2,
    //             },
    //           ]}>
    //           <AntDesign
    //             name="minus"
    //             size={18}
    //             color={theme?.colors?.textColor}
    //             style={{
    //               // backgroundColor: 'red',
    //               padding: 3,
    //             }}
    //             onPress={() => {
    //               onMinus();
    //               // setCount(prev => (prev > 1 ? prev - 1 : prev));
    //             }}
    //           />
    //           <Text
    //             numberOfLines={1}
    //             style={[
    //               styles.qtyText,
    //               {
    //                 color: theme.colors.white,
    //                 paddingHorizontal: 10,
    //               },
    //             ]}>
    //             {item?.quantity}
    //           </Text>
    //           <AntDesign
    //             name="plus"
    //             size={18}
    //             style={{
    //               // backgroundColor: 'red',
    //               padding: 3,
    //             }}
    //             color={theme?.colors?.textColor}
    //             onPress={() => {
    //               onAdd();
    //               // setCount(prev => prev + 1);
    //             }}
    //           />
    //         </View>
    //       </View>
    //     </View>
    //   </View>
    // </TouchableOpacity>
  );
};

export default memo(CartItem);
const styles = StyleSheet.create({
  itemWrapper: {
    // flex: 1,
    // margin: 5,
    // marginVertical:5,
    // marginHorizontal:5,
    backgroundColor: COLORS.white,
    // maxWidth: SIZES.width / 2 - 10,
    // paddingBottom: 5,
    padding: 5,
    flexDirection: 'row',
    height: 80,
    justifyContent: 'center',
    alinItem: 'center',
  },
  Wrapper: {
    marginTop: 10,
    flex: 1,
    // margin: 5,
    marginVertical: 5,
    flexDirection: 'row',
    backgroundColor: COLORS.bg_color,
    // borderRadius: 5,
    // maxWidth: SIZES.width / 2 - 10,
    paddingBottom: 5,
    // padding: 5,
    // alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    // elevation: 5,
    height: 170
    // marginHorizontal: 10,
    // paddingVertical:1,
    // padding:20
  },
  itemImage: {
    // flexGrow:1,
    width: 130,
    height: 170,
    borderRadius: 10,
    justifyContent: 'center',
    alinItem: 'center',
    // alignSelf:'center'
  },
  itemName: {
    // fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    color: COLORS.black,
    marginTop: 2,
    // alignItems:'center'
    // textAlign: 'center'
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: FONTS?.regular,
  },
  itemOriPrice: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    textDecorationLine: 'line-through',
    color: COLORS.gray,
    marginStart: 5,
  },
  nodataText: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: COLORS?.colorPrimary,
    marginHorizontal: 20,
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 40,
  },
  qtyText: {
    color: COLORS?.black,
    fontFamily: FONTS?.bold
  }
});
