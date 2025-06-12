import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, StyleSheet,
  TouchableOpacity, Alert, ScrollView
} from 'react-native';

const getPetEmoji = (type) => {
  const lower = type.toLowerCase();
  if (lower.includes('dog')) return '🐶';
  if (lower.includes('cat')) return '🐱';
  if (lower.includes('bird')) return '🐦';
  if (lower.includes('rabbit')) return '🐰';
  if (lower.includes('hamster')) return '🐹';
  if (lower.includes('fish')) return '🐠';
  if (lower.includes('horse')) return '🐴';
  if (lower.includes('turtle')) return '🐢';
  if (lower.includes('snake')) return '🐍';
  return '🐾';
};

export default function PetDetailScreen({ route, navigation }) {
  const { pet } = route.params;
  const [records, setRecords] = useState([]);
  const emoji = getPetEmoji(pet.type);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetch(`http://10.0.0.44/PawPal/get_pet_records.php?pet_id=${pet.id}`)
        .then(res => res.json())
        .then(json => {
          if (json.success && Array.isArray(json.records)) {
            setRecords(json.records);
          } else {
            console.warn("Unexpected response:", json);
          }
        })
        .catch(err => console.error('Error fetching records:', err));
    });

    return unsubscribe;
  }, [navigation, pet.id]);

  const handleDelete = () => {
    Alert.alert('Delete Pet', 'Are you sure you want to delete this pet?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: async () => {
          try {
            await fetch('http://10.0.0.44/PawPal/delete_pet.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: pet.id })
            });
            navigation.goBack();
          } catch (err) {
            console.error('Delete error:', err);
          }
        }
      }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageBox}>
        {pet.image_uri ? (
          <Image source={{ uri: pet.image_uri }} style={styles.image} />
        ) : (
          <Text style={styles.emoji}>{emoji}</Text>
        )}
      </View>

      <View style={styles.detailsBox}>
        <Text style={styles.detailText}>📝 Name: {pet.name}</Text>
        <Text style={styles.detailText}>🐾 Type: {pet.type}</Text>
        <Text style={styles.detailText}>🎂 Age: {pet.age}</Text>
        {pet.microchip ? (
          <Text style={styles.detailText}>🔖 Microchip: {pet.microchip}</Text>
        ) : null}
        {pet.implant_date ? (
          <Text style={styles.detailText}>📅 Implant Date: {pet.implant_date}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.addRecordButton}
          onPress={() => navigation.navigate('AddMedicalRecord', { pet })}
        >
          <Text style={styles.addRecordText}>➕ Add Medical Reminders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditPetScreen', { pet })}
        >
          <Text style={styles.editText}>✏️ Edit Pet Details</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.medicalBox}>
        <Text style={styles.sectionHeader}>📋 Medical Reminders:</Text>
        {records.length > 0 ? (
          records.map((record, index) => (
            <View key={index} style={styles.medicalRecord}>
              <Text style={styles.medicalText}>💊 {record.type}: {record.description}</Text>
              {record.frequency && (
                <Text style={styles.medicalText}>🔁 Frequency: {record.frequency}</Text>
              )}
              <Text style={styles.medicalText}>📆 Date: {record.date}</Text>
            </View>
          ))
        ) : (
          <Text style={{ fontStyle: 'italic', color: '#777' }}>
            No medical records found.
          </Text>
        )}
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>❌ Delete Pet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fffaf5',
    flex: 1,
  },
  imageBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#7b4b3a',
  },
  emoji: {
    fontSize: 60,
  },
  detailsBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#5a3c30',
  },
  addRecordButton: {
    backgroundColor: '#7b4b3a',
    marginTop: 10,
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  addRecordText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#e8b04f',
    marginTop: 10,
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  editText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  medicalBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#7b4b3a',
  },
  medicalRecord: {
    marginBottom: 10,
  },
  medicalText: {
    fontSize: 15,
    color: '#5a3c30',
  },
  deleteButton: {
    backgroundColor: '#b53a3a',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
