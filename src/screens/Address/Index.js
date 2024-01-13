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
import { useIsFocused } from '@react-navigation/native';
import {
  getUserSavedAddress,
  removeUserAddress,
} from '../../redux/actions/CartApi';

const Address = ({ navigation, route }) => {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const loginCount = useSelector(state => state?.state?.count);
  const userToken = useSelector(state => state?.state?.userToken);

  const [addressList, setAddressList] = useState([]);
  const [showAddressAddBtn, setShowAddressAddBtn] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: 'home',
      label: 'Home',
      address: '123 Main Street, Home City',
      type: 'Home',
      def: true,
      selected: false,
    },
    {
      id: 'office',
      label: 'Office',
      address: '456 Office Road, Office City',
      type: 'Home',
      def: true,
      selected: false,

    },
  ]);

  const onItemClick = idx => {
    let a = addresses.map((item, index) => {
      let temp = Object.assign({}, item);
      if (index == idx) {
        temp.selected = !temp.selected;
      } else {
        temp.selected = false;
      }
      return temp;
    });

    setAddresses(a);
  };
  const renderAddressItem = ({ item, index }) => {
    return (

      <TouchableOpacity
        style={{
          flex: 1,
          padding: 10,
          // borderBottomWidth: 1,
          // borderBottomColor: '#ccc',
          borderWidth: item?.selected ? 1: 0.3,
          marginHorizontal: 3,
          marginVertical: 8,
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderColor:item?.selected ? theme?.colors?.colorPrimary : theme?.colors?.gray,
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
            onPress={() => {
              onItemClick(index, item);
            }}
          />
        </View>
      </TouchableOpacity>
    )
  };

  const BannerErrorCallback = error => {
    ShowConsoleLogMessage('Banner call back called');
    dispatch(showProgressBar(false));
    // ShowToastMessage(error);
    ShowConsoleLogMessage(error);
  };
  const addressSuccessCallback = async data => {
    // ShowConsoleLogMessage(JSON.stringify(data?.response));
    dispatch(showProgressBar(false));
    setAddressList(data?.response);

    setShowAddressAddBtn(data?.response?.length == 0);
  };

  const addressErrorCallback = async data => {
    dispatch(showProgressBar(false));
    setAddressList([]);
    setShowAddressAddBtn(true);
    // setTimeout(() => {
    //   ShowToastMessage(data?.message || 'Something went wrong.');
    // }, 100);
  };

  const addressDeleteSuccessCallback = async data => {
    // ShowConsoleLogMessage(JSON.stringify(data?.response));
    dispatch(showProgressBar(false));
  };

  const addressDeleteErrorCallback = async data => {
    dispatch(showProgressBar(false));
    setTimeout(() => {
      ShowToastMessage(data?.message || 'Something went wrong.');
    }, 100);
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (loginCount == 1) {
      if (isFocused) {
        dispatch(showProgressBar(true));
        dispatch(() => {
          getUserSavedAddress(
            dispatch,
            navigation,
            userToken,
            addressSuccessCallback,
            addressErrorCallback,
            BannerErrorCallback,
          );
        });
      }
    } else {
    }
  }, [isFocused]);

  const theme = useContext(themeContext);

  const onDeleteClick = (id, index) => {
    const updatedData = [...addressList];
    updatedData.splice(index, 1);
    setAddressList(updatedData);
    dispatch(showProgressBar(true));

    if (updatedData?.length == 0) {
      setShowAddressAddBtn(true);
    }

    dispatch(() => {
      removeUserAddress(
        dispatch,
        navigation,
        userToken,
        id,
        addressDeleteSuccessCallback,
        addressDeleteErrorCallback,
        BannerErrorCallback,
      );
    });
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        // activeOpacity={0.8}
        style={[
          styles.wrapperOrder,
          {
            elevation: 2,
            backgroundColor: theme?.colors?.bg_color,
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
          <View
            style={[
              styles.imagestyle,
              {
                backgroundColor: theme?.colors?.colorimageback,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-start',
              },
            ]}>
            <Image
              style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                alignSelf: 'center',
                tintColor: theme?.colors?.white,
              }}
              // source={{
              //   uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoB3mYtLafUiRQEUeY7dQVt-rX0w7NF1kRa7SsXA3Nm2cBixmQUYZWYjgAT-5wVg3A7sM&usqp=CAU',
              // }}
              source={icons.address}
            />
          </View>
          <View style={styles.innnerWrapperOrder}>
            <View
              style={{
                flex: 1,
              }}>
              <View
                style={{
                  // flexGrow: 1,
                  flexDirection: 'row',
                  // backgroundColor: 'red',
                }}>
                <Text
                  style={[
                    styles.textName,
                    {
                      alignSelf: 'flex-start',
                      color: theme?.colors?.white,
                    },
                  ]}>
                  {item?.name}
                </Text>

                {item?.defaultAddress == 1 ? (
                  <Text
                    style={[
                      styles.textName,
                      {
                        fontFamily: FONTS?.regular,
                        color: theme?.colors?.text,
                        backgroundColor: theme?.colors?.colorPrimary,
                        elevation: 10,
                        fontSize: 12,
                        marginStart: 10,
                        paddingHorizontal: 5,
                        paddingVertical: 2,
                        borderRadius: 5,
                        alignSelf: 'flex-start',
                      },
                    ]}
                    numberOfLines={1}>
                    {item?.defaultAddress == 1 ? 'Default' : ''}
                  </Text>
                ) : null}
              </View>
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.white,
                    fontSize: 13,
                  },
                ]}>
                Email: {item?.email}
              </Text>
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.white,
                    fontSize: 13,
                  },
                ]}>
                Phone: {item?.phone}
              </Text>
              <Text
                ellipsizeMode="tail"
                style={[
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.white,
                    marginTop: 8,
                    fontFamily: FONTS?.regular,
                  },
                ]}>
                {item?.address}
              </Text>
            </View>
            <View>
              <ToolBarIcon
                title={MaterialIcons}
                iconName={'edit'}
                icSize={18}
                icColor={theme?.colors?.text}
                style={{
                  backgroundColor: theme?.colors?.colorPrimary,
                  marginEnd: 10,
                  marginBottom: 10,
                  borderRadius: 10,
                }}
                onPress={() => {
                  navigation.navigate('AddressAddUpdate', { item: item });
                  // ShowToastMessage('Coming soon');
                }}
              />
              <ToolBarIcon
                title={MaterialIcons}
                iconName={'delete'}
                icSize={18}
                icColor={theme?.colors?.text}
                style={{
                  backgroundColor: theme?.colors?.red,
                  marginEnd: 10,
                  borderRadius: 10,
                }}
                onPress={() => {
                  onDeleteClick(item?._id, index);
                }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
              transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
              marginStart: 10,
            },
          ]}
          onPress={() => {
            navigation.goBack();
          }}
        />

        <VegUrbanCommonToolBar
          title="Deliver To"
          // title={route?.params?.item?.name + ''}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
          }}
          textStyle={{
            color: theme.colors.textColor,
            fontFamily: FONTS?.bold,
            fontSize: 20,
          }}
        />
      </View>
      <View style={{ flex: 1, padding: 20 }}>
        {/* <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Address List</Text> */}
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
              // navigation.navigate('AddNewAddress');
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
      {/* {showAddressAddBtn ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}>
          <Text
            style={[
              GlobalStyle.bothSideText,
              {
                color: theme?.colors?.white,
                fontSize: 18,
                fontFamily: FONTS?.medium,
                textAlign: 'center',
                marginBottom: 20,
              },
            ]}>
            No saved address found
          </Text>
          <VegUrbanCommonBtn
            height={40}
            width={'100%'}
            borderRadius={20}
            textSize={16}
            textColor={theme?.colors?.text}
            text={'Add New Address'}
            backgroundColor={theme?.colors?.colorPrimary}
            onPress={() => {
              // navigation.navigate('Home');
              navigation.navigate('AddNewAddress');
            }}
            textStyle={{
              fontFamily: FONTS?.bold,
            }}
          />
        </View>
      ) : (
        <>
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
            data={addressList}
            renderItem={renderItem}
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
              textColor={theme?.colors?.text}
              text={'Add New Address'}
              backgroundColor={theme?.colors?.colorPrimary}
              onPress={() => {
                navigation.navigate('AddNewAddress');
              }}
              textStyle={{
                fontFamily: FONTS?.bold,
                color: theme?.colors?.white,
              }}
            />
          </View>
        </>
      )} */}
    </SafeAreaView>
  );
};

export default Address;

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
