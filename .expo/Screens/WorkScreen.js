import { StyleSheet, Text, View, Platform, TouchableOpacity,ActivityIndicator } from 'react-native';
import AppTextInput from '../Components/AppTextInput';
import AppButton from '../Components/AppButton';
import AppFlatList from '../Components/AppFlatList';
import { useEffect,useState } from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { OverlayView } from '../Components/AppOverlayScreen';
import {getFirestore, collection, query, getDoc,doc,addDoc,setDoc, getDocs,where} from "firebase/firestore";
const WorkScreen = ({ route,navigation }) => {
  const [requests, setRequests] = useState([]);
  const [key, setKey] = useState(0);
  const refreshScreen = () => {
    fetchAllRequests();
};
  const fetchAllRequests = async () => {
    try {
      const database = getFirestore();
      const ref = collection(database, 'requests');
      
      const querySnapshot = await getDocs(ref);
      
      if (!querySnapshot.empty) {
        const fetchedRequests = [];
        querySnapshot.forEach((doc) => {
          fetchedRequests.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setRequests(fetchedRequests);
      } else {
        console.log("Niciun document găsit în colecția 'requests'!");
      }
    } catch (error) {
      console.error("Eroare la preluarea datelor din Firestore: ", error);
    }
  };
  useEffect(() => {
    fetchAllRequests();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Work`, 
      headerStyle: {
        backgroundColor: '#1A5D1A',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableOpacity onPress={() => refreshScreen()}>
          <MaterialCommunityIcons name="backup-restore" size={35} style={{ marginRight: 15, color:'white' }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const testData = () =>{
    console.log(requests);
  }
    return (
    <View style={styles.container}>
    <AppFlatList requests={requests} navigation={navigation}/>
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
      width:"100%",
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
  });
export default WorkScreen;