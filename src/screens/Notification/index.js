import {
  FlatList,
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import { SIZES, STRING } from '../../constants';
import moment from 'moment';

import themeContext from '../../constants/themeContext';
import { FONTS } from '../../constants/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import { ShowConsoleLogMessage } from '../../utils/Utility';
import { showProgressBar } from '../../redux/actions';
import { useIsFocused } from '@react-navigation/native';
import { getUserNotificationList } from '../../redux/actions/CartApi';
import SwipeDelete from './SwipeDelete';
import ToolBarIcon from '../../utils/ToolBarIcon';

const Notification = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const [oldNotification, setOldNotification] = useState([]);

  console.log("list data ", notificationList)
  const dispatch = useDispatch();
  const loginCount = useSelector(state => state?.state?.count);
  const userToken = useSelector(state => state?.state?.userToken);
  const oldNotifi = [

    {
      id: 201,
      message: 'New Services Available!',
      timestamp: '2023-09-30T17:30:00',
      title: "Now you can track orders in real",

      image: "https://cdn-icons-png.flaticon.com/128/11222/11222376.png"

    },
    {
      id: 202,
      message: '30% sepcial Discount!',
      timestamp: '2023-09-30T20:15:00',
      title: "Special promotion",

      image: "https://icon-library.com/images/location-icon-vector/location-icon-vector-28.jpg"

    },
    {
      id: 201,
      message: 'Credit Card Connected!',
      timestamp: '2023-09-30T17:30:00',
      title: "Credit Card has been linked!",
      image: "https://cdn-icons-png.flaticon.com/128/147/147258.png"

    },
    {
      id: 202,
      message: 'Account Steup Successful',
      timestamp: '2023-09-30T20:15:00',
      title: "Your account has been creadited",

      image: "https://cdn-icons-png.flaticon.com/128/2102/2102633.png"

    },

  ]
  const NewNotifications = [

    {
      id: 101,
      message: '30% Special Discount.',
      timestamp: '2023-10-01T09:00:00',
      title: "Special promotion only valis today",

      image: "https://cdn-icons-png.flaticon.com/128/3012/3012373.png"
    },
    {
      id: 201,
      message: 'Credit Card Connected!',
      timestamp: '2023-09-30T17:30:00',
      title: "Credit Card has been linked!",
      image: "https://cdn-icons-png.flaticon.com/128/147/147258.png"

    },
  ];

  // const staticNotifications = [
  //   {
  //     id: 1,
  //     title: 'New',
  //     notifications: [
  //       {
  //         id: 101,
  //         message: '30% Special Discount.',
  //         timestamp: '2023-10-01T09:00:00',
  //         title: "Special promotion only valis today",

  //         image: "https://cdn-icons-png.flaticon.com/128/3012/3012373.png"
  //       },
  //       {
  //         id: 201,
  //         message: 'Credit Card Connected!',
  //         timestamp: '2023-09-30T17:30:00',
  //         title: "Credit Card has been linked!",
  //         image: "https://cdn-icons-png.flaticon.com/128/147/147258.png"

  //       },

  //       // Add more notifications for "Today"
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: 'Old',
  //     notifications: [
  //       {
  //         id: 201,
  //         message: 'New Services Available!',
  //         timestamp: '2023-09-30T17:30:00',
  //         title: "Now you can track orders in real",

  //         image: "https://cdn-icons-png.flaticon.com/128/11222/11222376.png"

  //       },
  //       {
  //         id: 202,
  //         message: '30% sepcial Discount!',
  //         timestamp: '2023-09-30T20:15:00',
  //         title: "Special promotion",

  //         image: "https://icon-library.com/images/location-icon-vector/location-icon-vector-28.jpg"

  //       },
  //       {
  //         id: 201,
  //         message: 'Credit Card Connected!',
  //         timestamp: '2023-09-30T17:30:00',
  //         title: "Credit Card has been linked!",
  //         image: "https://cdn-icons-png.flaticon.com/128/147/147258.png"

  //       },
  //       {
  //         id: 202,
  //         message: 'Account Steup Successful',
  //         timestamp: '2023-09-30T20:15:00',
  //         title: "Your account has been creadited",

  //         image: "https://cdn-icons-png.flaticon.com/128/2102/2102633.png"

  //       },
  //     ],
  //   },
  //   // {
  //   //   id: 2,
  //   //   title: 'December 22, 2024',
  //   //   notifications: [
  //   //     {
  //   //       id: 201,
  //   //       message: 'Credit Card Connected!',
  //   //       timestamp: '2023-09-30T17:30:00',
  //   //       title: "Credit Card has been linked!",
  //   //       image: "https://cdn-icons-png.flaticon.com/128/147/147258.png"

  //   //     },
  //   //     {
  //   //       id: 202,
  //   //       message: 'Account Steup Successful',
  //   //       timestamp: '2023-09-30T20:15:00',
  //   //       title: "Your account has been creadited",

  //   //       image: "https://cdn-icons-png.flaticon.com/128/2102/2102633.png"

  //   //     },
  //   //     // Add more notifications for "Yesterday"
  //   //   ],
  //   // },
  // ];

  const BannerErrorCallback = error => {
    ShowConsoleLogMessage('Banner call back called');
    dispatch(showProgressBar(false));
    // ShowToastMessage(error);
    ShowConsoleLogMessage(error);
  };
  const addressSuccessCallback = async data => {
    // ShowConsoleLogMessage(JSON.stringify(data?.response));
    dispatch(showProgressBar(false));
    setNotificationList(data?.latest_data);
    setOldNotification(data?.old_data);

  };

  const addressErrorCallback = async data => {
    dispatch(showProgressBar(false));
    setNotificationList([]);
    setOldNotification([]);

    // setTimeout(() => {
    //   ShowToastMessage(data?.message || 'Something went wrong.');
    // }, 100);
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (loginCount == 1) {
      if (isFocused) {
        dispatch(showProgressBar(true));
        dispatch(() => {
          getUserNotificationList(
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
            backgroundColor: theme.colors.toolbar_icon_bg,
            borderRadius: 20
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <VegUrbanCommonToolBar
          title="Notifications"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
            fontFamily:FONTS?.bold,
            
          }}
        />



      </View>
      {/* <FlatList
        data={notificationList}
        style={{
          flex: 1,
        }}
        keyExtractor={item => item?._id.toString()}
        renderItem={({item, index}) => {
          return (
            <SwipeDelete
              item={item}
              navigation={navigation}
              onDelete={() => {
                // onCatRemoveClick(item?.id);
              }}
            />
          );
        }}
        ListEmptyComponent={() => {
          return (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.headingtext,
                {
                  color: theme?.colors?.white,
                  flexGrow: 1,
                  textAlign: 'center',
                  alignSelf: 'center',
                  marginTop: SIZES.width / 2,
                  fontFamily: FONTS.regular,
                },
              ]}>
              No notifications found!
            </Text>
          );
        }}
      /> */}
      {/* {staticNotifications && staticNotifications.length > 0 && ( */}

      <Text
        style={{
          fontFamily: FONTS?.bold,
          color: COLORS?.black,
          fontSize: 17,
          marginLeft: 20,
          marginVertical: 10
        }}
      >
        New
      </Text>
      {/* )} */}
      <FlatList
        data={NewNotifications}
        style={{
          marginTop: 0
        }}
        keyExtractor={(item) => item.id.toString()}
        // ListEmptyComponent={() => {
        //   return (
        //     <Text
        //       numberOfLines={1}
        //       ellipsizeMode="tail"
        //       style={[
        //         styles.headingtext,
        //         {
        //           color: theme?.colors?.white,
        //           flexGrow: 1,
        //           textAlign: 'center',
        //           alignSelf: 'center',
        //           marginTop: SIZES.width / 2,
        //           fontFamily: FONTS.regular,
        //         },
        //       ]}>
        //       No notifications found!
        //     </Text>
        //   );
        // }}
        renderItem={({ item }) => (
          <View
            style={{
              flexGrow: 1
            }}
          >
            <TouchableOpacity
              // activeOpacity={0.9}
              style={[
                styles.wrapper,
                {
                  // backgroundColor: theme?.colors?.bg,
                  marginHorizontal: 10
                  // flex:1
                },
              ]}
              onPress={() => {
                navigation.navigate('NotificationDetails', item)
              }}>
              {/* <Image
                source={{
                  uri: notification?.image
                }}
                style={styles?.imagestyle}
              />  */}
              <ImageBackground

                style={[styles.imagestyle, {
                  // backgroundColor:"#F2F4F4",
                  backgroundColor: theme?.colors?.gray,
                  alignItems: 'center',
                  // alignSelf: 'center',
                  justifyContent: 'center'
                }]}
              >
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 50,

                    alignSelf: 'center',
                    margin: 8
                    // resizeMode:'contain',
                    // borderRadius: 10,
                    // marginTop: 30
                  }}
                  // style={styles.itemImage}
                  source={{
                    uri: item?.image || "https://cdn-icons-png.flaticon.com/128/11222/11222376.png"
                  }}
                />
              </ImageBackground>
              <View style={{
                marginStart: 8,
                flex: 1,
                marginVertical: 5,
                marginLeft: 15
              }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode='tail'

                  style={[
                    styles.headingtext,
                    {
                      // marginTop: show ? 5 : 0,
                      color: theme?.colors?.white,
                      fontSize: 17
                    },
                  ]}>
                  {item?.message}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode='tail'
                  style={[styles.descText, {
                    color: theme?.colors?.textColor,
                    fontFamily: FONTS?.regular,
                    fontSize: 13
                  }]}>
                  {moment(item?.created_at).format('LLL')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* {staticNotifications && staticNotifications.length > 0 && ( */}
      <Text
        style={{
          fontFamily: FONTS?.bold,
          color: COLORS?.black,
          fontSize: 17,
          marginLeft: 20,
          marginVertical: 10
        }}
      >
        Old
      </Text>
      {/* )} */}
      <FlatList
        data={oldNotifi}
        style={{
          flexGrow: -20
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
          // style={styles.notificationItem}
          >
            <TouchableOpacity
              // activeOpacity={0.9}
              style={[
                styles.wrapper,
                {
                  // backgroundColor: theme?.colors?.bg,
                  marginHorizontal: 10
                  // flex:1
                },
              ]}
              onPress={() => {
                navigation.navigate('NotificationDetails', { notificationItem: item });
              }}>
              {/* <Image
                source={{
                  uri: notification?.image
                }}
                style={styles?.imagestyle}
              />  */}
              <ImageBackground

                style={[styles.imagestyle, {
                  // backgroundColor:"#F2F4F4",
                  backgroundColor: theme?.colors?.gray,
                  alignItems: 'center',
                  // alignSelf: 'center',
                  justifyContent: 'center'
                }]}
              >
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 50,

                    alignSelf: 'center',
                    margin: 8
                    // resizeMode:'contain',
                    // borderRadius: 10,
                    // marginTop: 30
                  }}
                  // style={styles.itemImage}
                  source={{
                    uri: item?.image || "https://cdn-icons-png.flaticon.com/128/11222/11222376.png"
                  }}
                />
              </ImageBackground>
              <View style={{
                marginStart: 8,
                flex: 1,
                marginVertical: 5,
                marginLeft: 15
              }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode='tail'

                  style={[
                    styles.headingtext,
                    {
                      // marginTop: show ? 5 : 0,
                      color: theme?.colors?.white,
                      fontSize: 17
                    },
                  ]}>
                  {item?.message}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode='tail'
                  style={[styles.descText, {
                    color: theme?.colors?.textColor,
                    fontFamily: FONTS?.regular,
                    fontSize: 13
                  }]}>
                  {moment(item?.created_at).format('LLL')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />

      {/*<FlatList*/}
      {/*  data={notificationList}*/}
      {/*  style={{*/}
      {/*    flex: 1,*/}
      {/*  }}*/}
      {/*  keyExtractor={item => item?._id?.toString()}*/}
      {/*  renderItem={({item}) => (*/}
      {/*    <View style={styles.notificationCategory}>*/}
      {/*      <Text*/}
      {/*        style={[*/}
      {/*          styles.categoryTitle,*/}
      {/*          {*/}
      {/*            color: theme?.colors?.textColor,*/}
      {/*          },*/}
      {/*        ]}>*/}
      {/*        {item.user_type}*/}
      {/*      </Text>*/}
      {/*    </View>*/}
      {/*  )}*/}
      {/*  ListEmptyComponent={() => {*/}
      {/*    return (*/}
      {/*      <Text*/}
      {/*        numberOfLines={1}*/}
      {/*        ellipsizeMode="tail"*/}
      {/*        style={[*/}
      {/*          styles.headingtext,*/}
      {/*          {*/}
      {/*            color: theme?.colors?.white,*/}
      {/*            flexGrow: 1,*/}
      {/*            textAlign: 'center',*/}
      {/*            alignSelf: 'center',*/}
      {/*            marginTop: SIZES.width / 2,*/}
      {/*            fontFamily: FONTS.regular,*/}
      {/*          },*/}
      {/*        ]}>*/}
      {/*        No notifications found!*/}
      {/*      </Text>*/}
      {/*    );*/}
      {/*  }}*/}
      {/*/>*/}
    </SafeAreaView>
  );
};

export default Notification;
const styles = StyleSheet.create({
  notificationCategory: {
    marginBottom: 0,
    marginTop: 10,
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 18,
    // color: COLORS?.black,
    fontFamily: FONTS?.medium,
  },
  headingtext: {
    fontFamily: FONTS?.bold,
    fontSize: 18,
    color: COLORS.black,
  },
  descText: {
    fontFamily: FONTS?.regular,
    fontSize: 15,
    marginTop: 3,
    color: COLORS.black,
  },
  notificationItem: {
    // backgroundColor:COLORS?.black,
    // padding: 5,
    // // marginBottom: 5,
    // marginHorizontal: 10,
    // marginVertical: 5,
    // paddingVertical: 20,
    // paddingHorizontal: 10,
    // elevation: 1,
    flex: 1
  },
  wrapper: {
    // elevation: 5,
    flex: 1,
    // backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 5,
    flexDirection: 'row',
  },
  imagestyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 5,
    marginLeft: 10,
  },
});
