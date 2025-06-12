import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert
} from 'react-native';
import moment from 'moment';

export default function ReminderScreen() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await fetch('http://10.0.0.44/PawPal/get_reminders.php');
      const json = await response.json();

      if (!json.success || !Array.isArray(json.reminders)) {
        console.warn('Unexpected data format:', json);
        setReminders([]);
        return;
      }

      const today = moment();

      const processed = json.reminders.map(item => {
        const due = moment(item.date, 'YYYY-MM-DD');
        let color = '#ccc';

        if (due.isBefore(today, 'day')) {
          color = '#ff6b6b'; // overdue
        } else if (due.diff(today, 'days') <= 3) {
          color = '#f4b400'; // due soon
        } else {
          color = '#ddd'; // upcoming
        }

        return {
          ...item,
          dueFormatted: due.format('MMM DD, YYYY'),
          color,
        };
      });

      processed.sort((a, b) => moment(a.date).diff(moment(b.date)));
      setReminders(processed);
    } catch (err) {
      console.error('Failed to fetch reminders:', err);
      setReminders([]);
    }
  };

  const markAsDone = async (id) => {
    try {
      const response = await fetch('http://10.0.0.44/PawPal/mark_reminder_done.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (result.success) {
        fetchReminders();
      } else {
        Alert.alert('Error', result.message || 'Could not mark reminder as done.');
      }
    } catch (err) {
      console.error('Mark as done failed:', err);
      Alert.alert('Error', 'Failed to update reminder.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📅 Upcoming Medical Reminders</Text>
      {reminders.map((r, index) => (
        <View key={index} style={[styles.card, { backgroundColor: r.color }]}>
          <Text style={styles.petName}>{r.pet_name} ({r.type})</Text>
          <Text style={styles.detail}>💊 {r.record_type}: {r.description}</Text>
          <Text style={styles.detail}>⏱ {r.frequency || 'One-time'}</Text>
          <Text style={styles.detail}>📆 {r.dueFormatted}</Text>
          <TouchableOpacity onPress={() => markAsDone(r.id)} style={styles.doneButton}>
            <Text style={styles.doneText}>✅ Mark as Done</Text>
          </TouchableOpacity>
        </View>
      ))}
      {reminders.length === 0 && (
        <Text style={{ padding: 20, fontStyle: 'italic', color: '#777' }}>
          No reminders found.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffaf5',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#7b4b3a',
    textAlign: 'center',
  },
  card: {
    padding: 14,
    borderRadius: 20,
    marginBottom: 10,
    elevation: 2,
  },
  petName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#5a3c30',
  },
  detail: {
    color: '#5a3c30',
    fontSize: 14,
    marginTop: 2,
  },
  doneButton: {
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#5a3c30',
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  doneText: {
    color: '#fff',
    fontWeight: '600',
  },
});
