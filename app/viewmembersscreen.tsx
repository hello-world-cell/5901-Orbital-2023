// StudyGroupMembersScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
//import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { listStudyGroups } from '../src/graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';


function StudyGroupMembersScreen() {
    const [members, setMembers] = useState([]);
    const route = useRoute();
    const { id } = route.params;  

    useEffect(() => {
        fetchStudyGroupMembers(id);
      }, [id]);
    
      const fetchStudyGroupMembers = async (id) => {
        try {
          const response = await API.graphql(
            graphqlOperation(listStudyGroups, {
              filter: { id: { eq: id } },
            })
          );
          console.log('Study Group Data:', response.data.listStudyGroups.items);
    
          if (response.data.listStudyGroups.items.length > 0) {
            const studyGroup = response.data.listStudyGroups.items[0];
            setMembers(studyGroup.members);
          }
        } catch (error) {
          console.log('Error fetching study group members:', error);
        }
      };
    

    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Study Group Members</Text>
      {members.map((username, index) => (
        <Text key={index} style={styles.memberUsername}>
          {username}
        </Text>
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
  memberUsername: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default StudyGroupMembersScreen;
