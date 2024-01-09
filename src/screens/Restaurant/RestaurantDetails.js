import React, { useContext, useState } from 'react';
import {
  View,
  I18nManager,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList
} from 'react-native';
import { List } from 'react-native-paper';

import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../../constants/Colors'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { FONTS } from '../../constants/Fonts';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { icons, SIZES } from '../../constants';

const RestaurantDetails = ({ navigation }) => {
  const theme = useContext(themeContext);
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  const [favorite, setFavorite] = useState(false);
  const textData = [
    { id: '1', text: 'Flat 240% off' },
    { id: '2', text: 'Flat 50% off' },
    { id: '3', text: 'Flat 60% off' },
    { id: '4', text: 'Flat 80% off' },
  ];

  const [activeSection, setActiveSection] = useState(null);
  const sections = [
    { title: 'Salad', data: ['Salad 1', 'Salad 2', 'Salad 3'], length: 5 },
    { title: 'Recommended', data: ['Recommended 1', 'Recommended 2', 'Recommended 3'], length: 6 },
    { title: 'Rice', data: ['Rice 1', 'Rice 2', 'Rice 3'], length: 2 },
  ];
  const [selectedOption, setSelectedOption] = useState(''); // State to track the selected option

  // Sample data for recommended dishes
  const recommendedDishes = [
    { id: '1', name: 'Dish 1', quantity: 2 },
    { id: '2', name: 'Dish 2', quantity: 3 },
    { id: '3', name: 'Dish 3', quantity: 1 },
    // Add more recommended dishes as needed
  ];

  const renderAccordion = () => {
    return sections.map((section, index) => (
      <View key={index} style={{
        marginBottom: 10,
        marginTop: 8,
        backgroundColor: COLORS?.white
      }}>
        <TouchableOpacity
          style={{
            padding: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: activeSection === index ? COLORS?.bg_gray : theme?.colors?.bg
          }}
          onPress={() => setActiveSection(activeSection === index ? null : index)}
        >
          <Text style={{
            fontSize: 18,
            color: COLORS?.black,
            fontFamily: FONTS?.bold
          }}>{section.title} ({section.length})</Text>
        </TouchableOpacity>

        {activeSection === index && (
          <FlatList
            data={section.data}
            renderItem={renderRecommendedDishes}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    ));
  };
  // const renderAccordion = () => {
  //   return sections.map((section, index) => (
  //     <View key={index} style={{
  //       // marginBottom: 10, 
  //       // marginTop: 10,
  //       backgroundColor: theme?.colors?.bg_color_onBoard
  //     }}>


  //       <List.Section>
  //         <List.Accordion title={section.title}>
  //           <List.Item>
  //             <View style={{flex:1, padding: 10, backgroundColor: 'black' }}>
  //               <FlatList
  //                 data={recommendedDishes}
  //                 renderItem={renderRecommendedDishes}
  //                 keyExtractor={item => item.id}
  //               />
  //             </View>
  //           </List.Item>
  //         </List.Accordion>
  //       </List.Section>
  //       {/* <List.Accordion
  //             title="Controlled Accordion"
  //             // left={props => <List.Icon {...props} icon="folder" />}
  //             expanded={expanded}
  //             onPress={handlePress}>
  //             <List.Item title="First item" />
  //             <List.Item title="Second item" />
  //           </List.Accordion> */}
  //       {/* <TouchableOpacity
  //         style={{
  //           padding: 15, backgroundColor: theme?.colors?.bg_color_onBoard,
  //           flexDirection: 'row',
  //           justifyContent: 'space-between'
  //         }}
  //         onPress={() => setActiveSection(activeSection === index ? null : index)}>
  //         <Text style={{
  //           fontSize: 18,
  //           color: COLORS?.black,
  //           fontFamily: FONTS?.bold
  //         }}>{section.title}({section.length})</Text>

  //         <MaterialIcons
  //           name="keyboard-arrow-down"
  //           size={22}
  //           color={COLORS?.black}
  //         />
  //       </TouchableOpacity> */}
  //       {activeSection === index && (
  //         <View style={{ padding: 10, backgroundColor: 'whitesmoke' }}>
  //           {section.data.map((item, itemIndex) => (
  //             <FlatList
  //               data={recommendedDishes}
  //               renderItem={renderRecommendedDishes}
  //               keyExtractor={item => item.id}
  //             />))}
  //         </View>
  //       )}
  //     </View>
  //   ));
  // };

  const renderRecommendedDishes = ({ item }) => (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10
    }}>
      <View style={{
        flex: 1,
        marginTop: 10,
        marginLeft: 10
      }}>
        <Text style={{
          fontSize: 18,
          fontFamily: FONTS?.bold,
          color: COLORS?.black
        }}>{item.name}</Text>
        <Text style={{
          fontSize: 13,
          fontFamily: FONTS?.regular,
          color: COLORS?.black
        }}>Quantity: {item.quantity}</Text>
        <Text style={{
          fontSize: 15,
          fontFamily: FONTS?.regular,
          color: COLORS?.black
        }}>₹100</Text>
      </View>
      <View style={{
        alinItem: 'center',
        justifyContent: 'center',
        // flex:1
      }}>
        <Image
          source={{
            uri: 'https://www.london-unattached.com/wp-content/uploads/2015/06/The-Trading-House-City-Bank-London-Launch-Party-1032.jpg'
          }}
          style={[styles.restaurantImage, {
            width: 150,
            height: 130,

          }]} />
        <TouchableOpacity 
        onPress={() => {
          navigation.navigate('CartDetails')
        }}
        style={{
          borderRadius: 10,
          // borderWidth: 0.2,
          justifyContent: 'center',
          elevation: 3,
          marginTop: -15,
          backgroundColor: COLORS?.white,
          width: '70%',
          alignSelf: 'center'
          // flex: 1
        }}>
          <Text style={{
            fontSize: 20,
            fontFamily: FONTS?.bold,
            color: COLORS?.black,
            textAlign: 'center'
          }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme.colors.bg_color_onBoard,
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
          title="Restaurant  Details"
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
      <ScrollView
      //  style={styles.container}
      >

        <View style={{
          flex: 1,
          backgroundColor: theme?.colors?.bg_color,
          padding: 10,
          borderBottomRightRadius: 40,
          borderBottomLeftRadius: 40,

        }}>
          <View style={styles.header}>
            {/* <Image
            source={{
              uri: 'https://www.london-unattached.com/wp-content/uploads/2015/06/The-Trading-House-City-Bank-London-Launch-Party-1032.jpg'
            }}
            style={styles.restaurantImage} /> */}
            <View style={styles.headerInfo}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <View style={{

                }}>
                  <Text
                    numberOfLines={2}
                    style={styles.restaurantName}>
                    Hungry Singh Pure Veg Family Restaurant</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  // alignItems:'flex-end',
                  // flex:1,
                  // flexGrow: 1,
                  paddingLeft: 5,
                  // marginEnd:5,
                  // paddingEnd:5,
                  // right:3,
                  marginLeft: 5
                }}>

                  <Ionicons
                    name={'share-social'}
                    size={22}
                    color={COLORS.colorAccent}
                    style={{
                      // marginHorizontal: 5,
                      marginEnd: 3
                    }}

                  />
                  <FontAwesome
                    name={favorite ? 'heart' : 'heart-o'}
                    size={22}
                    color={COLORS.colorAccent}
                    style={{
                      marginHorizontal: 5,
                    }}

                  />
                </View>
              </View>
              <View style={{
                // marginVertical:5
              }}>
                <Text style={styles.rating}>4.5 ⭐ (500+ Reviews) {`\u25CF 25 km`}</Text>
                <Text style={styles.rating}>Eastern Dewas</Text>

              </View>
              <View
                style={{
                  width: '96%',
                  borderWidth: 0.2,
                  borderColor: COLORS?.gray,
                  // flex:1,
                  marginTop: 5,
                  marginBottom: 5
                }}
              />
              <View style={{

                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
                // justifyContent:'center',
                flex: 1
              }}>
                <View style={{
                  // marginTop: 5,
                  justifyContent: 'center',
                  // flex: 1
                }}>
                  <View
                    style={{
                      // flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row'
                    }}
                  >
                    <View
                      style={{
                        borderRadius: 20,
                        backgroundColor: COLORS?.grey,
                        width: 10,
                        height: 10,
                        // justifyContent:'center'
                      }}
                    />

                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10
                    }}>
                      <Text style={{
                        fontSize: 14,
                        fontFamily: FONTS?.bold,
                        color: COLORS?.black
                      }}>Outlet</Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: FONTS?.regular,
                          color: COLORS?.black,
                          marginLeft: 10
                        }}
                      >Itawa</Text>

                    </View>
                  </View>
                  <View
                    style={{
                      width: 1.5,
                      height: 40,
                      backgroundColor: COLORS?.grey,
                      // flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 4,
                      // marginTop:-10,
                      marginVertical: -10
                      // flex:1
                      // marginHorizontal: 5,
                    }}
                  />

                  <View style={{
                    // marginTop: 5,
                    justifyContent: 'center',
                    flex: 1,
                    alignItems: 'center'
                  }}>
                    <View
                      style={{
                        // flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                      }}
                    >
                      <View
                        style={{
                          borderRadius: 20,
                          backgroundColor: COLORS?.grey,
                          width: 10,
                          height: 10,
                          justifyContent: 'center'
                        }}
                      />

                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 10
                      }}>
                        <Text style={{
                          fontSize: 14,
                          fontFamily: FONTS?.bold,
                          color: COLORS?.black
                        }}>Outlet</Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: FONTS?.regular,
                            color: COLORS?.black,
                            marginLeft: 10
                          }}
                        >Itawa</Text>

                      </View>
                    </View>
                  </View>

                </View>

              </View>

            </View>

          </View>
        </View>
        <View style={GlobalStyle.sliderMainContainer}>


          <SwiperFlatList
            autoplay={true}
            autoplayDelay={3}
            autoplayLoop={true}
            data={textData}
            autoplayLoopKeepAnimation={true}
            paginationDefaultColor={theme?.colors?.textColor}
            paginationActiveColor={theme?.colors?.grey}
            showPagination={true}
            paginationStyleItemActive={styles.paginationStyleItem}
            paginationStyleItemInactive={styles.paginationendStyleItem}
            renderItem={({ item }) =>
              // item?.image != 'null' ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={GlobalStyle.sliderMainWrapper}
              >
                <View style={{
                  // justifyContent: 'center',
                  alignItems: 'center',
                  // height: 200 ,
                  borderWidth: 0.2,
                  borderColor: COLORS?.black,
                  // width: '90%',
                  borderRadius: 10,
                  padding: 20,
                  flexDirection: 'row',
                  width: '80%'
                }}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/726/726476.png'
                    }}
                    style={styles.restaurantImage} />
                  <View style={{
                    marginLeft: 15
                  }}>
                    <Text style={{
                      fontSize: 22,
                      fontFamily: FONTS?.bold,
                      color: COLORS?.black
                    }}>{item.text}</Text>
                    <Text style={{
                      fontSize: 15,
                      fontFamily: FONTS?.regular,
                      color: COLORS?.black
                    }}>use party</Text>
                  </View>
                </View>

              </TouchableOpacity>
            }
          />
        </View>
        <View style={styles.container}
        >
          {/* Basic Information */}
          {/* <View style={styles.basicInfo}>
            <Text style={styles.basicInfoText}>Cuisine: Multi-cuisine</Text>
            <Text style={styles.basicInfoText}>Establishment Type: Casual Dining</Text>
            <Text style={styles.basicInfoText}>Average Cost for Two: $30</Text>
          </View> */}

          {/* Menu Items */}
          <View style={styles.menuItems}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginHorizontal: '25%'
            }}>
              <MaterialIcons
                name="restaurant-menu"
                color={COLORS?.grey}
                size={20}
              />
              <Text style={styles.sectionTitle}>MENU</Text>
              <MaterialIcons
                name="restaurant-menu"
                color={COLORS?.grey}
                size={20}
              />
            </View>
            {/* Render menu items */}
            {/* Item 1 */}
            {/* <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemName}>Dish 1</Text>
              <Text style={styles.menuItemPrice}>$10</Text>
            </TouchableOpacity> */}
            {/* Item 2 */}
            {/* ... */}
          </View>


          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Search');
            }}
            style={[
              styles.inputWrapper,
              {
                backgroundColor: theme?.colors?.bg,
                // borderWidth: 0.5,
                borderColor: theme?.colors?.grey,
                // elevation: 5,
              },
            ]}>
            {/*<AntDesign name={'search1'} size={20} color={theme?.colors?.grey} />*/}

            <TextInput
              editable={false}
              style={[
                styles.input,
                {
                  color: theme?.colors?.white,
                  textAlign: I18nManager.isRTL ? 'right' : 'left',
                },
              ]}
              placeholder={'Search for Dishes'}
              placeholderTextColor={theme?.colors?.gray}
            />
            <Image
              source={icons.search}
              style={{
                height: 18,
                tintColor: theme?.colors?.white,
                width: 18,
              }}
            />
          </TouchableOpacity>



          <View style={{
            flex: 1,
            flexDirection: 'row',
            // marginHorizontal:5,
            // alignItems:'center',
            // justifyContent:'center'
          }}>
            <View>
              <View style={styles?.boxseller}>
                <Text
                  style={{
                    fontFamily: FONTS?.semi_old,
                    fontSize: 14,
                    color: COLORS?.black
                  }}
                  onPress={() => setSelectedOption('Pure Veg')}
                >
                  Pure Veg
                </Text>
              </View>
              {/* Show your list of pure veg dishes here */}
            </View>

            <View>
              <View style={[styles?.boxseller, {
                marginLeft: 10
              }]}>

                <Text
                  style={{
                    fontFamily: FONTS?.semi_old,
                    fontSize: 14,
                    color: COLORS?.black
                  }}
                  onPress={() => setSelectedOption('Best Seller')}
                >
                  Best Seller
                </Text>
              </View>

            </View>

          </View>
          <View style={{
            flex: 1,
            marginTop: 10
          }}>
            {renderAccordion()}

          </View>

          {selectedOption === 'Best Seller' ? (   // Show recommended dishes if "Best Seller" is selected
            <FlatList
              data={recommendedDishes}
              renderItem={renderRecommendedDishes}
              keyExtractor={item => item.id}
            />
          ) : (
            // Show a different list if "Pure Veg" or other option is selected
            <Text></Text>
          )}

          {/* Reviews */}
          <View style={styles.reviews}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            {/* Render user reviews */}
            {/* Review 1 */}
            {/* ... */}
          </View>

          {/* 
          <List.Section title="Accordions">
            <List.Accordion
              title="Uncontrolled Accordion"
              // left={props => <List.Icon {...props} icon="folder" />}
              >
              <List.Item title="First item" />
              <List.Item title="Second item" />
            </List.Accordion>

            <List.Accordion
              title="Controlled Accordion"
              // left={props => <List.Icon {...props} icon="folder" />}
              expanded={expanded}
              onPress={handlePress}>
              <List.Item title="First item" />
              <List.Item title="Second item" />
            </List.Accordion>
          </List.Section> */}
          {/* Location */}
          <View style={styles.location}>
            <Text style={styles.sectionTitle}>Location</Text>
            {/* Display map or address */}
            {/* Map or Address */}
          </View>

          {/* Related Categories */}
          <View style={styles.relatedCategories}>
            <Text style={styles.sectionTitle}>Related Categories</Text>
            {/* Display related categories */}
            {/* Category 1 */}
            {/* ... */}
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS?.white,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingBottom: 10,
    marginHorizontal: 3,
    backgroundColor: COLORS?.white,
    borderRadius: 20,
    padding: 10,
    flex: 1,
    marginVertical: 20
    // paddingHorizontal:30,


  },
  restaurantImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  headerInfo: {
    marginLeft: 10,
  },
  paginationStyleItem: {
    height: 3,
    width: 10,
    borderRadius: 5,
    // marginBottom:20,
    marginTop: 7,
    // marginTop: -35,
  },
  paginationendStyleItem: {
    height: 5,
    width: 5,
    borderRadius: 5,
    // marginBottom:20,
    // marginTop: -35,
    marginTop: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    // paddingHorizontal: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginTop: 5,
    height: 40,
    // borderWidth:0.1,
    marginBottom: 10
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    paddingStart: 5,
    marginStart: 5,
  },
  restaurantName: {
    fontSize: 18,
    fontFamily: FONTS?.bold,
    color: COLORS?.black,
    // maxWidth: '90%',
    flex: 1
  },
  rating: {
    fontSize: 15,
    color: COLORS?.black,
    marginVertical: 3,
    fontFamily: FONTS?.regular,
    // paddingVertical:5
  },
  basicInfo: {
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#CCCCCC',
  },
  basicInfoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  menuItems: {
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#CCCCCC',
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: FONTS?.bold
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    paddingVertical: 10,
  },
  menuItemName: {
    fontSize: 16,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviews: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  boxseller: {
    borderWidth: 0.2,
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    // marginHorizontal:5
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default RestaurantDetails;
