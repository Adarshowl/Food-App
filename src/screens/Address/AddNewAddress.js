import React, { useContext, useState } from 'react';
import {
  I18nManager,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';
import { FONTS } from '../../constants/Fonts';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import { icons, SIZES } from '../../constants';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { images } from '../../constants';
import { COLORS } from '../../constants/Colors';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanEditText from '../../utils/EditText/VegUrbanEditText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import {
  ShowConsoleLogMessage,
  ShowToastMessage,
  validateEmail,
  validateFieldNotEmpty,
} from '../../utils/Utility';
import themeContext from '../../constants/themeContext';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAddress } from '../../redux/actions/CartApi';
import { showProgressBar } from '../../redux/actions';
import ToolBarIcon from '../../utils/ToolBarIcon';

const AddNewAddress = ({ navigation }) => {
  const theme = useContext(themeContext);
  const [addressDefault, setAddressDefault] = useState(false);

  const { t, i18n } = useTranslation();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [addressDetail, setAddressDetail] = useState('');

  const dispatch = useDispatch();
  const userToken = useSelector(state => state?.state?.userToken);

  const handleSubmit = () => {
    if (validateFieldNotEmpty(name)) {
      ShowToastMessage('Please enter name');
    } else if (validateFieldNotEmpty(email)) {
      ShowToastMessage('Please enter email');
    } else if (!validateEmail(email)) {
      ShowToastMessage('Please enter valid email');
    } else if (validateFieldNotEmpty(mobile)) {
      ShowToastMessage('Please enter mobile');
    } else if (mobile?.length < 10) {
      ShowToastMessage('Please enter valid mobile number');
    } else if (validateFieldNotEmpty(addressDetail)) {
      ShowToastMessage('Please enter address detail');
    } else {
      dispatch(showProgressBar(true));

      dispatch(() => {
        addUserAddress(
          dispatch,
          navigation,
          userToken,
          name,
          email,
          mobile,
          addressDetail,
          addressDefault,
          successCallback,
          errorCallback,
          BannerErrorCallback,
        );
      });
    }
  };

  const successCallback = async data => {
    // ShowConsoleLogMessage('successCallback called after');
    dispatch(showProgressBar(false));
    navigation.goBack();
    ShowToastMessage(data?.message || 'Something went wrong.');
  };

  const errorCallback = async data => {
    dispatch(showProgressBar(false));
    setTimeout(() => {
      ShowToastMessage(data?.message || 'Something went wrong.');
    }, 100);
  };

  const BannerErrorCallback = error => {
    ShowConsoleLogMessage('Banner call back called');
    dispatch(showProgressBar(false));
    ShowConsoleLogMessage(error);
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainer,
        {
          backgroundColor: theme?.colors?.colorPrimary,
        },
      ]}>
      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme?.colors?.bg_color_onBoard,
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
        <VegUrbanCommonToolBar
          title="New Address"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
          }}
        />
      </View>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        style={[
          {
            backgroundColor: theme.colors?.bg_color_onBoard,
            flex: 1,
          },
        ]}>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Search');
          }}
          style={[
            styles.inputWrapper,
            {
              backgroundColor: theme?.colors?.bg_color_onBoard,
              // marginTop: 20
              // borderWidth: 0.5,
              // borderColor: theme?.colors?.grey,
            },
          ]}>
          {/*<AntDesign name={'search1'} size={20} color={theme?.colors?.grey} />*/}
          <Image
            source={icons.search}
            style={{
              height: 18,
              tintColor: theme?.colors?.white,
              width: 18,
            }}
          />
          <TextInput
            editable={false}
            style={[
              styles.input,
              {
                color: theme?.colors?.white,
                textAlign: I18nManager.isRTL ? 'right' : 'left',
              },
            ]}
            placeholder={'Search a place..'}
            placeholderTextColor={theme?.colors?.gray}
          />
        </TouchableOpacity>
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
            <View style={{

            }}>
              <View style={{
                flex: 1,
                // borderTopLeftRadius: 20,
                // borderTopRightRadius: 20,
              }}>
                <View style={{
                  marginTop: 20,
                  flex: 1,
                  marginHorizontal: 20,
                }}>
                  <View
                    style={{
                      width: '40%',
                      height: 6,
                      backgroundColor: theme?.colors?.white,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginBottom: 20,
                      borderRadius: 10
                    }}
                  />

                  <View style={{
                    backgroundColor: theme?.colors?.bg,
                    borderRadius: 10,
                    // marginHorizontal:20,
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    paddingVertical: 15,
                    marginVertical: 20
                  }}>
                    <Ionicons
                      name="location"
                      size={25}
                      color={theme?.colors?.colorPrimary}
                    />
                    <Text
                      style={{
                        fontSize: 17,
                        color: theme?.colors?.textColor,
                        fontFamily: FONTS?.regular,
                        marginLeft: 15
                      }}
                    >NYC,5TH Avenue 128</Text>
                  </View>

                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        {/* <Image source={images.address} style={styles.app_logo} /> */}

        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
          }}>
          <VegUrbanCommonBtn
            height={55}
            width={'100%'}
            borderRadius={20}
            textSize={14}
            textColor={theme?.colors?.text}
            text={'Save Address '}
            backgroundColor={theme?.colors?.colorPrimary}
            onPress={() => {
              handleSubmit();
              // navigation.goBack('Address');
              // ShowToastMessage('Add Address');
            }}
            textStyle={{
              fontFamily: FONTS?.bold,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddNewAddress;

const styles = StyleSheet.create({
  backIcon: {
    // marginTop: 18,
    marginStart: 15,
    paddingVertical: 5,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  divLine: {
    height: 0.5,
    width: '95%',
    backgroundColor: COLORS.gray,
    alignSelf: 'center',
    marginVertical: 5,
    marginTop: 10,
  },
  head: {
    // marginTop: 15,
    paddingVertical: 5,
    fontFamily: FONTS?.bold,
    // textAlign: 'center',
    fontSize: 20,
    color: COLORS.black,
    // marginTop: 8,
    // marginBottom: 8,
    // marginBottom: 20
    // marginLeft: 20
  },
  resend: {
    paddingVertical: 5,
    fontFamily: 'OpenSans-Mulish',
    textAlign: 'center',
    fontSize: 22,
    color: COLORS.black,
    marginTop: 20,
    // marginBottom: 8,
    // marginBottom: 20
  },
  txt: {
    marginTop: 10,
    paddingVertical: 20,
    fontFamily: FONTS.medium,
    // textAlign: 'center',
    fontSize: 18,
    color: COLORS.black,
    // marginTop: 20,
    marginBottom: 10,
    // marginBottom: 20
  },
  heading: {
    fontFamily: 'OpenSans-Mulish',
    // textAlign: 'center',
    fontSize: 20,
    color: COLORS.gray,
    marginTop: 8,
    // fontWeight: 'bold',
    marginBottom: 20,
  },
  app_logo: {
    height: 320,
    resizeMode: 'cover',
    // alignSelf: 'center',
    width: '100%',
    // marginTop: 30,
    // marginBottom: 20
  },
  forgot_text: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: COLORS.black,
    marginVertical: 25,
    textDecorationLine: 'underline',
  },
  resendWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  resendWrapperText: {
    fontFamily: 'OpenSans-Medium',
    color: COLORS.colorPrimary,
    marginStart: 5,
  },
  msg_privacy_terms: {
    color: COLORS.black,
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    flex: 1,
  },
  textBox: {
    // borderWidth:0.2,
    width: '20%',
    height: 50,
    marginHorizontal: 4,
    borderRadius: 10,
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
  },
  textBoxes: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: '90%',
    marginVertical: 12,
    paddingHorizontal: 10,
    height: 55,
    fontFamily: 'Quicksand-Regular',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: COLORS.black,
    // paddingHorizontal: 5,
    marginHorizontal: 20,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginTop: 5,
    height: 45,
    elevation: 3,
    width: '85%',
    marginBottom: 20
    // borderWidth:0.1
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    paddingStart: 5,
    marginStart: 5,
  },
});
