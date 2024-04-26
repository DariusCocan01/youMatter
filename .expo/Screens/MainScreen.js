import { StyleSheet, Text, View, Platform, TouchableOpacity,ActivityIndicator } from 'react-native';
import AppTextInput from '../Components/AppTextInput';
import AppButton from '../Components/AppButton';
import { useEffect,useState } from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AppImageButton from '../Components/AppImageButton';
import AppTip from '../Components/AppTip';
import { OverlayView } from '../Components/AppOverlayScreen';
import {getFirestore, collection, query, getDoc,doc,addDoc,setDoc, getDocs,where} from "firebase/firestore";
const MainScreen = ({ route,navigation }) => {
  const goToMedicalSymptompsScreen = () => {
    navigation.navigate('MedicalSymptomps',{name,lastName});
  };
  const goToTestMap = () => {
    navigation.navigate('TestMap', {
      destinationLatitude: 45.7478, // Înlocuiește cu valoarea dorită
      destinationLongitude: 21.2314, // Înlocuiește cu valoarea dorită
    });
  };
  const goToWork = () => {
    if(requestAccepted){
      navigation.navigate('TestMap', {
        destinationLatitude: lat,
        destinationLongitude: long,
        navigation: navigation,
        id: usr.id,
      });
    }else{
      navigation.navigate('WorkScreen');
    }
    
  }
  const usr = route.params;
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [lastName, setLastName] = useState();
  const [name,setName] = useState();
  const [phone, setPhone] = useState();
  const [profile,setProfile] = useState();
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [requestAccepted,setRequestAccepted] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const database = getFirestore();
  const ref = collection(database,"users");
  const readUserDataByID = async (userID) => {
    try {
        const q = query(ref, where("ID", "==", userID));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                setLastName(doc.data().lastName);
                setName(doc.data().name);
                setPhone(doc.data().phone);
                setProfile(doc.data().profile);
            });
        } else {
            console.log("Niciun utilizator găsit cu ID-ul specificat!");
        }
    } catch (error) {
        alert("Eroare la citirea datelor utilizatorului: ", error);
    }
};
const [counter, setCounter] = useState(0);

  useEffect(() => {
    if(requestAccepted == false){
    const intervalId = setInterval(() => {
      setCounter(prevCounter => prevCounter + 1); 
    }, 10000);

    
    return () => clearInterval(intervalId);
  }else{
    console.log(lat);
  } 
  }, []);
const requestExistance = async(userID) =>{
  const db = getFirestore();
  const ref = collection(db,"CurrentWork");
  let dbs = null;
  if(profile === "Doctor"){
     dbs = "currentDoctorId";
  }
  if(profile ==="Patient"){
    dbs = "ID"; 
  }
  if(profile == null) return;
  
  try{
    const q = query(ref, where(dbs, "==", userID));
    const querySnapshot = await getDocs(q);
    
    if(!querySnapshot.empty){
      querySnapshot.forEach((doc) => {
        setLat(doc.data().latitude);
        setLong(doc.data().longitude);
        setRequestAccepted(true);
        console.log(doc.data());
        console.log("Am actualizat datele");
      });
    }else{
      setRequestAccepted(false);

    }
  }catch(error){
    alert("Eroare la citirea work ", error);
  }


};
const goToTest = () => {
  navigation.navigate("AuthScreen");
}; 
  readUserDataByID(usr.id);
  requestExistance(usr.id);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Welcome ${name}`, 
      headerStyle: {
        backgroundColor: '#1A5D1A',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableOpacity onPress={() => goToTest()}>
          <MaterialCommunityIcons name="logout" size={35} style={{ marginRight: 15, color:'white' }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, name]);
  //opening screen effect
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    const timer = setTimeout(() => {
      setIsReady(true);
      navigation.setOptions({ headerShown: true });
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [navigation]);

  if (!isReady) {
    return (
      <View style={styles.fullScreenCentered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  const handleShowTip = () => {
    setShowTip(true);  // Setează direct `showTip` la `true` de fiecare dată
  };
    
    return (
    <View style={styles.container}>
        <AppImageButton onPress={goToMedicalSymptompsScreen} imageSrc={require('/Users/cocandarius-cristian/Desktop/My Computer/Programare/ReactNative/youMatter/assets/medicalModified.png')} style={styles.image}/>
        {profile ==="Doctor" &&<AppImageButton onPress={goToWork} imageSrc={require('/Users/cocandarius-cristian/Desktop/My Computer/Programare/ReactNative/youMatter/assets/workModified.png')} style={styles.image}/>}
        <AppTip trigger={showTip} onClose={() => setShowTip(false)} />
        {profile !=="Doctor" &&<AppImageButton onPress={() => handleShowTip()} imageSrc={require('/Users/cocandarius-cristian/Desktop/My Computer/Programare/ReactNative/youMatter/assets/tip.png')} style={styles.image}/>}
    </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopWidth: 1,  
      borderTopColor: '#D3D3D3',
      borderTopStyle: 'solid',
    },
    text:{
      fontSize: 30,
      fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    },
    fullScreenCentered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    image:{
      width:'90%',
      height:'45%',
      borderRadius:10,
      borderColor:'#333333',
      borderWidth:2,
      margin:5,
    }
  });
export default MainScreen;