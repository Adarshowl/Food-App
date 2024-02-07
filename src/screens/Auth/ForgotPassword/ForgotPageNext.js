import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../constants/Colors';
import GlobalStyle from '../../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanCommonBtn from '../../../utils/VegUrbanCommonBtn';
import OtpInputs from 'react-native-otp-inputs';
import { ShowToastMessage, validateFieldNotEmpty } from '../../../utils/Utility';
import themeContext from '../../../constants/themeContext';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { FONTS } from '../../../constants/Fonts';
import ToolBarIcon from '../../../utils/ToolBarIcon';

const ForgotPageNext = ({ navigation }) => {
  const route = useRoute();
  const userEmail = route.params?.userEmail || '';

  const theme = useContext(themeContext);
  const { t, i18n } = useTranslation();
  const [focused, setFocused] = React.useState(false);
  const [isOTPValid, setIsOTPValid] = useState(false);

  const [mobile, setMobile] = useState('');
  const [refer, setRefer] = useState('');
  const [email, setEmail] = useState('');
  // const [focused, setFocused] = useState(false);
  const phoneInput = useRef(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [focusedInput, setFocusedInput] = useState(-1); // Initialize with an invalid value

  const [show, setShow] = useState(false);
  const [showAfter, setShowAfter] = useState(false);
  const [newPassShow, setNewPassShow] = useState(true);
  const [conPassShow, setConPassShow] = useState(true);
  const [newPass, setNewPass] = useState('');
  const [conPass, setConPass] = useState('');

  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30); // Set the initial timer value
  const [isTimerActive, setIsTimerActive] = useState(true);

  const formatEmail = userEmail => {
    if (userEmail.length <= 3) {
      return userEmail;
    }
    const firstThree = userEmail.substring(0, 3);
    const dotDots = '*****';
    const atIndex = userEmail.indexOf('@');
    const domain = userEmail.substring(atIndex);
    return `${firstThree}${dotDots}${domain}`;
  };
  const error = '';
  const [code, setCode] = useState('');
  const handleInputFocus = index => {
    setFocusedInput(index);
  };

  // Function to handle input blur
  const handleInputBlur = () => {
    setFocusedInput(-1); // Reset to an invalid value when the input is blurred
  };

  const getBorderWidth = () => {
    if (error) {
      return 1;
    }
    if (focused) {
      return 1.5;
    } else {
      return 0.5;
    }
  };

  const getBorderColor = () => {
    if (error) {
      return COLORS.red;
    }

    if (focused) {
      return theme?.colors?.colorPrimary;
    } else {
      return COLORS.gray;
    }
  };

  const getBgColor = () => {
    if (error) {
      return COLORS.red;
    }
    if (focused) {
      return theme?.colors?.bg_color;
    } else {
      // return COLORS.lightest_gray1;
      // return COLORS.bg_color;
      return theme?.colors?.bg_color;
    }
  };
  // const closeSignUpModal = () => {
  //   setShow(!show);

  // };

  const onSubmitClick = () => {
    handleOTPpassword();
  };
  const handleOTPpassword = () => {
    if (validateFieldNotEmpty(code)) {
      ShowToastMessage('OTP is required');
    } else {
      navigation.navigate('PasswordConform');
    }
  };
  const handleOTPChange = otp => {
    setOtp(otp);
    setIsOTPValid(code.length === 4 && /^\d{4}$/.test(code));
  };

  // Function to start the timer
  const startTimer = () => {
    setIsTimerActive(true);
    setTimer(30); // Reset the timer to the initial value
  };

  // Function to handle OTP resend
  const handleResendOTP = () => {
    // Add your logic to resend OTP here
    // You can stop the timer, send a new OTP, and start the timer again
    startTimer();
  };

  useEffect(() => {
    let interval;
    if (isTimerActive) {
      interval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          setIsTimerActive(false);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    // Cleanup function
    return () => clearInterval(interval);
  }, [timer, isTimerActive]);

  // const startTimer = () => {
  //   setTimerActive(true);
  //   setTimer(60);

  //   const interval = setInterval(() => {
  //     if (timer > 0) {
  //       setTimer(timer - 1);
  //     } else {
  //       setTimerActive(false);
  //       clearInterval(interval);
  //     }
  //   }, 1000);
  // };

  // useEffect(() => {
  //   if (timerActive) {
  //     startTimer();
  //   }
  // }, [timerActive]);

  // const handleResendCode = () => {
  //   // Add logic to resend the code here
  //   // You can also add a condition to prevent resending if the timer is still active
  //   if (timerActive) {
  //     // Resend the code
  //     startTimer(); // Restart the timer
  //   }
  // };
  // const inputFromChildComponent = (combinedValueArray, currentValue, refForTheCurrentValue) => {
  //   console.log(combinedValueArray, currentValue, refForTheCurrentValue)
  // }
  const otpInput1Ref = useRef(null);
  const otpInput2Ref = useRef(null);
  const otpInput3Ref = useRef(null);
  const otpInput4Ref = useRef(null);

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainer,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>

      <View>
        <View
          style={{
            borderBottomEndRadius: 30,
            borderBottomLeftRadius: 30,
            flexDirection: 'row',
            borderBottomRightRadius: 30,

            height: 50,
            marginTop: 30,
            alignItems: 'center',
            // justifyContent: 'space-between',
          }}
        >
          <ToolBarIcon
            title={Ionicons}
            iconName={'chevron-back'}
            icSize={20}
            borderRadius={20}
            borderWidth={0.2}
            icColor={theme?.colors?.textColor}
            style={{
              borderRadius: 20,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          />

        </View>
      </View>
      <ScrollView
        style={[
          GlobalStyle.loginModalBg,
          {
            // alignItems: 'center',
            // paddingHorizontal: 15,
            // backgroundColor: theme?.colors?.bg_gray,
            backgroundColor: theme.colors?.bg_color_onBoard,
          },
        ]}>

        <View
          style={[
            GlobalStyle.loginModalBg,
            {
              // alignItems: 'center',
              // paddingHorizontal: 10,
              // borderRadius:10,
              // marginVertical:10,
              // paddingVertical:60,
              // marginTop:'15%',
              // padding:20,
              // elevation:10,
              // marginHorizontal: -10,
              backgroundColor: theme.colors?.bg_color_onBoard,

              // backgroundColor: theme?.colors?.bg_color_onBoard,
            },
          ]}>
          <View
            style={{
              marginTop: '10%',
              // alignItems: 'center',
            }}>
            <Text
              style={[
                styles.heading,
                {
                  // marginStart: 10,
                  color: theme?.colors?.textColor,
                  marginBottom: 20
                },
              ]}
            >
              {!show ? t('Verification') : ' '}
            </Text>

            <View
              style={{
                // flexDirection: 'row',
                // alignItems: 'center',
                marginBottom: 20
              }}>
              <Text
                numberOfLines={2}
                style={[
                  {
                    color: theme?.colors?.textColor,
                    fontFamily: FONTS.regular,
                    fontSize: 14

                  },
                ]}>
                {show ? '' : 'We sent you a verification code to'}
                {/* {!show ? '' : `Code has been sent to ${userEmail}`} */}
              </Text>
              <View style={{
                flexDirection: 'row',
                marginBottom: 20
              }}>
                <Text
                  numberOfLines={2}
                  style={[
                    {
                      color: theme?.colors?.textColor,
                      fontFamily: FONTS.regular,
                      fontSize: 16

                    },
                  ]}>
                  your email
                </Text>
                <Text
                  numberOfLines={1}
                  style={[
                    {
                      color: theme?.colors?.textColor,
                      fontFamily: FONTS.bold,
                      fontSize: 16,
                      marginLeft: 5

                    },
                  ]}>
                  testing@gmail.com
                </Text>
              </View>
            </View>

            <OtpInputs
              // code={otp}
              // handleChange={handleOTPChange}

              handleChange={code => setCode(code)}
              numberOfInputs={4}
              inputContainerStyles={{
                // borderWidth: 0.5,
                borderColor: focused ? COLORS.gray : COLORS.bg_color,
                marginHorizontal: 10,
                height: 60,
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                borderColor: getBorderColor(),

                backgroundColor: getBgColor(),
                borderWidth: getBorderWidth(),

                // backgroundColor: focused ? COLORS.gray : COLORS.bg_color,
                // elevation: 5,
                color: theme?.colors?.textColor,
              }}
              selectTextOnFocus={() => {
                setFocused(false);
              }}
              onBlur={() => {
                setFocused(true);
              }}
              inputStyles={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                color: COLORS?.black,
              }}
            />
            {/* <View style={styles.otpContainer}>
            </View> */}
            {isTimerActive ? (
              <View>
                <Text
                  style={[
                    styles.resend,
                    {
                      color: theme?.colors?.textColor,
                      fontSize: 16,
                    },
                  ]}>
                  {/* Resend OTP in: {timer} seconds</Text> */}
                  Resend OTP in
                  <Text
                    style={{
                      color: theme?.colors?.textColor,
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    {' '}
                    {timer}{' '}
                  </Text>{' '}
                  seconds
                  {/* Resend OTP in: {timer} seconds */}
                </Text>
              </View>
            ) : (
              <TouchableOpacity onPress={handleResendOTP}>
                <Text
                  style={[
                    styles.resend,
                    {
                      // color:'#272727',
                      color: theme?.colors?.textColor,
                      fontSize: 18,
                      // fontWeight: '700'
                    },
                  ]}>
                  Resend Code
                </Text>
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity
                   onPress={handleResendCode}

         >
         <Text
            style={[
              styles.resend,
              {
                color: theme?.colors?.textColor,
                fontSize:18
              },
            ]}>
            {!show ? t('Resend Code') : ''}
          </Text>
         </TouchableOpacity> */}
          </View>
          {/* <VegUrbanCommonBtn
            height={55}
            width={'100%'}
            borderRadius={30}
            textSize={16}
            fontWeight={'bold'}
            marginTop={40}
            // marginTop={'70%'}
            text={t('Next')}
            justifyContent={'flex-end'}
            alignItems={'flex-end'}
            textColor={theme.colors?.btnTextColor}
            backgroundColor={theme?.colors?.colorPrimary}
            onPress={() => {
              navigation.navigate('Login');

              // if (otp.length === 4 && /^\d{4}$/.test(otp)) {
              //   navigation.navigate('MainContainer');
              //   // closeSignUpModal();
              // } else {
              //   ShowToastMessage('Please enter a valid 4-digit OTP');
              // }
            }}

            // onPress={onSubmitClick}
            textStyle={{
              fontFamily: FONTS?.semi_old

              // textAlign:'center',
              // alinItem:'center'
            }}
          /> */}
        </View>

        {/* {renderSignUpModal()} */}
      </ScrollView>
      <View style={{
        flex: 1,
        marginHorizontal: 20
      }}>
        <VegUrbanCommonBtn
          height={55}
          width={'100%'}
          borderRadius={30}
          textSize={16}
          fontWeight={'bold'}
          // marginHorizontal={20}
          // marginTop={'70%'}
          text={t('Next')}
          justifyContent={'flex-end'}
          alignItems={'flex-end'}
          textColor={theme.colors?.btnTextColor}
          backgroundColor={theme?.colors?.colorPrimary}
          onPress={() => {
            navigation.navigate('Login');

            // if (otp.length === 4 && /^\d{4}$/.test(otp)) {
            //   navigation.navigate('MainContainer');
            //   // closeSignUpModal();
            // } else {
            //   ShowToastMessage('Please enter a valid 4-digit OTP');
            // }
          }}
          style={{
            flex: 1,
            marginHorizontal: 20
          }}
          // onPress={onSubmitClick}
          textStyle={{
            fontFamily: FONTS?.semi_old

            // textAlign:'center',
            // alinItem:'center'
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPageNext;

const styles = StyleSheet.create({
  backIcon: {
    // marginTop: 18,
    marginStart: 15,
    paddingVertical: 5,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  head: {
    // marginTop: 15,
    paddingVertical: 5,
    fontFamily: 'OpenSans-Mulish',
    textAlign: 'center',
    fontSize: 22,
    color: COLORS.black,
    // marginTop: 8,
    // marginBottom: 8,
    fontWeight: 'bold',
    // marginBottom: 20
    marginLeft: 15,
  },
  resend: {
    marginTop: 15,
    paddingVertical: 5,
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    fontSize: 22,
    color: COLORS.black,
    marginTop: 20,
    // marginBottom: 8,
    // marginBottom: 20
  },
  txt: {
    marginTop: 15,
    paddingVertical: 20,
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    fontSize: 17,
    color: COLORS.black,
    // marginTop: 20,
    marginBottom: 20,
    // fontWeight: 'bold',
    // marginBottom: 20
  },
  heading: {
    fontFamily: FONTS?.bold,
    fontSize: 23,

  },
  app_logo: {
    height: 200,
    resizeMode: 'stretch',
    alignSelf: 'center',
    width: '60%',
    marginTop: 30,
    marginBottom: 20,
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
  // textBox: {
  //   width: 50, // Adjust the width as needed
  //   height: 50, // Adjust the height as needed
  //   borderWidth: 1,
  //   borderColor: 'gray',
  //   textAlign: 'center',
  //   fontSize: 20,
  // },
});
