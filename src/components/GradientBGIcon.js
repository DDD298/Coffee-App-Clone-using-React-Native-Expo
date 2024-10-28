import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import colors from '../theme/colors';
import {Ionicons} from "@expo/vector-icons"
import SPACING from '../theme/SPACING';
import { BlurView } from 'expo-blur';



export default function GrandientBGIcon(name, color, size) {
  return (
    <TouchableOpacity
style={styles.container}>
<BlurView
  style={styles.BlurView}
>
  <Ionicons
    name="menu"
    size={SPACING * 2.5}
    color={colors.secondary}
  />
</BlurView>
</TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: SPACING,
    overflow: "hidden",
    width: SPACING * 4,
    height: SPACING * 4,
  },
  BlurView: {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
  },
});



