import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import AppTextInput from '../Components/AppTextInput';
import AppButton from '../Components/AppButton';
import {getFirestore, collection, query, getDoc,doc,addDoc,setDoc, getDocs,where} from "firebase/firestore";
const Firestore = ({ navigation }) => {

    const database = getFirestore();
    const ref = collection(database,"users");
    const readUserDataByName = async (userName) => {
        try {
            const q = query(ref, where("name", "==", userName));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                });
            } else {
                console.log("Niciun utilizator găsit cu numele specificat!");
            }
        } catch (error) {
            alert("Eroare la citirea datelor utilizatorului: ", error);
        }
    };
    const addData = async () => {
        try {
            let user = { name: "Cristi", lastName: "Cocan", bornAge: 2001 };
            await addDoc(ref, user);
            console.log("Utilizator adăugat cu succes!");
        } catch (error) {
            alert(error);
        }
    };
    return (
    <View style={styles.container}>
       <AppButton title="I am a button" onPress={readUserDataByName("Cristi")}/> 
    </View>
    );
    
}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }
})
export default Firestore;