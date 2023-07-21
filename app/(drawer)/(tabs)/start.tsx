import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

function Start() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [todoList, setTodoList] = useState('');

  const handleStartSession = () => {
    setShowDropdown(true);
  };

  const handleSendInvites = () => {
    // Logic for sending study invites to selected study sessions
    // Implement your own logic here
    console.log('Sending study invites to selected study sessions:', todoList);

    // Reset the state values
    setTime('');
    setLocation('');
    setTodoList('');

    // Hide the dropdown
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start your own Study Session </Text>
      {!showDropdown && (
        <Button title="Start Study Session" onPress={handleStartSession} color="#008080" />
      )}
      {showDropdown && (
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Enter Study Session Details:</Text>
          <TextInput
            style={styles.input}
            placeholder="Time"
            value={time}
            onChangeText={setTime}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
          <TextInput
            style={styles.input}
            placeholder="To-Do List"
            value={todoList}
            onChangeText={setTodoList}
          />
          <Button title="Send Study Invites" onPress={handleSendInvites} color="#008080" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  dropdownContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
    paddingHorizontal: 8,
    color: 'black',
  },
});

export default Start;
