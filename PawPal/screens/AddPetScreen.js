import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  ScrollView, Image, TouchableOpacity, Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AddPetScreen({ navigation }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [age, setAge] = useState('');
  const [microchip, setMicrochip] = useState('');
  const [implantDate, setImplantDate] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhotoWithCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!name || !type || !age) {
      Alert.alert('Missing Info', 'Please fill in pet name, type, and age.');
      return;
    }

    try {
      const response = await fetch('http://10.0.0.44/PawPal/add_pet.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          type,
          age,
          microchip,
          implant_date: implantDate,
          image_uri: imageUri
        }),
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert('Success', 'Pet added!');
        navigation.goBack();
      } else {
        Alert.alert('Error', result.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error('API error:', err);
      Alert.alert('Error', 'Could not connect to the server.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageBox}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={{ fontSize: 18 }}>📸 Add a Cute Photo</Text>
        )}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={takePhotoWithCamera}>
            <Text style={styles.buttonText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickImageFromGallery}>
            <Text style={styles.buttonText}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.label}>Pet Name</Text>
      <TextInput style={styles.input} onChangeText={setName} value={name} />

      <Text style={styles.label}>Type (e.g., Dog, Cat, Rabbit...)</Text>
      <TextInput style={styles.input} onChangeText={setType} value={type} />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAge}
        value={age}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Microchip Number (Optional)</Text>
      <TextInput style={styles.input} onChangeText={setMicrochip} value={microchip} />

      <Text style={styles.label}>Implant Date (YYYY-MM-DD, Optional)</Text>
      <TextInput style={styles.input} onChangeText={setImplantDate} value={implantDate} />

      <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
        <Text style={styles.buttonText}>💾 Save Pet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fffaf5',
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
    color: '#5a3c30',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 12,
    borderRadius: 30,
    fontSize: 16,
  },
  imageBox: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#7b4b3a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  saveButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
});
