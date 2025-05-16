import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Switch, Button, Text, RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [showCaptions, setShowCaptions] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [name, breedVal, genderVal, captions] = await Promise.all([
          AsyncStorage.getItem('dogName'),
          AsyncStorage.getItem('breed'),
          AsyncStorage.getItem('gender'),
          AsyncStorage.getItem('showCaptions'),
        ]);
        if (name) setDogName(name);
        if (breedVal) setBreed(breedVal);
        if (genderVal) setGender(genderVal);
        if (captions !== null) setShowCaptions(captions === 'true');
      } catch (e) {
        console.log('Profile load error:', e);
      }
    };
    load();
  }, []);

  const saveProfile = async () => {
    if (!dogName.trim() || !breed.trim() || !gender) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      await AsyncStorage.multiSet([
        ['dogName', dogName],
        ['breed', breed],
        ['gender', gender],
        ['showCaptions', showCaptions.toString()],
      ]);
      Alert.alert('Success', 'Profile saved!');
    } catch (e) {
      Alert.alert('Save Failed', 'Unable to save profile.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile View</Text>
      <TextInput
        label="Name"
        value={dogName}
        onChangeText={setDogName}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Breed"
        value={breed}
        onChangeText={setBreed}
        style={styles.input}
        mode="outlined"
      />
      <Text style={styles.label}>Gender</Text>
      <RadioButton.Group onValueChange={setGender} value={gender}>
        <View style={styles.radioRow}>
          <RadioButton.Item label="Male" value="male" />
          <RadioButton.Item label="Female" value="female" />
        </View>
      </RadioButton.Group>

      <View style={styles.switchRow}>
        <Text>Show Captions</Text>
        <Switch value={showCaptions} onValueChange={setShowCaptions} />
      </View>

      <Button mode="contained" onPress={saveProfile}>
        Save Profile
      </Button>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 16,
  },
  label: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioRow: {
    marginBottom: 12,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  heading: {
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 24,
  color: '#333',
  },
});
