import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { listStudyGroups } from '../src/graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { deleteStudyGroup } from '../src/graphql/mutations';
import { useNavigation } from 'expo-router';
//import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function MyStudyGroups() {
    const [studyGroups, setStudyGroups] = useState([]);
    const navigation = useNavigation();

    const handleViewMembers = (id) => {
      navigation.navigate('viewmembersscreen', { id: id });
    };

    const handleViewInvites = () => {
      navigation.navigate('viewInvites');
    };


    


  
    useEffect(() => {
      // Fetch study groups when the component mounts
      fetchStudyGroups();
    }, []);
  
    const fetchStudyGroups = async () => {
      try {
        const response = await API.graphql(graphqlOperation(listStudyGroups));
        console.log('Study Groups Data:', response.data.listStudyGroups.items); // Temporary logging
        const studyGroupsData = response.data.listStudyGroups.items;
        setStudyGroups(studyGroupsData);
      } catch (error) {
        console.log('Error fetching study groups:', error);
      }
    };

    const handleDeleteStudyGroup = async (groupId) => {
        try {
    // Call the deleteStudyGroup mutation to delete the study group
    const response = await API.graphql(
      graphqlOperation(deleteStudyGroup, {
        input: { id: groupId },
      })
    );

    // Check if the response contains the deleted study group data
    if (response.data && response.data.deleteStudyGroup) {
      console.log('Study group deleted:', response.data.deleteStudyGroup);
      // After successful deletion, fetch study groups again to update the list
      await fetchStudyGroups();
    } else {
      console.log('Failed to delete study group:', groupId);
    }
  } catch (error) {
    console.log('Error deleting study group:', error);
  }
    };
  
    return (
     
      
      <ScrollView contentContainerStyle={styles.container}>
         <View>
        <TouchableOpacity onPress={() => handleViewInvites()} style={styles.inviteButton}>
          <Text> Invites: </Text>

        </TouchableOpacity>
      </View>


      <Text style={styles.title}>My Study Groups</Text>
     

      <View style={styles.studyGroupsContainer}>
        {studyGroups.map((group) => (
          <TouchableOpacity key={group.id} style={styles.studyGroup}  onPress={() => handleViewMembers(group.id)}>
            <Text style={styles.studyGroupName}>{group.name}</Text>
           
            {/* Delete Button */}
            <TouchableOpacity onPress={() => handleDeleteStudyGroup(group.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          // invites button 

          



        


        ))}
      </View>

      
    </ScrollView>

   
  );
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    studyGroupContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    studyGroupName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    studyGroupMembersLabel: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    studyGroupMemberUsername: {
      fontSize: 16,
    },
    deleteButton: {
      backgroundColor: '#367588',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    deleteButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
      justifyContent: 'flex-start',
    },
    studyGroupsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center', // adjust this to align the groups as per preference
    },
    studyGroup: {
      width: 200, // Adjust the width as needed
      height: 100, // Adjust the height as needed
      backgroundColor: '#f1f1f1', // Background color for the box
      borderRadius: 10, // Rounded corners for the box
      paddingHorizontal: 16,
      paddingVertical: 10,
      marginVertical: 10,
      justifyContent: 'center', // Adjust this to align the delete button vertically
    },
    inviteButton: {
      backgroundColor: 'pink',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      position: 'absolute',
      top: -50,
      right: -100,
    },
  });

  export default MyStudyGroups;
