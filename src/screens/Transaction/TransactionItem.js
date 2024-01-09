import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useContext} from 'react';
import {COLORS} from '../../constants/Colors';
import {STRING} from '../../constants';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';

const TransactionItem = ({item, show}) => {
  const theme = useContext(themeContext);
  return (
    <View
        // activeOpacity={0.8}
        style={[
          styles.wrapperOrder,
          {
            // backgroundColor: '#F2F3F4',
            // elevation: 2,

            backgroundColor: theme?.colors?.bg_color_onBoard,
          },
        ]}>
        <View
          style={[
            GlobalStyle.flexRowAlignCenter,
            {
              paddingVertical: 5,
              alignItems: 'center',
            },
          ]}>
          {/* <Image
            source={{
              uri: item?.image,
            }}
            style={styles.image}
          /> */}

          <Image
            style={{
              width: 65,
              height: 65,
              alignItems: 'center',
              // alignSelf: 'center',
              resizeMode: 'center',
              // marginTop: 30,
              borderRadius: 100,
            }}
            // style={styles.itemImage}
            source={{
              uri: item?.image,
            }}
          />
          <View style={styles.innnerWrapperOrder}>
            <View
              style={{
                flex: 1,
                // flexDirection: 'row',
                // justifyContent: 'space-between'
              }}>
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.white,
                  },
                ]}
                numberOfLines={1}>
                {item?.name}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  // styles.finalPriceText,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.colorPrimary,
                    marginTop: 8,
                    fontFamily: FONTS?.regular,
                  },
                ]}>
                {item?.title}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles?.buttoninvite,
                {
                  backgroundColor: theme?.colors?.bg,
                },
              ]}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: theme?.colors?.white,
                  fontSize: 14,
                  fontFamily: FONTS?.bold,
                }}>
                Invite
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
};

export default memo(TransactionItem);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginVertical:6,
    borderRadius:10,
    marginHorizontal:10
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
  idText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: COLORS.black,
    fontWeight:'bold'
  },
  divLine: {
    height: 1,
    backgroundColor: COLORS.light_gray,
    marginVertical: 5,
  },
  payModeText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
    color: COLORS.colorPrimary,
  },
  payStatusText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
    color: COLORS.white,
    backgroundColor: COLORS.light_green,
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 3,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  amtText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
    color: COLORS.colorPrimary,
  },
  msgHeadText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    marginTop: 5,
    color: COLORS.black,
  },
  msgText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: COLORS.black,
    marginTop: 2,
  },
});
