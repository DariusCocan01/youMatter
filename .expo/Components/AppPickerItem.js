import React from 'react';
import { TouchableOpacity , Text, StyleSheet, SafeAreaView} from 'react-native';

function AppPickerItem({label, onPress}) {
    return (
        <SafeAreaView>
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
        </SafeAreaView>
    );

}
const styles = StyleSheet.create({
    text:{
        fontSize: 20,
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
        padding: 20,
      },
})
export default AppPickerItem;