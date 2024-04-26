import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
function AppButton({title, onPress, icon,...otherProps}) {
    return (
        <TouchableOpacity style= {styles.container} onPress={onPress}{...otherProps}>
            {icon &&< MaterialCommunityIcons name={icon} size={20} style={styles.icon}/>}
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '40%',
        backgroundColor: '#5adbb5',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    text:{
        textTransform:'uppercase',
        padding:10,
        fontWeight: 'bold',
        color:'#fff',
    },
    icon: {
        marginRight: 10,
        paddingTop:10,
        paddingLeft:15,

    }
})  
export default AppButton;