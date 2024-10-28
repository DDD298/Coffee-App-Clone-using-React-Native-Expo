import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import colors from '../theme/colors';


const cafeBackground = require('../assets/imgbg/background2.jpg');

export default function Register() {
  return (
    <ImageBackground source={cafeBackground} style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Take Back Your Accounts</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Enter your email or phone number'
            placeholderTextColor= {colors.secondary}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Send Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      resizeMode: 'cover',
    },
    overlay: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.white,
      marginBottom: 30,
      textAlign: 'center',
    },
    inputContainer: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: 10,
      padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.primary,
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        color: 'white',
      },
      button: {
        backgroundColor: 'blue',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
      },
});