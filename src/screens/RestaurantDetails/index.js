import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import '../../assets/i18n/i18n';
import {useDispatch} from 'react-redux';
import {
  getRestaurantById,
  getVariantAddonsById,
} from '../../redux/actions/HomeApi';
import {apiErrorCallback, ShowConsoleLogMessage} from '../../utils/Utility';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
import {IMAGE_BASE_URL} from '../../network/ApiEndPoints';
import {icons, SIZES, STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import Modal from 'react-native-modal';

const RestaurantDetails = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [variantDetails, setVariantDetails] = useState(null);
  const [variantData, setVariantData] = useState([]);
  const [addonData, setAddonData] = useState([]);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [totalAddonPrice, setTotalAddonPrice] = useState(0);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const toggleBottomSheet = menuItem => {
    ShowConsoleLogMessage(JSON.stringify(menuItem));
    getVariants(menuItem?._id);
    setSelectedMenuItem(menuItem);
    setBottomSheetVisible(!bottomSheetVisible);
  };

  const [expandedCategories, setExpandedCategories] = useState([]);

  const toggleCategory = categoryName => {
    if (expandedCategories.includes(categoryName)) {
      setExpandedCategories(
        expandedCategories?.filter(cat => cat !== categoryName),
      );
    } else {
      setExpandedCategories([...expandedCategories, categoryName]);
    }
  };

  const renderCategoryItem = item => {
    // console.log(item);
    return (
      <View>
        <TouchableOpacity
          onPress={() => toggleCategory(item?.item?.categoryName)}>
          <View
            style={[
              GlobalStyle.flexRowAlignCenter,
              {
                padding: 10,
                margin: 10,
                backgroundColor: 'white',
              },
            ]}>
            <Text style={[GlobalStyle.commonHeadingText, {flex: 1}]}>
              {item?.item?.categoryName}{' '}
            </Text>
            <Text>
              {expandedCategories.includes(item?.categoryName) ? '▲' : '▼'}
            </Text>
          </View>
        </TouchableOpacity>
        {expandedCategories.includes(item?.item?.categoryName) && (
          <FlatList
            data={item?.item?.categoryItems}
            keyExtractor={menuItem => menuItem?._id}
            renderItem={item1 => (
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => toggleBottomSheet(item1.item)}>
                <View
                  onPress={() => {}}
                  style={[
                    GlobalStyle.flexRowAlignCenter,
                    {
                      margin: 10,
                      paddingEnd: 5,
                      paddingVertical: 10,
                    },
                  ]}>
                  <View style={GlobalStyle.commonFlexOne}>
                    <Text style={GlobalStyle.commonHeadingText}>
                      {item1?.item?.menu_item_name}
                    </Text>
                    {item?.category ? (
                      <Text style={GlobalStyle.commonSmallText}>
                        Category: {item1?.item?.category}
                      </Text>
                    ) : null}
                    <View style={GlobalStyle.flexRowAlignCenter}>
                      <Text style={GlobalStyle.commonSmallText}>
                        {STRING.APP_CURRENCY} {item1?.item?.discount_price}
                      </Text>

                      <Text
                        style={[
                          GlobalStyle.commonSmallText,
                          {
                            textDecorationLine: 'line-through',
                          },
                        ]}>
                        {STRING.APP_CURRENCY} {item1?.item?.unit_price}
                      </Text>
                    </View>
                  </View>
                  {item1?.item?.image ? (
                    <View
                      style={{
                        marginStart: 10,
                      }}>
                      <VegUrbanImageLoader
                        styles={{
                          height: 120,
                          width: 120,
                          borderRadius: 10,
                        }}
                        source={IMAGE_BASE_URL + item1?.item?.image}
                      />
                      <View
                        style={{
                          position: 'relative',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bottom: 15,
                        }}>
                        {item1?.item?.quantity > 0 ? (
                          <View
                            style={[
                              GlobalStyle.flexRowAlignCenter,
                              {
                                backgroundColor: COLORS.white,
                                elevation: 10,
                                borderRadius: 10,
                                padding: 5,
                              },
                            ]}>
                            <Text
                              onPress={() =>
                                itemQtyDecrease(item.index, item1.index)
                              }
                              style={[
                                GlobalStyle.commonHeadingText,
                                {
                                  marginStart: 0,
                                  borderRadius: 5,
                                  borderWidth: 1,
                                  borderColor: COLORS.colorPrimary,
                                  paddingHorizontal: 5,
                                  textAlign: 'center',
                                },
                              ]}>
                              -
                            </Text>

                            <Text
                              style={[
                                GlobalStyle.commonHeadingText,
                                {
                                  marginStart: 5,
                                  paddingHorizontal: 10,
                                  marginHorizontal: 5,
                                  textAlign: 'center',
                                  width: 30,
                                  fontSize: 18,
                                },
                              ]}>
                              {item1?.item?.quantity}
                            </Text>

                            <Text
                              onPress={() =>
                                itemQtyIncrease(item.index, item1.index)
                              }
                              style={[
                                GlobalStyle.commonHeadingText,
                                {
                                  marginStart: 0,
                                  borderRadius: 5,
                                  borderWidth: 1,
                                  borderColor: COLORS.colorPrimary,
                                  paddingHorizontal: 5,
                                  textAlign: 'center',
                                },
                              ]}>
                              +
                            </Text>
                          </View>
                        ) : (
                          <TouchableOpacity
                            onPress={() =>
                              itemQtyIncrease(item.index, item1.index)
                            }
                            style={{
                              borderRadius: 5,
                              borderWidth: 1,
                              borderColor: COLORS.colorPrimary,
                              backgroundColor: COLORS.white,
                              alignItems: 'center',
                              justifyContent: 'center',
                              paddingHorizontal: 15,
                              paddingVertical: 5,
                              elevation: 10,
                            }}>
                            <Text
                              style={[
                                GlobalStyle.commonHeadingText,
                                {
                                  marginStart: 0,
                                },
                              ]}>
                              Add
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        paddingStart: 15,
                      }}>
                      {item1?.item?.quantity > 0 ? (
                        <View
                          style={[
                            GlobalStyle.flexRowAlignCenter,
                            {
                              backgroundColor: COLORS.white,
                              elevation: 10,
                              borderRadius: 10,
                              padding: 5,
                            },
                          ]}>
                          <Text
                            onPress={() =>
                              itemQtyDecrease(item.index, item1.index)
                            }
                            style={[
                              GlobalStyle.commonHeadingText,
                              {
                                marginStart: 0,
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: COLORS.colorPrimary,
                                paddingHorizontal: 5,
                                textAlign: 'center',
                              },
                            ]}>
                            -
                          </Text>

                          <Text
                            style={[
                              GlobalStyle.commonHeadingText,
                              {
                                marginStart: 5,
                                paddingHorizontal: 10,
                                marginHorizontal: 5,
                                textAlign: 'center',
                                width: 30,
                                fontSize: 18,
                              },
                            ]}>
                            {item1?.item?.quantity}
                          </Text>

                          <Text
                            onPress={() =>
                              itemQtyIncrease(item.index, item1.index)
                            }
                            style={[
                              GlobalStyle.commonHeadingText,
                              {
                                marginStart: 0,
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: COLORS.colorPrimary,
                                paddingHorizontal: 5,
                                textAlign: 'center',
                              },
                            ]}>
                            +
                          </Text>
                        </View>
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            itemQtyIncrease(item.index, item1.index)
                          }
                          style={{
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: COLORS.colorPrimary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                          }}>
                          <Text
                            style={[
                              GlobalStyle.commonHeadingText,
                              {
                                marginStart: 0,
                              },
                            ]}>
                            Add
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </View>
                <View
                  style={{
                    height: 0.5,
                    width: SIZES.width,
                    backgroundColor: 'grey',
                  }}
                />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  };

  useEffect(() => {
    const {item} = route?.params;
    dispatch(() => {
      getRestaurantById(
        dispatch,
        navigation,
        item?._id,
        successCallback,
        failureCallback,
        apiErrorCallback,
      );
    });
  }, []);

  const successCallback = data => {
    // ShowConsoleLogMessage(JSON.stringify(data));
    setRestaurantDetails(data);
  };
  const failureCallback = data => {
    setRestaurantDetails(null);
  };

  const getVariants = id => {
    dispatch(() => {
      getVariantAddonsById(
        dispatch,
        navigation,
        id,
        successVariantCallback,
        failureVariantCallback,
        apiErrorCallback,
      );
    });
  };

  const successVariantCallback = data => {
    ShowConsoleLogMessage('variant -> ' + JSON.stringify(data));
    setVariantDetails(data);
  };
  const failureVariantCallback = data => {
    setVariantDetails(null);
  };

  // const itemQtyIncrease = (item, index) => {
  //   let temp = {...item};
  //
  //   if (temp.quantity === undefined) {
  //     temp.quantity = 1;
  //   } else {
  //     temp.quantity = temp.quantity + 1;
  //   }
  //
  //   let updatedMenu = [...restaurantDetails.menu];
  //   updatedMenu[index] = temp;
  //
  //   setRestaurantDetails({...restaurantDetails, menu: updatedMenu});
  // };
  //
  // const itemQtyDecrease = (item, index) => {
  //   let temp = {...item};
  //
  //   if (temp.quantity === undefined || temp.quantity <= 1) {
  //     temp.quantity = 0;
  //   } else {
  //     temp.quantity = temp.quantity - 1;
  //   }
  //
  //   let updatedMenu = [...restaurantDetails.menu];
  //   updatedMenu[index] = temp;
  //
  //   setRestaurantDetails({...restaurantDetails, menu: updatedMenu});
  // };

  const itemQtyIncrease = (categoryIndex, itemIndex) => {
    let updatedMenu = [...restaurantDetails.menu];
    let temp = {...updatedMenu[categoryIndex]};
    let tempItem = {...temp.categoryItems[itemIndex]};

    if (tempItem.quantity === undefined) {
      tempItem.quantity = 1;
    } else {
      tempItem.quantity = tempItem.quantity + 1;
    }
    // ShowConsoleLogMessage(
    //   JSON.stringify(tempItem) + ' categoryIndex =-== item in dex - ',
    // );
    temp.categoryItems[itemIndex] = tempItem;
    updatedMenu[categoryIndex] = temp;

    setRestaurantDetails({...restaurantDetails, menu: updatedMenu});
  };

  const itemQtyDecrease = (categoryIndex, itemIndex) => {
    let updatedMenu = [...restaurantDetails.menu];
    let temp = {...updatedMenu[categoryIndex]};
    let tempItem = {...temp.categoryItems[itemIndex]};

    if (tempItem.quantity === undefined || tempItem.quantity <= 1) {
      tempItem.quantity = 0;
    } else {
      tempItem.quantity = tempItem.quantity - 1;
    }

    temp.categoryItems[itemIndex] = tempItem;
    updatedMenu[categoryIndex] = temp;

    setRestaurantDetails({...restaurantDetails, menu: updatedMenu});
  };
  const closeAddModal = () => {
    setBottomSheetVisible(!bottomSheetVisible);
  };
  const [pData, setPData] = useState({});

  const renderBottomSheetContent = () => {
    return (
      <View
        style={{
          backgroundColor: '#00000090',
          flexGrow: 1,
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => closeAddModal()}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            // backgroundColor: COLORS.cartCountBgColor,
          }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => closeAddModal()}>
            <Image
              source={icons.add}
              style={{
                width: 40,
                height: 40,
                margin: 10,
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.additemView}>
          <ScrollView
            style={[
              styles.middleView,
              {
                paddingTop: 10,
              },
            ]}>
            <View
              style={
                {
                  // paddingBottom: 10,
                }
              }
            />
            <View
              style={{
                elevation: 10,
                backgroundColor: COLORS.white,
                marginHorizontal: 10,
                borderRadius: 15,
                width: '95%',
                // height: 350,
              }}>
              <Image
                source={{
                  uri: pData?.image,
                }}
                style={{
                  width: '95%',
                  height: 250,
                  margin: 10,
                  resizeMode: 'stretch',
                  borderRadius: 5,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  updateDishFavUnFav(pData?.product_id);
                }}
                style={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: 50,
                  borderWidth: 1,
                  right: 15,
                  top: 15,
                  position: 'absolute',
                }}>
                <Image
                  source={pData?.is_like ? icons.favorite : icons.unfavorite}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {}}
              style={{
                // backgroundColor: '#e7e7e7',
                flexDirection: 'row',
                width: '100%',
                // borderTopRightRadius: 15,
                // borderTopLeftRadius: 15,
                justifyContent: 'space-between',
                paddingVertical: 5,
              }}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: COLORS.black,
                      fontSize: 18,
                      fontFamily: 'Segoe UI Bold',
                      // marginBottom: 5,
                      marginTop: 5,
                      marginEnd: 8,
                      marginStart: 20,

                      paddingBottom: pData?.product_rating == 0 ? 10 : 0,
                    }}>
                    {pData?.product_name}
                  </Text>
                </View>

                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 14,
                    fontFamily: 'Segoe UI',
                    marginEnd: 8,
                    marginStart: 20,
                    maxWidth: Dimensions.get('screen').width - 50,
                  }}>
                  {pData?.dis}
                </Text>

                <View
                  style={{
                    alignSelf: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 15,
                    // marginBottom: 5,
                    marginStart: 20,
                    // backgroundColor: COLORS.primary,
                  }}>
                  {pData?.product_rating != 0 ? (
                    <>
                      <Text
                        style={{
                          marginHorizontal: 3,
                          fontFamily: 'Segoe UI Bold',
                          fontSize: 12,
                          color: COLORS.black,
                          // marginTop: 0,
                          alignSelf: 'center',
                          marginVertical: 2,
                        }}>
                        {pData.product_rating}
                      </Text>
                      <Text
                        style={{
                          // marginHorizontal: 10,
                          fontFamily: 'Segoe UI',
                          fontSize: 10,
                          color: '#0638ff',
                          // marginTop: 0,
                          alignSelf: 'center',
                          marginVertical: 2,
                        }}>
                        {/* ({item?.reviewCount})12 Reviews */}(
                        {pData.product_rating}) Reviews
                      </Text>
                    </>
                  ) : null}
                </View>
                {/* <Text
                    style={{
                      color: COLORS.grey,
                      fontSize: 1,
                      fontFamily: 'Segoe UI',
                      // marginTop: 5,
                      marginStart: 20,
                    }}>
                   South Indian
                  </Text> */}
                {/* <Text
                    style={{
                      color: COLORS.darkGray,
                      fontSize: 16,
                      fontFamily: 'Segoe UI',
                      marginTop: 5,
                      marginStart: 20,
                      paddingBottom: 10,
                    }}>
                    ₹ {pData?.product_price}
                  </Text> */}
              </View>
              <TouchableOpacity
                onPress={() => {
                  closeAddModal();
                  setSelectedOption(null);
                  // setTotalMoney(0)
                }}>
                {/* <Image
                    source={icons.cancel}
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 10,
                      marginRight: 10,
                      // alignSelf: 'flex-end',
                      // position: 'absolute',
                      // right: 15,
                    }}
                  /> */}
                {pData?.type == 'veg' ? (
                  <Image
                    source={icons.pure_veg}
                    style={{
                      width: 8,
                      height: 8,
                      marginTop: 5,
                      marginEnd: 15,
                      // marginStart: 5,
                    }}
                  />
                ) : null}
              </TouchableOpacity>
            </TouchableOpacity>

            {pData?.customizable == 'true' ? (
              variantData.length >= 1 ? (
                <>
                  <Text
                    style={{
                      color: COLORS.black,
                      fontSize: 18,
                      fontFamily: 'Segoe UI',
                      marginTop: 15,
                      marginStart: 20,
                    }}>
                    Options
                  </Text>

                  {/*<RadioButtons*/}
                  {/*  selectedOption={selectedOption}*/}
                  {/*  onSelect={onSelect}*/}
                  {/*  options={variantData}*/}
                  {/*  var_count={0}*/}
                  {/*  onPlus={onAddModalPlus}*/}
                  {/*  onMinus={onAddModalMinus}*/}
                  {/*  mainData={pData}*/}
                  {/*  itemIndex={0}*/}
                  {/*/>*/}
                </>
              ) : (
                <View
                  style={{
                    marginTop: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <ActivityIndicator color={COLORS.primary} size={'large'} />
                </View>
              )
            ) : null}
            {pData?.customizable == 'true' ? (
              addonData.length >= 1 ? (
                <>
                  <Text
                    style={{
                      color: COLORS.black,
                      fontSize: 18,
                      fontFamily: 'Segoe UI',
                      marginTop: 15,
                      marginStart: 20,
                    }}>
                    Addons
                  </Text>
                  <FlatList
                    data={addonData}
                    renderItem={({item, index}) => {
                      return (
                        <View style={[{paddingLeft: 24, paddingRight: 6}]}>
                          <View style={[styles.rowView, {marginTop: 15}]}>
                            <View style={{flex: 1, paddingRight: 10}}>
                              <Text style={[styles.sizeText]}>
                                {item?.addon}
                              </Text>
                            </View>

                            <TouchableOpacity
                              onPress={() => {}}
                              style={{
                                flexDirection: 'row',
                              }}>
                              <Text style={[styles.sizeText, {marginEnd: 10}]}>
                                ₹ {item?.price}
                              </Text>

                              <Image
                                source={
                                  item?.added ? icons.checked : icons.unchecked
                                }
                                style={styles.checkbox}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    }}
                  />

                  <View
                    style={{
                      padding: 10,
                    }}
                  />
                </>
              ) : null
            ) : null}

            <View
              style={{
                padding: 10,
              }}
            />
          </ScrollView>
          <View
            style={{
              // flex: 1,
              backgroundColor: COLORS.light_gray,
              paddingTop: 10,
              borderTopColor: COLORS.grey,
              // borderWidth: 0.5,
              borderTopWidth: 0.5,
            }}>
            <TouchableOpacity
              onPress={() => {}}
              activeOpacity={0.8}
              style={{
                height: 50,
                paddingHorizontal: 25,
                backgroundColor: COLORS.colorPrimary,
                marginTop: 1,
                marginBottom: 10,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              {totalProductPrice + totalAddonPrice == 0 ? (
                <ActivityIndicator size={'small'} color={COLORS.white} />
              ) : (
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 18,
                    fontFamily: 'Segoe UI Bold',
                  }}>
                  {/* Add Item ₹ {totalMoney} */}
                  {/* Add Item ₹ {totalMoney + addonPrice} */}
                  Add Item ₹ {totalProductPrice + totalAddonPrice}
                  {/* Add Item ₹ {pData?.product_price} */}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: COLORS.search_bg_grey,
        },
      ]}>
      <Text style={GlobalStyle.commonHeaderText}>RESTAURANT DETAILS</Text>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View style={GlobalStyle.commonFlexOne}>
          <VegUrbanImageLoader
            styles={{
              height: 200,
              width: SIZES.width,
              marginBottom: 15,
            }}
            source={IMAGE_BASE_URL + restaurantDetails?.data?.shop_top_banner}
          />

          <Text style={GlobalStyle.commonHeadingText}>
            Name: {restaurantDetails?.data?.shop_name}
          </Text>
          <Text style={GlobalStyle.commonSmallText}>
            Rest. Open time: {restaurantDetails?.data?.shop_opening_time}
          </Text>

          <Text style={GlobalStyle.commonSmallText}>
            Desc: {restaurantDetails?.data?.description}
          </Text>

          <Text style={GlobalStyle.commonSmallText}>
            Address: {restaurantDetails?.data?.shop_address}
          </Text>
          <Text style={GlobalStyle.commonSmallText}>
            Distance: {restaurantDetails?.data?.distance}
          </Text>
          {/*<Text*/}
          {/*  style={[*/}
          {/*    GlobalStyle.commonHeadingText,*/}
          {/*    {*/}
          {/*      marginTop: 15,*/}
          {/*    },*/}
          {/*  ]}>*/}
          {/*  Cuisines :{restaurantDetails?.data?.cuisines}*/}
          {/*</Text>*/}
          <Text
            style={[
              GlobalStyle.commonHeadingText,
              {
                marginTop: 15,
              },
            ]}>
            Menu Items:
          </Text>
          <View>
            {/*<FlatList*/}
            {/*  style={{}}*/}
            {/*  data={restaurantDetails?.menu}*/}
            {/*  extraData={restaurantDetails?.menu}*/}
            {/*  renderItem={renderMenuItem}*/}
            {/*/>*/}
            <FlatList
              data={restaurantDetails?.menu}
              keyExtractor={category => category.categoryName}
              renderItem={renderCategoryItem}
            />
          </View>
          <Text
            style={[
              GlobalStyle.commonHeadingText,
              {
                marginTop: 15,
              },
            ]}>
            {/*Menu :*/}
          </Text>
        </View>
      </ScrollView>
      <Modal isVisible={bottomSheetVisible}>{renderBottomSheetContent()}</Modal>
    </SafeAreaView>
  );
};

export default RestaurantDetails;

const styles = StyleSheet.create({});
