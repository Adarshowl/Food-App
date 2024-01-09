import React, { useContext, useRef, useState } from 'react';
import {
    I18nManager,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { STRING } from '../../../constants';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { FONTS } from '../../../constants/Fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from '../../../constants/Colors';
import Octicons from 'react-native-vector-icons/Octicons';
import { images } from '../../../constants/images'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import GlobalStyle from '../../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanEditText from '../../../utils/EditText/VegUrbanEditText';
import VegUrbanCommonBtn from '../../../utils/VegUrbanCommonBtn';
import { ShowToastMessage, validateFieldNotEmpty } from '../../../utils/Utility';
import themeContext from '../../../constants/themeContext';
import '../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import { showProgressBar } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_DATA, USER_TOKEN } from '../../../redux/type';
import { loginUser } from '../../../redux/actions/authentication';
import {
    getSavedCartProduct,
    getSavedFavoriteProduct,
} from '../../../utils/RealmUtility';
import {
    addToCartMultipleProduct,
    addToFavoriteMultipleProduct,
} from '../../../redux/actions/CartApi';
import { requestUserPermission } from '../../../firebase/notificationService';
import ToolBarIcon from '../../../utils/ToolBarIcon';
// import {useDispatch} from 'react-redux';

const Location = ({ navigation }) => {
    const theme = useContext(themeContext);
    const { t, i18n } = useTranslation();

    const dispatch = useDispatch();

    const [focused, setFocused] = React.useState(false);
    const error = '';
    const [addressDefault, setAddressDefault] = useState(false);
    const restaurantMap = {
        location: { latitude: 37.78825, longitude: -122.4324 }, // Replace with actual coordinates
    };
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

    const isEmail = email => {
        // Regular expression for email validation
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(email);
    };

    // const isPasswordValid = (password) => {

    //   return password.length >= 6;
    // };
    const isPasswordValid = password => {
        // Define regex patterns for each requirement
        const lowercaseRegex = /[a-z]/;
        const uppercaseRegex = /[A-Z]/;
        const numberRegex = /[0-9]/;
        const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

        // Check if the password meets all requirements
        const hasLowercase = lowercaseRegex.test(password);
        const hasUppercase = uppercaseRegex.test(password);
        const hasNumber = numberRegex.test(password);
        const hasSpecialCharacter = specialCharacterRegex.test(password);

        // Password is valid if it meets all requirements
        return (
            password.length >= 6 &&
            hasLowercase &&
            hasUppercase &&
            hasNumber &&
            hasSpecialCharacter
        );
    };

    const errorMessage = '';

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [validpwd, setvalidpwd] = useState(true);

    const validateEmail = email => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    const handleButtonPress = () => {
        if (validateFieldNotEmpty(email)) {
            ShowToastMessage('Please enter email');
        } else if (!validateEmail(email)) {
            ShowToastMessage('Please enter valid email');
        } else if (validateFieldNotEmpty(password)) {
            ShowToastMessage('Please enter password');
        } else {
            const data = {
                email: email,
                password: password,
            };
            dispatch(showProgressBar(true));
            dispatch(() =>
                loginUser(
                    data,
                    dispatch,
                    navigation,
                    userLoginSuccess,
                    userLoginFail,
                    errorCallBack,
                ),
            );
        }
    };
    const userLoginSuccess = async data => {
        // ShowConsoleLogMessage(data);
        setTimeout(() => {
            ShowToastMessage(data?.message);
        }, 100);

        dispatch(showProgressBar(false));
        await AsyncStorage.setItem(USER_DATA, JSON.stringify(data?.response));
        await AsyncStorage.setItem(USER_TOKEN, data?.jwtoken);

        (async () => {
            await requestUserPermission();
            await getCartFromLocal(data?.jwtoken);
            await getFavoriteFromLocal(data?.jwtoken);
        })();

        navigation?.replace('MainContainer');
    };

    const getCartFromLocal = async token => {
        getSavedCartProduct()
            .then(res => {
                if (res?.length > 0) {
                    addToCartMultipleProduct(
                        dispatch,
                        navigation,
                        token,
                        res,
                        () => { },
                        () => { },
                        () => { },
                    );
                } else {
                }
            })
            .catch(() => { })
            .finally(() => { });
    };
    const getFavoriteFromLocal = async token => {
        getSavedFavoriteProduct()
            .then(res => {
                if (res?.length > 0) {
                    addToFavoriteMultipleProduct(
                        dispatch,
                        navigation,
                        token,
                        res,
                        () => { },
                        () => { },
                        () => { },
                    );
                } else {
                }
            })
            .catch(() => { })
            .finally(() => { });
    };

    const userLoginFail = async data => {
        dispatch(showProgressBar(false));
        setTimeout(() => {
            ShowToastMessage(data?.message);
        }, 100);
    };

    const errorCallBack = error => {
        ShowToastMessage(error);
        dispatch(showProgressBar(false));
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

    // const getBgColor = () => {
    //   if (error) {
    //     return COLORS.red;
    //   }
    //   if (focused) {
    //     return theme?.colors?.bg_color;
    //   } else {
    //     // return COLORS.lightest_gray1;
    //     // return COLORS.bg_color;
    //     return theme?.colors?.bg_color;

    //   }
    // };
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

    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [refer, setRefer] = useState('');
    const [terms, setTerms] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    // const [focused, setFocused] = useState(false);
    const phoneInput = useRef(null);
    const [mobileNumber, setMobileNumber] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    // const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [showAfter, setShowAfter] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleRememberMeToggle = () => {
        setRememberMe(!rememberMe);
    };
    const closeSignUpModal = () => {
        setShow(!show);
    };

    return (
        <SafeAreaView
            style={[
                GlobalStyle.mainContainer,
                {
                    // backgroundColor: theme?.colors?.colorPrimary,
                    backgroundColor: COLORS?.white,
                },
            ]}>
            <ScrollView>
                {/* <Ionicons
        name="ios-arrow-back"
        color={COLORS.white}
        size={25}
        style={[
          styles.backIcon,
          {
            opacity: !show ? 1 : 0.0,
            transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
          },
        ]}
        onPress={() => {
          navigation.goBack();
          // ShowToastMessage('Coming Soon!');
        }}
      /> */}

                <View
                    style={{
                        // marginStart: 20,
                        // marginTop: 25,
                        // justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS?.white,
                        borderBottomEndRadius: 30,
                        borderBottomLeftRadius: 30,
                        flexDirection: 'row',
                        height: 130,

                    }}>
                    <ToolBarIcon
                        title={Ionicons}
                        iconName={'chevron-back'}
                        icSize={20}
                        borderRadius={20}
                        icColor={COLORS.black}
                        style={{
                            backgroundColor: theme?.colors?.bg,
                            // marginEnd: 10,
                            borderRadius: 20,
                        }}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    />
                    <Text
                        style={[
                            styles.heading,
                            {
                                marginStart: 10,
                                fontFamily: COLORS?.regular,
                                color: COLORS?.black
                            },
                        ]}>
                        Location
                    </Text>

                </View>




                <View style={styles.section}>

                    <View style={{
                        borderRadius: 10
                    }}>

                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={{
                                height: 300,
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
                    <Text style={{
                        fontSize: 15,
                        color: COLORS?.black,
                        fontFamily: FONTS?.regular,
                        marginTop: 20,
                        textAlign: 'center'
                    }}>
                        set your location to start exploring
                        restaurant around you.
                    </Text>
                </View>


                <View
                    style={[
                        GlobalStyle.loginModalBg,
                        {
                            backgroundColor: theme.colors?.bg_color_onBoard,
                            marginHorizontal: 10
                        },
                    ]}>

                    {/* </View> */}
                    <View
                        style={{

                            alignItems: 'center',


                        }}>
                        <VegUrbanCommonBtn
                            height={55}
                            width={'100%'}
                            borderRadius={30}
                            textSize={18}
                            text={'Enable Location'}
                            textColor={theme.colors?.text}
                            backgroundColor={COLORS?.black}
                            // onPress={() => {
                            //   closeSignUpModal();
                            // }}
                            onPress={() => {
                                navigation.navigate('MainContainer');
                            }}
                            textStyle={{
                                fontFamily: FONTS?.bold,
                            }}
                        />

                    </View>

                    <View
                        style={{
                            marginTop: 20

                        }}>
                        <VegUrbanCommonBtn
                            height={55}
                            width={'100%'}
                            borderRadius={30}
                            textSize={18}
                            text={'No, I do it later'}
                            textColor={COLORS?.black}
                            backgroundColor={theme?.colors?.bg}
                            // onPress={() => {
                            //   closeSignUpModal();
                            // }}
                            onPress={() => {
                                navigation.navigate('Login');
                            }}
                            textStyle={{
                                fontFamily: FONTS?.bold,
                            }}
                            style={{
                            }}
                        />
                    </View>





                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default Location;

const styles = StyleSheet.create({
    backIcon: {
        marginTop: 15,
        marginStart: 15,
        borderRadius: 100,
        alignSelf: 'flex-start',
    },
    section: {
        padding: 20,
        // borderBottomWidth: 1,
        // borderBottomColor: '#ccc',
        backgroundColor: COLORS?.white,
        borderRadius: 10

    },
    heading: {
        fontFamily: FONTS?.bold,
        fontSize: 27,
        color: COLORS?.black
    },
    heading11: {
        fontFamily: FONTS?.regular,

        // fontFamily: 'OpenSans-Medium',
        textAlign: 'center',
        fontSize: 16,
        color: COLORS.gray,
        marginTop: 8,
    },
    error: {
        color: COLORS.red,
        paddingTop: 4,
        fontSize: 13,
        fontFamily: FONTS?.bold,

        // fontFamily: 'Quicksand-Regular',
    },
    head: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10,
    },
    app_logo: {
        height: 350,
        resizeMode: 'cover',
        alignSelf: 'center',
        width: '100%',
        marginTop: 30,

        borderRadius: 20,

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
    checkboxContainer: {
        // backgroundColor: 'transparent', // Remove the default background color
        borderWidth: 0, // Remove the border
        padding: 0, // Remove padding
        height: 20,
        width: 10,
        borderColor: COLORS?.black, // Line color
    },
    containerRemember: {
        flexDirection: 'row', // Arrange items horizontally
        alignItems: 'center', // Center items vertically
        marginVertical: 5,
        marginLeft: 10,
        marginBottom: 20,
        marginHorizontal: 10,
        alignSelf: 'center',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 20,
        // textAlign:'center'
    },
    line: {
        flex: 1,
        height: 0.5,
        backgroundColor: COLORS?.gray,
        alignItems: 'center',
        marginTop: 5,
    },
    text: {
        paddingHorizontal: 10,
        textAlign: 'center',
        fontSize: 16,
        color: COLORS.black,
        // marginTop: 10,  },
    },
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
    },
});
