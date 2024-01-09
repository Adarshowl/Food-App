import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import '../../assets/i18n/i18n';
import {useDispatch} from 'react-redux';
import {getCategoryDataById} from '../../redux/actions/HomeApi';
import {apiErrorCallback} from '../../utils/Utility';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
import {IMAGE_BASE_URL} from '../../network/ApiEndPoints';
import {SIZES} from '../../constants';

const CategoryDetails = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [restaurantDetails, setRestaurantDetails] = useState(null);

  useEffect(() => {
    const {item} = route?.params;
    dispatch(() => {
      getCategoryDataById(
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
    setRestaurantDetails([]);
  };

  return (
    <SafeAreaView style={[GlobalStyle.mainContainerBgColor]}>
      <Text style={GlobalStyle.commonHeaderText}>CATEGORY DETAILS</Text>
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
            source={IMAGE_BASE_URL + restaurantDetails?.data?.image}
          />

          <Text style={GlobalStyle.commonHeadingText}>
            Name: {restaurantDetails?.data?.category_name}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryDetails;

const styles = StyleSheet.create({});
