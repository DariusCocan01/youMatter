import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,ScrollView, Alert } from 'react-native';
import AppButton from './AppButton';
import * as ImagePicker from 'expo-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

function AppUploadButton({ description, selectedImagesToPick, onImageChange }) {
    const [selectedImages, setSelectedImages] = useState([]);

    const pickImage = async () => {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
  
        if (!result.cancelled) {
          setSelectedImages((prevImages) => [...prevImages, result.uri]);
          
        }
      } catch (error) {
        console.error('Error picking image:', error);
      }
    };
    const removeImage = (index) => {
        Alert.alert(
          'Remove Image',
          'Are you sure you want to remove this image?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Remove',
              onPress: () => {
                setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
              },
            },
          ],
          { cancelable: false }
        );
      };

  return (
    <View style={styles.uploadContainer}>
      <Text style={{ ...styles.text, padding: 15, fontSize: 15, fontWeight: 'bold' }}>{description}</Text>
      <TouchableOpacity onPress={pickImage}>
        <AppButton title="Upload" style={{ flexDirection: 'row', width: '45%', borderRadius: 20, backgroundColor: '#FF9800' }} icon="cloud-upload" onPress={pickImage} />
      </TouchableOpacity>
      <ScrollView horizontal>
        {selectedImages.map((image, index) => (
          <TouchableOpacity key={index} onLongPress={() => removeImage(index)}>
            <Image source={{ uri: image }} style={{ width: 100, height: 100, margin: 5, borderRadius:10 }} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  uploadContainer: {
    padding: 15,
    borderRadius: 20,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: 'black',
  },
  text: {
    fontSize: 20,
  },
});

export default AppUploadButton;
