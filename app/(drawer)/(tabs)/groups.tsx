import { API, Auth, graphqlOperation } from 'aws-amplify';
import { DataStore } from 'aws-amplify';
import { User } from '../../../src/models';
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
import { useNavigation } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CreateStudyGroup from '../../createstudygroup';
import { getUser, listUsers } from '../../../src/graphql/queries';
import { createFriendRequest } from '../../../src/graphql/mutations';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend, removeFriend } from '../../../redux/actions';
import { Button } from '@aws-amplify/ui-react-native/dist/primitives';

function Group() {
  
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [friendList, setFriendList] = useState([]);
  const dispatch = useDispatch();
  const friendList = useSelector((state) => state.friendList.friendList);



  useEffect(() => {
    console.log("Updated friendList:", friendList);
  }, [friendList]);


  const handleViewGroups = () => {
    navigation.navigate('viewStudyGroups');
  };



  const handleCreateNewGroup = () => {
    navigation.navigate('createstudygroup');
  };

  const handleViewFriendRequests = () => {
    navigation.navigate('friendrequestlist');
  };



  const FriendList = () => {
    return (
      <View>
        <Text style={styles.friendListTitle}>Friend List:</Text>
        <ScrollView style={styles.friendListContainer}>
          {friendList?.map((friend, index) => (
            <Text key={index} style={styles.friendListItem}>
              {friend}
            </Text>
          ))}
        </ScrollView>
      </View>
    );
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const currentUserUsername = currentUser.username;
      const currentUserId = currentUser.attributes.sub;
  
      const result = await API.graphql(graphqlOperation(listUsers));
      const users = result.data.listUsers.items.filter(
        (user) => user.username !== currentUserUsername && user.id !== currentUserId
      );
      setFilteredDataSource(users);
      setMasterDataSource(users);
    } catch (error) {
      console.error(error);
    }
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name
          ? item.name.toLowerCase()
          : ''.toLowerCase();
        const usernameData = item.username
          ? item.username.toLowerCase()
          : '';
        const textData = text.toLowerCase();
        return itemData.includes(textData) || usernameData.includes(textData);
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const handleSelectUser = (item) => {

    const isSelected = selectedUsers.includes(item.id);

    if (isSelected) {
      // User is already selected, remove from selectedUsers
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((userId) => userId !== item.id)
      );
      /*setFriendList((prevFriendList) =>
      prevFriendList.filter((friend) => friend !== item.username)
    );*/
    dispatch(removeFriend(item.username));
    } else {
      // User is not selected, add to selectedUsers
      setSelectedUsers((prevSelected) => [...prevSelected, item.id]);
      /*setFriendList((prevFriendList) => [...prevFriendList, item.username]);*/
      dispatch(addFriend(item.username));


    }
    
  };

  const ItemView = ({ item }) => {
    const isSelected = selectedUsers.includes(item.id);
   
    return (
      <View style={styles.itemContainer}>
      <Text style={styles.itemStyle}>
        {item.username}
      </Text>
      <TouchableOpacity
        onPress={() => {
          handleSelectUser(item);
        }}
        /*onPress={() => sendFriendRequest(item)}*/
        style={styles.buttonContainer}
      >
        <Text
          style={isSelected ? styles.selectedButton : styles.unselectedButton}
        >
          {isSelected ? 'Friend Request Sent' : 'Add'}
        </Text>
      </TouchableOpacity>
    </View>
  );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };


  const handleAddFriends = () => {
    const selectedUsernames = masterDataSource
    .filter((item) => selectedUsers.includes(item.id))
    .map((item) => item.username);

  // Add the usernames to the friend list
  //setFriendList((prevFriendList) => [...prevFriendList, ...selectedUsernames]);
  dispatch(addFriend(...selectedUsernames));


  // Clear the selected users
  setSelectedUsers([]);

    // Perform the necessary actions to add selectedUsers as friends
    console.log('Selected Users:', selectedUsers);
  };


  const sendFriendRequest = async (item) => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      console.log('currentUser:', currentUser);

      const senderID = currentUser.attributes.sub;
      console.log('senderID:', senderID);

      const receiverID = item.id;
      console.log('receiverID:', receiverID, item.username);



      const input = {
        senderID: senderID,
        receiverID: receiverID,
        status: 'pending',
      };

      console.log('input:', input);

      const response = await API.graphql(  graphqlOperation(createFriendRequest, { input: { ...input } })
      );
      const createdFriendRequest = response.data.createFriendRequest;
      console.log('friendrequestcreated:', createdFriendRequest);


      const sender = await API.graphql(
        graphqlOperation(getUser, { id: senderID })
      );
      const senderUsername = sender.data.getUser.username;
  
      console.log('Friend request sent by:', senderUsername);
      // Update the UI or perform any additional actions after sending the friend request
    } catch (error) {
      console.error('Error sending friend request:', error);
      // Handle the error gracefully in the UI
    }
  };

  

  

 
  return (
    <SafeAreaView style={{ flex: 1 }}>
<View style={[styles.container, { flex: 1 }]}>


<TouchableOpacity style={styles.addButton} onPress={handleViewFriendRequests}>
          <Text style={styles.addButtonText}>View Friend Requests</Text>
        </TouchableOpacity>




<TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Find Users Here"
        />
<View style={styles.addButton} >
  <Text style={styles.addButtonText}>Add Friends</Text>
</View>
<FriendList/>



<View style={{flex: 1}}>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
        </View>

        <View style={styles.createGroupButtonContainer}>
          <TouchableOpacity
            onPress={handleCreateNewGroup}
            style={styles.createGroupButton}
          >
            <Text style={styles.createGroupButtonText}>
              Click to create new study group
            </Text>
          </TouchableOpacity>
        </View>


        <View style={styles.createGroupButtonContainer}>
          <TouchableOpacity
            onPress={handleViewGroups}
            style={styles.createGroupButton}
          >
            <Text style={styles.createGroupButtonText}>
              View Study Groups
            </Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  );
};

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
    borderRadius: 3,
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
    marginVertical: 15,
    marginLeft: 10,
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
  createGroupButton: {
    backgroundColor: '#008080',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  createGroupButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  createGroupButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

});


export default Group;


