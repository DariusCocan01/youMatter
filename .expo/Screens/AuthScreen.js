import { StyleSheet, Text, View, Platform,Image } from 'react-native';
import AppTextInput from '../Components/AppTextInput';
import AppButton from '../Components/AppButton';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect } from 'react';

const AuthScreen = ({ navigation }) => {
  const goToMainScreen = (id) => {
    navigation.navigate('MainScreen',{id});
  };
  const goToRegistrationScreen = () => {
    navigation.navigate('RegistrationScreen');
  };
  const goToForgottenPassScreen = () => {
    navigation.navigate('ForgottenPassScreen');
  };
  const [emailAddress, setEmailAddress] = useState();
  const [password, setPassword] = useState();
  const auth = FIREBASE_AUTH;

  
  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  const handleEmailAddressChange = (text) => {
    setEmailAddress(text);
  };

  
  const singIn = async() =>{
    try {
      const response = await signInWithEmailAndPassword(auth, emailAddress, password);
      const userID = response.user.uid;
      console.log(userID);
      goToMainScreen(userID);
    } catch (error) {
      alert("Your credentials are not correct");
    }
  }
    return (
    <View style={styles.container}>
        <Text style={styles.text}>Authentification</Text>
        <AppTextInput placeholder = "Email address" icon = "email" onChangeText = {handleEmailAddressChange}/>
        <AppTextInput placeholder = "Password" icon = "lock" secureTextEntry={true} onChangeText = {handlePasswordChange}/>
        <AppButton title="login" onPress = {singIn}/>
        <Text style={styles.forgotPasswordText} onPress={goToForgottenPassScreen}>Forgot your password?</Text>
        <Text style = {styles.bottomText}>
          You don't have an account?{' '}
          <Text style={styles.createAccountText} onPress={goToRegistrationScreen}>Create one.</Text>
        </Text>
    </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    text:{
      fontSize: 30,
      fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    },
    forgotPasswordText:{
      textDecorationLine:'underline',
    },
    bottomText:{
      position:'absolute',
      bottom:50,
    },
    createAccountText: {
      fontWeight:'bold' 
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // sau 'stretch' sau 'contain'
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
export default AuthScreen;