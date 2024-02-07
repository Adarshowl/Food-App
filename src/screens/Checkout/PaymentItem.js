import {StyleSheet, Text, Image,TouchableOpacity, View} from 'react-native';
import React, {memo, useContext} from 'react';
import {COLORS} from '../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import themeContext from '../../constants/themeContext';
import {FONTS} from '../../constants/Fonts';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';

const PaymentItem = ({item, show, onItemClick}) => {
  const theme = useContext(themeContext);
  return (
    <TouchableOpacity
      style={[styles.wrapper, {backgroundColor: theme?.colors?.bg_color_onBoard}]}
      onPress={onItemClick}>
      <View style={styles.innerWrapper}>
      <Image
          source={{
            uri: item?.image,
          }}
          style={styles.image}
        />
        <Text
          style={[
            styles.textName,
            {
              color: theme?.colors?.white,
            },
          ]}>
          {/* {item?.payment_method_name || item?.payment_name} */}
          {item?.name}
        </Text>
        <MaterialCommunityIcons
          name={item?.selected ? 'circle-slice-8' : 'circle-outline'}
          size={22}
          color={theme?.colors?.white}
        />
      </View>
    </TouchableOpacity>
  );
};

export default memo(PaymentItem);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.bg_gray,
    marginHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    marginVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    // borderWidth:0.2,
    elevation:5
  },
  text: {
    maxHeight: 35,
    minHeight: 35,
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'OpenSans-Bold',
    color: COLORS.black,
    backgroundColor: COLORS.search_bg_grey,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  innerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textName: {
    fontFamily: FONTS?.bold,
    fontSize: 17,
    color: COLORS.black,
    flex: 1,
    marginStart: 16,
  },
  image: {
    height: 28,
    width: 28,
    resizeMode: 'center',
  },
  divLine: {
    backgroundColor: COLORS.gray,
    height: 0.5,
    width: '100%',
    marginTop: 15,
  },
});
