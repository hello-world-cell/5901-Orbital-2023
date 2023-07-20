import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { listStudyGroups } from '../src/graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';


function MyStudyGroups() {
    const [studyGroups, setStudyGroups] = useState([]);
  
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
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>My Study Groups</Text>
  
        {studyGroups.map((group) => (
      <View key={group.id} style={styles.studyGroupContainer}>
        <Text style={styles.studyGroupName}>{group.name}</Text>
        <Text style={styles.studyGroupMembersLabel}>Members:</Text>
        {group.members.map((username, index) => (
          <Text key={`${group.id}-${index}`} style={styles.studyGroupMemberUsername}>
            {username}
          </Text>
        ))}
      </View>
    ))}
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
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    studyGroupContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
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
  });

  export default MyStudyGroups;
