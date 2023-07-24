import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CheckBox = ({ title, checked, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={[styles.checkbox, checked && styles.checkboxChecked]} />
    <Text style={styles.checkboxLabel}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4,
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#008080',
    borderColor: '#008080',
  },
  checkboxLabel: {
    fontSize: 16,
    color: 'black',
  },
});

export default CheckBox;
