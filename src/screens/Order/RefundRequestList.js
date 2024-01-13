import React, {memo, useContext, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';
import {FONTS} from '../../constants/Fonts';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import {CommonActions, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ShowToastMessage} from '../../utils/Utility';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';

const RefundRequestList = ({item}) => {
  console.log('iii', item);

  const [count, setCount] = useState(1);
  const navigation = useNavigation('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const theme = useContext(themeContext);

  const handleOpen = () => setIsModalVisible(true);
  const handleClose = () => setIsModalVisible(false);

  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);

  const [selectedOption, setSelectedOption] = useState(null);

  console.log(selectedOption);
  const handleOptionSelection = option => {
    setSelectedOption(option);
  };

  const [loading, setLoading] = useState('');
  const userToken = useSelector(state => state.state?.userToken);

  const userData = useSelector(state => state.state?.userData);

  const handleSubmission = () => {
    setLoading(true);

    try {
      const body = {
        updateId: item?._id,
        seller_approval: selectedOption,
        // status: "",
      };

      // console.log(body)
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.Refund_Update_Status));
      ApiCall('post', body, API_END_POINTS.Refund_Update_Status, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      })
        .then(response => {
          console.log(' add product ', JSON.stringify(response));

          if (response?.statusCode === 200) {
            // console.log(" notifcation: View ", JSON.stringify(response.data));
            // setDashboard(response?.data?.data)
            navigation.goBack('Refund');
            ShowToastMessage(response?.data?.message);
          } else if (response?.statusCode === 500) {
            if (response.data?.message === 'Token Mismatch') {
              Alert.alert(
                'Session Expired',
                'Your session has expired due to a security issue. Please log in again to continue using the application.',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      clearUserToken();
                    },
                  },
                ],
              );
            }
          } else {
          }
        })
        .catch(error => {
          console.log('error axios -> ', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      ShowToastMessage(` You selected : ${error.message}`);
      setLoading(false);
    }
  };

  const clearUserToken = async () => {
    try {
      await AsyncStorage.clear();
      // await AsyncStorage.removeItem('userToken');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Auth'}],
        }),
      );
    } catch (error) {
      console.error('Error clearing userToken:', error);
    }
  };

  return (
    <TouchableOpacity
      // onPress={handleOpen}
      // onPress={() => {
      //   navigation.navigate('OrderDetails', { item });
      // }}
      activeOpacity={0.8}
      style={[
        styles.wrapper,
        {
          backgroundColor: COLORS?.colorSecondary,
          elevation: 5,
          //   backgroundColor: theme?.colors?.bg
          // backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      <View
        style={[
          GlobalStyle.flexRowAlignCenter,
          {
            paddingVertical: 5,
            alignItems: 'center',
            paddingHorizontal: 5,
            // backgroundColor:'#373a43'
            //   backgroundColor: theme?.colors?.bg
          },
        ]}>
        <View style={styles.innnerWrapper}>
          <View
            style={[
              {
                flexWrap: 'wrap',
                // marginTop: 5
              },
              // GlobalStyle.flexRowAlignCenter,
            ]}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
                // justifyContent: 'space-between'
              }}>
              <AntDesign name="idcard" color={COLORS?.black} size={16} />

              <Text
                style={[
                  styles.textName,
                  {
                    color: theme?.colors?.white,
                    alignSelf: 'flex-start',
                    marginTop: 2,
                    marginLeft: 10,
                  },
                ]}>
                Order Id : {item?.order_id?.order_id || item?.order_id}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              alignItems: 'center',
              // justifyContent: 'space-between'
            }}>
            <AntDesign name="user" color={COLORS?.black} size={16} />

            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                  marginTop: 2,
                  marginLeft: 10,
                },
              ]}>
              {item?.customer_name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              alignItems: 'center',
              // justifyContent: 'space-between'
            }}>
            <AntDesign name="calendar" color={COLORS?.black} size={16} />

            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                  marginTop: 2,
                  marginLeft: 10,
                },
              ]}>
              {/* {moment(item?.created_at).format('LT')} */}
              {moment(item?.createdAt).format('DD-MM-YYYY')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <FontAwesome5
                name="file-invoice-dollar"
                color={COLORS?.grey}
                size={16}
              />
              <Text
                style={[
                  styles.textName,
                  {
                    color: theme?.colors?.white,
                    alignSelf: 'flex-start',
                    // marginTop: 2
                    marginLeft: 10,
                  },
                ]}>
                Refund Status
              </Text>

              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-start',
                    color:
                      item?.seller_approval === 'Pending'
                        ? '#F49127'
                        : item?.seller_approval === 'Accepted'
                        ? COLORS?.green
                        : item?.seller_approval === 'Rejected'
                        ? COLORS?.red
                        : COLORS?.black,
                    fontFamily: FONTS?.bold,
                    marginLeft: 10,
                  },
                ]}
                numberOfLines={1}>
                {item?.seller_approval}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-end',
                    color: appPrimaryColor,
                    fontFamily: FONTS?.bold,
                    marginLeft: 10,
                  },
                ]}>
                ${item?.refund_amount}
              </Text>
            </View>
          </View>

          <View
            style={{
              // alignItems: 'flex-end'
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <VegUrbanCommonBtn
              height={35}
              width={'45%'}
              borderRadius={10}
              textSize={13}
              marginTop={10}
              // textColor={COLORS?.white}

              textColor={appPrimaryColor}
              text={'Change Status'}
              backgroundColor={COLORS?.bg_gray}
              onPress={handleOpen}
              textStyle={{
                fontFamily: FONTS?.bold,

                // textTransform: 'uppercase',
              }}
            />
            <VegUrbanCommonBtn
              height={35}
              width={'45%'}
              borderRadius={10}
              textSize={13}
              marginTop={10}
              // textColor={COLORS?.white}

              textColor={appPrimaryColor}
              text={'View Details'}
              backgroundColor={COLORS?.bg_gray}
              onPress={() => {
                navigation.navigate('RefundDetails', {item});
              }}
              textStyle={{
                fontFamily: FONTS?.bold,

                // textTransform: 'uppercase',
              }}
            />
          </View>
        </View>
      </View>
      <View>
        <Modal
          visible={isModalVisible}
          transparent
          animationType="slide"
          onRequestClose={handleClose}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <View>
                <Text
                  style={[
                    styles.modalText,
                    {
                      fontFamily: FONTS?.bold,
                      fontSize: 20,
                      color:  COLORS?.black,
                    },
                  ]}>
                  Refund Reason
                </Text>

                { item?.refund_reason ? <Text numberOfLines={3} style={styles.refundText}>
                  {item?.refund_reason}
                </Text>:<Text numberOfLines={3} style={styles.refundText}>
                 No refund reason found
                </Text>}
              </View>
              <Text style={styles.modalText}>
                Please select an option: Seller Approval
              </Text>
              <View style={styles.radioButtonContainer}>
                {item?.seller_approval !== 'Rejected' && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {item?.seller_approval !== 'Accepted' && (
                      <TouchableOpacity
                        style={[
                          styles.radioButton,
                          selectedOption === 'Accepted' &&
                            styles.selectedRadioButton,
                        ]}
                        onPress={() =>
                          handleOptionSelection('Accepted')
                        }></TouchableOpacity>
                    )}
                    <Text
                      style={[
                        styles.radioButtonText,
                        {
                          color: COLORS?.green,
                          fontFamily: FONTS?.bold,
                        },
                      ]}>
                      Accepted
                    </Text>
                  </View>
                )}

                {item?.seller_approval !== 'Accepted' && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {item?.seller_approval !== 'Accepted' && (
                      <TouchableOpacity
                        style={[
                          styles.radioButton,
                          selectedOption === 'Rejected' &&
                            styles.selectedRadioButton,
                        ]}
                        onPress={() =>
                          handleOptionSelection('Rejected')
                        }></TouchableOpacity>
                    )}

                    <Text
                      style={[
                        styles.radioButtonText,
                        {
                          color: COLORS?.red,
                          fontFamily: FONTS?.bold,
                        },
                      ]}>
                      Rejected
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.buttonsContainer}>
                <VegUrbanCommonBtn
                  height={40}
                  width={'45%'}
                  borderRadius={10}
                  textSize={16}
                  marginTop={20}
                  // textColor={COLORS?.white}

                  textColor={COLORS?.white}
                  text={'Close'}
                  backgroundColor={appPrimaryColor}
                  onPress={() => {
                    handleClose();
                  }}
                  textStyle={{
                    fontFamily: FONTS?.bold,

                    // textTransform: 'uppercase',
                  }}
                />
                {item?.seller_approval === 'Pending' && (
                  <VegUrbanCommonBtn
                    height={40}
                    width={'45%'}
                    borderRadius={10}
                    textSize={16}
                    marginTop={20}
                    // textColor={COLORS?.white}

                    textColor={COLORS?.white}
                    text={'Submit'}
                    backgroundColor={appPrimaryColor}
                    onPress={() => {
                      handleSubmission();
                    }}
                    textStyle={{
                      fontFamily: FONTS?.bold,

                      // textTransform: 'uppercase',
                    }}
                  />
                )}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
};

export default memo(RefundRequestList);
const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    borderRadius: 10,
    // margin: 2,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    // borderWidth: 0.1
    // paddingVertical:5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    alignItems: 'center',
    borderRadius: 10,
  },
  innnerWrapper: {
    flex: 1,
    marginStart: 10,
    marginTop: 0,
  },
  refundText: {
    color: COLORS?.black,
    fontFamily: FONTS?.regular,
    fontSize: 14,
    marginVertical: 8,
  },

  textName: {
    fontFamily: FONTS?.regular,
    fontSize: 14,
    color: COLORS.black,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    // alignItems: 'center',
    elevation: 5,
    // marginHorizontal: 50,
    width: '90%',
    // flex:0.
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
    // textAlign: 'center'
    color: COLORS?.black,
  },
  modalOption: {
    fontSize: 16,
    marginBottom: 10,
    color: COLORS?.black,
    fontFamily: FONTS?.regular,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    // marginHorizontal: 20,
  },
  modalButton: {
    fontSize: 16,
    color: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    width: 15,
    height: 15,
    // alignItems: 'center',
    // paddingHorizontal: 6,
    // paddingVertical: 2,
    marginHorizontal: 8,
  },
  selectedRadioButton: {
    backgroundColor: '#000',
  },
  radioButtonText: {
    fontSize: 16,
    // color: '#000',
  },
});
