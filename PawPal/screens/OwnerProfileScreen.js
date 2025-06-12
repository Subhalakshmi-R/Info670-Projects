import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Platform
} from 'react-native';

export default function OwnerProfileScreen({ route }) {
  const { username } = route.params ?? {};
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success' or 'error'

  const baseURL = Platform.OS === 'web' ? 'http://localhost' : 'http://10.0.0.44';
  useEffect(() => {
    if (!username) return;

    fetch(`${baseURL}/PawPal/get_user.php?username=${encodeURIComponent(username)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user) {
          setName(data.user.name ?? '');
          setPhone(data.user.phone ?? '');
        } else {
          console.warn('User fetch failed:', data.message);
        }
      })
      .catch(err => console.error('Error fetching user:', err));
  }, [username]);

  const handleUpdate = async () => {
    if (!username || (!name && !phone && !password)) {
      setStatusMessage('Nothing to update');
      setStatusType('error');
      return;
    }

    try {
      const response = await fetch(`${baseURL}/PawPal/update_user.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          name: name || null,
          phone: phone || null,
          password: password || null
        }),
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        console.log("Server response:", result);

        if (result.success) {
          setStatusMessage('Profile updated successfully!');
          setStatusType('success');
          setPassword('');
        } else {
          setStatusMessage(result.message || 'Update failed');
          setStatusType('error');
        }
      } else {
        const raw = await response.text();
        console.error('Non-JSON response:', raw);
        setStatusMessage('Server error: invalid response');
        setStatusType('error');
      }
    } catch (err) {
      console.error('Update error:', err);
      setStatusMessage('Server error: ' + err.message);
      setStatusType('error');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Update Your Info</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        value={username}
        editable={false}
        selectTextOnFocus={false}
      />

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your full name"
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a new password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>💾 Update Info</Text>
      </TouchableOpacity>

      {statusMessage !== '' && (
        <Text style={[styles.statusMessage, statusType === 'success' ? styles.success : styles.error]}>
          {statusMessage}
        </Text>
      )}
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
    color: '#7b4b3a',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#5a3c30',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    padding: 12,
    marginBottom: 16,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#888',
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
  statusMessage: {
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  success: {
    color: 'green',
  },
  error: {
    color: 'red',
  },
});
