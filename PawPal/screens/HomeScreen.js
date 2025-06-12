import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ImageBackground, ActivityIndicator, Platform
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const baseURL = Platform.OS === 'web' ? 'http://localhost' : 'http://10.0.0.44';
  const url = isRegistering
    ? `${baseURL}/PawPal/register_user.php`
    : `${baseURL}/PawPal/login.php`;

  const handleAuth = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Username and password are required');
      return;
    }

    setIsLoading(true);

    try {
      const payload = isRegistering
        ? { username, password, name: fullName }
        : { username, password };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      setIsLoading(false);

      if (result.success) {
        if (isRegistering) {
          Alert.alert('Success', 'Account created! Please log in.');
          setIsRegistering(false);
          setFullName('');
        } else {
          navigation.replace('UserProfile', {
            username: result.user?.username || username,
            user: result.user || {},
          });
        }
      } else {
        Alert.alert('Error', result.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setIsLoading(false);
      Alert.alert('Error', 'Could not connect to server');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background1.jpeg')}
      style={styles.background}
      imageStyle={{ opacity: 0.9 }}
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>Welcome to PawPal</Text>
        <Text style={styles.tagline}>Your Pet’s Loyal Companion ❤️</Text>

        {isRegistering && (
          <TextInput
            style={styles.input}
            placeholder="Full Name (optional)"
            value={fullName}
            onChangeText={setFullName}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {isLoading ? (
          <ActivityIndicator size="large" color="#7b4b3a" style={{ marginTop: 10 }} />
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={handleAuth}>
              <Text style={styles.buttonText}>
                {isRegistering ? '📝 Create Profile' : '🔐 Login'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsRegistering(!isRegistering)}
              style={styles.switch}
            >
              <Text style={styles.switchText}>
                {isRegistering ? 'Already have an account? Login' : 'No account? Create one'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7b4b3a',
    marginBottom: 8,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: '#9e6b5c',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 14,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#7b4b3a',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  switch: {
    marginTop: 15,
  },
  switchText: {
    color: '#7b4b3a',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
