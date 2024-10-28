import React from 'react';
import { StyleSheet, Text, View, Image,  } from 'react-native';
import SPACING from '../theme/SPACING';
import colors from '../theme/colors';
import { BlurView } from 'expo-blur';
import {Entypo} from "@expo/vector-icons"

export default function PaymentMethod({ paymentMode,
    name,
    icon,
    isIcon,}) {
  return (
    <View
      style={[
        styles.PaymentCardContainer,
        {
          borderColor:
            paymentMode == name
              ? colors.primary
              : colors['white-smoke'],
        },
      ]}>
      {isIcon ? (
        <BlurView
        intensity={100}
        tint='dark'
          style={styles.LinearGradientWallet}>
          <View style={styles.WalletRow}>
            <Entypo
              name={'wallet'}
              color={colors.primary}
              size={SPACING*3}
            />
            <Text style={styles.PaymentTitle}>{name}</Text>
          </View>
          <Text style={styles.PaymentPrice}>$ 100.50</Text>
        </BlurView>
      ) : (
        <BlurView
        intensity={100}
        tint='dark'
          style={styles.LinearGradientRegular}>
          <Image source={icon} style={styles.PaymentImage} />
          <Text style={styles.PaymentTitle}>{name}</Text>
        </BlurView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    PaymentCardContainer: {
        backgroundColor: colors.blur,
        borderWidth: 3,
      },
      LinearGradientWallet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        paddingHorizontal: 24,
        gap: 24,
      },
      WalletRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
      },
      LinearGradientRegular: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        paddingHorizontal: 24,
        gap: 24,
      },
      PaymentTitle: {
        fontWeight: '600',
        fontSize: 16,
        color: colors.white,
      },
      PaymentPrice: {
        fontSize: 16,
        color: colors['dark-light'],
      },
      PaymentImage: {
        height: SPACING*3,
        width: SPACING*3,
      },
});