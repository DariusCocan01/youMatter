
import { TextInput, View, StyleSheet,Platform ,Text, TouchableWithoutFeedback, Modal, Button, FlatList} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AppTextInput from './AppTextInput';
import React, { useState, useEffect } from 'react';
import AppPickerItem from './AppPickerItem';
function AppPicker({icon,placeholder, items,onSelectItem, selectedItem, ...otherProps}) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
    <React.Fragment>
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
            {icon &&< MaterialCommunityIcons name={icon} size={20} style={styles.icon}/>}
            <Text style = {styles.textInput}{...otherProps}>{selectedItem ? selectedItem.label:placeholder}</Text>
            < MaterialCommunityIcons name="chevron-down" size={20} style={styles.icon}/>   
        </View>
        </TouchableWithoutFeedback>
    <Modal visible = {modalVisible} animationType='slide'>
        <FlatList 
            data={items} 
            keyExtractor={item =>item.value.toString()} 
            renderItem={({item})=><AppPickerItem 
            label={item.label} 
            onPress={()=>{
                setModalVisible(false);
                onSelectItem(item);
            }}/>}>
        </FlatList>
    </Modal>   
    </React.Fragment>
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
        flex: 1,

    },
    icon: {
        
        paddingTop: 5,
    },
    picker:{
        flex: 1,

    },
})
export default AppPicker;