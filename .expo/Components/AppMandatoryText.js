import React from 'react';
import { StyleSheet, Text} from 'react-native';
function AppMandatoryText({txt}) {
    return (
        <Text style={styles.mandatoryText}>{txt}</Text>
    );
}
const styles = StyleSheet.create({
    mandatoryText:{
        
        alignSelf: 'flex-start',
        paddingLeft: 15,
        fontSize: 12,
        marginTop: -10,
        paddingBottom: 10,
      }
})
export default AppMandatoryText;