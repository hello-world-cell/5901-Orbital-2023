import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUsers } from '../redux/actions';
import { API, graphqlOperation } from 'aws-amplify';
import { createStudyGroup } from '../src/graphql/mutations';
import { useNavigation } from 'expo-router';





function StudyGroupCreateForm() {
  const [groupName, setGroupName] = useState('');
  const [groupIcon, setGroupIcon] = useState('');

  const dispatch = useDispatch();
  const selectedUsers = useSelector((state) => state.selectedUsers.selectedUsers);

  const navigation = useNavigation();

  const handleViewGroups = () => {
    navigation.navigate('viewStudyGroups');
  };


  const handleCreateStudyGroup = async () => {
    try {
      const input = {
        name: groupName,
        icon: groupIcon,
        members: selectedUsers.map((user) => user.username),
        // Assuming you have a userID associated with the creator of the study group
        userID: 'YOUR_USER_ID',
      };

      const response = await API.graphql(graphqlOperation(createStudyGroup, { input }));
      console.log('Study group created:', response.data.createStudyGroup);

      // Reset form fields and selected users
      setGroupName('');
      setGroupIcon('');
      dispatch(setSelectedUsers([]));

      // Show success message
      Alert.alert('Success', 'Study group created successfully!');
    } catch (error) {
      console.error('Error creating study group:', error);
      // Show error message
      Alert.alert('Error', 'Failed to create study group. Please try again.');
    }
  };
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleViewGroups}>
        <Text> View my Study Groups</Text>
      </TouchableOpacity>



      <Text style={styles.selectedUsersText}>Users selected so far:</Text>

      <View style={styles.selectedUsersContainer}>
        {selectedUsers?.map((user, index) => (
          <Text key={index} style={styles.selectedUser}>
            {user}
          </Text>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Study Group Name"
        value={groupName}
        onChangeText={setGroupName}
      />
      <TextInput
        style={styles.input}
        placeholder="Group Icon URL"
        value={groupIcon}
        onChangeText={setGroupIcon}
      />
      <TouchableOpacity style={styles.createButton} onPress={handleCreateStudyGroup}>
        <Text style={styles.createButtonText}>Create Study Group</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedUsersText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedUsersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedUser: {
    backgroundColor: '#007AFF',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    margin: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: '80%',
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default StudyGroupCreateForm;
