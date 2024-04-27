import { StyleSheet, Text, View, Platform,TouchableOpacity,ScrollView , Image,Alert,ActivityIndicator} from 'react-native';
import AppTextInput from '../Components/AppTextInput';
import AppButton from '../Components/AppButton';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import AppUploadButton from '../Components/AppUploadButton';
import * as ImagePicker from 'expo-image-picker';
import {getFirestore, collection, query, getDoc,doc,addDoc,setDoc, getDocs,where} from "firebase/firestore";
import AppMandatoryText from '../Components/AppMandatoryText';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FIREBASE_APP } from '/Users/cocandarius-cristian/Desktop/My Computer/Programare/ReactNative/youMatter/FirebaseConfig.ts';



const RegistrationScreen2 = ({route, navigation}) => {
  const { profile, firstName, lastName, emailAddress, password, phoneNumber } = route.params;
  const [uploadPhoto,setUploaded] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const goToAuthScreen = () => {
    setIsSigningUp(false);
    navigation.navigate('AuthScreen');
  };
  const singUp = async() =>{
    setIsSigningUp(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, emailAddress, password);
      const userID = response.user.uid;
      console.log(userID);
      addData(userID);
    } catch (error) {
      console.log(error);
    }
  }
  const auth = FIREBASE_AUTH;
  
  function getDescription(){
    if(profile.label == "Doctor"){
      return "Please Upload your identity document AND your medical certificate";
      console.log(profile);
    }else{
      return"Please Upload your identity document";
      console.log(profile);
    }
  }
  const [selectedImages, setSelectedImages] = useState([]);
    function imgURI  (){
      if(selectedImages === undefined){
        return false;
      }else{
        return true;
      }
    }
    const pickImage = async () => {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,

        });
  
        if (!result.cancelled) {
          setSelectedImages((prevImages) => [...prevImages, result.uri]);
          setUploaded(true);
        }
      } catch (error) {
        console.error('Error picking image:', error);
      }
    };
    const removeImage = (index) => {
        Alert.alert(
          'Remove Image',
          'Are you sure you want to remove this image?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Remove',
              onPress: () => {
                setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
              },
            },
          ],
          { cancelable: false }
        );
      };

      const database = getFirestore();
      const ref = collection(database,"users");
    
      const addData = async (userID) => {
        if(uploadPhoto!=false){ 
        try {
            let user = {ID:userID, name: firstName, lastName: lastName,phone:phoneNumber, profile: profile.label, documents: selectedImages  };
            await addDoc(ref, user);
            await uploadImage(selectedImages);
            console.log("Utilizator adăugat cu succes!");
            goToAuthScreen();
        } catch (error) {
            alert(error);
        }
      }else{
        alert("Upload documents");
      }
    };

    const uploadImage = async (images) => {
      const uploadedImageURLs = [];
    
      for (let i = 0; i < images.length; i++) {
        let uri = images[i];
        console.log(uri);
        let filename = `filename${i + 1}.jpg`;
        let dir = `${emailAddress}/`;
        try {
          const response = await fetch(uri);
          const blob = await response.blob();
          const storage = getStorage();
          const fileRef = storageRef(storage, dir + filename);
    
          await uploadBytes(fileRef, blob);
          const downloadURL = await getDownloadURL(fileRef);
          
          
          uploadedImageURLs.push(downloadURL);
        } catch (error) {
          console.error("Eroare la încărcarea imaginii:", error);
          
        }
      }
    };
    
    return (
    <View style={styles.container}>
        
        <View style={styles.uploadContainer}>
      <Text style={{ ...styles.text, padding: 15, fontSize: 15, fontWeight: 'bold' }}>{getDescription()}</Text>
      <TouchableOpacity onPress={pickImage}>
        <AppButton title="Upload" style={{ flexDirection: 'row', width: '45%', borderRadius: 20, backgroundColor: '#FF9800' }} icon="cloud-upload" onPress={pickImage} />
      </TouchableOpacity>
      <ScrollView horizontal>
        {selectedImages.map((image, index) => (
          <TouchableOpacity key={index} onLongPress={() => removeImage(index)}>
            <Image source={{ uri: image }} style={{ width: 100, height: 100, margin: 5, borderRadius:10 }} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      
    </View>
    {uploadPhoto? false : <AppMandatoryText txt="Documents are mandatory**" style={styles.mandatoryText}/>}
    
    {isSigningUp ? (
    <ActivityIndicator size="large" color="#FF9800" />
  ) : (
    <AppButton title="Submit" onPress={singUp} />
  )}
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
      fontSize: 20,
      fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    },
    uploadContainer: {
      padding: 25,
      borderRadius: 20,
      width: '95%',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderWidth: 1,
      borderColor: 'black',
      marginBottom:10
    },
    mandatoryText:{
      marginBottom:10,

    }
  });
export default RegistrationScreen2;