import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ScrollView
} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export default function AddMedicalRecordScreen({ route, navigation }) {
  const { pet } = route.params;
  const [recordType, setRecordType] = useState('');
  const [description, setDescription] = useState('');
  const [treatmentDate, setTreatmentDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [frequency, setFrequency] = useState('');

  const isValidDate = (dateStr) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) return false;
    return !isNaN(Date.parse(dateStr));
  };

  const scheduleNotification = async (title, body, triggerDate) => {
    if (!Device.isDevice || !Notifications.scheduleNotificationAsync) return;

    const trigger = new Date(triggerDate);
    if (trigger > new Date()) {
      try {
        await Notifications.scheduleNotificationAsync({
          content: { title, body },
          trigger,
        });
      } catch (err) {
        console.warn('Notification failed:', err);
      }
    }
  };

  const handleSave = async () => {
    if (!recordType || !description || !dueDate) {
      Alert.alert('Missing Info', 'Please fill in Type, Description, and Due Date.');
      return;
    }

    if (!isValidDate(dueDate)) {
      console.warn('Invalid due date format:', dueDate);
      Alert.alert('Invalid Due Date', 'Please enter the due date in YYYY-MM-DD format.');
      return;
    }

    if (treatmentDate && !isValidDate(treatmentDate)) {
      console.warn('Invalid treatment date format:', treatmentDate);
      Alert.alert('Invalid Treatment Date', 'Please enter the treatment date in YYYY-MM-DD format.');
      return;
    }

    try {
      const response = await fetch('http://10.0.0.44/PawPal/add_medical_record.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pet_id: pet.id,
          type: recordType,
          description,
          frequency,
          date: treatmentDate || dueDate
        }),
      });

      const result = await response.json();
      console.log('API result:', result);

      if (result.success) {
        await scheduleNotification(
          `${recordType} Reminder for ${pet.name}`,
          `Due on ${dueDate}: ${description}`,
          dueDate
        );

        Alert.alert('Success', 'Medical reminder added!', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert('Error', result.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error('API error:', err);
      Alert.alert('Error', 'Could not connect to server.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add Medical Reminder for {pet.name}</Text>

      <Text style={styles.label}>Type (Vaccination or Treatment or Insurance)</Text>
      <TextInput
        style={styles.input}
        value={recordType}
        onChangeText={setRecordType}
        placeholder="e.g., Vaccination"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="e.g., Rabies shot"
      />

      <Text style={styles.label}>Last Treatment Date (Optional)</Text>
      <TextInput
        style={styles.input}
        value={treatmentDate}
        onChangeText={setTreatmentDate}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Next Due Date</Text>
      <TextInput
        style={styles.input}
        value={dueDate}
        onChangeText={setDueDate}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Frequency (e.g., Every 6 months)</Text>
      <TextInput
        style={styles.input}
        value={frequency}
        onChangeText={setFrequency}
        placeholder="Optional"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>💾 Save Record</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fffaf5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7b4b3a',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#5a3c30',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
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
