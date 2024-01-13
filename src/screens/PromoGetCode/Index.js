import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal
} from 'react-native';
import React, { useContext, useState } from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import { STRING } from '../../constants';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import themeContext from '../../constants/themeContext';
import { FONTS } from '../../constants/Fonts';

const PromoGetCode = ({ navigation }) => {
  const theme = useContext(themeContext);
  const [promoCode, setPromoCode] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const handleApplyPromoCode = () => {
    // Handle logic for applying promo code
    setModalVisible(false);
  };
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
            elevation: 0
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
            backgroundColor: theme.colors.toolbar_icon_bg,
            borderRadius: 20
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <VegUrbanCommonToolBar
          title="Promo Code"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
          }}
        />


      </View>
      <ScrollView
        style={{
          // flex: 1,
        }}>
        <TouchableOpacity 
        onPress={() => setModalVisible(true)}
        style={styles.getDiscountContainer}>

          {/* <TouchableOpacity onPress={() => setModalVisible(true)}> */}
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/815/815252.png'
              }}
              style={{
                width: 20,
                height: 20
              }}
            />
            <Text style={{
              fontSize: 16,
              color: COLORS?.black,
              fontFamily: FONTS?.bold,
              marginLeft: 15
            }}>Apply Promo Code</Text>
        </TouchableOpacity>

        <View style={styles.getDiscountContainer}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/879/879757.png'
            }}
            style={{
              width: 25,
              height: 25
            }}
          />
          <Text style={{
            fontSize: 16,
            color: COLORS?.black,
            fontFamily: FONTS?.bold,
            marginLeft: 15

          }}>Get Discount</Text>
          {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text>Get Discount</Text>
          </TouchableOpacity> */}
        </View>

        <Modal visible={isModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Enter Promo Code</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter promo code"
                value={promoCode}
                onChangeText={(text) => setPromoCode(text)}
              />
               {/* <VegUrbanEditText
            placeholder={STRING.emailHint}
            // label={STRING.email}
            iconPosition={'left'}
            value={email}
            style={{
              color: theme?.colors?.textColor,
              // color: isEmailValid ? theme?.colors?.white : 'red', // Red color for invalid email
            }}
            icon={
              <FontAwesome
                name={'user-o'}
                size={20}
                color={theme?.colors?.grey}
                // color={theme?.colors?.white}
                style={{}}
              />
              // <Octicons
              //   name={'check-circle'}
              //   size={20}
              //   style={{
              //     marginHorizontal: 10,
              //   }}
              // />
            }
            keyBoardType={'email-address'}
            onChangeText={v => {
              setEmail(v);
              setIsEmailValid(validateEmail(v)); // Update isEmailValid based on email validity
            }}
          /> */}
                 {/* <VegUrbanCommonBtn
              height={55}
              width={'100%'}
              borderRadius={30}
              textSize={18}
              text={'Sign Up'}
              textColor={theme.colors?.text}
              backgroundColor={COLORS?.black}
              // onPress={() => {
              //   closeSignUpModal();
              // }}
              onPress={() => {
                navigation.navigate('Location');
              }}
              textStyle={{
                fontFamily: FONTS?.bold,
              }}
            /> */}
              <TouchableOpacity onPress={handleApplyPromoCode}>
                <Text>Apply Promo Code</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
};

export default PromoGetCode;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  promoCodeContainer: {
    marginBottom: 20,
  },
  getDiscountContainer: {
    // marginBottom: 20,
    marginHorizontal: 15,
    borderRadius: 8,
    borderWidth: 0.2,
    paddingVertical: 20,
    paddingHorizontal: 20,
    // elevation:5,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width:'100%'
  },
  modalContent: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    width:'100%',

  },
});
