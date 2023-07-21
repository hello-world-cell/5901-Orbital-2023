import React from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
import { setSelectedUsers } from '../redux/actions';



function CreateStudyGroup() {
    const friendList = useSelector((state) => state.friendList.friendList);
    //const [selectedFriends, setSelectedFriends] = useState([]);
    const selectedUsers = useSelector((state) => state.selectedUsers.selectedUsers);
    const navigation = useNavigation();
    const dispatch = useDispatch();



    const handleCreateGroup = () => {
      navigation.navigate('studygroupdetails');
    };


    const handleFriendSelection = (friend) => {
        if (selectedUsers.includes(friend)) {
          dispatch(setSelectedUsers(selectedUsers.filter((selected) => selected !== friend)));
        } else {
          if (selectedUsers.length < 5) {
            dispatch(setSelectedUsers([...selectedUsers, friend]));
          }
        }
      };


      const handleCreateStudyGroup = () => {
        const selectedFriendUsernames = selectedUsers.map((friend) => friend.username);

      }

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <Text style={styles.title}>Friend List</Text>
      <Text style={styles.instruction}>Select users to add to your new study group</Text>


      <ScrollView style={styles.friendListContainer}>
              {friendList?.map((friend, index) => (
                <TouchableOpacity key={index} style={styles.friendListItemContainer} onPress={() => handleFriendSelection(friend)}>
                <Text key={index} style={styles.friendListItem}>
                  {friend}
                </Text>
                <View style={styles.checkboxContainer}>
                {selectedUsers.includes(friend) && <View style={styles.checkbox} />}
                </View>
            </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.createButton} disabled={selectedUsers.length === 0} onPress={handleCreateGroup}
>
          <Text style={styles.createButtonText}>Create Study Group</Text>
        </TouchableOpacity>
    
    </View>

    </SafeAreaView>
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
      textAlign: 'center',
      marginBottom: 10,
    },
    instruction: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },
    friendItem: {
      fontSize: 18,
      marginBottom: 8,
    },
    friendListContainer: {
      height: 300,
      borderWidth: 1,
      borderColor: '#C8C8C8',
      paddingHorizontal: 10,
    },
    friendListItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 5,
    },
    friendListItem: {
      fontSize: 16,
    },
    checkboxContainer: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkbox: {
      width: 10,
      height: 10,
      backgroundColor: '#000',
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
  });

export default CreateStudyGroup;
