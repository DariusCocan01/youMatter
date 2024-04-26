// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../Screens/WelcomeScreen';
import AuthScreen from '../Screens/AuthScreen';
import MainScreen from '../Screens/MainScreen';
import RegistrationScreen from '../Screens/RegistrationScreen';
import ForgottenPassScreen from '../Screens/ForgotPassScreen';
import RegistrationScreen2 from '../Screens/RegistrationScreen2';
import Firestore from '../Screens/Firestore';
import MedicalSymptomps from '../Screens/MedicalSymptomps';
import MedicalConclusions from '../Screens/MedicalConclusions';
import TestMap from '../Screens/TestMap';
import WorkScreen from '../Screens/WorkScreen';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome"
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerBackTitleVisible: false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AuthScreen" component={AuthScreen} options={{
            headerLeft: null, 
            gestureEnabled: false,
            headerShown: false, 
          }}/>
          <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: true, headerTitle: '' }}/>
          <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: true , headerTitle: ''}}/>
          <Stack.Screen name="ForgottenPassScreen" component={ForgottenPassScreen} options={{ headerShown: true , headerTitle: ''}}/>
          <Stack.Screen name="RegistrationScreen2" component={RegistrationScreen2} options={{ headerShown: true , headerTitle: ''}}/>
          <Stack.Screen name="Firestore" component={Firestore} options={{ headerShown: true , headerTitle: ''}}/>
          <Stack.Screen name="MedicalSymptomps" component={MedicalSymptomps} options={{ headerShown: true , headerTitle: ''}}/>
          <Stack.Screen name="MedicalConclusions" component={MedicalConclusions} options={{ headerShown: true , headerTitle: ''}}/>
          <Stack.Screen name="TestMap" component={TestMap} options={{ headerShown: true , headerTitle: ''}}/>
          <Stack.Screen name="WorkScreen" component={WorkScreen} options={{ headerShown: true , headerTitle: ''}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
