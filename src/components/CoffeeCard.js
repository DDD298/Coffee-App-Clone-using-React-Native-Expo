import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '../theme/colors';
import SPACING from '../theme/SPACING';
import {Ionicons} from '@expo/vector-icons';
import { BlurView } from 'expo-blur';


const card_Width = Dimensions.get('window').width *0.32


export default function CoffeeCard({
  id, 
  index, 
  type, 
  roasted, 
  imagelink_square,
  name, 
  special_ingredient, 
  average_rating,
  price, 
  buttonPressHandler}) {
  return (
      <BlurView 
      intensity={100}
      tint='dark'
      style={styles.CardLinearGradientContainer}>
        <ImageBackground 
        source={imagelink_square}
        style={styles.CardImageBG}
        resizeMode='cover'>
           <View style={styles.CardRating}>
             <Ionicons name='star' color={colors.primary} size={14}/>
             <Text style={styles.CardRatingText}>{average_rating}</Text>
           </View>
        </ImageBackground>
        <Text style={styles.CardTitle}>{name}</Text>
        <Text style={styles.CardSubTitle}>{special_ingredient}</Text>
        <View style={styles.CardFooterRow}>
          <Text style={styles.CardPriceCurrency}>
            $ <Text style={styles.CardPrice}>{price.price}</Text>
            </Text>
            <TouchableOpacity 
            onPress={()=>{
              buttonPressHandler({id, index,type,roasted,imagelink_square,name,special_ingredient,prices:[{...price,quantity:1}]});
            }}
            style={{
              backgroundColor: colors.primary,
              borderRadius: 5,}}>
              <Ionicons name='add' color={colors.white} size={18} />
              </TouchableOpacity>
        </View>
      </BlurView>
  );
}

const styles = StyleSheet.create({
    CardLinearGradientContainer:{
      padding: 15,
      borderRadius: 25,
    },
  CardImageBG:{
    width: card_Width,
    height: card_Width,
    borderRadius: SPACING *1.5,
    marginBottom: 15,
    overflow: 'hidden',
  },
  CardRating:{
    flexDirection: 'row',
    backgroundColor: colors.blur,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING,
    gap: 5,
    position: 'absolute',
    borderBottomRightRadius: SPACING*2,
    borderTopLetfRadius: SPACING*2,
    top: 0,
    left: 0,
  },
  CardRatingText:{
    fontWeight: "600",
    color: colors.white,
    fontSize: 14,
    lineHeight: 22,
  },
  CardFooterRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  CardTitle:{
    fontWeight:'600',
    color: colors.white,
    fontSize: 14,
  },
  CardSubTitle:{
   fontWeight: '300',
   color: colors.white,
   fontSize: 12,
  },
  CardPriceCurrency:{
     color: colors.primary,
     fontSize: 16,
  },
  CardPrice:{
    color: colors.white,
    fontWeight:'600'
  },
});