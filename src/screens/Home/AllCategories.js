import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import { useDispatch } from 'react-redux';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
import { FONTS } from '../../constants/Fonts';
import themeContext from '../../constants/themeContext';
import { COLORS } from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import { getItemCategory } from '../../redux/actions/HomeApi';
import { ShowConsoleLogMessage, ShowToastMessage } from '../../utils/Utility';
import { showProgressBar } from '../../redux/actions';
import { IMAGE_BASE_URL } from '../../network/ApiEndPoints';
import ToolBarIcon from '../../utils/ToolBarIcon';

const AllCategories = ({ navigation }) => {
  const [categoryData, setCategoryData] = useState([]);
  const dispatch = useDispatch();
  const tradingList = [
    {
      id: '1', name: 'Chicken', address: 'indore mp',
      image: 'https://cdn-icons-png.flaticon.com/128/1046/1046751.png'
    },
    {
      id: '2', name: 'Burger', address: 'dewas mp',
      image: 'https://cdn-icons-png.flaticon.com/128/877/877951.png'
    },
    {
      id: '3', name: 'Pizza', address: 'vijay nagar ',
      image: 'https://cdn-icons-png.flaticon.com/128/3595/3595455.png'
    },

    {
      id: '3', name: 'Salad', address: 'bhawaercuaa',
      image: 'https://cdn-icons-png.flaticon.com/128/3280/3280034.png'
    },
    {
      id: '3', name: 'Bakery', address: 'bhawaercuaa',
      image: 'https://cdn-icons-png.flaticon.com/128/1772/1772872.png'
    },
    {
      id: '3', name: 'Noodles', address: 'bhawaercuaa',
      image: 'https://cdn-icons-png.flaticon.com/128/7534/7534440.png'
    },
    {
      id: '3', name: 'Drink', address: 'bhawaercuaa',
      image: 'https://cdn-icons-png.flaticon.com/128/2738/2738730.png'
    },
    {
      id: '3', name: 'Sushi', address: 'bhawaercuaa',
      image: 'https://cdn-icons-png.flaticon.com/128/4931/4931887.png'
    },
    {
      id: '3', name: 'Vegetable', address: 'bhawaercuaa',
      image: 'https://cdn-icons-png.flaticon.com/128/2153/2153786.png'
    },
    {
      id: '3', name: 'Cookies', address: 'bhawaercuaa',
      image: 'https://cdn-icons-png.flaticon.com/128/3428/3428950.png'
    },
    {
      id: '3', name: 'Ice Cream', address: 'bhawaercuaa',
      image: 'https://cdn-icons-png.flaticon.com/128/4774/4774389.png'
    },
    {
      id: '3', name: 'Taco', address: 'bhawaercuaa',
      image: 'https://cdn-icons-png.flaticon.com/128/8688/8688563.png'
    },


  ];
  const theme = useContext(themeContext);
  // console.log(categoryData.length);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    dispatch(showProgressBar(true));
    dispatch(() =>
      getItemCategory(
        dispatch,
        navigation,
        successCallback,
        errorCallback,
        BannerErrorCallback,
        true,
      ),
    );
  };

  const successCallback = async data => {
    // ShowConsoleLogMessage('successCallback called after');
    dispatch(showProgressBar(false));
    setCategoryData(data?.response);
  };

  const errorCallback = async data => {
    setCategoryData([]);

    dispatch(showProgressBar(false));
  };

  const BannerErrorCallback = error => {
    ShowToastMessage(error);
    ShowConsoleLogMessage(error);
  };

  const renderCtegory = ({ item }) => {
    // console.log(item[0]?.image);
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CategoryHome', { item: item });
        }}
        style={{
          flexGrow: 1,

          marginVertical: 18,
          // flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}>

        {/*{item?.image != undefined || null ? (*/}

        <VegUrbanImageLoader
          source={item?.image}
          styles={[
            styles.itemImage,

            {
              // width: 45,
              // borderRadius: 5,
              // height: 45,
            },
          ]}
        />

        <View style={{}}>
          <Text
            numberOfLines={1}
            style={[
              styles.itemName,
              {
                color: theme.colors.white,
                fontFamily: FONTS?.semi_old,
                marginTop: 0,
                // marginStart: 15,
                maxWidth: '80%',
                marginTop: 10
              },
            ]}
          >
            {item?.name}
            {/*{item?.name}*/}
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
        <ToolBarIcon
          title={Ionicons}
          iconName={'chevron-back'}
          icSize={20}
          borderRadius={20}
          icColor={theme?.colors?.white}
          style={{
            backgroundColor: theme?.colors?.bg,
            // marginEnd: 10,
            borderRadius: 20,
          }}
          onPress={() => {
            navigation.goBack();
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
          title="Category"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
          }}
          textStyle={{
            color: theme.colors.textColor,
            fontWeight: 'bold',
            fontSize: 20,
          }}
        />
      </View>
      <FlatList
        numColumns={4}
        contentContainerStyle={{
          padding: 10,
          paddingHorizontal: 20,
        }}
        data={tradingList}
        renderItem={renderCtegory}
      // ItemSeparatorComponent={() => {
      //   return <View style={styles.divLine} />;
      // }}
      />
    </SafeAreaView>
  );
};

export default AllCategories;

const styles = StyleSheet.create({
  itemName: {
    fontSize: 14.5,
    color: COLORS.black,
    textAlign: 'center',
  },
  itemImage: {
    width: 55,
    height: 55,
    alignItems: 'center',
    borderRadius: 50,
  },

  divLine: {
    height: 0.5,
    width: '95%',
    backgroundColor: COLORS.gray,
    alignSelf: 'center',
    marginVertical: 5,
    marginTop: 10,
  },
});
