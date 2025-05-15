import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GalleryScreen = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [showCaptions, setShowCaptions] = useState(true);

  const images = [
    {
      id: 1,
      title: 'This is how I look while sleeping 😴',
      image: require('../assets/pogo_sleeping.jpg'),
    },
    {
      id: 2,
      title: 'This is how I give puppy eyes 🥺',
      image: require('../assets/pogo_puppyeyes.jpg'),
    },
  ];

  useEffect(() => {
    const fetchSetting = async () => {
      const setting = await AsyncStorage.getItem('showCaptions');
      if (setting !== null) {
        setShowCaptions(setting === 'true');
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchSetting);
    return unsubscribe;
  }, [navigation]);

  const handlePress = (img) => {
    setSelectedId(img.id);
    navigation.navigate('PictureView', {
      image: img.image,
      caption: img.title, // Always pass full title
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hi, I am Pogo 🐶</Text>
      <Text style={styles.debug}>Captions: {showCaptions ? 'ON' : 'OFF'}</Text>

      {images.map((img) => (
        <TouchableOpacity key={img.id} onPress={() => handlePress(img)}>
          <Card
            style={[
              styles.card,
              selectedId === img.id && styles.selectedCard,
            ]}
          >
            {showCaptions && <Card.Title title={img.title} />}
            <Card.Cover source={img.image} />
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  debug: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  card: {
    width: 340,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  selectedCard: {
    backgroundColor: '#f0f0f0',
  },
});
