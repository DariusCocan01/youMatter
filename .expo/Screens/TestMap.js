import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from 'expo-location';
import { requestForegroundPermissionsAsync } from 'expo-location';
import haversine from "haversine";
import AppButton from "../Components/AppButton";
import {getFirestore, collection, query, getDoc,doc,addDoc,setDoc, getDocs,where, deleteDoc} from "firebase/firestore";
class TestMap extends React.Component {
    constructor(props) {
      super(props);
      const destinationLatitude = this.props.route.params?.destinationLatitude;
      const destinationLongitude = this.props.route.params?.destinationLongitude;
      const navigation = this.props.route.params?.navigation;
      const usrId = this.props.route.params?.id;
      
      this.state = {
        latitude: null,
        longitude: null,
        routeCoordinates: [],
        distanceTravelled: 0,
        prevLatLng: {},
        destination: { latitude: destinationLatitude, longitude: destinationLongitude },
        navigation: navigation,
        id:usrId,
      };
    }
    
    onPressButton = async () => {
      const db = getFirestore();
      const collectionName = "CurrentWork";
      const { latitude: targetLatitude, longitude: targetLongitude } = this.state.destination; // Extrage valorile corect
    
      if (!targetLatitude || !targetLongitude) {
        console.error("Latitudinea sau longitudinea sunt undefined.");
        return;
      }
    
      try {
        const q = query(collection(db, collectionName), where("latitude", "==", targetLatitude), where("longitude", "==", targetLongitude));
        
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          console.log("Nu s-au găsit documente cu latitudinea și longitudinea specificate.");
          return;
        }
        
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
          console.log(`Documentul cu ID-ul ${doc.id} a fost șters cu succes.`);
        });
        this.props.navigation.navigate('MainScreen',{ id: this.state.id });
      } catch (error) {
        console.error("A apărut o eroare la ștergerea documentelor:", error);
      }
    };
    
    async componentDidMount() {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        prevLatLng: location.coords,
      });

      this.watchID = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        this.updateLocation
      );
    }

    componentWillUnmount() {
      if (this.watchID) {
        this.watchID.remove();
      }
    }

    updateLocation = (location) => {
      const { routeCoordinates, distanceTravelled, prevLatLng, destination } = this.state;
      const { latitude, longitude } = location.coords;
      const newCoordinate = { latitude, longitude };

      let newRouteCoordinates = routeCoordinates.concat([newCoordinate]);
      if (newRouteCoordinates.length === 1) { // Dacă este prima actualizare, adaugă și destinația la ruta
        newRouteCoordinates.push(destination);
      }

      this.setState({
        latitude,
        longitude,
        routeCoordinates: newRouteCoordinates,
        distanceTravelled: haversine(prevLatLng, destination, {unit: 'meter'}) / 1000, // Convertirea în kilometri
        prevLatLng: newCoordinate,
      });
    };

    getMapRegion = () => ({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    render() {
      const { latitude, longitude, routeCoordinates, distanceTravelled, destination } = this.state;

      if (latitude === null || longitude === null) {
        return <View style={styles.container}><Text>Location is loading...</Text></View>;
      }

      return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            followUserLocation={true}
            loadingEnabled={true}
            region={this.getMapRegion()}
          >
            <Marker coordinate={destination} />
            <Polyline coordinates={routeCoordinates} strokeWidth={5} />
          </MapView>
          <AppButton title="DONE" style={styles.buttonContainer} onPress={this.onPressButton}/>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 25 : 0, // Pentru a evita intrarea în bara de statut pe Android
  },
  map: {
    width: '100%',
    height: '80%' // Harta va ocupa 90% din înălțimea containerului
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonContainer: {
    width: '100%', // Asigură-te că butonul este pe toată lățimea ecranului
    height: '10%', // Butonul și spațiul său ocupă restul de 10%
    justifyContent: 'center',
    alignItems: 'center', // Centrarea butonului în containerul său
    backgroundColor: '#0000ff'
  },
});


export default TestMap;
