import {StyleSheet, Text, View, ImageProps, Image} from 'react-native';
import React from 'react';
import { BlurView } from 'expo-blur';
import colors from '../theme/colors';
import SPACING from '../theme/SPACING';

export default function OrderHistoryScreen({
    type,
    name,
    imagelink_square,
    special_ingredient,
    prices,
    ItemPrice,}) {
  return (
    <BlurView
    tint='dark'
    intensity={100}
    style={styles.CardLinearGradient}>
    <View style={styles.CardInfoContainer}>
      <View style={styles.CardImageInfoContainer}>
        <Image source={imagelink_square} style={styles.Image} />
        <View>
          <Text style={styles.CardTitle}>{name}</Text>
          <Text style={styles.CardSubtitle}>{special_ingredient}</Text>
        </View>
      </View>
      <View>
      <Text style={styles.CardCurrency}>
            $ <Text style={styles.CardPrice}>{ItemPrice}</Text>
          </Text>
        </View>
      </View>
      {prices.map((data, index) => (
        <View key={index.toString()} style={styles.CardTableRow}>
          <View style={styles.CardTableRow}>
            <View style={styles.SizeBoxLeft}>
              <Text
                style={[
                  styles.SizeText,
                  {
                    fontSize:
                      type == 'Bean' ? 12 : 16,
                  },
                ]}>
                {data.size}
              </Text>
            </View>
            <View style={styles.PriceBoxRight}>
              <Text style={styles.PriceCurrency}>
                {data.currency}
                <Text style={styles.Price}> {data.price}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.CardTableRow}>
            <Text style={styles.CardQuantityPriceText}>
              X <Text style={styles.Price}>{data.quantity}</Text>
            </Text>
            <Text style={styles.CardQuantityPriceText}>
              $ {(data.quantity * data.price).toFixed(2).toString()}
            </Text>
          </View>
        </View>
      ))}
    </BlurView>
  );
}

const styles = StyleSheet.create({
    CardLinearGradient: {
        gap: SPACING*2,
        padding: SPACING*2,
        borderRadius: 25,
      },
      CardInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      CardImageInfoContainer: {
        flexDirection: 'row',
        gap: SPACING*2,
        alignItems: 'center',
      },
      Image: {
        height: 90,
        width: 90,
        borderRadius: 15,
      },
      CardTitle: {
        fontWeight: '600',
        fontSize: 18,
        color: colors.white,
      },
      CardSubtitle: {
        fontSize: 12,
        color: colors.light,
      },
      CardCurrency: {
        fontWeight: '800',
        fontSize: 18,
        marginLeft: 5,
        color: colors.primary,
      },
      CardPrice: {
        color: colors.white,
      },
      CardTableRow: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      SizeBoxLeft: {
        backgroundColor: colors.dark,
        height: 45,
        flex: 1,
        borderTopLeftRadius: SPACING,
        borderBottomLeftRadius: SPACING,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: colors.secondary,
      },
      SizeText: {
        fontWeight: '600',
        color: colors.light,
      },
      PriceBoxRight: {
        backgroundColor: colors.dark,
        height: 45,
        flex: 1,
        borderTopRightRadius: SPACING,
        borderBottomRightRadius: SPACING,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: colors.secondary,
      },
      PriceCurrency: {
        fontWeight: '800',
        fontSize: 18,
        color: colors.primary,
      },
      Price: {
        color: colors.white,
      },
      CardQuantityPriceText: {
        flex: 1,
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 18,
        color: colors.primary,
      },
});