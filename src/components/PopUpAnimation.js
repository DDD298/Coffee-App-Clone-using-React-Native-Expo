import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import colors from '../theme/colors';

export default function PopUpAnimation({style, source}) {
  return (
    <View style={styles.LottieAnimationContainer}>
    <Text>Success!!</Text>
  </View>
  );
}

const styles = StyleSheet.create({
    LottieAnimationContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: colors.blur,
        justifyContent: 'center',
  },
});