import { StyleSheet, Text, View, Platform, Modal, ScrollView} from 'react-native';
import AppTextInput from '../Components/AppTextInput';
import AppButton from '../Components/AppButton';
import AppPicker from '../Components/AppPicker';
import React, { useState, useEffect } from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import AppMandatoryText from '../Components/AppMandatoryText';
import AppUploadButton from '../Components/AppUploadButton';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';


const RegistrationScreen = ({ navigation }) => {
    const cat = [
      {label: "Doctor", value:1},
      {label: "Patient", value:2}
    ];
    const [profile,setProfile] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [emailAddress, setEmailAddress] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [verification, setVerification] = useState(true);
    
    const goToRegistrationScreen2 = () => {
      if (isValidEmail(emailAddress)&& isValidPhoneNumber(phoneNumber) && password ===confirmPassword && minimumCharactersPassword(password) && checkForSpaces(password)&& containsSpecialCharacter(password) && containsNumber(password)) {
        navigation.navigate('RegistrationScreen2', {
          profile,
          firstName,
          lastName,
          emailAddress,
          password,
          phoneNumber,
        });
      } else {
        
        console.log("Input validation failed");
      }
    };
    const handleFirstNameChange = (text) => {
      setFirstName(text);
    };
    const handleLastNameChange = (text) => {
      setLastName(text);
    };
    const handleEmailAddressChange = (text) => {
      setEmailAddress(text);
    };
    const verifyInput = () =>{
      console.log(firstName);
    }
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    const handlePasswordChange = (text) => {
      setPassword(text);
    };
    function minimumCharactersPassword(password){
      if (password==undefined) return true;
      if(password.length < 8){
        return false;
      }else{
        return true;
      }
    }
    function checkForSpaces(password){
      if (password==undefined) return false;
      if (password.includes(" ")) {
        return false;
      }else{
        return true;
      }
    }
    function containsSpecialCharacter(str) {
      if (str==undefined) return false;

      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
      

      return specialCharRegex.test(str);
    }
    function containsNumber(str) {
      if (str==undefined) return false;

      return /\d/.test(str);
    }
    const handleConfirmPassWordChange = (text) => {
      setConfirmPassword(text);
    };
    const handlePhoneNumberChange = (text) => {
      setPhoneNumber(text);
    };
    function isValidPhoneNumber(str) {
      if (str == undefined) return false;
      if (str.length != 10) return false;
      if (!str.startsWith("07")) return false;
      return true;
    }
    return (
    <ScrollView style={{ flex: 1, width: '100%', height: '100%' }}
    contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
        <MaterialCommunityIcons name="account-circle" size = {50}style = {styles.icon}/>
        <Text style = {styles.text}>Account information</Text>
        <AppPicker 
         items={cat} 
         placeholder="You are using this account as:"
         selectedItem = {profile}
         onSelectItem = {(item) => setProfile(item)}/>
        {profile ? null : <AppMandatoryText txt="Choosing it's mandatory"/>}
        <AppTextInput placeholder = "First name" onChangeText = {handleFirstNameChange}/>
        {firstName ? null : <AppMandatoryText txt="First name mandatory"/>}
        <AppTextInput placeholder = "Last name" onChangeText = {handleLastNameChange}/>
        {lastName ? null : <AppMandatoryText txt="Last name mandatory"/>}
        <AppTextInput placeholder = "Email address" onChangeText = {handleEmailAddressChange} />
        {isValidEmail(emailAddress) ? false : <AppMandatoryText txt="Email adress is invalid"/>}

        <AppTextInput placeholder = "Phone number" onChangeText = {handlePhoneNumberChange} keyboardType="numeric"/>
        {isValidPhoneNumber(phoneNumber) ? false : <AppMandatoryText txt="Invalid Phone number"/>}
        <AppTextInput placeholder = "Enter a Password"  secureTextEntry={true} onChangeText = {handlePasswordChange}/>
        {minimumCharactersPassword(password) ? false : <AppMandatoryText txt="Needs to contain minimum 8 characters"/>}
        {checkForSpaces(password) ? false : <AppMandatoryText txt="Password cannot contain spaces"/>}
        {containsSpecialCharacter(password) ? false : <AppMandatoryText txt="Password must contain at least 1 special character"/>}
        {containsNumber(password) ? false : <AppMandatoryText txt="Password must contain at least 1 number"/>}
        
        <AppTextInput placeholder = "Confirm the password" secureTextEntry={true} onChangeText = {handleConfirmPassWordChange}/>
        {password==confirmPassword ? false : <AppMandatoryText txt="Password is incorrect"/>}
        
        


        <AppButton title="next" onPress={goToRegistrationScreen2}/>
        <View style = {{height:30}}/>
    </View>
    </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    text:{
      fontSize: 20,
      fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
      paddingBottom: 20,
    },
    icon:{
      paddingTop:20,
    },
    uploadContainer:{
      padding: 15,
      borderRadius: 20,
      width:'95%',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderWidth: 1, 
      borderColor: 'black',
    },
    
  });
export default RegistrationScreen;
