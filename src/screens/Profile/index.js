import {
  Alert,
  I18nManager,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  ActivityIndicator
} from 'react-native';
import { Switch } from 'react-native-elements';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { FONTS } from '../../constants/Fonts';
import LogoutConfirmationModal from './LogoutConfirmationModal'; // Import your custom modal
import { CommonActions } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import ApiCall from '../../network/ApiCall';
import { API_END_POINTS } from '../../network/ApiEndPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  clearRealm,
  doSaveImage,
  getSavedImage,
} from '../../utils/RealmUtility';
import {
  loginUserSuccess,
  updateLoginCount,
  userTokenSuccess,
} from '../../redux/actions';
import React, { useContext, useState, useEffect } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import icons from '../../constants/icons';
import { updateCartDataLength } from '../../redux/actions/HomeApi';

import EvilIcons from 'react-native-vector-icons/EvilIcons'
import GlobalStyle from '../../styles/GlobalStyle';
import { SIZES, STRING } from '../../constants';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import { ShowToastMessage, ShowConsoleLogMessage } from '../../utils/Utility';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import VegUrbanFloatEditText from '../../utils/EditText/VegUrbanFloatEditText';
import themeContext from '../../constants/themeContext';
import Octicons from 'react-native-vector-icons/Octicons';
import { useTranslation } from 'react-i18next';
import { EventRegister } from 'react-native-event-listeners';
import { fetchUserData, fetchUserToken } from '../../redux/actions';
import VegUrbanProgressBar from '../../utils/VegUrbanProgressBar';


const Profile = ({ navigation, route }) => {
  const theme = useContext(themeContext);
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [mobile, setMobile] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)

  const [conPass, setConPass] = useState('');

  const [oldPassShow, setOldPassShow] = useState(true);
  const [newPassShow, setNewPassShow] = useState(true);
  const [conPassShow, setConPassShow] = useState(true);

  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  // const [selectedLanguage, setSelectedLanguage] = useState('');

  const { selectedLanguage } = route.params || { selectedLanguage: 'English(US)' };

  const userToken = useSelector(state => state.state?.userToken);
  const userData = useSelector((state) => state.state?.userData);
  const appPrimaryColor = useSelector((state) => state.state?.appPrimaryColor);

  console.log("token", userData)

  const isLoading = useSelector((state) => state.loading);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }
  const [userData111, setUserData] = useState({});
  // console.log("userdata profile", userData)

  useEffect(() => {
    // setUserName(userData?.name + '');

    getUserFromStorage();
  }, [userData]);

  const [image, setImage] = useState(null);

  const getUserFromStorage = async () => {
    // try {
    //   await AsyncStorage.getItem(USER_IMAGE, async (error, value) => {
    //     if (error) {
    //     } else {
    //       if (value !== null) {
    //         setImage(value);
    //       } else {
    //         setImage('');
    //         // navigation.replace('Login');
    //       }
    //     }
    //   });
    // } catch (err) {
    //   console.log('ERROR IN GETTING USER FROM STORAGE');
    // }
    getSavedImage()
      .then(res => {
        // ShowToastMessage('called');
        // ShowConsoleLogMessage(res[0]?.image);
        setImage(res[0]?.image);
      })
      .catch(error => {
        ShowConsoleLogMessage(error);
      })
      .finally(() => { });
  };

  // useEffect(() => {
  //   getUserProfile();
  // }, []);
  // const [profileGet, setProfileGet] = useState('');
  // console.log("list get profile", profileGet)
  // const getUserProfile = () => {
  //   // setLoading(true);
  //   try {
  //     // console.log("response axi os >>> ", JSON.stringify(API_END_POINTS.GET_PROFILE));

  //     ApiCall('get', null, API_END_POINTS.GET_PROFILE, {
  //       'Content-Type': 'application/json',
  //       'x-access-token': userToken || userData?.jwtoken,

  //     }).then( response => {

  //       if (response?.statusCode === 200) {

  //         // let obj = {
  //         //   jwtoken: userToken,
  //         //   response: response?.data?.response
  //         // }
  //         // console.log("Response get: ", JSON.stringify(obj));

  //         setProfileGet(response?.data?.response)
  //         // ShowToastMessage('Profile Updated successful')
  //       } else if (response?.statusCode === 500) {
  //         if (response.data?.message === "Token Mismatch") {
  //           Alert.alert(
  //             'Session Expired',
  //             'Your session has expired due to a security issue. Please log in again to continue using the application.',
  //             [
  //               {
  //                 text: 'OK',
  //                 onPress: () => {
  //                   clearUserToken();
  //                 },
  //               },
  //             ]
  //           );
  //         }
  //       } else {
  //       }
  //     })
  //       .catch(error => {
  //         console.log("error axios -> ", error);
  //       }).finally(() => {
  //         setLoading(false);
  //       });
  //   } catch (error) {
  //     ShowToastMessage(`You selected : ${error.message}`);
  //     setLoading(false);
  //   }
  // };


  const showLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  const hideLogoutModal = () => {
    setLogoutModalVisible(false);
  };
  const dispatch = useDispatch()

  // useEffect(() => {
  //   setLogoutModalVisible(!isLogoutModalVisible)
  // }, [userData])


  // useEffect(() => {
  //   setTimeout(async () => {
  //     await getUserFromStorage();
  //   }, 0);
  // }, []);



  // const handleLogoutConfirm = () => {

  //   Alert.alert(
  //     'Logout',
  //     'Are you sure want to logout',
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => {
  //           // handleBackButton()
  //           return null;
  //         },
  //       },
  //       {
  //         text: 'Confirm',
  //         onPress: async () => {
  //           try {
  //             // Clear all user data from AsyncStorage
  //             await AsyncStorage.clear();

  //             // Reset the navigation stack to the 'Auth' screen
  //             navigation.dispatch(
  //               CommonActions.reset({
  //                 index: 0,
  //                 routes: [{ name: 'Auth' }],
  //               })
  //             );
  //           } catch (error) {
  //             console.error('Error logging out:', error);
  //           }
  //         },
  //       },
  //     ],
  //     { cancelable: false },
  //   );
  // };

  // const handleLogoutConfirm = () => {
  //   Alert.alert(
  //     'Logout',
  //     'Are you sure want to logout',
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => {
  //           return null;
  //         },
  //       },
  //       {
  //         text: 'Confirm',
  //         onPress: async () => {
  //           try {
  //             dispatch(fetchUserToken(null));
  //             dispatch(fetchUserToken(''));
  //             await AsyncStorage.clear();
  //             navigation.dispatch(
  //               CommonActions.reset({
  //                 index: 0,
  //                 routes: [{ name: 'Auth' }],
  //               }),
  //             );
  //           } catch (error) {
  //             console.error('Error logging out:', error);
  //           }
  //         },
  //       },
  //     ],
  //     { cancelable: false },
  //   );
  // };

  const handleLogoutConfirm = () => {
    // Handle logout logic here
    // For example, navigate to the login screen
    dispatch(loginUserSuccess({}));
    dispatch(userTokenSuccess(''));
    dispatch(updateLoginCount(0));
    dispatch(updateCartDataLength(0));
    EventRegister.emit(STRING.app_theme, false);
    AsyncStorage.setItem(STRING.app_theme, false + '');
    clearRealm();
    AsyncStorage.clear();
    navigation.replace('Auth');
  };


  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Veg urban | A UI KIT framework for building apps',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const closeConfirmModal = () => {
    setShowConfirm(!showConfirm);
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
            backgroundColor: theme?.colors?.bg_color_onBoard,
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
          title={'Profile'}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
            marginStart: 20,
            fontFamily: FONTS?.bold,
          }}
        />
        {/*<MaterialCommunityIcons*/}
        {/*  name={'dots-horizontal-circle-outline'}*/}
        {/*  size={26}*/}
        {/*  // color={COLORS.colorPrimary}*/}
        {/*  style={{*/}
        {/*    marginEnd: 10,*/}
        {/*  }}*/}
        {/*  color={theme?.colors?.textColor}*/}
        {/*/>*/}
      </View>
      {loading ? (

        <VegUrbanProgressBar loading={loading} />

        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //   <Text>Loading...</Text>
        // </View>
      ) : (
        <ScrollView>
          {/* <View
            style={styles?.divLine}
          /> */}
          <View
            style={[
              styles.wrapper,
              {
                // backgroundColor: theme?.colors?.bg_color,
              },
            ]}>
            <View style={[
              // GlobalStyle.flexRowAlignCenter
              , {
                marginTop: 2,
                flexDirection: 'row',
                // justifyContent:'space-evenly'
              }]
            }>
              <Image
                source={{
                  uri: userData?.image || image
                    || 'https://img.freepik.com/premium-vector/people-ribbon-logo-modern-leadership-logo-human-charity-logo_327835-2463.jpg'
                }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 20
                }}
              />

              <View
                style={{
                  // alignSelf: 'flex-start',
                  marginLeft: 15,
                  // backgroundColor:'red',
                  flex: 1
                }}>
                <Text
                  // numberOfLines={1}

                  style={[
                    GlobalStyle.bothSideMediumText,
                    {
                      color: theme?.colors?.textColor,
                      fontSize: 18,
                      fontFamily: FONTS?.bold,
                      // maxWidth: '82%'
                      //  flexGrow:1
                    },
                  ]}>

                  {/* {userData?.name || userData?.response?.name} */}
                  Andrew Ainsley
                  {/* {STRING.is_login} */}
                </Text>
                <Text
                  numberOfLines={1}

                  style={[
                    GlobalStyle.bothSideText,
                    {
                      color: theme?.colors?.textColor,
                      fontSize: 14,
                      fontFamily: FONTS?.medium,
                      // maxWidth: '80%'

                    },
                  ]}
                >
                  testing_demo@gmail.com
                  {/* {userData?.email || userData?.response?.email} */}
                </Text>
              </View>

              <View
                style={{
                  // flexGrow: 1,
                  // backgroundColor:'yellow',
                  alignSelf: 'flex-start',
                  alignItems: 'flex-end',
                  marginTop: 10
                }}
              >
                <ToolBarIcon
                  title={Feather}
                  iconName={'edit-3'}
                  icSize={25}
                  icColor={theme?.colors?.colorPrimary}
                  style={{
                    marginEnd: 10,
                    backgroundColor: theme?.colors?.toolbar_icon_bg,
                  }}
                  onPress={() => {
                    navigation.navigate('SignupNew');
                  }}
                />
              </View>
            </View>

          </View>

          <View
            style={[styles?.divLine, {
              marginTop: 15,
              borderColor: theme?.colors?.textColor

            }]}
          />
          <View
            style={[
              GlobalStyle.bgWrapper,
              {
                backgroundColor: theme?.colors?.bg_color_onBoard,
              },
            ]}>

            <ItemView
              title="Payment Method"
              // title={STRING.notifications}
              onPress={() => {
                navigation.navigate('Payment');
              }}
              icon={
                <AntDesign
                  name={'wallet'}
                  size={25}
                  color={theme?.colors?.textColor}
                />
              }
            />
            <ItemView
              title="Special Offers & Promo"
              // title={STRING.notifications}
              onPress={() => {
                // ShowToastMessage('Cooming Soon')
                navigation.navigate('PromoGetCode');
              }}
              icon={
                <AntDesign
                  name={'disconnect'}
                  size={25}
                  color={theme?.colors?.textColor}
                />
              }
            />
            <ItemView
              title="Transaction History"
              // title={STRING.notifications}
              onPress={() => {
                navigation.navigate('Transaction');
              }}
              icon={
                <FontAwesome5
                  name={'comment-dollar'}
                  size={25}
                  color={theme?.colors?.textColor}
                />
              }
            />

            <View
              style={[styles?.divLine, {
                marginTop: 15,
                marginHorizontal: -20,
                marginBottom: 15,
                borderColor: theme?.colors?.textColor
              }]}
            />
            <ItemView
              title="Profile"
              // title={STRING.notifications}
              onPress={() => {
                navigation.navigate('SignupNew');
              }}
              icon={
                <FontAwesome
                  name={'user-o'}
                  size={25}
                  color={theme?.colors?.textColor}
                />
              }
            />
            <ItemView
              title="Address"
              // title={STRING.notifications}
              onPress={() => {
                // ShowToastMessage('Coming soon!');

                navigation.navigate('Address');
              }}
              icon={
                <SimpleLineIcons

                  name={'location-pin'}
                  size={25}
                  color={theme?.colors?.textColor}
                />
              }
            />
            <ItemView
              title='Notification'
              onPress={() => {
                navigation.navigate('Notification');
                // ShowToastMessage('Coming soon!');
              }}
              icon={
                <Ionicons
                  name={'notifications-outline'}
                  size={25}
                  color={theme?.colors?.textColor}
                />
              }
            />

            <ItemView
              title="Security"
              onPress={() => {
                ShowToastMessage('Coming soon!');

                // navigation.navigate('Order');
              }}
              icon={
                <MaterialIcons

                  name={'security'}
                  size={22}
                  color={theme?.colors?.textColor}
                />
              }
            />
            <ItemView
              title="Change Password"
              onPress={() => {
                // ShowToastMessage('Coming soon!');
                navigation.navigate('PasswordConform');

              }}
              icon={
                <AntDesign

                  name={'lock'}
                  size={22}
                  color={theme?.colors?.textColor}
                />
              }
            />
            <ItemView
              title='langugae'
              onPress={() => {
                // navigation.navigate('Produxts');
                ShowToastMessage('Coming soon!');
              }}

              icon={
                <FontAwesome
                  name={'language'}
                  size={25}
                  color={theme?.colors?.textColor}
                />
              }

            />



            <ItemView
              title='Help Center'
              onPress={() => {
                // navigation.navigate('');
                ShowToastMessage('Coming soon!');
              }}
              icon={
                <MaterialCommunityIcons

                  name={'cast-audio-variant'}
                  size={25}
                  color={theme?.colors?.textColor}
                />
              }
            />

            {/* <ItemView
            title={STRING.language}
            onPress={() => {
              navigation.navigate('Language');
              // ShowToastMessage('Coming soon!');
            }}

            icon={

              <FontAwesome name={'language'} size={20} color={theme?.colors?.grey} />


            }
          /> */}
            {/* <TouchableOpacity activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('Language');
                // ShowToastMessage('Coming soon!');
              }}
              style={[
                styles.itemWrapper
                ,
                {
                  // flexDirection:'row',
                  justifyContent: 'space-between'

                }]}>
              <View
                style={[
                  // styles.itemIcon,
                  {
                    marginEnd: 10,
                    // width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',

                    // justifyContent:'space-between'
                    flexDirection: 'row'

                  },
                ]}>
                <FontAwesome name={'language'} size={20}
                  color={COLORS?.white}

                  style={{
                    marginStart: 12
                  }}
                />
                <Text
                  style={[
                    styles.itemText,
                    {
                      color: COLORS?.white,
                      marginStart: 22,

                    },
                  ]}>
                  Change Language
                </Text>

              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginEnd: 10,
                  alignItems: 'center',
                  justifyContent: 'center'

                }}>
                <Text style={[
                  styles.itemText,
                  {
                    color: COLORS?.white,
                    marginEnd: 12
                  },
                ]}>{selectedLanguage}</Text>

                <Ionicons
                  name={'chevron-forward'}
                  size={18}
                  color={COLORS?.white}
                  style={{
                    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1, }],
                    marginTop: 5

                  }}
                />
              </View>

            </TouchableOpacity> */}

            <ItemView
              onPress={() => {
                navigation.navigate('PrivacyPolicy');
              }}
              title={STRING.privacy_policy}
              icon={<Ionicons name={'lock-closed-outline'} size={25}
                color={theme?.colors?.textColor}
              />}
            />
            {/* <ItemView
              onPress={() => {
                // navigation.navigate('PrivacyPolicy');
              }}
              title='Commission History'
              icon={<Feather name={'crosshair'} size={25}
                color={COLORS?.white}
              />}
            /> */}




            {/* <ItemView
            onPress={showLogoutModal}


            title={STRING.logout}
            show={true}
            icon={<Feather name={'log-out'} size={20} color={theme?.colors?.grey} />}
          /> */}

            <TouchableOpacity activeOpacity={0.8} style={styles.itemWrapper}
              onPress={showLogoutModal}
            >
              <View
                style={[
                  styles.itemIcon,
                  {
                    marginEnd: 10,
                  },
                ]}>
                <Feather name={'log-out'} size={20}
                  color={theme?.colors?.textColor}
                />
              </View>
              <Text
                style={[
                  styles.itemText,
                  {
                    color: theme?.colors?.textColor,
                    // fontFamily: FONTS?.medium
                  },
                ]}>
                {STRING.logout}</Text>
              <View
                style={{
                  flex: 1,
                }}
              />

            </TouchableOpacity>

            {/* <TouchableOpacity
            onPress={showLogoutModal}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              backgroundColor: theme?.colors?.bg,
            }}
          >
            <Feather name={'log-out'} size={20} color={theme?.colors?.grey} />
            <Text style={{ marginLeft: 10 }}>{STRING.logout}</Text>
          </TouchableOpacity> */}

            {/* Render the logout confirmation modal */}
            <View style={{ flex: 1 }}>
              <LogoutConfirmationModal
                visible={isLogoutModalVisible}
                onCancel={hideLogoutModal}
                onConfirm={handleLogoutConfirm}
              />
            </View>
          </View>


        </ScrollView>
      )}



    </SafeAreaView>
  );
};

export default Profile;

const ItemView = ({ icon, title, onPress, show }) => {
  const theme = useContext(themeContext);

  return (

    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.itemWrapper}>
      <View
        style={[
          styles.itemIcon,
          {
            marginEnd: 10,
          },
        ]}>
        {icon}
      </View>

      <Text style={[styles.itemText, {
        color: theme?.colors?.textColor
      }]}>{title || 'Home'}</Text>

      <View
        style={{
          flex: 1,
        }}
      />
      {show ? null : (
        <View
          style={[
            styles.itemIcon,
            {
              marginStart: 10,
            },
          ]}>
          <Ionicons
            name={'chevron-forward'}
            size={18}
            color={COLORS?.white}
            style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#00000080',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: SIZES.width,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 75,
  },
  wrapper: {
    padding: 10,
    marginTop: 10,
    // backgroundColor: COLORS.colorPrimaryLight,
    // backgroundColor: COLORS.red,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    textAlign: 'center',

    flex: 1,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 100,


  },
  divLine: {
    borderWidth: 0.5,
    backgroundColor: COLORS.white,
    marginBottom: 5,
    borderColor: COLORS?.white,
    flex: 1,

  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 30,
    marginBottom: 10,
    paddingVertical: 5,
  },
  itemIcon: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',

  },
  itemText: {
    fontFamily: FONTS?.regular,
    fontSize: 16,
    color: COLORS.white,
    // flex: 1,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    alignItems: 'flex-start',
  },
});

