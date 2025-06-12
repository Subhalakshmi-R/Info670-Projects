import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  Image, StyleSheet, ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PetManagerScreen({ navigation }) {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadPets);
    return unsubscribe;
  }, [navigation]);

  const loadPets = async () => {
    try {
      const response = await fetch('http://10.0.0.44/PawPal/get_pets.php');
      const data = await response.json();

      if (data.success && Array.isArray(data.pets)) {
        setPets(data.pets);
      } else {
        setPets([]);
        console.warn('No pets found or bad response format:', data);
      }
    } catch (error) {
      console.error('Failed to fetch pets:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.petCard}
      onPress={() => navigation.navigate('PetDetail', { pet: item })}
    >
      {item.image_uri ? (
        <Image source={{ uri: item.image_uri }} style={styles.petImage} />
      ) : (
        <Text style={styles.petEmoji}>🐾</Text>
      )}
      <View>
        <Text style={styles.petName}>{item.name}</Text>
        <Text style={styles.petType}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../assets/bg2.jpg')}
      style={styles.container}
      imageStyle={styles.bgStyle}
    >
      <Text style={styles.headerText}>Add / View Pet Details</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddPet')}
      >
        <Ionicons name="add-circle" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add a Pet</Text>
      </TouchableOpacity>

      <FlatList
        data={pets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={{ width: '100%' }}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: '#7b4b3a', marginTop: 20 }}>
            No pets added yet.
          </Text>
        }
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 40 },
  bgStyle: { resizeMode: 'cover', opacity: 0.08 },
  addButton: {
    backgroundColor: '#7b4b3a',
    padding: 16,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 40,
    width: '100%',
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5a3c30',
    marginBottom: 10,
    alignSelf: 'center',
  },
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
    borderColor: '#caa58c',
    borderWidth: 1,
    marginVertical: 8,
    width: '100%',
    alignSelf: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  petImage: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  petEmoji: { fontSize: 36, marginRight: 10 },
  petName: { fontSize: 18, fontWeight: 'bold' },
  petType: { fontSize: 14, color: '#666' },
});
