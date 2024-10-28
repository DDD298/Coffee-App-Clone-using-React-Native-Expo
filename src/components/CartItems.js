import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { BlurView } from 'expo-blur';
import colors from "../theme/colors";
import SPACING from '../theme/SPACING';
import {AntDesign, Ionicons} from '@expo/vector-icons';


export default function CartItem({id, name, imagelink_square, special_ingredient, roasted, prices, type, incrementCartItemQuantityHandler, decrementCartItemQuantityHandler,}) {
  return (
    <View>
      {prices.length != 1 ? ( 
      <BlurView
      intensity={100}
      tint='dark'
      style={styles.CartItemBlur}
      >
        <View style ={styles.CartItemRow}>
           <Image
           style={styles.CartItemImage} 
           source={imagelink_square}/>
           <View style = {styles.CartItemInfo}>
                <View>
                   <Text style = {styles.CartItemTitle}>{name}</Text>
                   <Text style = {styles.CartItemSubTitle}>{special_ingredient}</Text>
                </View>
                <View style ={styles.CartItemRoastedContainer}>
                  <Text style ={styles.CartItemRoastedText}>{roasted}</Text>
                </View>
           </View>
        </View>
        {prices.map((data, index) => (
          <View  
          key={index.toString()}
          style={styles.CartItemSizeRowContainer}>
              <View style={styles.CartItemSizeValueContainer}>
                <View style = {styles.SizeBox}>
                    <Text style={[styles.SizeText, {
                      fontSize:type == 'Bean' ? 12 : 16,
                    },
                    ]}>{data.size}</Text>
                </View>
                <Text style={styles.SizeCurrency}>
                  {data.currency}
                <Text style={styles.SizePrice}> {data.price}</Text>
                </Text>
              </View>
              <View style={styles.CartItemSizeValueContainer}>
                <TouchableOpacity style={styles.CartItemIcon} 
                onPress={() => {
                  decrementCartItemQuantityHandler(id, data.size);
                }}>
                    <AntDesign name='minus' color={colors.white} size={10}/>
                </TouchableOpacity>
                <View style={styles.CartItemQuantityContainer}>
                  <Text style={styles.CartItemQuantityText}>{data.quantity}</Text>
                </View>
                <TouchableOpacity style={styles.CartItemIcon} onPress={() => {
                  incrementCartItemQuantityHandler(id, data.size);
                }}>
                    <Ionicons name='add' color={colors.white} size={10}/>
                </TouchableOpacity>
              </View>
          </View>
        ))}
      </BlurView> 
      ): ( 
        <BlurView
        intensity={100}
        tint='dark'
        style={styles.CartItemSingleBlur}
        >
          <View>
            <Image
            style = {styles.CartItemSingleImage} 
            source={imagelink_square}/>
          </View>
          <View style = {styles.CartItemSingleInfoContainer}>
            <View>
               <Text style={styles.CartItemTitle}>{name}</Text>
               <Text style={styles.CartItemSubTitle}>{special_ingredient}</Text>
            </View>
            <View style={styles.CartItemSingleSizeValueContainer}>
              <View style={styles.SizeBox}>
                <Text style={[styles.SizeText, {
                      fontSize:type == 'Bean' ? 12 : 16,
                    },
                    ]}>{prices[0].size}
                    </Text>
              </View>
              <Text style={styles.SizeCurrency}>
                  {prices[0].currency}
                <Text style={styles.SizePrice}> {prices[0].price}</Text>
                </Text>
            </View>
            <View style={styles.CartItemSingleQuantityContainer}>
                <TouchableOpacity style={styles.CartItemIcon} 
                onPress={() => {
                  decrementCartItemQuantityHandler(id, prices[0].size);
                }}>
                    <AntDesign name='minus' color={colors.white} size={10}/>
                </TouchableOpacity>
                <View style={styles.CartItemQuantityContainer}>
                  <Text style={styles.CartItemQuantityText}>{prices[0].quantity}</Text>
                </View>
                <TouchableOpacity style={styles.CartItemIcon} onPress={() => {
                  incrementCartItemQuantityHandler(id, prices[0].size);
                }}>
                    <Ionicons name='add' color={colors.white} size={10}/>
                </TouchableOpacity>
              </View>
          </View>
          </BlurView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  CartItemBlur:{
    flex: 1,
    gap: 12,
    padding: 15,
    borderRadius:25,
  },
  CartItemRow:{
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  CartItemImage: {
   height: 130,
   width: 130,
   borderRadius: SPACING *2,
  },
  CartItemInfo:{
    flex : 1,
    paddingVertical: 4,
    justifyContent: 'space-between',
  },
  CartItemTitle:{
    fontWeight: '600',
    fontSize: 18,
    color:  colors.white,
  },
  CartItemSubTitle:{
    fontWeight: '600',
    fontSize: 14,
    color:  colors['white-smoke'],
    marginBottom: SPACING,
  },
  CartItemRoastedContainer: {
     height: 50,
     width: SPACING *12,
     borderRadius: 15,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: colors.blur,
  },
  CartItemRoastedText:{
    fontWeight: '600',
    fontSize: 12,
    color:  colors.white,
  },
  CartItemSizeRowContainer:{
    flex: 1,
    alignItems: 'center',
    gap: SPACING *2,
    flexDirection: 'row',
    justifyContent:'center',
  },
  CartItemSizeValueContainer:{
    flex:1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  SizeBox:{
    backgroundColor: colors.dark,
    height: SPACING*4,
    width: SPACING *8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SPACING,
  },
  SizeText:{
    color:  colors['white-smoke'],
  },
  SizeCurrency:{
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 15,
  },
  SizePrice:{
    color: colors.white,
  },
  CartItemIcon:{
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: SPACING,
  },
  CartItemQuantityContainer:{
     backgroundColor: colors.dark, 
     width: 60,   
     borderRadius: SPACING,
     borderWidth: 2,
     borderColor: colors.primary,
     alignItems: 'center',
     paddingVertical: 4,
  },
  CartItemQuantityText:{
    fontSize: 16,
    color: colors.white,
  },
  CartItemSingleBlur:{
    flexDirection: 'row',
    alignItems:'center',
    padding: 12,
    gap: 12,
    borderRadius: 25,
  },
  CartItemSingleImage:{
    width: 150,
    height: 150,
    borderRadius: SPACING *2,
  },
  CartItemSingleInfoContainer:{
    flex: 1,
    alignItems:'stretch',
    justifyContent: 'space-around',
  },
  CartItemSingleSizeValueContainer:{
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: 'center',
    marginBottom: 10,
  },
  CartItemSingleQuantityContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});