import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import SPACING from "../theme/SPACING";
import colors from "../theme/colors";
import GrandientBGIcon from "./GradientBGIcon";
import ProfilePic from "./ProfilePic";


export default function HeaderBar({title}) {
  return (
    <View style={styles.HeaderContainer}>
      <GrandientBGIcon />
      <Text style={styles.HeaderText}>{title}</Text>
      <ProfilePic />
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderContainer: {
    padding: SPACING *2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontSize: SPACING *2,
    color: colors.white,
  },
});