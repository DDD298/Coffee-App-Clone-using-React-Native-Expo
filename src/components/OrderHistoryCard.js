import {
    StyleSheet,
    Text,
    Touchable,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React from 'react';
  import colors from '../theme/colors';
  import SPACING from '../theme/SPACING';
  import OrderItemCard from './OrderItemCard';
  
export default function OrderHistoryCard({navigationHandler,
  CartList,
  CartListPrice,
  OrderDate,}) {
  return (
    <View style={styles.CardContainer}>
    <View style={styles.CardHeader}>
      <View>
        <Text style={styles.HeaderTitle}>Order Time</Text>
        <Text style={styles.HeaderSubtitle}>{OrderDate}</Text>
      </View>
      <View style={styles.PriceContainer}>
        <Text style={styles.HeaderTitle}>Total Amount</Text>
        <Text style={styles.HeaderPrice}>$ {CartListPrice}</Text>
      </View>
    </View>
    <View style={styles.ListContainer}>
      {CartList.map((data, index) => (
        <TouchableOpacity
          key={index.toString() + data.id}
          onPress={() => {
            navigationHandler({
              index: data.index,
              id: data.id,
              type: data.type,
            });
          }}>
          <OrderItemCard
            type={data.type}
            name={data.name}
            imagelink_square={data.imagelink_square}
            special_ingredient={data.special_ingredient}
            prices={data.prices}
            ItemPrice={data.ItemPrice}
          />
        </TouchableOpacity>
      ))}
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  CardContainer: {
    gap: SPACING,
  },
  CardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING*2,
    alignItems: 'center',
  },
  HeaderTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: colors.white,
  },
  HeaderSubtitle: {
    fontWeight:'300',
    fontSize: 16,
    color: colors.white,
  },
  PriceContainer: {
    alignItems: 'flex-end',
  },
  HeaderPrice: {
    fontWeight: '600',
    fontSize: 18,
    color: colors.primary,
  },
  ListContainer: {
    gap: SPACING*2,
  },
});