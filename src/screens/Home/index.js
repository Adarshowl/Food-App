import {
  FlatList,
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
import {getCategoryList, getRestaurantList} from '../../redux/actions/HomeApi';
import {apiErrorCallback} from '../../utils/Utility';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
import {IMAGE_BASE_URL} from '../../network/ApiEndPoints';

const Home = ({navigation}) => {
  const dispatch = useDispatch();

  const [restaurantList, setRestaurantList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    dispatch(() => {
      getRestaurantList(
        dispatch,
        navigation,
        successCallback,
        failureCallback,
        apiErrorCallback,
      );
    });

    dispatch(() => {
      getCategoryList(
        dispatch,
        navigation,
        successCategoryCallback,
        failureCategoryCallback,
        apiErrorCallback,
      );
    });
  }, []);

  const successCallback = data => {
    setRestaurantList(data?.data);
  };
  const failureCallback = data => {
    setRestaurantList([]);
  };

  const successCategoryCallback = data => {
    // ShowConsoleLogMessage(JSON.stringify(data));
    setCategoryList(data?.data);
  };
  const failureCategoryCallback = data => {
    setCategoryList([]);
  };

  const renderRestaurantItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('RestaurantDetails', {item: item});
        }}
        style={[
          GlobalStyle.flexRowAlignCenter,
          {
            margin: 10,
            padding: 10,
          },
        ]}>
        <VegUrbanImageLoader
          styles={{
            height: 50,
            width: 50,
          }}
          source={IMAGE_BASE_URL + item?.shop_top_banner}
        />
        <View style={GlobalStyle.commonFlexOne}>
          <Text style={GlobalStyle.commonHeadingText}>
            Name: {item?.shop_name}
          </Text>
          <Text style={GlobalStyle.commonSmallText}>
            Desc: {item?.description}
          </Text>
          <Text style={GlobalStyle.commonSmallText}>
            Distance: {item?.distance}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategoryItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CategoryDetails', {item: item});
        }}
        style={[
          GlobalStyle.flexRowAlignCenter,
          {
            margin: 10,
            padding: 10,
          },
        ]}>
        <VegUrbanImageLoader
          styles={{
            height: 50,
            width: 50,
          }}
          source={IMAGE_BASE_URL + item?.image}
        />
        <View style={GlobalStyle.commonFlexOne}>
          <Text style={GlobalStyle.commonHeadingText}>
            {item?.category_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[GlobalStyle.mainContainerBgColor]}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <Text style={GlobalStyle.commonHeaderText}>RESTAURANT LIST</Text>
        <FlatList
          data={restaurantList}
          renderItem={renderRestaurantItem}
          extraData={restaurantList}
        />
        <Text style={GlobalStyle.commonHeaderText}>CATEGORY LIST</Text>
        <FlatList
          data={categoryList}
          renderItem={renderCategoryItem}
          extraData={categoryList}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
