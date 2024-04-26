import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, FlatList, StyleSheet,StatusBar,SafeAreaView,ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import AppButton from './AppButton';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import {getFirestore, collection, query, getDoc,doc,addDoc,setDoc, getDocs,where, deleteDoc} from "firebase/firestore";
const AppFlatList = ({ requests, navigation }) => {
    const auth = FIREBASE_AUTH;
    const [selectedItem, setSelectedItem] = useState(null);
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
    });
    const [isLoading, setIsLoading] = useState(true);
    const DATA = requests;
    const [accept, setAccept] = useState(false);
    useEffect(() => {
        (async () => {
            setIsLoading(true); 
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                setIsLoading(false);
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
            });
            
            setIsLoading(false);
        })();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180); 
        const dLon = (lon2 - lon1) * (Math.PI / 180); 
    
        lat1 = lat1 * (Math.PI / 180);
        lat2 = lat2 * (Math.PI / 180);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
        const distance = R * c;
    
        return parseFloat(distance.toFixed(1));
    }
    const handlePressItem = (id) =>{
        setSelectedItem(prevId => prevId === id ? null : id);
    }
    const handlePressAccept = (id) =>{
        setAccept(true);
        verifyRequestExistance(id);
    }
    const uploadTheCurrentRequest = async (element,id) =>{
        const databaseAcceptance = getFirestore();
        reference = collection(databaseAcceptance,"CurrentWork");
        const currentUser = auth.currentUser;
        const currentUserId = currentUser.uid; 
        element.requestID = id;
        element.currentDoctorId = currentUserId;
        addDoc(reference, element)
        .then((docRef) => {
            console.log("Documentul a fost adăugat cu succes cu ID-ul: ", docRef.id);
            deleteDocumentById("requests",element.requestID);
        })
        .catch((error) => {
            console.error("Eroare la adăugarea documentului: ", error);
        });

    }
    const verifyRequestExistance = async (id) => {
        const db = getFirestore();
        const ref = doc(db, 'requests', id);
        
        try {
          const element = await getDoc(ref);
          if (element.exists()) {
            console.log("Documentul există:", element.data());
            uploadTheCurrentRequest(element.data(),id);
          } else {
            console.log("Nu există document cu acest ID");
          }
        } catch (error) {
          console.error("Eroare la accesarea documentului:", error);
        }
      }
    const deleteDocumentById = async (collectionName, documentId) => {
        const db = getFirestore();
      
        try {
          await deleteDoc(doc(db, collectionName, documentId));
          console.log("Documentul cu ID-ul", documentId, "a fost șters cu succes din colecția", collectionName);
          const id = auth.currentUser.uid;
          navigation.navigate('MainScreen',{id});
        } catch (error) {
          console.error("A apărut o eroare la ștergerea documentului:", error);
        }
      };
      const Item = ({id,isInjured, lastName,latitude,longitude,mainZone,name,painLevel,secZone}) => (
        <TouchableOpacity style={styles.item} onPress = {()=>handlePressItem(id)}>
          <Text style={styles.title}>{name} {lastName} - {secZone} - {calculateDistance(latitude,longitude,location.latitude,location.longitude)} km</Text>
          {selectedItem===id&&<ItemDescription mainZone={mainZone} secZone={secZone}id={id} painLevel={painLevel} isInjured={isInjured}latitude={latitude}longitude={longitude}name={name}distance={calculateDistance(latitude,longitude,location.latitude,location.longitude)}lastName={lastName}/>}
        </TouchableOpacity>
      );
    const ItemDescription = ({id,isInjured, lastName,distance,mainZone,name,painLevel,secZone}) => (
        <View style={styles.description}>
            <Text style = {styles.text}>    {name} {lastName} which is located {distance} from you has {painLevel} at {secZone}. Do you accept to consult this patient?</Text>
            <AppButton title="Accept" onPress={() => handlePressAccept(id)}/>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={({item}) => <Item mainZone={item.mainZone} secZone={item.secZone}id={item.id} painLevel={item.painLevel} isInjured={item.isInjured}latitude={item.latitude}longitude={item.longitude}name={item.name}lastName={item.lastName}/>}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      width: "100%"
    },
    description:{
        backgroundColor: '#e6E7e8',
        flex:1,
        width:"100%",
        paddingTop:0,
        margin:0,
        borderRadius: 10,
        borderColor:"#333",
        borderWidth:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
      backgroundColor: '#e6E7e8',
      padding: 10,
      borderRadius: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      width: "95%"
    },
    title: {
      fontSize: 20,
    },
    text:{
        alignSelf:'flex-start',
        padding:10,
        fontSize:18,
    }
  });


export default AppFlatList;
