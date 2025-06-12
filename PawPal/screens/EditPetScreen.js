import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView
} from 'react-native';

export default function EditPetScreen({ route, navigation }) {
  const { pet } = route.params;

  const [age, setAge] = useState(pet.age?.toString() ?? '');
  const [microchip, setMicrochip] = useState(pet.microchip ?? '');
  const [implantDate, setImplantDate] = useState(pet.implant_date ?? '');

  const handleUpdate = async () => {
    if (!age && !microchip && !implantDate) {
      Alert.alert('Nothing to update');
      return;
    }

    try {
      // Update pet in database
      const response = await fetch('http://10.0.0.44/PawPal/update_pet.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: pet.id,
          age: age || null,
          microchip: microchip || null,
          implant_date: implantDate || null
        })
      });

      const result = await response.json();

      if (result.success) {
        // Fetch the updated pet details
        const petResponse = await fetch(`http://10.0.0.44/PawPal/get_pet_detail.php?id=${pet.id}`);
        const petData = await petResponse.json();

        if (petData.success && petData.pet) {
          Alert.alert('Pet details updated');
          navigation.navigate('PetDetail', { pet: petData.pet });
        } else {
          Alert.alert('Updated, but failed to reload pet details');
          navigation.goBack();
        }
      } else {
        Alert.alert('Update failed', result.message || '');
      }
    } catch (err) {
      console.error('Update error:', err);
      Alert.alert('Server error', err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit Pet Details</Text>

      <Text style={styles.label}>Pet Name</Text>
      <Text style={styles.disabledText}>{pet.name}</Text>

      <Text style={styles.label}>Pet Type</Text>
      <Text style={styles.disabledText}>{pet.type}</Text>

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Enter age"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Microchip Number</Text>
      <TextInput
        style={styles.input}
        value={microchip}
        onChangeText={setMicrochip}
        placeholder="Enter microchip ID"
      />

      <Text style={styles.label}>Implant Date</Text>
      <TextInput
        style={styles.input}
        value={implantDate}
        onChangeText={setImplantDate}
        placeholder="YYYY-MM-DD"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>💾 Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fffaf5',
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#7b4b3a',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#5a3c30',
  },
  disabledText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#7b4b3a',
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
