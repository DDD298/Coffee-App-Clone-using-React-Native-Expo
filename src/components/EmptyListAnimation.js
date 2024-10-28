import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../theme/colors';

export default function EmptyListAnimation({title}) {
  return (
    <View style={styles.EmptyCartContainer}>
      <Text style={styles.LottieText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  EmptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  LottieStyle:{
    height: 300,
  },
  LottieText:{
    fontWeight: '400',
    fontSize: 16,
    color: colors.primary,
    textAlign: "center",
  },
});