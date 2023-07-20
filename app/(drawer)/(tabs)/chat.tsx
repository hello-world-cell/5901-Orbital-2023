import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function Chat() {
  const chats = [
    { id: 1, title: 'Chat 1' },
    { id: 2, title: 'Chat 2' },
    { id: 3, title: 'Chat 3' },
  ];

  const handleCreateChat = () => {
    // Logic to handle creating a new chat
    console.log('Creating a new chat...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Screen</Text>
      {chats.map((chat) => (
        <TouchableOpacity key={chat.id} style={styles.chatItem}>
          <Text style={styles.chatTitle}>{chat.title}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.createChatButton} onPress={handleCreateChat}>
        <Text style={styles.createChatButtonText}>Create New Chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chatItem: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    width: '100%',
  },
  chatTitle: {
    fontSize: 16,
  },
  createChatButton: {
    marginTop: 16,
    backgroundColor: '#008080',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  createChatButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Chat;
