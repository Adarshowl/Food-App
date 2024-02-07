// AddressSelectionScreen.js
import React, { useContext, useState } from 'react';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FONTS } from '../../constants/Fonts';
import { COLORS } from '../../constants/Colors';
import { SIZES } from '../../constants';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanEditText from '../../utils/EditText/VegUrbanEditText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import { ShowToastMessage } from '../../utils/Utility';
import themeContext from '../../constants/themeContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';

const AddNewCardModal = ({ addresses, onSelectAddress, onClose }) => {
  const navigation = useNavigation();

  const theme = useContext(themeContext);
  const [addressDefault, setAddressDefault] = useState(false);
  const [show, setShow] = useState(false);
  const error = '';
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPwd, setConfirmPwd] = useState('');

  const [expiryDate, setExpiryDate] = useState('');

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const currentDate = new Date();

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    setSelectedDate(date);
    hideDatePicker();
  };
  const hideDatePicker = () => {
    setDatePickerVisible(false);
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
      return COLORS.gray;
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
      return COLORS?.white;
    }
  };
  const getBorderWidth2 = () => {
    if (error) {
      return 1;
    }
    if (focused2) {
      return 1;
    } else {
      return 0.5;
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
      return COLORS?.white;
    }
  };
  const closeSignUpModal = () => {
    setShow(!show);
  };

  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeToggle = () => {
    setRememberMe(!rememberMe);
  };


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
            onPress={() => {
              onItemClick(index, item);
            }}
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
          marginBottom: 25,
          color: theme?.colors?.black,
          fontFamily: FONTS?.bold

        }}>Add New Card</Text>

        {/* <VegUrbanEditText
          placeholder="0000 0000 0000 0000"
          label="Card Number"
          style={{
            color: theme?.color10s?.white,
            borderRadius: 10
          }}
          textStyle={{
            fontFamily: FONTS?.regular,
          }}
          keyBoardType={'number-pad'}
        // onChangeText={v => setEmail(v)}
        /> */}
        <View
          style={{
            // width: '30%',
            // flex: 1,
            marginEnd: 20,
          }}>
          <Text
            style={[
              ,
              // styles.label
              {
                color: theme?.colors?.textColor,
                marginLeft: 6,
                marginTop: 4,
                fontSize: 12,
                // color: COLORS.black,
                fontWeight:'bold',
                fontFamily: FONTS?.regular,
                marginBottom: 5
              },
            ]}>
            Card Number
          </Text>
          <View
            style={[
              // styles.textView,
              {
                borderColor: getBorderColor2(),
                width: '100%'
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
                elevation: 2,
                flexDirection: 'row',
                alignItems: 'center',
                // flex: 1,
                width: '120%',

                // borderWidth: 0.2,
                // alignSelf: 'center',
                marginVertical: 12,
                // marginHorizontal: 0,

                paddingHorizontal: 10,
                paddingVertical: 0,
                height: 55,
                // marginHorizontal: 0,
                // borderRadius: 10,
                fontFamily: 'Quicksand-Regular',
                // elevation: getElevation(),
              },
            ]}>
            <TextInput
              keyboardType="number-pad"
              maxLength={10}
              textAlign={I18nManager.isRTL ? 'right' : 'left'}
              placeholder="0000 0000 0000 00"
              value={
                selectedDate ? selectedDate.toLocaleDateString() : ''
              }
              placeholderTextColor={theme?.colors?.textColor}
              editable={true}
              // onChangeText={(v) => setConfirmPwd(v)}
              style={{
                flex: 1,
                // paddingLeft: 20,
                color: theme?.colors?.textColor,
                fontFamily: FONTS?.regular,
              }}
              onFocus={() => {
                setFocused2(true);
              }}
              onBlur={() => {
                setFocused2(false);
              }}
            />


          </View>
        </View>
        <View
          style={{
            // flex: 1,
            flexDirection: 'row',
            marginRight: -18,
            justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              // width: '30%',
              flex: 1,
              marginEnd: 20,
            }}>
            <Text
              style={[
                ,
                // styles.label
                {
                  color: theme?.colors?.textColor,
                  marginLeft: 6,
                  marginTop: 4,
                  fontSize: 12,
                  // color: COLORS.black,
                  // fontWeight:'bold',
                  fontFamily: FONTS?.regular,
                  marginBottom: 5
                },
              ]}>
              Expired Date
            </Text>
            <View
              style={[
                styles.textView,
                {
                  borderColor: getBorderColor2(),
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
                  elevation: 2
                  // elevation: getElevation(),
                },
              ]}>
              <TextInput
                keyboardType="number-pad"
                maxLength={10}
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
                placeholder="MM/YY"
                value={
                  selectedDate ? selectedDate.toLocaleDateString() : ''
                }
                placeholderTextColor={theme?.colors?.textColor}
                editable={false}
                // onChangeText={(v) => setConfirmPwd(v)}
                style={{
                  flex: 1,
                  // paddingLeft: 20,
                  color: theme?.colors?.textColor,
                  fontFamily: FONTS?.regular,
                }}
                onFocus={() => {
                  setFocused2(true);
                }}
                onBlur={() => {
                  setFocused2(false);
                }}
              />
              <TouchableOpacity onPress={showDatePicker}>
                <AntDesign
                  name="calendar"
                  size={22}
                  color={theme?.colors?.grey}
                  style={{
                    paddingEnd: 5,
                  }}
                />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                minimumDate={currentDate}
                onCancel={hideDatePicker}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              paddingEnd: 0,
            }}>
            <View style={{}}>
              <Text
                style={[
                  ,
                  // styles.label
                  {
                    color: theme?.colors?.textColor,
                    marginLeft: 5,
                    marginTop: 4,
                    fontSize: 12,
                    fontFamily: FONTS?.regular,
                    marginBottom: 5
                  },
                ]}>
                CVV
              </Text>
            </View>
            <View
              style={[
                styles.textView,
                {
                  borderColor: getBorderColor(),
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
                  elevation: 2,

                  // elevation: getElevation(),
                },
              ]}>
              <TextInput
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
                placeholder="123"
                maxLength={3}
                // value={ConfirmPwd}
                placeholderTextColor={theme?.colors?.textColor}
                keyboardType="numeric"
                // onChangeText={(v) => setConfirmPwd(v)}
                style={{
                  flex: 1,
                  // paddingLeft: 20,
                  color: theme?.colors?.textColor,
                  fontFamily: FONTS?.regular,
                }}
                onFocus={() => {
                  setFocused(true);
                }}
                onBlur={() => {
                  setFocused(false);
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 0,
            marginVertical: 10,
          }}>
          <VegUrbanCommonBtn
            height={55}
            width={'100%'}
            borderRadius={20}
            textSize={16}
            textColor={theme?.colors?.text}
            text={'Save'}
            backgroundColor={theme?.colors?.colorPrimary}
            onPress={onClose}
            // onPress={() => {
            //   navigation.goBack('Payment');
            // }}
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

export default AddNewCardModal;
const styles = StyleSheet.create({
  textView: {

    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
    width: '90%',

    // borderWidth: 0.2,
    // alignSelf: 'center',
    marginVertical: 12,
    marginHorizontal: 0,
    // backgroundColor: theme?.colors?.bg_color,
    // borderColor: COLORS?.bg_color,
    // placeholderTextColor:theme?.colors?.textColor,

    // placeholderTextColor: COLORS.editTextBorder,
    paddingHorizontal: 10,
    paddingVertical: 0,
    height: 55,
    // marginHorizontal: 0,
    // borderRadius: 10,
    fontFamily: 'Quicksand-Regular',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});
