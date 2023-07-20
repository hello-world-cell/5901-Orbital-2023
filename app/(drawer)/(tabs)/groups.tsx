import { API, Auth, graphqlOperation } from 'aws-amplify';
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
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { listUsers } from '../../../src/graphql/queries';

function Group() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [friendList, setFriendList] = useState([]);

  const FriendList = () => {
    return (
      <View>
        <Text style={styles.friendListTitle}>Friend List:</Text>
        <ScrollView style={styles.friendListContainer}>
          {friendList.map((friend, index) => (
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

      const result = await API.graphql(graphqlOperation(listUsers));
      const users = result.data.listUsers.items.filter(
        (user) => user.username !== currentUserUsername
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

  const ItemView = ({ item }) => {
    const isSelected = selectedUsers.includes(item.id);

    const handleSelectUser = () => {
      if (isSelected) {
        // User is already selected, remove from selectedUsers
        setSelectedUsers((prevSelected) =>
          prevSelected.filter((userId) => userId !== item.id)
        );
        setFriendList((prevFriendList) =>
          prevFriendList.filter((friend) => friend !== item.username)
        );
      } else {
        // User is not selected, add to selectedUsers
        setSelectedUsers((prevSelected) => [...prevSelected, item.id]);
        setFriendList((prevFriendList) => [...prevFriendList, item.username]);
      }
    };

    return (
      <View style={styles.itemContainer}>
        <View style={styles.userInfoContainer}>
          <Image source={{ uri: item?.image }} style={styles.image} />
          <Text style={styles.itemStyle}>{item.username}</Text>
          <TouchableOpacity
            onPress={() => {
              handleSelectUser();
            }}
            style={styles.buttonContainer}
          >
            <Text
              style={isSelected ? styles.selectedButton : styles.unselectedButton}
            >
              {isSelected ? 'Friend Added' : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>
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
    setFriendList((prevFriendList) => [...prevFriendList, ...selectedUsernames]);

    // Clear the selected users
    setSelectedUsers([]);

    // Perform the necessary actions to add selectedUsers as friends
    console.log('Selected Users:', selectedUsers);
  };

  return (
    
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.container, { flex: 1 }]}>
        

        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Find Users Here"
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddFriends}>
          <Text style={styles.addButtonText}>Add Friends</Text>
        </TouchableOpacity>

        <FriendList />

        <View style={{ flex: 1 }}>
          <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        </View>
      </View>
    </SafeAreaView>
  );
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
    left: 50,
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
    
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
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
    left: 10,
  },
  userInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default Group;
