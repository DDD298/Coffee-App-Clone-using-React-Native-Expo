import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SPACING from '../theme/SPACING';
import colors from '../theme/colors';

export default function PaymentFooter({price, buttonPressHandler, buttonTitle}) {
  return (
    <View style={styles.PriceFooter}>
      <View style={styles.PriceContainer}>
        <Text style={styles.PriceTitle}>Price</Text>
        <Text style={styles.PriceText}>
            {price.currency} <Text style={styles.Price}>{price.price}</Text>
            </Text>
      </View>
      <TouchableOpacity 
      onPress={() => buttonPressHandler()}
      style={styles.PayButton}>
        <Text style={styles.ButtonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  PriceFooter: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: "center",
   gap: SPACING  *2,
   padding: SPACING *2,
  },
  PriceContainer:{
    alignItems: 'center',
    width: 100,
  },
  PriceTitle:{
    fontWeight: '500',
    fontSize: 15,
    color: colors.light,
  },
  PriceText:{
    fontWeight: '500',
    fontSize: 25,
    color: colors.primary,
  },
  Price:{
    color: colors.white,
  },
  PayButton:{
    backgroundColor: colors.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING * 6,
    borderRadius: SPACING*2,
  },
  ButtonText:{
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 16,
  },
});