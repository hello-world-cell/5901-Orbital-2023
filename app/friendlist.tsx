import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Link } from 'expo-router';

export default function FriendListScreen() {
    
    return (
        <Text>Friend List:</Text>
       )
  
  
    }
const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    itemStyle: {
      padding: 10,
    },
    textInputStyle: {
      height: 40,
      borderWidth: 1,
      paddingLeft: 20,
      margin: 5,
      borderColor: '#009688',
      backgroundColor: '#FFFFFF',
    },
    toggleButton: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 10,
    },
    itemContainer: {
      backgroundColor: 'white',
    },
  
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
    },
  
  
    selectedButton: {
      backgroundColor: '#6E8B3D',
      color: 'white',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 3,
      fontWeight: 'bold',
      fontSize: 12,
    },
  
    unselectedButton: {
      backgroundColor: '#008080',
      color: 'white',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 3,
      fontWeight: 'bold',
      fontSize: 12,
  
    },
  
    addButton: {
      backgroundColor: '#008080',
      color: 'white',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      fontWeight: 'bold',
  
    },
  
    addButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
  
    },
    friendListTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginVertical: 10,
    },
  
    friendListContainer: {
      height: 100,
      borderWidth: 1,
      borderColor: '#C8C8C8',
      paddingHorizontal: 10,
    },
  
    friendListItem: {
      paddingVertical: 5,
    },
  
  });
  

