import React, { I18nManager, useContext, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AcceptedList from './AcceptedList';
import { COLORS } from '../../constants/Colors';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';

import { FONTS } from '../../constants/Fonts';
import { useSelector } from 'react-redux';
import AllListOrder from './AllListOrder';
import CancelledOrderList from './CancelledOrderList';
import ToolBarIcon from '../../utils/ToolBarIcon';

const Tab = createMaterialTopTabNavigator();

const OrderList = ({ navigation }) => {
  const theme = useContext(themeContext);
  const [show, setShow] = useState(false);
  const isRTL = I18nManager;
  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <Ionicons
          name="ios-arrow-back"
          color={COLORS.black}
          size={25}
          style={styles.backIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />

        <VegUrbanCommonToolBar
          title="Refund Request"
          style={styles.toolbar}
          textStyle={styles.toolbarText}
        /> */}
        <View
          style={[
            GlobalStyle.commonToolbarBG,
            {
              backgroundColor: theme?.colors.bg_color_onBoard,
              elevation: 0,
              marginTop:10
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

          <VegUrbanCommonToolBar
            title="Order"
            style={{
              backgroundColor: theme.colors.bg_color_onBoard,
              marginStart: 10,
              fontFamily: FONTS?.bold,
              alinItem: 'center',
            }}
            textStyle={{
              color: COLORS?.black,
              fontFamily: FONTS?.bold,
              fontSize: 18,
              textAlin: 'center',
            }}
          />
        </View>
      </View>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: COLORS.black,
          labelStyle: {
            fontSize: 14,
            fontFamily: FONTS?.regular,
            textTransform: 'capitalize',
            color: theme?.colors?.textColor,
          },
          indicatorStyle: { backgroundColor: theme?.colors?.white },
        }}>
        <Tab.Screen name="Active" component={AllListOrder} />
        <Tab.Screen name="Completed" component={AcceptedList} />
        <Tab.Screen name="Canceled" component={CancelledOrderList} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    elevation: 0,
  },
  backIcon: {
    marginStart: 10,
  },
  toolbar: {
    marginStart: 10,
    fontFamily: FONTS.bold,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  toolbarText: {
    color: COLORS.black,
    fontFamily: FONTS.bold,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default OrderList;
