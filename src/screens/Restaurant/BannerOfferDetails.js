import {
    View, Image,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet,
    Modal,
    Button,
    ImageBackground,
    ScrollView,
    RadioButton,
    TextInput,
    I18nManager
} from 'react-native';
import images from '../../constants/images';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import React, { useContext, useEffect, useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo'
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import { icons, SIZES } from '../../constants';
import { COLORS } from '../../constants/Colors';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import TabOfferScreen from '../Flash/TabOfferScreen';
import '../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import themeContext from '../../constants/themeContext';
import { FONTS } from '../../constants/Fonts';
import FlashSale from '../Flash/FlashSale';
import ToolBarIcon from '../../utils/ToolBarIcon';

const BannerOfferDetails = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const offers = [/* Your array of offers */];
    const theme = useContext(themeContext);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.offerItem}>
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>
                {/* Add more details as needed */}
            </TouchableOpacity>
        );
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const [showModal, setShowModal] = useState(false);

    // Function to handle filter click and open the modal
    const handleFilterClick = () => {
        setShowModal(true);
    };

    // Function to handle applying or clearing filters
    const handleApplyFilter = () => {
        // Apply filter logic here
        setShowModal(false);
    };

    // Function to handle closing the modal without applying filters
    const handleCloseModal = () => {
        setShowModal(false);
    };


    return (
        <View style={styles.container}>
            <ImageBackground
                source={images.banner}
                // source={{
                //     // uri: item?.image,
                //     uri: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/restaurant-offer-post-design-template-849b9069fd618342e2592dd9992ee7b5_screen.jpg?ts=1591366091'
                // }}
                // resizeMode={'stretch'}
                style={[styles.sliderImage]}
            >

                <View style={{ position: 'absolute', top: 40, left: 0 }}>
                    <View
                        style={[
                            // GlobalStyle.commonToolbarBG,
                            {
                                // backgroundColor: theme.colors.bg_color_onBoard,
                                elevation: 0,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                flex: 1
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
                                marginTop: 6,
                                backgroundColor: theme?.colors?.bg_color_onBoard,
                                right: 0,
                                left: 150
                            }}
                        >
                            <Ionicons
                                name='location-sharp'
                                color={theme?.colors?.textColor}
                                size={20}
                            />
                            <Text
                                style={{
                                    fontSize: 13,
                                    color: theme?.colors?.textColor,
                                    fontFamily: FONTS?.regular,
                                    marginLeft: 5
                                }}
                            >
                                Dewas mp plot no 3
                            </Text>
                        </View>


                    </View>

                </View>


                <View style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    bottom: 10,
                    flex: 1,
                    // borderRadius: 20,
                    width: '70%',
                    marginLeft: 15

                }}>

                    <Text style={{ color: COLORS?.white, fontSize: 20, fontFamily: FONTS?.bold }}>Near Me</Text>
                    <Text style={{ color: COLORS?.white, fontSize: 13, fontFamily: FONTS?.regular }}>
                        Choose From Nearby Restaurants
                        with Deliciousness Awatating
                    </Text>

                </View>

            </ImageBackground>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Search');
                }}
                style={[
                    styles.inputWrapper,
                    {
                        backgroundColor: theme?.colors?.bg_color_onBoard,
                        marginTop: -50
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
                    placeholder={'Search'}
                    placeholderTextColor={theme?.colors?.gray}
                />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={openModal} style={styles.filterButton}>
                <Text style={styles.filterButtonText}>Filter</Text>
            </TouchableOpacity>
             */}

            <View
                style={styles.filtersContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                    <TouchableOpacity
                        style={[styles?.filterOption, {
                            backgroundColor: theme?.colors?.bg
                        }]}
                        onPress={handleFilterClick}
                    >
                        {/* <Text style={styles.filterText}>Filter</Text> */}
                        <Image
                            source={{
                                uri: "https://cdn-icons-png.flaticon.com/128/7094/7094575.png"
                            }}
                            style={{
                                width: 27,
                                height: 27,
                                marginLeft: 8
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles?.filterOption, {
                            backgroundColor: theme?.colors?.bg
                        }]}
                    // onPress={handleSortClick('Sort')}
                    >

                        <Text style={styles.filterText}>Cuisines</Text>
                        <MaterialIcons
                            name="keyboard-arrow-down"
                            size={22}
                            color={COLORS?.black}
                            style={{
                                marginLeft: 8
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles?.filterOption, {
                            backgroundColor: theme?.colors?.bg
                        }]}
                    // onPress={handleVegNonVegClick('Veg/Non-Veg')}
                    >
                        <Text style={styles.filterText}>Promo</Text>
                        {/* <MaterialIcons
                            name="keyboard-arrow-down"
                            size={22}
                            color={COLORS?.black}
                            style={{
                                marginLeft: 8
                            }}
                        /> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles?.filterOption, {
                            backgroundColor: theme?.colors?.bg
                        }]}
                    // onPress={handleRatingClick('Rating')}
                    >
                        <Text style={styles.filterText}>Rated4.5+</Text>
                        {/* <MaterialIcons
                            name="keyboard-arrow-down"
                            size={22}
                            color={COLORS?.black}
                            style={{
                                marginLeft: 8
                            }}
                        /> */}
                    </TouchableOpacity>


                </ScrollView>
            </View>

            <View style={{
                flex: 1
            }}>
                <TabOfferScreen />

            </View>
            {/* <FlatList
                data={offers}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            /> */}

            {/* Modal for filter options */}
            <Modal
                visible={showModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowModal(false)}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <View style={{
                        // flex:1,
                        backgroundColor: 'white',
                        padding: 20,
                        width: '100%'
                    }}>
                        <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{
                                fontSize: 25,
                                color: COLORS?.black,
                                fontFamily: FONTS?.bold
                            }}>Filter</Text>
                            <TouchableOpacity
                                onPress={handleCloseModal}
                            >
                                <Entypo
                                    name="cross"
                                    color={COLORS?.black}
                                    size={22}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                width: '100%',
                                borderWidth: 0.2,
                                color: COLORS?.grey,
                                marginBottom: 10

                            }}
                        />

                        <View style={{
                            flex: 1,
                            backgroundColor: 'red'
                        }}>
                            <View style={{
                                // flex:0.5
                            }}>
                                <Text>Sort</Text>
                            </View>
                            <View
                                style={{
                                    flex: 0.5
                                }}
                            >
                                <Text>Sort By</Text>
                            </View>

                        </View>

                        {/* Apply and Clear Filter buttons */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>
                            <TouchableOpacity onPress={handleApplyFilter}>
                                <Text>Apply</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCloseModal}>
                                <Text>Clear Filter</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: COLORS.black,
        // paddingHorizontal: 5,
        marginHorizontal: 20,
        borderRadius: 25,
        paddingHorizontal: 20,
        height: 55,
        elevation: 5
        // borderWidth:0.1
    },
    input: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'OpenSans-Regular',
        paddingStart: 5,
        marginStart: 5,
    },
    sliderImage: {
        width: SIZES.width,
        height: 280,
        // overflow: 'hidden',
        // borderRadius: 20,
        // marginTop: -40
        // borderBottomEndRadius: 50,
        // borderBottomRightRadius: 50,
        // borderBottomLeftRadius: 50,
        marginBottom: 20,
        resizeMode: 'stretch',

    },

    filterButton: {
        backgroundColor: '#ccc',
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    filterButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    offerItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        width: '80%',
        padding: 20,
        borderRadius: 10,
    },
    modalHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    filterSection: {
        marginBottom: 20,
    },
    sectionHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    filtersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 0,
        paddingVertical: 15,
        // borderWidth: 1,
        // borderBottomColor: '#E5E5E5',

        // Add more styles as per your design
    },
    filterOption: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        // borderWidth: 0.5,
        borderColor: COLORS?.gray,
        borderRadius: 20,
        marginHorizontal: 5,
        maxWidth: '100%',
        flexDirection: 'row',
        alignItems: 'center'

    },
    filterText: {
        fontSize: 14,
        color: COLORS?.black,
        fontFamily: FONTS?.semi_old
    },
});

export default BannerOfferDetails;
