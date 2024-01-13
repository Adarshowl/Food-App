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
    RadioButton
} from 'react-native';
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

const BannerOfferDetails = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const offers = [/* Your array of offers */];

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
                source={{
                    // uri: item?.image,
                    uri: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/restaurant-offer-post-design-template-849b9069fd618342e2592dd9992ee7b5_screen.jpg?ts=1591366091'
                }}
                // resizeMode={'stretch'}
                style={[styles.sliderImage]}
            />


            {/* <TouchableOpacity onPress={openModal} style={styles.filterButton}>
                <Text style={styles.filterButtonText}>Filter</Text>
            </TouchableOpacity>
             */}

            <View
                style={styles.filtersContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                    <TouchableOpacity
                        style={styles?.filterOption}
                        onPress={handleFilterClick}
                    >
                        <Text style={styles.filterText}>Filter</Text>
                        <Image
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/128/7854/7854748.png'
                            }}
                            style={{
                                width: 17,
                                height: 17,
                                marginLeft: 8
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles?.filterOption}

                    // onPress={handleSortClick('Sort')}
                    >

                        <Text style={styles.filterText}>Sort</Text>
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
                        style={styles?.filterOption}

                    // onPress={handleVegNonVegClick('Veg/Non-Veg')}
                    >
                        <Text style={styles.filterText}>Veg/Non-Veg</Text>
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
                        style={styles?.filterOption}

                    // onPress={handleRatingClick('Rating')}
                    >
                        <Text style={styles.filterText}>Rating</Text>
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
                        style={styles?.filterOption}

                    // onPress={handleDeliveryTimeClick('Delivery Time')}
                    >
                        <Text style={styles.filterText}>Delivery Time</Text>
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
                        style={styles?.filterOption}

                    // onPress={handleCostForTwoClick('Cost for Two')}
                    >
                        <Text style={styles.filterText}>Cost for Two</Text>
                        <MaterialIcons
                            name="keyboard-arrow-down"
                            size={22}
                            color={COLORS?.black}
                            style={{
                                marginLeft: 8
                            }}
                        />
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
        resizeMode:'stretch',

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
        borderWidth: 0.5,
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
