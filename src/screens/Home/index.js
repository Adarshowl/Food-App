import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  I18nManager,

} from 'react-native';
import { icons, SIZES } from '../../constants';
import Octicons from 'react-native-vector-icons/Octicons'
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { CommonActions, useIsFocused } from '@react-navigation/native';
import ApiCall from '../../network/ApiCall';
import { API_END_POINTS, IMAGE_BASE_URL } from '../../network/ApiEndPoints';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, { useContext, useEffect, useState } from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import { COLORS } from '../../constants/Colors';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import TabOfferScreen from '../Flash/TabOfferScreen';
import '../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeContext from '../../constants/themeContext';
import { FONTS } from '../../constants/Fonts';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import { useDispatch, useSelector } from 'react-redux';
import VegUrbanProgressBar from '../../utils/VegUrbanProgressBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import HomeResturentList from '../Flash/HomeResturentList';

const Home = ({ navigation }) => {
  const theme = useContext(themeContext);
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false);

  // const onLocationBarClick = () => {
  //   navigation.navigate('DeliveryAddress');
  // };

  const LinerData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ],
      },
    ],
  };

  const dispatch = useDispatch();

  // useEffect(() => {
  //   setTimeout(async () => {
  //    // await getUserFromStorage();
  //   }, 0);
  // }, []);
  const [userData1, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const userToken = useSelector(state => state.state?.userToken);
  const userData = useSelector(state => state.state?.userData);
  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);
  const defaultImage = useSelector(state => state.state?.defaultImage);

  // console.log('defaultImage >>>', defaultImage);
  // console.log("userdata", userData)

  useEffect(() => {
    getAllShop();
    getShopCategory();
    gethomeCount();
  }, []);
  // getAllShop();

  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem('userData', (error, value) => {
        // console.log(value, '------------------');
        if (error) {
        } else {
          if (value !== null) {
            let tmp = JSON.parse(value);
            // setUserData(tmp?.data);
            // ShowConsoleLogMessage("data for te", (fetchUserData(JSON.parse(value))))
            // dispatch(fetchUserData(tmp)?.response)
            // dispatch(fetchUserToken(tmp?.jwtoken))
            // getDriverProfile(tmp?.id)
          } else {
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE' + err);
    }
  };

  const [currentDate, setCurrentDate] = useState('');
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const fetchCurrentDateTime = () => {
      const today = new Date();
      const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = new Intl.DateTimeFormat(
        'en-US',
        optionsDate,
      ).format(today);

      const optionsDay = { weekday: 'long' };
      const formattedDay = new Intl.DateTimeFormat('en-US', optionsDay).format(
        today,
      );

      setCurrentDate(formattedDate);
      setCurrentDay(formattedDay);
    };

    fetchCurrentDateTime();
  }, []);
  useEffect(() => {
    if (isFocused) {
      (async () => {
        await AsyncStorage.getItem('userData', (error, value) => {
          if (error) {
          } else {
            if (value !== null) {
              setUserData(JSON.parse(value));
              // getAllShop(userData?.id);
              // getShopCategory(userData?.id);
              // gethomeCount(userData?.id);
            } else {
            }
          }
        });
      })();
    }
  }, [isFocused]);

  const [dashboard, setDashboard] = useState([]);
  const [showEmpty, setShowEmpty] = useState(false);
  const [category, setCategory] = useState([]);
  const [countHome, setCountHome] = useState({});

  // console.log("dashboard", countHome)

  const getAllShop = () => {
    setLoading(true);
    try {
      // ShowConsoleLogMessage(API_END_POINTS.DASHBOARD)
      ApiCall('get', null, API_END_POINTS.DASHBOARD, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          if (response?.statusCode === 200) {
            // console.log("Response data: ", JSON.stringify(response));
            const responseData = response?.data?.response;

            if (responseData && responseData.length > 0) {
              const imageUrlsArray = responseData.map(item => item.image);
              setDashboard(imageUrlsArray);
            }
          } else if (response?.statusCode === 500) {
            // ShowToastMessage(response.data?.message)
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
            setShowEmpty(true);
          }
        })
        .catch(error => {
          setShowEmpty(true);
          // console.log("Error with Axios request: ", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      // ShowToastMessage(`You selected: ${error.message}`);
      setLoading(false);
    }
  };

  const getShopCategory = () => {
    setLoading(true);
    try {
      // ShowConsoleLogMessage(API_END_POINTS.DASHBOARD)
      ApiCall('get', null, API_END_POINTS.CATEGORY_LIST, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          if (response?.statusCode === 200) {
            // console.log("Response data: ", JSON.stringify(response));
            const responseData = response?.data?.response;
            setCategory(responseData);

            // if (responseData && responseData.length > 0) {
            //   // const imageUrlsArray = responseData.map((item) => item.image);
            //   setCategory(response?.data);
            // }
            if (response.data?.length !== 0) {
              setShowEmpty(true);
            }
          } else if (response?.statusCode === 500) {
            setShowEmpty(false);
          } else {
            setShowEmpty(true);
          }
        })
        .catch(error => {
          setShowEmpty(true);
          // console.log("Error with Axios request: ", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      // ShowToastMessage(`You selected: ${error.message}`);
      setLoading(false);
    }
  };

  const gethomeCount = () => {
    setLoading(true);
    try {
      // ShowConsoleLogMessage(API_END_POINTS.DASHBOARD_COUNT);
      // ShowConsoleLogMessage(userToken);

      ApiCall('get', null, API_END_POINTS.DASHBOARD_COUNT, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          // console.log("Counting: ", JSON.stringify(response));

          if (response?.statusCode === 200) {
            console.log('Counting: ', JSON.stringify(response?.data));
            const responseData = response?.data;
            setCountHome(responseData);
            if (response?.data?.length !== 0) {
              setShowEmpty(true);
            }
          } else if (response?.statusCode === 500) {
            setShowEmpty(false);
            // ShowToastMessage(response.data?.message)
          } else {
            setShowEmpty(true);
          }
        })
        .catch(error => {
          setShowEmpty(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      // ShowToastMessage(`You selected: ${error.message}`);
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
          routes: [{ name: 'Auth' }],
        }),
      );
    } catch (error) {
      console.error('Error clearing userToken:', error);
    }
  };

  const [count, setCount] = useState(0);

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  const tradingList = [
    {
      id: '1', name: 'S Cafe', address: 'indore mp',
      image: 'data:image/jpeg;base64,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'
    },
    {
      id: '2', name: 'Alba Bistro', address: 'dewas mp',
      image: 'data:image/jpeg;base64,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'
    },
    {
      id: '3', name: 'The Monroe Cafe', address: 'vijay nagar ',
      image: 'data:image/jpeg;base64,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'
    },

    {
      id: '3', name: 'Chinese', address: 'bhawaercuaa',
      image: 'https://www.london-unattached.com/wp-content/uploads/2015/06/The-Trading-House-City-Bank-London-Launch-Party-1032.jpg'
    },


  ];
  const rendeResturent = ({ item }) => {
    // console.log("sub categoryssdg",item)
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('OfferDetails')
        }}
        activeOpacity={0.8}
        style={{
          flex: 1,
          marginHorizontal: 7,
          marginVertical: 10,
          paddingStart: 5,
          // elevation:2,


          // elevation: 5,
          // alignItems: 'center',
          borderRadius: 5,
          // width:120,
          // height:150,
          // borderWidth:0.1
        }}>
        <ImageBackground
          style={[
            styles.imageResturent,
            {
              // backgroundColor: theme?.colors?.colorimageback,
              backgroundColor: COLORS?.colorSecondary,

              justifyContent: 'center',
              // elevation: 5,
            },
          ]}
          imageStyle={{
            resizeMode: 'stretch',
            borderRadius: 10,
          }}
          source={{
            uri: item?.image
          }}>
        </ImageBackground>


        <View
          style={{
            // marginHorizontal: 8,
            // elevation: 10,
            // marginTop: 5,
            marginLeft: 5,
            // borderBottomEndRadius: 5,
            // borderBottomStartRadius: 5,
            // borderWidth: 0.2,
            // elevation:5,
            paddingVertical: 10,
            paddingLeft: 2,

          }}>
          <Text style={{
            fontSize: 12,
            color: COLORS?.black,
            fontFamily: FONTS?.regular,
            marginBottom: 5
          }}>
            1.3 km
          </Text>

          <Text style={{
            fontSize: 16,
            color: COLORS?.black,
            fontFamily: FONTS?.bold
          }}>
            {item?.name}
          </Text>
          <Text style={styles.rating}>⭐ 5.7 * 200 + rating </Text>

          <Text style={{
            fontSize: 14,
            color: COLORS?.black,
            fontFamily: FONTS?.regular

          }}>
            {item?.address}
          </Text>
          {/* Additional content */}
        </View>
      </TouchableOpacity>
    );
  };

  const renderCtegory = ({ item }) => {
    // console.log("sub categoryssdg",item)
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          flex: 1,
          marginHorizontal: 7,
          marginVertical: 10,
          paddingStart: 5,

          // elevation: 5,
          alignItems: 'center',
          borderRadius: 5,
          // width:120,
          // height:150,
          // borderWidth:0.1
        }}>
        <ImageBackground
          style={[
            styles.itemImage,
            {
              backgroundColor: theme?.colors?.colorimageback,
              // backgroundColor: COLORS?.colorSecondary,

              justifyContent: 'center',
              elevation: 5,
            },
          ]}
          imageStyle={{
            resizeMode: 'stretch',
            borderRadius: 100,
          }}
          source={{
            // uri: item?.brand?.image || "https://img.freepik.com/premium-vector/cosmetic-products-hair-care-vector-design_103044-2613.jpg",

            uri: item?.image
            // "https://cdn-icons-png.flaticon.com/128/1867/1867565.png",
          }}>


          <View
            style={{
              // marginHorizontal: 8,
              elevation: 10,
            }}>
            {/* Additional content */}
          </View>
        </ImageBackground>
        <View
          style={{
            borderRadius: 10,
            // width:'80%',
            justifyContent: 'center',
            alignSelf: 'center',
            paddingHorizontal: 8,
            paddingVertical: 5,
            // elevation: 10,
          }}>
          <Text
            style={{
              color: theme?.colors?.white,
              fontFamily: FONTS?.bold,
              fontSize: 13,
              textAlign: 'center',
              // textShadowColor: 'rgba(0, 0, 0, 0.75)',
              // textShadowOffset: { width: -1, height: 1 },
              // textShadowRadius: 10,
            }}
            numberOfLines={2}>
            {item?.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          // backgroundColor: theme.colors.bg_color,
          // backgroundColor: theme.colors?.bg_color_onBoard,
        },
      ]}>
      <VegUrbanProgressBar loading={loading} />
      {/* <View>
        <LinearGradient
          colors={['#54AA53', '#54AA53']}
          style={{

            borderBottomEndRadius: 30,
            borderBottomLeftRadius: 30,
            flexDirection: 'row',
            borderBottomRightRadius: 30,

            height: 130,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}
        >

          <View>
            <Text
              style={[
                styles.heading,
                {
                  marginStart: 10,
                  color: COLORS?.white,

                },
              ]}
            >
              Current Location
            </Text>
            <View
              style={{
                borderWidth: 0.2,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderColor: COLORS?.white,
                flexDirection: 'row',
                alinItem: 'center',
                justifyContent: 'center',
                marginTop: 6

              }}
            >
              <Ionicons
                name='location-sharp'
                color={COLORS?.white}
                size={20}
              />
              <Text
                style={{
                  fontSize: 13,
                  color: COLORS?.white,
                  fontFamily: FONTS?.regular,
                  marginLeft: 5
                }}
              >
                Dewas mp plot no 3
              </Text>
            </View>
          </View>
          <TouchableOpacity style={{
            borderRadius: 50,
            borderWidth: 0.5,
            borderColor: COLORS?.white,
            width: 45,
            height: 45,
            justifyContent: "center",
            alinItem: 'center',
          }}>
            <Octicons
              name='bell-fill'
              color={COLORS?.white}
              size={20}
              style={{
                textAlign: 'center'
              }}
            />
          </TouchableOpacity>

        </LinearGradient>
      </View> */}


      <View style={{
        // flex: 1,
        flexDirection: 'row',
        // justifyContent:'space-between',
        alinItem: 'center',
        marginTop: 20,
        marginBottom:10

      }}>
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
            placeholder={'What do you want to eat?'}
            placeholderTextColor={theme?.colors?.gray}
          />
        </TouchableOpacity>

        <TouchableOpacity style={{
          borderRadius: 50,
          borderWidth: 0.5,
          borderColor: theme?.colors?.colorPrimary,
          width: 45,
          height: 45,
          justifyContent: "center",
          alinItem: 'center',
          marginEnd: 10,
          marginTop: 5
        }}>
          <Octicons
            name='bell-fill'
            color={theme?.colors?.colorPrimary}
            size={20}
            style={{
              textAlign: 'center'
            }}
          />
        </TouchableOpacity>

      </View>
      <ScrollView
        // nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          // flexGrow: 1,
          // flex:1
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('BannerOfferDetails');
          }}
          style={{
            marginHorizontal: 20,
            // flex: 1,
            marginTop: 40
          }}>
          <ImageBackground
            style={[
              {
                justifyContent: 'center',
                // elevation: 5,
                width: '100%',
                height: 180,
                // marginHorizontal:20
              },
            ]}
            imageStyle={{
              // resizeMode: 'stretch',
              borderRadius: 20,
            }}
            source={{
              uri: 'data:image/jpeg;base64,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'

            }}>
          </ImageBackground>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            marginTop: 20,
          }}></View>



        {/* <View>
      <Text>Bezier Line Chart</Text>
      <LineChart
        data={LinerData}
        width={'100%'}
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1}
        color={'red'}
        bezier
        // chartConfig={chartConfig} // Add this line with chartConfig
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View> */}
        {/* <View
          style={{
            backgroundColor: COLORS?.colorPrimary,
            // flex: 1,
            paddingVertical: 20,
            paddingHorizontal: 15,
            flexDirection: 'row',
            justifyContent: 'space-evenly'

          }}>
          <View style={{
            alignItems: 'center',
            marginLeft: 13

          }}>

            <MaterialIcons
              name='forward-to-inbox'
              size={22}
              color={COLORS?.white}
            />
            <Text style={{
              fontSize: 13,
              color: COLORS?.white
            }}>
              Message
            </Text>
          </View>
          <View style={{
            alignItems: 'center',
            marginLeft: 10

          }}>

            <FontAwesome

              name='dollar'
              size={20}
              color={COLORS?.white}
            />
            <Text style={{
              fontSize: 13,
              color: COLORS?.white,
              marginTop: 3
            }}>
              Refund Requests
            </Text>
          </View>
          <View style={{
            alignItems: 'center',
            marginLeft: 13

          }}>

            <Feather
              name='codepen'
              size={20}
              color={COLORS?.white}
            />
            <Text style={{
              fontSize: 13,
              color: COLORS?.white,
              marginTop: 3

            }}>
              Coupons
            </Text>
          </View>
          <View style={{
            alignItems: 'center',
            marginLeft: 13
          }}>

            <MaterialIcons

              name='payments'
              size={20}
              color={COLORS?.white}
            />
            <Text style={{
              fontSize: 13,
              color: COLORS?.white,
              marginTop: 3

            }}>
              Payment History
            </Text>
          </View>





        </View> */}
        <View
          style={[
            GlobalStyle.flexRowAlignCenter,
            {
              // marginTop: 5,
              alignItems: 'center',
              marginStart: 8

            },
          ]}>
          <Text
            style={[
              GlobalStyle.headingText,
              {
                color: theme?.colors?.white,
                fontSize: 16,
                fontFamily: FONTS?.bold,
                alignItems: 'center',
              },
            ]}>
            {t('Categories')}
          </Text>
          <View
            style={{
              flex: 1,
            }}
          />
          <Text
            onPress={() => {
              navigation.navigate('AllCategories');
            }}
            style={[
              GlobalStyle.locationText,
              {
                color: theme.colors.colorPrimary,
                marginEnd: 20,
                fontSize: 12,
                fontFamily: FONTS?.bold,
                textDecorationLine: 'underline'
              },
            ]}>
            {t('View All')}
          </Text>
        </View>
        <FlatList
          style={{
            flex: 1,
          }}
          // numColumns={1}

          contentContainerStyle={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 10,
            paddingTop: 10,
          }}
          ListHeaderComponent={() => {
            return <View style={{}} />;
          }}
          ListEmptyComponent={() =>
            !showEmpty ? null : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 50,
                    color: COLORS?.black,
                  }}>
                  No Category found !
                </Text>
              </View>
            )
          }
          ListHeaderComponentStyle={{
            paddingTop: 5,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={tradingList}
          renderItem={renderCtegory}
        // renderItem={({ item, index }) => <CategoryItem item={item} />}
        />
        <View
          style={[
            GlobalStyle.flexRowAlignCenter,
            {
              // marginTop: 10,
              alignItems: 'center',
              marginStart: 8
            },
          ]}>
          <Text
            style={[
              GlobalStyle.headingText,
              {
                color: theme?.colors?.white,
                fontSize: 16,
                fontFamily: FONTS?.bold,
                alignItems: 'center',

              },
            ]}>
            {t('Recommended ')}
          </Text>
          <View
            style={{
              flex: 1,
            }}
          />
          <Text
            onPress={() => {
              navigation.navigate('FlashSale');
            }}
            style={[
              GlobalStyle.locationText,
              {
                color: theme.colors.colorPrimary,
                marginEnd: 20,
                fontSize: 12,
                fontFamily: FONTS?.bold,
                textDecorationLine: 'underline'
              },
            ]}>
            {t('View All')}
          </Text>
        </View>



        <FlatList
          style={{
            flex: 1,
          }}
          // numColumns={1}

          contentContainerStyle={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 5,
            paddingTop: 10,
          }}
          ListHeaderComponent={() => {
            return <View style={{}} />;
          }}
          ListEmptyComponent={() =>
            !showEmpty ? null : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 50,
                    color: COLORS?.black,
                  }}>
                  No Category found !
                </Text>
              </View>
            )
          }
          ListHeaderComponentStyle={{
            paddingTop: 5,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={tradingList}
          renderItem={rendeResturent}
        // renderItem={({ item, index }) => <CategoryItem item={item} />}
        />
        <View
          style={[
            GlobalStyle.flexRowAlignCenter,
            {
              marginTop: 10,
              alignItems: 'center',
            },
          ]}>
          <Text
            style={[
              GlobalStyle.headingText,
              {
                color: theme?.colors?.white,
                fontSize: 18,
                fontFamily: FONTS?.bold,
                alignItems: 'center',
              },
            ]}>
            {t('Restaurants')}
          </Text>
          <View
            style={{
              flex: 1,
            }}
          />
          <Text
            onPress={() => {
              navigation.navigate('FlashSale');
            }}
            style={[
              GlobalStyle.locationText,
              {
                color: theme.colors.colorPrimary,
                marginEnd: 20,
                fontSize: 13,
                fontFamily: FONTS?.bold,
                textDecorationLine: 'underline'
              },
            ]}>
            {t('View All')}
          </Text>
        </View>

        <HomeResturentList />

        <View style={GlobalStyle.paddingVertical10} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  locationArrow: {
    marginEnd: 20,
    // height: 25,
    // width: 25,
    // backgroundColor: COLORS.colorPrimary,
    borderRadius: 50,
  },
  heading: {
    fontFamily: FONTS?.bold,
    fontSize: 20,
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
    width: '75%'
    // borderWidth:0.1
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    paddingStart: 5,
    marginStart: 5,
  },
  itemName: {
    // fontFamily: 'OpenSans-SemiBold',
    fontSize: 15,
    color: COLORS.black,
    fontFamily: FONTS.regular,
    marginTop: 10,
    // alignItems:'center'
    textAlign: 'center',
  },
  shop: {
    flex: 1,
    width: '55%',
    height: 190,
    borderRadius: 10,
    backgroundColor: COLORS?.colorSecondary,
    marginHorizontal: 10,
    justifyContent: 'center',
    alinItem: 'center',
    elevation: 5,
  },

  sliderImage: {
    width: SIZES.width - 20,
    height: 200,
    overflow: 'hidden',
    borderRadius: 20,
    marginHorizontal: 15,
    alignSelf: 'center',
    // borderBottomEndRadius:50,
    // borderBottomColor:'red'
    marginTop: 10,
  },
  paginationStyleItem: {
    height: 5,
    width: 16,
    borderRadius: 5,
    // marginBottom:20,
    marginTop: -35,
    color: COLORS?.white,
  },
  paginationendStyleItem: {
    height: 8,
    width: 8,
    borderRadius: 5,
    // marginBottom:20,
    marginTop: -35,
    color: COLORS?.white,
  },
  rating: {
    fontSize: 14,
    color: COLORS?.black,
    marginVertical: 3,
    fontFamily: FONTS?.regular,
    // paddingVertical:5
  },
  dashbox: {
    width: '62%',
    height: 80,
    borderWidth: 1,
    marginHorizontal: 5,
    // alignItems: 'center',
    // alignSelf: 'center',
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS?.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  text: {
    fontFamily: FONTS?.regular,
    fontSize: 13,
    color: COLORS?.white,
    marginBottom: 5,
    marginTop: 2,
  },
  price: {
    fontFamily: FONTS?.bold,
    fontSize: 20,
    color: COLORS?.white,
  },
  image: {
    width: SIZES.width - 30,
    marginTop: 3,
    height: 150,
    borderRadius: 3,
    alignSelf: 'center',
  },

  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    paddingStart: 5,
    marginStart: 5,
  },
  itemName: {
    // fontFamily: 'OpenSans-SemiBold',
    fontSize: 13,
    color: COLORS.black,
    fontFamily: 'Urbanist-Black',
    marginTop: 10,
    // alignItems:'center'
    textAlign: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    alignItems: 'center',
    borderRadius: 100,
    // resizeMode:'stretch'
  },
  app_logo: {
    height: 35,
    resizeMode: 'stretch',
    alignSelf: 'flex-start',
    width: '21%',
    // marginTop: 30,
    // // resizeMode: 'cover',
    // marginBottom: 30,
    borderRadius: 8,
    marginLeft: 15,
    // padding: 50,
    // margin: 20
  },
  imageResturent: {
    width: 220,
    height: 160,
    alignItems: 'center',
    borderRadius: 50,
  },
});
