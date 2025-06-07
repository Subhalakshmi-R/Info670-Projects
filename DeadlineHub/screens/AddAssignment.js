import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet
} from 'react-native';

export default function AddAssignment({ navigation }) {
  const [course, setCourse] = useState('');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');

  const submitAssignment = () => {
    const trimmedCourse = course.trim();
    const trimmedTitle = title.trim();
    const trimmedDueDate = dueDate.trim();
    const trimmedNotes = notes.trim();

    if (!trimmedCourse || !trimmedTitle || !trimmedDueDate) {
      let message = 'Please fill in the following required field(s):\n';
      if (!trimmedCourse) message += '• Course\n';
      if (!trimmedTitle) message += '• Assignment Title\n';
      if (!trimmedDueDate) message += '• Due Date';
      Alert.alert('Validation Error', message);
      return;
    }

    const url = 'http://10.0.0.44/Assignment4/addAssignment.php';
    const query = `course=${encodeURIComponent(trimmedCourse)}&title=${encodeURIComponent(trimmedTitle)}&due_date=${encodeURIComponent(trimmedDueDate)}&notes=${encodeURIComponent(trimmedNotes)}`;

    fetch(`${url}?${query}`)
      .then(res => res.text())
      .then(response => {
        Alert.alert('Assignment Added', response.trim());
        setCourse('');
        setTitle('');
        setDueDate('');
        setNotes('');
      })
      .catch(error => Alert.alert('Error', error.message));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.header}>Add Assignments Here</Text>

        <TextInput
          placeholder="Course"
          style={styles.input}
          value={course}
          onChangeText={setCourse}
        />
        <TextInput
          placeholder="Assignment Title"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Due Date (YYYY-MM-DD)"
          style={styles.input}
          value={dueDate}
          onChangeText={setDueDate}
        />
        <TextInput
          placeholder="Notes (optional)"
          style={styles.input}
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={submitAssignment}>
          <Text style={styles.buttonText}>Add Assignment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('View')}>
          <Text style={styles.buttonText}>Go to View</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f9fc'
  },
  inner: {
    padding: 20
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#0077cc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
});
