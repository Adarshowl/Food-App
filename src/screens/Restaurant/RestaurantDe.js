import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { FONTS } from '../../constants/themes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from '../../constants/Colors';
import themeContext from '../../constants/themeContext';
import VegUrbanFloatEditText from '../../utils/EditText/VegUrbanFloatEditText';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';

const RestaurantDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedVariation, setSelectedVariation] = useState('Regular');
  const theme = useContext(themeContext);

  // Sample restaurant details (replace with your restaurant data)
  const restaurant = {
    name: 'Sample Restaurant',
    image: 'https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg', price: '$10.99',

    // price: {
    //   Regular: '$10.99',
    //   Medium: '$12.99',
    //   Large: '$15.99',
    // },
  };
  const prices = {
    Regular: '$9.99',
    Medium: '$11.99',
    Large: '$13.99',
  };
  const handleVariationChange = (variation) => {
    setSelectedVariation(variation);
  };



  const handleQuantityIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Handle adding item to cart (You may implement this functionality)
    // You can access quantity and specialInstructions here
  };

  return (
    <View style={styles.container}>
      {/* Restaurant Image */}
      <Image source={{
        uri: restaurant.image
      }} style={styles.image}
      // resizeMode="cover" 
      />

      {/* Restaurant Name */}
      <View style={{
        marginHorizontal: 10,
        // flex: 1
      }}>
        <View style={{
          alignItems: 'center',

        }}>
          <Text style={{
            fontSize: 30,
            color: COLORS?.black,
            fontFamily: FONTS?.bold
          }}>{restaurant.name}</Text>
          {/* Price */}
          <Text style={styles.price}>{restaurant.price}</Text>
        </View>

        <Text style={styles.price}>{restaurant.price[selectedVariation]}</Text>
        <View style={styles.variations}>
          {Object.keys(prices).map((variation, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.variationItem,
                selectedVariation === variation && styles.selectedVariation,
              ]}
              onPress={() => handleVariationChange(variation)}
            >
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10
              }}>
                <View style={{
                  flexDirection: 'row'
                }}>
                  <MaterialCommunityIcons
                    name={selectedVariation === variation ? 'circle-slice-8' : 'circle-outline'}
                    size={22}
                    color={selectedVariation === variation ? COLORS?.black : COLORS?.black}
                  />
                  <Text style={{
                    marginLeft: 10,
                    fontSize: 16,
                    color: COLORS?.black
                  }}>{variation}</Text>
                </View>
                <Text>{prices[variation]}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {/* Variations */}


        {/* Special Instructions */}
       
        <Text style={styles.sectionTitle}>Special Instructions</Text>

        <VegUrbanFloatEditText
          value={specialInstructions}
          // style={styles.input}
          style={{
            
          }}
          placeholder="Special Instructions"

          onChangeText={text => setSpecialInstructions(text)}

        />

        {/* Quantity */}
      
      </View>
      <View style={{
        flexDirection:'row',
        // alignItems:'flex-end',
        justifyContent:'space-between',
        marginTop:20,
        marginHorizontal:10,
      }}>
      <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={handleQuantityDecrement}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={handleQuantityIncrement}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Add to Cart Button */}
        {/* <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity> */}
        <View 
        style={{
          flex:1,
          marginLeft:20
        }}
        >
            <VegUrbanCommonBtn
              height={40}
              width={'80%'}
              borderRadius={10}
              textSize={16}
              // textColor={COLORS?.white}

              textColor={COLORS?.white}
              text={'Add to Cart'}
              backgroundColor={COLORS?.black}
              onPress={handleAddToCart}
              // onPress={() => {
              //   navigation.navigate('Checkout');
              // }}
              textStyle={{
                fontFamily: FONTS?.bold,

                // textTransform: 'uppercase',
              }}
            />
            </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 15,
    backgroundColor:COLORS?.white
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 22,
    marginBottom: 5,
    fontFamily: FONTS?.bold,
    color: COLORS?.black
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: FONTS?.bold
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: FONTS?.bold,
    color: COLORS?.black
},
  variations: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: 15,
  },
  variationItem: {
    borderWidth: 0.2,
    padding: 8,
    borderRadius: 5,
    paddingVertical: 10,
    marginVertical: 3
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth:0.2,
    // padding:4,
    width:'40%',
    borderRadius:5,
    height:40

  },
  quantityButton: {
    fontSize: 25,
    paddingHorizontal: 20,
  },
  quantity: {
    fontSize: 18,
    paddingHorizontal: 20,
  },
  addToCartButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 8,
  },
  addToCartText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default RestaurantDetail;
