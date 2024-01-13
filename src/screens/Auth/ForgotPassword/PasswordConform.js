import React, { useContext, useRef, useState, useEffect } from 'react';
import {
    Image,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    I18nManager,
    ScrollView,
    Alert
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import NextTextInput from 'react-native-next-input'
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import { FONTS } from '../../../constants/Fonts';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather'
import { STRING, images } from '../../../constants';
import { COLORS } from '../../../constants/Colors';
import GlobalStyle from '../../../styles/GlobalStyle';
import VegUrbanEditText from '../../../utils/EditText/VegUrbanEditText'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import VegUrbanFloatEditText from '../../../utils/EditText/VegUrbanFloatEditText';
import VegUrbanCommonBtn from '../../../utils/VegUrbanCommonBtn';
import OtpInputs from 'react-native-otp-inputs';
import { ShowToastMessage, validateFieldNotEmpty, ShowConsoleLogMessage } from '../../../utils/Utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import themeContext from '../../../constants/themeContext';
import { useTranslation } from 'react-i18next';
import { color } from 'react-native-elements/dist/helpers';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ApiCall from '../../../network/ApiCall';
import { fetchUserData, fetchUserToken } from '../../../redux/actions';
import { API_END_POINTS } from '../../../network/ApiEndPoints';
import VegUrbanProgressBar from '../../../utils/VegUrbanProgressBar';


const PasswordConform = ({ navigation }) => {

    const theme = useContext(themeContext);
    const [addressDefault, setAddressDefault] = useState(false);

    const { t, i18n } = useTranslation();
    const [showOtp, setShowOtp] = useState(false);
    const [showConfirmOtp, setShowConfirmOtp] = useState(false);
    const [isOTPValid, setIsOTPValid] = useState(false);

    const [mobile, setMobile] = useState('');
    const [refer, setRefer] = useState('');
    const [email, setEmail] = useState('');
    // const [focused, setFocused] = useState(false);
    const phoneInput = useRef(null);
    const [mobileNumber, setMobileNumber] = useState('');
    const [focusedInput, setFocusedInput] = useState(-1); // Initialize with an invalid value
    const appPrimaryColor = useSelector((state) => state.state?.appPrimaryColor);

    const [show, setShow] = useState(false);
    const [showAfter, setShowAfter] = useState(false);
    const [newPassShow, setNewPassShow] = useState(true);
    const [conPassShow, setConPassShow] = useState(true);
    const [newPass, setNewPass] = useState('');
    const [conPass, setConPass] = useState('');

    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60); // Set the initial timer value
    const [isTimerActive, setIsTimerActive] = useState(true);
    const error = ""
    const [code, setCode] = useState('');
    const [current_password, setCurrentPWD] = useState('');
    const [password, setPassword] = useState('');
    const [ConfirmPwd, setConfirmPwd] = useState('');
    const userToken = useSelector(state => state.state?.userToken);

    const handleInputFocus = (index) => {
        setFocusedInput(index);
    };

    const [loading, setLoading] = useState(false)

    const onSubmitClick = () => {
        handleOTPpassword();
    };
    const handleOTPpassword = () => {
        if (validateFieldNotEmpty(code)) {
            ShowToastMessage('OTP is required');
        } else {
            navigation.navigate('MainContainer')
        }
    };


    const [focused, setFocused] = React.useState(false);
    const [focused2, setFocused2] = React.useState(false);


    const getBorderWidth = () => {
        if (error) {
            return 1;
        }
        if (focused) {
            return 1;
        } else {
            return 0.2;
        }
    };

    const getBorderColor = () => {
        if (error) {
            return COLORS.red;
        }

        if (focused) {
            return theme?.colors?.colorPrimary;
        } else {
            return COLORS.bg_color;
        }
    };

    const getBgColor = () => {
        if (error) {
            return COLORS.red;
        }
        if (focused) {
            return theme?.colors?.bg;
        } else {
            // return COLORS.lightest_gray1;
            // return COLORS.bg_color;
            return theme?.colors?.bg;

        }
    };
    const getBorderWidth2 = () => {
        if (error) {
            return 1;
        }
        if (focused2) {
            return 1;
        } else {
            return 0.2;
        }
    };

    const getBorderColor2 = () => {
        if (error) {
            return COLORS.red;
        }

        if (focused2) {
            return theme?.colors?.colorPrimary;
        } else {
            return COLORS.bg_color;
        }
    };

    const getBgColor2 = () => {
        if (error) {
            return COLORS.red;
        }
        if (focused2) {
            return theme?.colors?.bg;
        } else {
            // return COLORS.lightest_gray1;
            // return COLORS.bg_color;
            return theme?.colors?.bg;

        }
    };
    const closeSignUpModal = () => {
        setShow(!show);
    };

    const [rememberMe, setRememberMe] = useState(false);

    const handleRememberMeToggle = () => {
        setRememberMe(!rememberMe);
    };


    const onChangePwd = async () => {
        setLoading(true);
        try {
            //   const lowerCaseEmail = email.toLowerCase();
            if (validateFieldNotEmpty(current_password)) {
                ShowToastMessage('Current Password is required');
            }
            else if (validateFieldNotEmpty(password)) {
                ShowToastMessage('New password is required');
            }
            else if (validateFieldNotEmpty(ConfirmPwd)) {
                ShowToastMessage('confirm password is required');
            } else if (password !== ConfirmPwd) {
                ShowToastMessage('New Password and Confirm Password do not match');
            }
            else {
                const body = {
                    current_password: current_password,
                    new_password: password,
                    confirm_password: ConfirmPwd

                };
                ShowConsoleLogMessage(API_END_POINTS.API_CHANGE_PASSWORD)
                console.log("body Change password ", body)

                try {
                    const response = await ApiCall('post', body, API_END_POINTS.API_CHANGE_PASSWORD, {
                        'Content-Type': 'application/json',
                        'x-access-token': userToken
                    });
                    ShowConsoleLogMessage("change pwd \n\n -> " + JSON.stringify(response))

                    if (response.data && response.data.status === true) {
                        // AsyncStorage.setItem('userToken', response.data.jwtoken);
                        ShowConsoleLogMessage("change Password api", response)
                        console.log("login responce ", response?.data)
                        // dispatch(fetchUserData(response.data));
                        // dispatch(fetchUserToken(response.data.jwtoken));

                        // setEmail('');
                        // setPassword('');
                        // setAddress('')
                        // setUserName('');
                        // setPhoneNo('');
                        // setShopName('')
                        ShowToastMessage(response?.data?.message)
                        navigation.goBack('Profile');
                    } else {
                        ShowToastMessage(
                            response?.data?.error
                        );
                    }
                } catch (error) {
                    console.error(error);
                    // ShowToastMessage('An error occurred during login.');
                }
            }
        } catch (error) {
            // console.error('Error in login process:', error);
            // ShowToastMessage(`An error occurred: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };


    return (
        <SafeAreaView
            style={[
                GlobalStyle.mainContainer,
                {
                    backgroundColor: theme?.colors?.colorPrimary,
                },
            ]}>
            <VegUrbanProgressBar loading={loading} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={[
                    GlobalStyle.loginModalBg,
                    {
                        // alignItems: 'center',
                        // paddingHorizontal: 15,
                        // backgroundColor: theme?.colors?.bg_gray,
                        backgroundColor: theme.colors?.bg_color_onBoard,

                    },
                ]}
            >
                <View style={{
                    flexDirection: "row",
                    alignItems: 'center'
                }}>
                    <Ionicons
                        name="ios-arrow-back"
                        // color={COLORS.black}
                        color={appPrimaryColor}

                        size={25}
                        style={[
                            styles.backIcon,
                            {
                                opacity: !show ? 1 : 0.0,
                            },
                        ]}
                        onPress={() => {
                            navigation.goBack();
                            // ShowToastMessage('Coming Soon!');
                        }}
                    />
                    <Text
                        style={[
                            styles.head,
                            {
                                color: appPrimaryColor,
                            },
                        ]}>
                        {!show ? t('Create New Password') : ''}
                    </Text>
                </View>
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
                    <Image
                        //    source={images.app_logo}
                        source={{
                            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwwOeKqJz7_mXpjU_LoRZMdwSHrOj5JtXL4w&usqp=CAU"
                            // uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR53havvzjiNGh4-nHPIoRKXK3iD2isS1wEjg&usqp=CAU"
                            //   uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSobQQRyoyC5Eis7E-vAWkegS8NM0taHNCncQ&usqp=CAU'
                        }}
                        style={styles.app_logo} />
                    <Text
                        style={[
                            styles.txt,
                            {
                                color: appPrimaryColor,
                                marginLeft: 5
                            },
                        ]}>
                        {!show ? t('Create Your New Password') : ''}
                    </Text>
                    <View style={{
                        // marginTop: '3%',
                        // alignItems: 'center'
                    }}>
                        <VegUrbanEditText
                            placeholder="Current Password"
                            // label="Currenet Password"
                            iconPosition={'left'}
                            value={current_password}
                            style={{
                                color: theme?.colors?.white,
                                marginLeft:10

                            }}
                            icon={
                                <SimpleLineIcons
                                    name="lock"
                                    size={20}
                                    color={theme?.colors?.grey}
                                    style={{
                                        paddingLeft: 16,
                                        // marginHorizontal: 15
                                    }}
                                />
                                // <Feather name={"shopping-bag"} size={20}
                                //     color={theme?.colors?.grey}

                                //     // color={COLORS.primary}
                                //     style={{
                                //         marginHorizontal: 15
                                //     }} />

                            }
                            onChangeText={v => setCurrentPWD(v)}
                        />

                        <View
                            style={[styles.textView,
                            {
                                borderColor: getBorderColor(),
                                elevation: 5
                                // flexDirection: getFlexDirection(),
                            },
                            {
                                shadowOffset: {
                                    width: 3,
                                    height: 3,
                                },
                            },
                            {
                                backgroundColor: getBgColor(),
                                borderWidth: getBorderWidth(),

                                borderRadius: 12,
                                // elevation: getElevation(),
                            },
                            ]}

                        >
                            {/* Left side lock icon */}
                            <SimpleLineIcons
                                name="lock"
                                size={20}
                                color={theme?.colors?.grey}
                                style={{
                                    paddingLeft: 16,

                                }}
                            />
                            {/* TextInput */}
                            <TextInput
                                placeholderTextColor={theme?.colors?.textColor}
                                textAlign={I18nManager.isRTL ? 'right' : 'left'}

                                placeholder={STRING?.pwd}
                                secureTextEntry={!showOtp}
                                value={password}
                                onChangeText={(v) => setPassword(v)}
                                style={{
                                    flex: 1,
                                    paddingLeft: 20,
                                    color: theme?.colors?.textColor,
                                    fontFamily: FONTS?.regular


                                }}
                                onFocus={() => {
                                    setFocused(true);
                                }}
                                onBlur={() => {
                                    setFocused(false);
                                }}
                            />
                            {/* Right side eye icon */}
                            <TouchableOpacity
                                onPress={() => setShowOtp(!showOtp)}
                            >
                                <Octicons
                                    name={showOtp ? 'eye' : 'eye-closed'}
                                    size={20}
                                    // onPress={() => setShowOtp(!showOtp)}
                                    color={theme?.colors?.grey}
                                    style={{
                                        paddingEnd: 5
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={[styles.textView,
                            {
                                borderColor: getBorderColor2(),
                                elevation: 5

                                // flexDirection: getFlexDirection(),
                            },
                            {
                                shadowOffset: {
                                    width: 3,
                                    height: 3,
                                },
                            },
                            {
                                backgroundColor: getBgColor2(),
                                borderWidth: getBorderWidth2(),

                                borderRadius: 12,
                                marginBottom: 30
                                // elevation: getElevation(),
                            },
                            ]}

                        >
                            {/* Left side lock icon */}
                            <SimpleLineIcons
                                name="lock"
                                size={20}
                                color={theme?.colors?.grey}
                                style={{
                                    paddingLeft: 16,

                                }}
                            />
                            {/* TextInput */}
                            <TextInput
                                textAlign={I18nManager.isRTL ? 'right' : 'left'}

                                placeholder={STRING?.ConfirmPwd}
                                secureTextEntry={!showConfirmOtp}
                                value={ConfirmPwd}
                                placeholderTextColor={theme?.colors?.textColor}

                                onChangeText={(v) => setConfirmPwd(v)}
                                style={{
                                    flex: 1,
                                    paddingLeft: 20,
                                    color: theme?.colors?.textColor,
                                    fontFamily: FONTS?.regular


                                }}
                                onFocus={() => {
                                    setFocused2(true);
                                }}
                                onBlur={() => {
                                    setFocused2(false);
                                }}
                            />
                            {/* Right side eye icon */}
                            <TouchableOpacity
                                onPress={() => setShowConfirmOtp(!showConfirmOtp)}
                            >
                                <Octicons
                                    name={showConfirmOtp ? 'eye' : 'eye-closed'}
                                    size={20}
                                    // onPress={() => setShowConfirmOtp(!showConfirmOtp)}
                                    color={theme?.colors?.grey}
                                    style={{
                                        paddingEnd: 5
                                    }}
                                />
                            </TouchableOpacity>
                        </View>


                    </View>
                    <VegUrbanCommonBtn
                        height={45}
                        width={'100%'}
                        borderRadius={20}
                        textSize={18}
                        fontWeight={'bold'}
                        marginTop={'5%'}
                        text={t('Continue')}
                        textColor={COLORS?.white}
                        backgroundColor={theme?.colors?.colorPrimary}
                        onPress={() => {
                            onChangePwd();
                            // navigation.navigate('Login');
                        }}
                        textStyle={{
                            fontFamily: FONTS?.bold
                        }}
                    />
                </View>

                {/* {renderSignUpModal()} */}
            </ScrollView>
        </SafeAreaView>
    );
};

export default PasswordConform;

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
        textAlign: 'center',
        fontSize: 22,
        color: COLORS.black,
        fontFamily: FONTS?.bold,

        // marginTop: 8,
        // marginBottom: 8,
        // marginBottom: 20
        marginLeft: 20
    },
    resend: {
        marginTop: 15,
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
        // textAlign: 'center',
        fontFamily: FONTS?.medium,

        fontSize: 18,
        color: COLORS.black,
        // marginTop: 20,
        marginBottom: 10,
        // fontWeight: 'bold',
        // marginBottom: 20
    },
    heading: {
        fontFamily: 'OpenSans-Mulish',
        // textAlign: 'center',
        fontSize: 20,
        color: COLORS.gray,
        marginTop: 8,
        marginBottom: 8,
        // fontWeight: 'bold',
        marginBottom: 20
    },
    app_logo: {
        height: 200,
        resizeMode: 'stretch',
        alignSelf: 'center',
        width: '60%',
        marginTop: 30,
        marginBottom: 20

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
        fontSize: 18
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

    textView: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        width: '100%',
        // borderWidth: 0.2,
        alignSelf: 'center',
        marginVertical: 12,
        // backgroundColor: theme?.colors?.bg_color,
        // borderColor: COLORS?.bg_color,
        // placeholderTextColor:theme?.colors?.textColor,

        // placeholderTextColor: COLORS.editTextBorder,
        paddingHorizontal: 10,
        height: 55,
        marginHorizontal: 0,
        // borderRadius: 10,
        fontFamily: 'Quicksand-Regular',
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    }
});
