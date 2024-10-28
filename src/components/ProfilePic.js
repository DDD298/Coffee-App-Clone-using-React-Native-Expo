import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { BlurView } from 'expo-blur';
import SPACING from '../theme/SPACING';

const avatar = require("../assets/avatar.jpg");

export default function ProfilePic() {
  return (
    <TouchableOpacity>
    <View
style={styles.ImageContainer}
>
<BlurView
  style={{
    height: "100%",
    padding: SPACING / 2,
  }}
>
  <Image
    style={styles.Image}
    source={avatar}
  />
</BlurView>
</View>
</TouchableOpacity>
  );
}

const styles = StyleSheet.create({
 ImageContainer:{
  width: SPACING * 4,
  height: SPACING * 4,
  overflow: "hidden",
  borderRadius: SPACING,
  },
  Image :{
    height: "100%",
    width: "100%",
    borderRadius: SPACING,
  },
});