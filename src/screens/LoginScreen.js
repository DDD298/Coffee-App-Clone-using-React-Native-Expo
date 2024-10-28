import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../theme/colors';
import SPACING from '../theme/SPACING';
import {AntDesign} from '@expo/vector-icons'

const cafeBackground = require('../assets/imgbg/background1.jpg');

export default function LoginScreen() {
const navigation = useNavigation();

  const handleLogin = () => {
   
    // Sau khi đăng nhập thành công, chuyển đến trang chủ
    navigation.replace('Tab');
  };

  const handleRegister = () => {
    // Chuyển hướng về màn hình đăng kí khi bấm vào nút "Đăng kí"
    navigation.navigate('Register');
  };
   
  const handleForget = () => {
    // Chuyển hướng về màn hình quên mật khẩu khi bấm vào nút "Quên mật khẩu"
    navigation.navigate('Forget');
  };
  
  const handleGoogleLogin = () => {
    // Chuyển hướng đến trang đăng nhập Google khi bấm vào nút "Đăng nhập bằng Google"
    Linking.openURL('https://accounts.google.com');
  };

  const handleFacebookLogin = () => {
    // Chuyển hướng đến trang đăng nhập Facebook khi bấm vào nút "Đăng nhập bằng Facebook"
    Linking.openURL('https://www.facebook.com');
  };
  return(
<ImageBackground source={cafeBackground} style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity>
            <TextInput
            style={styles.input}
            placeholder='UserName'
            placeholderTextColor={colors.secondary} // Màu sắc chữ cho placeholder
          />
          </TouchableOpacity>
          <TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder='Password'
            secureTextEntry
            placeholderTextColor ={colors.secondary} // Màu sắc chữ cho placeholder
          />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={handleLogin}>Login Now</Text>
          </TouchableOpacity>
           <View style={styles.orContainer}>
            <Text style={styles.orText}>or</Text>
          </View>
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
              <AntDesign name="google" size={24} color="white"/>
              <Text style={styles.socialButtonText}>You can login with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.facebookButton} onPress={handleFacebookLogin}>
            <AntDesign name="facebook-square" size={24} color = "white" />
              <Text style={styles.socialButtonText}>You can login with Facebook</Text>
            </TouchableOpacity>
          <View style={styles.orContainer}>
            <Text style={styles.orText}>Don't have any accounts ?</Text>
          </View>
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForget}>
            <Text style={[styles.buttonText, styles.forgotPasswordText]}>Forgot Password ?</Text>
          </TouchableOpacity> 
        </View>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover', // Cho phép ảnh nền điền đầy toàn bộ container
  },
  overlay: {
    flex: 1,
    padding: SPACING*2,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white, 
    marginBottom: 10,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: colors.blur, // Màu sắc nền của trường nhập liệu
    borderRadius: 10,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors['white-smoke'], // Màu sắc viền trường nhập liệu
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    color: 'white',
  },
  button: {
    backgroundColor: colors.primary, // Màu sắc của nút đăng nhập
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Màu sắc chữ cho nút đăng nhập
    fontWeight: 'bold',
    fontSize: 18,
  },
  orContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  orText: {
    color: 'white',
    fontSize: 16,
  },
  googleButton: {
    backgroundColor: 'rgb(180,35,41)',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent:'center',
  },
  facebookButton: {
    backgroundColor: 'rgb(59, 89, 152)',
    padding: 15,
    alignItems:'center',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButtonText: {
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  registerButton: {
    backgroundColor: 'green', // Màu sắc của nút đăng ký
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: 'blue', // Màu sắc của văn bản "Quên mật khẩu?"
    fontSize: 16,
    textDecorationLine: 'underline', // Gạch chân văn bản
  },
});