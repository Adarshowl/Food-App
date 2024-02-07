import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import React, { useContext, useState } from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import { STRING } from '../../constants';
import images from '../../constants/images';

import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import themeContext from '../../constants/themeContext';
import { FONTS } from '../../constants/Fonts';

const GetDiscount = ({ navigation }) => {
    const theme = useContext(themeContext);

    const [cartData, setCartData] = useState([
        {
            name: 'fresh veg',
            image:
                'https://media.istockphoto.com/id/467328250/photo/mango.jpg?s=612x612&w=0&k=20&c=cYSHeExkHZVYQM6xkWehclgYDqkmB7o4E494xz5GbXs=',

            price: '10',
            old_price: '5',
            ori_price: '5',
            qty: '1 kg',
            count: '2',
            via: 'COD',
        },
        {
            name: 'fresh fruit',
            image:
                'https://t4.ftcdn.net/jpg/02/71/66/91/360_F_271669174_2dHs4FO3SV83lQ4MjswEBa4LQTGjMO4E.jpg',

            price: '20',
            ori_price: '15',
            old_price: '10',
            qty: '2 kg',
            count: '2',
            via: 'ONLINE',
        },

        {
            name: 'fresh vegied',
            image:
                'https://media.istockphoto.com/id/171575811/photo/guava.jpg?s=612x612&w=0&k=20&c=cjVDpisFrT8JlqFbSEImkfsXgQbtrNCdSTILGAzIj2Q=',

            price: '15',
            ori_price: '5',
            qty: '1 kg',
            old_price: '15',
            via: 'Cash',
            count: '1',
        },
    ]);

    return (
        <SafeAreaView
            style={[
                GlobalStyle.mainContainerBgColor,
                {
                    backgroundColor: theme.colors.bg_color_onBoard,
                },
            ]}>
            <View
                style={[
                    GlobalStyle.commonToolbarBG,
                    {
                        backgroundColor: theme.colors.bg_color_onBoard,
                        elevation: 0,
                        marginTop: 10,

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
                {/* <VegUrbanCommonToolBar
            title="Cancel Order"
            style={{
              // backgroundColor: theme.colors.bg_color_onBoard,
            }}
            textStyle={{
              color: theme.colors.textColor,
              fontFamily: FONTS?.bold,
              fontSize: 18
            }}
          /> */}

                <Text style={{
                    fontFamily: FONTS?.bold,
                    color: theme?.colors?.white,
                    fontSize: 20
                }}>
                    Get Discount
                </Text>


            </View>
            <ScrollView
                style={{
                    flex: 1,
                }}>

                <View style={{ padding: 20 }}>
                    {/* Reason for cancellation */}
                    {/* <Text style={[styles?.boldText, {
              fontSize: 17
            }]}>
              Reason for cancellation:
            </Text> */}
                    <Text style={{
                        marginBottom: 20,
                        fontSize: 30,
                        color: theme?.colors?.textColor,
                        fontFamily: FONTS?.bold,
                        marginEnd: 15,
                        marginTop: 15
                    }}>
                        Here's 50% off for you , and 10% for a friend
                    </Text>

                    {/* Image */}
                    <View style={{
                        alignItems: 'center',
                        marginBottom: 20,
                        borderRadius: 100,
                        width: 150,
                        height: 150,
                        alignSelf: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image
                            source={images?.Discount}
                            // source={{
                            //     uri: 'https://cdn-icons-png.flaticon.com/128/3759/3759129.png'
                            // }}
                            style={{ width: 150, height: 150, }}
                        />
                    </View>

                    {/* Details */}


                    <View style={{
                        marginTop: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1.5,
                        borderColor: theme?.colors?.colorPrimary,
                        width: '60%',
                        position: 'relative',

                        padding: 10,
                        alignSelf: 'center',
                        borderStyle: 'dashed'

                    }}>

                        <Text
                            style={{
                                fontSize: 27,
                                color: theme?.colors?.colorPrimary,
                                fontFamily: FONTS?.bold,
                                textAlign: 'center'
                            }}
                        >DJFGH548</Text>

                    </View>


                </View>


            </ScrollView>
            <View
                style={{
                    backgroundColor: theme.colors.bg_color_onBoard,
                    padding: 10,
                    alignItems: 'center',
                    marginHorizontal: 10,
                }}>

                <VegUrbanCommonBtn
                    height={50}
                    width={'100%'}
                    borderRadius={30}
                    textSize={18}
                    textColor={theme?.colors?.white}
                    text="Copy"
                    backgroundColor={theme.colors.bg}
                    onPress={() => {
                        navigation.goBack('TrackOrder');
                    }}
                    textStyle={{
                        fontFamily: FONTS?.semi_old
                    }}
                />

            </View>
            <View
                style={{
                    backgroundColor: theme.colors.bg_color_onBoard,
                    padding: 10,
                    alignItems: 'center',
                    marginHorizontal: 10,
                    marginBottom: 20
                }}>
                <VegUrbanCommonBtn
                    height={50}
                    width={'100%'}
                    borderRadius={30}
                    textSize={18}
                    textColor={theme?.colors?.text}
                    text="Share"
                    backgroundColor={theme.colors.colorPrimary}
                    onPress={() => {
                        navigation.goBack('TrackOrder');
                    }}
                    textStyle={{
                        fontFamily: FONTS?.semi_old
                    }}
                />

            </View>
        </SafeAreaView>
    );
};

export default GetDiscount;
const styles = StyleSheet.create({
    orderOtp: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 14,
        paddingHorizontal: 10,
        marginEnd: 2,
        color: COLORS.colorPrimary,
    },
    orderStatWrapper: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 25,
    },
    normalText: {
        fontFamily: FONTS?.regular,
        fontSize: 17,
        color: COLORS.black,
        // textAlign: 'center',
        marginVertical: 5,
    },
    boldText: {
        fontFamily: FONTS?.semi_old,
        fontSize: 17,
        color: COLORS.black,
        // textAlign: 'center',
        marginVertical: 5,
    },
});
