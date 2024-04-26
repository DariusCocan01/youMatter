import React from 'react';
import { TextInput, View, StyleSheet,Platform } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
function AppTextInput({icon, ...otherProps}) {
    return (
        <View style={styles.container}>
            {icon &&< MaterialCommunityIcons name={icon} size={20} style={styles.icon}/>}
            <TextInput style = {styles.textInput}{...otherProps}/>
        </View>
    );
}
const styles = StyleSheet.create({
    container : {
        flexDirection: 'row',
        borderRadius: 10,
        width: '95%',
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#e6E7e8',

    },
    textInput: {
        fontSize: 18,
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
        borderBottomColor : 'black',

    },
    icon: {
        marginRight: 10,
        paddingTop:5,

    }
})
export default AppTextInput;