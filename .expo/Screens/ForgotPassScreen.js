import { StyleSheet, Text, View, Platform } from 'react-native';
import AppTextInput from '../Components/AppTextInput';
import AppButton from '../Components/AppButton';
import React, { useState, useEffect } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgottenPassScreen = ({ navigation }) => {
  const [emailAddress, setEmailAddress] = useState();

  const goToAuth = () => {
    navigation.navigate('AuthScreen');
  };
  const handleEmailAddressChange = (text) => {
    setEmailAddress(text);
  };
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const handleReset = () =>{
    if(isValidEmail(emailAddress) == true){
      const auth = getAuth();

  sendPasswordResetEmail(auth, emailAddress)
    .then(() => {
      goToAuth();
    })
    .catch((error) => {
      alert(error);
    });
    }else{
      alert("Email is incorrect");
    }
  }
    return (
    <View style={styles.container}>
        <Text style={styles.text}>Reset Password</Text>
        <AppTextInput placeholder="Email address" icon="email" onChangeText = {handleEmailAddressChange}/>
        <AppButton title ="Reset" onPress={handleReset}/>
    </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderTopWidth: 1,  
      borderTopColor: '#D3D3D3',
      borderTopStyle: 'solid',
    },
    text:{
      fontSize: 30,
      fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
      padding:20,
    },
  });
export default ForgottenPassScreen;