import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ImageBackground
} from 'react-native';
import { CommonActions } from '@react-navigation/native';

export default function UserProfileScreen({ navigation, route }) {
  const username = route?.params?.username ?? 'Guest';

  const handleNavigate = (screen, params = {}) =>
    navigation.navigate(screen, params);

  return (
    <ImageBackground
      source={require('../assets/bg2.jpg')}
      style={styles.container}
      imageStyle={styles.bgStyle}
    >
      <View style={styles.content}>
        <Text style={styles.username}>Welcome, {username}!</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleNavigate('OwnerProfileScreen', { username })}
        >
          <ImageBackground
            source={require('../assets/user_bg.jpg')}
            style={styles.imageBackground}
            imageStyle={styles.cardImageStyle}
          >
            <Text style={styles.text}>My Profile</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleNavigate('PetManager')}
        >
          <ImageBackground
            source={require('../assets/pets_bg.png')}
            style={styles.imageBackground}
            imageStyle={styles.cardImageStyle}
          >
            <Text style={styles.text}>My Pets</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleNavigate('Reminders')}
        >
          <ImageBackground
            source={require('../assets/reminder_bg.jpg')}
            style={styles.imageBackground}
            imageStyle={styles.cardImageStyle}
          >
            <Text style={styles.text}>Reminders</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          );
        }}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  bgStyle: {
    resizeMode: 'cover',
    opacity: 0.1,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
    paddingTop: 1,
  },
  username: {
    fontSize: 19,
    color: '#7b4b3a',
    fontWeight: '600',
    marginBottom: 10,
  },
  card: {
    width: '90%',
    height: 160,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#7b4b3a',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImageStyle: {
    resizeMode: 'cover',
    opacity: 0.4,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7b4b3a',
  },
  logoutButton: {
    marginBottom: 40,
    paddingTop:10,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#7b4b3a',
  },
  logoutText: {
    color: '#7b4b3a',
    fontSize: 16,
    fontWeight: '600',
  },
});
