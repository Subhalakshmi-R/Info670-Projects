import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  const [item, setItem] = useState('');
  const [list, setList] = useState([]);

  const handleAdd = () => {
    if (item.trim() === '') {
      Alert.alert('Empty input', 'Please enter an item.');
      return;
    }
    const newItem = {
      id: Date.now().toString(),
      name: item,
      completed: false,
    };
    setList([...list, newItem]);
    setItem('');
  };

  const toggleComplete = (id) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setList(updatedList);
  };

  const handleDelete = (id) => {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  };

  return (
    <View style={styles.container}>
      {/* 📝 */}
      <Text style={styles.title}>{'\uD83D\uDCDD'} Shopping List</Text>
      <Text style={styles.note}>Tap an item to check it off</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter item"
        value={item}
        onChangeText={setItem}
        onSubmitEditing={handleAdd}
        returnKeyType="done"
      />
      <Button title="Add Item" onPress={handleAdd} />
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity
              onPress={() => toggleComplete(item.id)}
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            >
              {/* ✔ or ● */}
              <Text style={[styles.symbol, item.completed && styles.symbolCompleted]}>
                {item.completed ? '\u2714' : '\u25CF'}
              </Text>
              <Text style={[styles.item, item.completed && styles.completed]}>
                {item.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              {/* 🚫 */}
              <Text style={styles.delete}>{'\uD83D\uDEAB'}</Text>
            </TouchableOpacity>
          </View>
        )}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  note: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  item: {
    fontSize: 18,
    padding: 5,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
    opacity: 0.7,
  },
  delete: {
    fontSize: 14,
    color: 'red',
    marginLeft: 10,
  },
  symbol: {
    fontSize: 18,
    color: '#555',
    marginRight: 8,
  },
  symbolCompleted: {
    fontSize: 14,
    color: 'green',
  },
});

export default App;
