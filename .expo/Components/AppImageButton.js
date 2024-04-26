import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

function AppImageButton({onPress, imageSrc, ...otherProps }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} {...otherProps}>
      
      {imageSrc && <Image source={imageSrc} style={styles.image} resizeMode="contain" />}
      
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '40%',
    backgroundColor: '#333333',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius:10,
    borderColor:'#333333',
  }
});

export default AppImageButton;