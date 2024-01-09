import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    SafeAreaView,
    I18nManager
} from 'react-native';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../../constants/Colors'
import { FONTS } from '../../constants/Fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ScrollView } from 'react-native';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import { ShowToastMessage } from '../../utils/Utility';

const CartDetails = ({ navigation }) => {
    const [count, setCount] = useState(1);

    const theme = useContext(themeContext);
    const [show, setShow] = useState(false);
    // Sample cart items data
    const cartItems = [
        {
            id: '1', name: 'Regular(1 Lpcs)',
            price: 10, quantity: 2,

        },
        // { id: '2', name: 'Item 2', price: 15, quantity: 1 },
        // Add more items as needed
    ];

    const completeYour = [
        {
            id: '1', name: 'Cheese',
            price: 100, quantity: 2,

        },
        { id: '2', name: 'Dal', price: 150, quantity: 1 },
    ];

    const amountList = [
        {
            id: '1', name: 'Cheese',
            price: 20, quantity: 2,

        },
        { id: '2', name: 'Dal', price: 30, quantity: 1 },
        { id: '2', name: 'Dal', price: 60, quantity: 1 },
        { id: '2', name: 'Dal', price: 80, quantity: 1 },


    ];

    const RenderComplete = ({ item }) => {
        return (

            <View style={{
                flex: 1,
                borderRadius: 5,
                borderWidth: 0.2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // paddingHorizontal:5,
                // paddingVertical:5,
                // width: '50%',
                marginTop: 5,
                marginHorizontal: 5,
                width: 160

            }}>
                <View style={{
                    marginTop: 6,
                    marginLeft: 10
                }}>
                    <Text style={{
                        fontFamily: FONTS?.bold,
                        color: COLORS?.black,
                        fontSize: 14
                    }}>{item?.name}</Text>
                    <Text style={{
                        fontFamily: FONTS?.regular,
                        color: COLORS?.black,
                        fontSize: 14
                    }}>${item?.price}</Text>
                </View>
                <Image
                    source={{
                        uri: 'https://www.london-unattached.com/wp-content/uploads/2015/06/The-Trading-House-City-Bank-London-Launch-Party-1032.jpg'
                    }}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 10
                    }}
                />
            </View>
        )
    }
    const amountRender = ({ item }) => {
        return (

            <View style={{
                // flex: 1,
                borderRadius: 5,
                borderWidth: 0.2,
                flexDirection: 'row',
                marginTop: 10,
                marginHorizontal: 5,
                width: 70,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 5
            }}>
                <View style={{
                    // marginTop: 6,
                    // marginLeft: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <Text style={{
                        fontFamily: FONTS?.bold,
                        color: COLORS?.black,
                        fontSize: 14
                    }}>${item?.price}</Text>
                </View>
            </View>
        )
    }
    const renderCartItem = ({ item }) => {
        return (
            <View style={styles.cartItem}>
                <View style={{}}>
                    <Text>{`\u25CF`}  {item.name}</Text>

                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flex: 1
                    // justifyContent: 'space-between',

                }}>
                    <View style={styles.itemQuantity}>
                        <View
                            style={[
                                GlobalStyle.flexRowAlignCenter,
                                {
                                    // marginHorizontal: 15,
                                    // alignSelf: 'center',
                                    // flex: 1,
                                    width: '70%',
                                    marginTop: 5,
                                    backgroundColor: COLORS?.white,
                                    borderRadius: 20,
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 10,
                                    paddingVertical: 2,
                                    borderWidth: 0.2,
                                    // marginHorizontal:10,
                                    alignItems: 'center'
                                },
                            ]}>
                            <AntDesign
                                name="minus"
                                size={18}
                                color={theme?.colors?.textColor}
                                onPress={() => {
                                    setCount(prev => (prev > 1 ? prev - 1 : prev));
                                }}
                            />
                            <Text
                                style={[
                                    styles.qtyText,
                                    {
                                        color: theme.colors.white,
                                    },
                                ]}>
                                {count}
                            </Text>
                            <AntDesign
                                name="plus"
                                size={18}
                                color={theme?.colors?.textColor}
                                onPress={() => {
                                    setCount(prev => prev + 1);
                                }}
                            />
                        </View>
                    </View>
                    <Text style={{
                        fontSize: 16,
                        color: COLORS?.black,
                        fontFamily: FONTS?.bold
                    }}>${item.price}</Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView
            style={[
                GlobalStyle.mainContainerBgColor,
                {
                    backgroundColor: theme?.colors?.bg,
                },
            ]}>
            <View
                style={[
                    GlobalStyle.commonToolbarBG,
                    {
                        backgroundColor: theme.colors.bg_color_onBoard,
                        elevation: 0
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
                {/* <ToolBarIcon
        title={Ionicons}
        iconName={'chevron-back'}
        icSize={20}
        icColor={COLORS.colorPrimary}
        style={{
          backgroundColor: theme?.colors?.toolbar_icon_bg,
          marginEnd: 10,
        }}
        onPress={() => {
          navigation.goBack();
        }}
      /> */}
                <VegUrbanCommonToolBar
                    title="Cart  Details"
                    style={{
                        backgroundColor: theme.colors.bg_color_onBoard,
                        marginStart: 10,
                    }}
                    textStyle={{
                        color: theme.colors.textColor,
                        fontSize: 20,

                    }}
                />

            </View>
            <ScrollView>
                <View style={styles.cartItemsContainer}>
                    <Text style={styles.cartTitle}>Cart Items</Text>
                    <FlatList
                        data={cartItems}
                        renderItem={renderCartItem}
                        keyExtractor={(item) => item.id}
                    />
                    <View
                        style={{
                            width: '100%',
                            borderWidth: 0.2,
                            // color:COLORS?.gray,
                            // height:0,
                            flexGrow: 1,
                            borderColor: COLORS?.gray
                        }}
                    />
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // flex:1,
                        marginHorizontal: 10,
                        marginVertical: 15
                    }}>
                        <Text style={{
                            fontSize: 14,
                            color: COLORS?.black,
                            fontFamily: FONTS?.regular
                        }}>Add More Items</Text>
                        <AntDesign
                            name="pluscircleo"
                            size={20}
                            color={COLORS?.gray}
                        />
                    </TouchableOpacity>

                    <View
                        style={{
                            width: '100%',
                            borderWidth: 0.2,
                            borderColor: COLORS?.gray,
                            // height:0,
                            flexGrow: 1
                        }}
                    />
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // flex:1,
                        marginHorizontal: 10,
                        marginVertical: 15
                    }}>
                        <Text style={{
                            fontSize: 14,
                            color: COLORS?.black,
                            fontFamily: FONTS?.regular
                        }}>Add Cooking Requests</Text>
                        <AntDesign
                            name="pluscircleo"
                            size={20}
                            color={COLORS?.gray}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.cartItemsContainer}>
                    <Text style={{
                        fontSize: 13,
                        fontFamily: FONTS?.bold,
                        color: COLORS?.black,
                        marginTop: 0
                    }}>Complete your meal</Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={completeYour}
                        renderItem={RenderComplete}
                        keyExtractor={(item) => item.id}
                    />

                </View>
                {/* Cooking Requests */}
                <View
                // style={styles.cookingRequestContainer}
                >
                    <Text style={styles.cookingRequestTitle}>Offers & Benefits</Text>
                    <View style={[styles.cartItemsContainer, {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // justifyContent:'center',
                        // flex:1
                    }]}>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: FONTS?.regular,
                            color: COLORS?.black,
                            marginTop: 0,
                            paddingVertical: 10,
                            marginLeft: 20
                        }}>Apply Coupon</Text>
                        <MaterialIcons
                            name="keyboard-arrow-right"
                            color={COLORS?.grey}
                            size={22}
                        />
                    </View>
                </View>


                <View
                // style={styles.cookingRequestContainer}
                >
                    <Text style={styles.cookingRequestTitle}>Tips Your Delivery Partner</Text>
                    <View style={[styles.cartItemsContainer, {

                        alignItems: 'center',
                        // justifyContent:'center',
                        // flex:1
                    }]}>
                        <Text style={{
                            fontSize: 13,
                            fontFamily: FONTS?.regular,
                            color: COLORS?.black,
                            marginTop: 0,
                            // paddingVertical:10,
                            // marginLeft:20
                        }}>Thankyou delivery partner by leavning them a tip.
                            100% of the tip will go your delivery partner
                        </Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={amountList}
                            renderItem={amountRender}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                </View>

                <View
                // style={styles.cookingRequestContainer}
                >
                    <Text style={styles.cookingRequestTitle}>Bill Details</Text>
                    <View style={[styles.cartItemsContainer, {
                        paddingHorizontal: 15,
                        marginVertical: 10
                    }]}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',

                        }}>
                            <Text style={{
                                fontSize: 14,
                                fontFamily: FONTS?.regular,
                                color: COLORS?.black,
                            }}>Item Total</Text>
                            <Text style={{
                                fontFamily: FONTS?.bold,
                                color: COLORS?.black,
                                fontSize: 14
                            }}>$100</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginVertical: 4

                        }}>
                            <Text style={{
                                fontSize: 14,
                                fontFamily: FONTS?.regular,
                                color: COLORS?.black,
                                textDecorationLine: 'underline'
                            }}>Delivery Partner Fee</Text>
                            <Text style={{
                                fontFamily: FONTS?.bold,
                                color: COLORS?.black,
                                fontSize: 14
                            }}>$300</Text>
                        </View>
                        <Text style={{
                            fontSize: 12,
                            color: COLORS?.gray,
                            fontFamily: FONTS?.regular,
                            marginVertical: 10
                        }}>Order above Rs 130 ro Free Delivery</Text>

                        <View
                            style={{
                                width: '100%',
                                borderWidth: 0.2,
                                borderColor: COLORS?.gray,
                                marginVertical: 10

                            }}
                        />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                fontSize: 14,
                                fontFamily: FONTS?.regular,
                                color: COLORS?.black,
                            }}>Delivery Tips</Text>
                            <Text style={{
                                fontFamily: FONTS?.bold,
                                color: COLORS?.red,
                                fontSize: 14
                            }}>Add Tips</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginVertical: 4

                        }}>
                            <Text style={{
                                fontSize: 14,
                                fontFamily: FONTS?.regular,
                                color: COLORS?.black,
                                textDecorationLine: 'underline'
                            }}>GST & Restaurant Charges</Text>
                            <Text style={{
                                fontFamily: FONTS?.bold,
                                color: COLORS?.black,
                                fontSize: 14
                            }}>$108</Text>
                        </View>

                        <View
                            style={{
                                width: '100%',
                                borderWidth: 0.2,
                                borderColor: COLORS?.gray,
                                marginVertical: 15
                            }}
                        />

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginVertical: 10
                        }}>
                            <Text style={{
                                fontSize: 14,
                                fontFamily: FONTS?.bold,
                                color: COLORS?.black,
                            }}>To Pay</Text>
                            <Text style={{
                                fontFamily: FONTS?.bold,
                                color: COLORS?.black,
                                fontSize: 14
                            }}>$508</Text>
                        </View>
                    </View>

                    <View
                    // style={styles.cookingRequestContainer}
                    >
                        <Text style={styles.cookingRequestTitle}>
                            Review your order and address details to
                            avoid cancellations
                        </Text>
                        <View style={[styles.cartItemsContainer, {

                            // alignItems: 'center',
                            // justifyContent:'center',
                            // flexDirection:'row'
                            // flex:1
                        }]}>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{
                                    fontSize: 13,
                                    fontFamily: FONTS?.bold,
                                    color: COLORS?.red,
                                    marginTop: 0,
                                    // paddingVertical:10,
                                    // marginLeft:20
                                }}>Note : -
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontFamily: FONTS?.regular,
                                        color: COLORS?.black,
                                        marginTop: 0,
                                        width: '90%'
                                        // paddingVertical:10,
                                        // marginLeft:20
                                    }}> If you cancel within 60 seconds of placing your
                                    order a 100% refund will be issued. No
                                    refund for cancellations made after 60 seconds
                                </Text>
                            </View>
                            <View>
                                <Text style={{
                                    fontSize: 13,
                                    fontFamily: FONTS?.regular,
                                    color: COLORS?.black,
                                    marginTop: 15,

                                    // paddingVertical:10,
                                    // marginLeft:20
                                }}> Avoid cancellations as it leads to foods
                                </Text>

                                <Text style={{
                                    fontSize: 13,
                                    fontFamily: FONTS?.bold,
                                    color: COLORS?.red,
                                    marginTop: 10,
                                    // paddingVertical:10,
                                    // marginLeft:20,
                                    textDecorationLine: 'underline',
                                    textDecorationColor: COLORS?.red
                                }}> READ CANCELLATIONS POLICY
                                </Text>
                            </View>

                        </View>


                    </View>




                </View>
            </ScrollView>

            <View
                style={{
                    // flex:1,
                    backgroundColor: COLORS?.white,
                    marginTop: 15,
                    paddingHorizontal: 20
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    // alignItems:'center',
                    marginTop: 15,
                    maxWidth: '90%',
                }}>
                    <Image
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/128/1309/1309305.png'
                        }}
                        style={{
                            width: 23,
                            height: 23
                        }}
                    />
                    <Text style={[styles.cookingRequestTitle, {
                        // marginTop: 15,
                        marginLeft: 8
                    }]}>Where would you like us to deliver
                        this order?
                    </Text>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        margin: 20,
                    }}>
                    <VegUrbanCommonBtn
                        height={50}
                        width={'100%'}
                        borderRadius={10}
                        textSize={16}
                        textColor={theme?.colors?.text}
                        text="Add Your Select Address"
                        backgroundColor={theme?.colors?.colorPrimary}
                        onPress={() => {
                            ShowToastMessage('Cooming Soon!')
                        }}
                        textStyle={{
                            fontFamily: FONTS?.bold,
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>

    );
};

export default CartDetails;

const styles = {
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    cartItemsContainer: {
        marginBottom: 20,
        // flex:1,
        borderRadius: 10,
        // borderWidth: 0.2,
        marginHorizontal: 20,
        padding: 10,
        marginTop: 15,
        backgroundColor: COLORS?.white

    },
    cartTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 10,

        // flex:1
    },
    itemQuantity: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addMoreContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    addMoreText: {
        fontSize: 18,
    },
    plusIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    cookingRequestContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    cookingRequestTitle: {
        fontSize: 16,
        fontFamily: FONTS?.bold,
        marginLeft: 25,
        color: COLORS?.black
    },
};
