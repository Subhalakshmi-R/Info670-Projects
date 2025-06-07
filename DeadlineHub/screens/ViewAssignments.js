import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function ViewAssignments({ navigation }) {
  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = () => {
    fetch('http://10.0.0.44/Assignment4/getAssignment.php')
      .then(res => res.json())
      .then(data => {
        const sorted = data
          .filter(item => item.due_date)
          .sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
        setAssignments(sorted);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const getDayDiff = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    return Math.floor((due - today) / (1000 * 60 * 60 * 24));
  };

  const getCardStyle = (diffDays) => {
    if (isNaN(diffDays)) return styles.card;
    if (diffDays < 0) return styles.cardRed;
    if (diffDays <= 2) return styles.cardYellow;
    return styles.card;
  };

  const renderItem = ({ item }) => {
    const diffDays = getDayDiff(item.due_date);
    let label = '';
    let labelStyle = {};

    if (diffDays < 0) {
      label = 'OVERDUE';
      labelStyle = styles.labelRed;
    } else if (diffDays === 0) {
      labelStyle = styles.labelRed;
    } else if (diffDays === 1) {
      labelStyle = styles.labelYellow;
    } else if (diffDays === 2) {
      labelStyle = styles.labelYellow;
    }

    return (
      <View style={getCardStyle(diffDays)}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.course}>{item.course}</Text>
        <Text style={styles.dueDate}>Due: {item.due_date}</Text>
        {label !== '' && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        <Text style={styles.notes}>{item.notes}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Assignments</Text>
      <FlatList
        data={assignments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListFooterComponent={
          <>
            <TouchableOpacity style={styles.button} onPress={fetchAssignments}>
              <Text style={styles.buttonText}>Refresh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add')}>
              <Text style={styles.buttonText}>Back to Add</Text>
            </TouchableOpacity>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardRed: {
    backgroundColor: '#ffe5e5',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#cc0000',
  },
  cardYellow: {
    backgroundColor: '#fff9db',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#e6b800',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  course: {
    fontSize: 16,
    color: '#444',
  },
  dueDate: {
    marginTop: 4,
    fontSize: 14,
    color: '#888',
  },
  label: {
    marginTop: 4,
    fontWeight: 'bold',
    fontSize: 14,
  },
  labelRed: {
    color: '#cc0000',
  },
  labelYellow: {
    color: '#e6b800',
  },
  notes: {
    marginTop: 6,
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
