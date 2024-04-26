import { StyleSheet, Text, View,TouchableHighlight,  TouchableOpacity } from 'react-native';
import getFontFamily from '../Helpers/selectors';
import React, { useState, useEffect } from 'react';
import AuthScreen from './AuthScreen';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = ({ navigation }) => {
  const fullText = 'Welcome to youMatter';
  const [animatedText, setAnimatedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
        setAnimatedText((prevText) => {
            if (index === fullText.length) {
              clearInterval(intervalId);

              return prevText;
            }
    
            const nextChar = fullText[index];
            index++;
            return prevText + nextChar;
          });
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const goToOtherScreen = () => {
    navigation.navigate('AuthScreen');
  };
    return (

        <TouchableOpacity style = {styles.container} activeOpacity={1}onPress={goToOtherScreen}>
          <View style= {styles.container}>
          <Text style={styles.text}>{animatedText}</Text>
          </View>
        </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }, 
    text:{
      fontSize: 30,
      fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    },
    touchHigh: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
  });
export default WelcomeScreen;