import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function BackgroundComponent() {
    const { source, children } = this.props
  return (
    <Image style={styles.picture} source={source} />
  );
}

const styles = StyleSheet.create({
  picture: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover',
	}
});