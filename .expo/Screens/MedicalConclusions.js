import { StyleSheet, Text,TextInput, View, Platform, TouchableOpacity,ActivityIndicator, Alert } from 'react-native';
import AppTextInput from '../Components/AppTextInput';
import AppButton from '../Components/AppButton';
import { useEffect,useState } from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { OverlayView } from '../Components/AppOverlayScreen';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Linking } from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import {getFirestore, collection, query, getDoc,doc,addDoc,setDoc, getDocs,where} from "firebase/firestore";
import * as Location from 'expo-location';
import { getAuth } from "firebase/auth";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { StripeProvider } from "@stripe/stripe-react-native";

const API_URL = "http://10.0.2.2:3000";
const MedicalConclusions = ({ route,navigation }) => {
    const data = route.params;
    const medicalData = JSON.parse(data.medicalDataJSON);
    
    const name = data.name;
    const lastName = data.lastName;

    const [mainZone, setMainZone] = useState('');
    const [secZone, setSecZone] = useState('');
    const [painLevel, setPainLevel] = useState('');
    const [isInjured, setInjured] = useState('');
    const [pdfFilePath, setPdfFilePath] = useState('');
    const [text, setText] = useState('');
    const [showCallButton, setShowCallButton] = useState('');
    const [paymentView,setPaymentView] = useState(false);
    
    const handlePressRequestDoctorButton = () =>{
      setPaymentView(!paymentView);
    };
    const storeInformation = () => {
       setMainZone(medicalData.zone);
       if(medicalData.zone_2){
        setSecZone(medicalData.zone_2);
       }
       else{
        setSecZone(medicalData.zone_1);
       }
       switch (medicalData.painLevel) {
        case 'very_low':
          setPainLevel("Mild Discomfort");
          break;
        case 'low':
          setPainLevel("Minor Pain");
          break;
        case 'moderate':
          setPainLevel("Moderate Pain");
          break;
        case 'high':
          setPainLevel("Significant Pain");
          break;
        case 'very_high':
          setPainLevel("Severe Pain");
          break;
        default:
          break;
      }
      if(medicalData.isInjured ==="yes"){
        setInjured("has");

      }else{
        setInjured("has not");
      }
    };
    useEffect(() => {
      storeInformation();
    }, [medicalData]);
    

    const constructScreen = async() =>{
      await storeInformation();
      if(painLevel ==="Severe Pain" || painLevel ==="Significant Pain"){
        setText(`Since you have a ${painLevel}, I highly recommend you go to the hospital. If you press the button below, it will generate a PDF file to ease your sorting at the hospital.`);
        return;
      }else{
        setText(`Since you have a ${painLevel}, you can request a home visit from a doctor or you can go to the hospital. If you choose the hospital you can generate a PDF file to ease your sorting at the hospital.`);
        setShowCallButton(true);
        console.log("Am ajuns");
      }
    };
    useEffect(() => {
      constructScreen();
    }, [painLevel]);
    const handleGenerateAndDownloadPDF = async () => {
      const pdfUri = await generatePDF();
      if (pdfUri) {
        try {
          await Sharing.shareAsync(pdfUri);
        } catch (error) {
          console.error('Error sharing PDF: ', error);
        }
      }
    };
    
    const generatePDF = async () => {
      const htmlContent =`<h1>${name} ${lastName}</h1><p>The patient is experiencing ${painLevel} pain in the ${mainZone} area, particularly in the ${secZone}.</p>
      <p>The patient ${isInjured} had an accident recently.</p>`;
    
      try {
        const { uri } = await Print.printToFileAsync({ html: htmlContent });
        return uri;
      } catch (error) {
        console.error('Error generating PDF: ', error);
        return null;
      }
    };
    const verifyData = () => {
        

    };

    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
    
      let location = await Location.getCurrentPositionAsync({});
      return location;
    };
    const requestDoctor = async() =>{
      const auth = getAuth();
      const id = auth.currentUser.uid;
      const location = await getLocation();
      if(location){
        const database = getFirestore();
        const ref = collection(database,"requests");
        try {
          let user = {ID:id, name: name, lastName: lastName, longitude: location.coords.longitude,latitude:location.coords.latitude, mainZone:mainZone, secZone:secZone,painLevel:painLevel,isInjured:isInjured };
          await addDoc(ref, user);
          console.log("Utilizator adăugat cu succes!");
          navigation.navigate('MainScreen',{id});
      } catch (error) {
          alert(error);
      }
      }
    };
    const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    try {
      const response = await fetch(`${API_URL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        return { clientSecret: data.clientSecret, error: null };
      } else {
        console.error("Server responded with an error:", data);
        return { clientSecret: null, error: data };
      }
    } catch (error) {
      console.error("Network request failed:", error);
      return { clientSecret: null, error };
    }
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          paymentMethodType: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          requestDoctor();
          alert("Payment Successful");
          console.log("Payment successful ", paymentIntent);
          
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };
    return (
    <View style={styles.container}>
      <Text style = {styles.textTitle}>Conclusions</Text>  
      <Text style={styles.text}>{text}</Text>
      <AppButton onPress={handleGenerateAndDownloadPDF} title="generate pdf"/>
      {!(painLevel ==="Severe Pain" || painLevel ==="Significant Pain") &&<AppButton onPress={handlePressRequestDoctorButton} title="Request doctor"/>}
      {paymentView == true &&
        <View style={styles.fullScreenOverlay}>
          <TouchableOpacity style={styles.closeButton} onPress={handlePressRequestDoctorButton}>
            <MaterialCommunityIcons name="close" size={24} color="black" />
        </TouchableOpacity>
          <Text style={styles.textCharge}>You will be charged 500 RON for the medical request.</Text>
          <StripeProvider publishableKey="pk_test_51P68wy1tDqxMM27lIviRoVTwoO1AQRuzmqcx89PM7B72Iibty2gkHCqkGkgbQ7P9M1cAIFAugTooK5nvzCIo7Vf200wjUFoORY">
          <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={value => setEmail(value.nativeEvent.text)}
        style={styles.input}
      />
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
          cvc: "CVC", 
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />
    </StripeProvider>
          <AppButton onPress={handlePayPress} title="pay"/>
        </View>
      }
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
    closeButton: {
      position: 'absolute',
      top: 40,
      right: 16,
      zIndex: 10,
    },
    text:{
      fontSize: 20,
      fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
      padding:10,
    },
    textTitle:{
      fontSize: 30,
      fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
      textAlign:'center',
      alignSelf:'center',
      paddingBottom:10,
    },
    fullScreenCentered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    fullScreenOverlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
  },
  input: {
    backgroundColor: "#efefefef",
    width:'100%',

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 10,
    paddingHorizontal:10,
    paddingVertical:20,
    width:'100%',
  },
  textCharge:{
    fontSize:18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    paddingBottom:20,

  }
  });
export default MedicalConclusions;