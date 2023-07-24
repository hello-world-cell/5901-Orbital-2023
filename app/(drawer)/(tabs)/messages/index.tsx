import React from 'react';
import {API, graphqlOperation, Auth} from "aws-amplify";
import { useState, useEffect } from 'react';
import {listUsers} from '../../../../src/graphql/queries';
import { useNavigation, usePathname, useLocalSearchParams } from 'expo-router';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ChatList from '../../../../components/ChatsScreen/ChatList';
import { createChatRoom, createUserChatRoom } from '../../../../src/graphql/mutations';
import { getCommonChatRoomWithUser } from '../../../../components/ChatsScreen/chatRoomService';
function Chat() {
 
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [authenticatedUserId, setAuthenticatedUserId] = useState(null);

  useEffect(() => {
    // Fetch the authenticated user's ID
    const fetchAuthenticatedUser = async () => {
      try {
        const authUser = await Auth.currentAuthenticatedUser();
        setAuthenticatedUserId(authUser.attributes.sub);
      } catch (error) {
        console.error('Error fetching authenticated user:', error);
      }
    };

    fetchAuthenticatedUser();
  }, []);

  useEffect(() => {
    // Fetch all users and filter out the authenticated user
    API.graphql(graphqlOperation(listUsers)).then((result) => {
      const allUsers = result.data?.listUsers?.items;
      if (allUsers && authenticatedUserId) {
        const otherUsers = allUsers.filter((user) => user.id !== authenticatedUserId);
        setUsers(otherUsers);
      }
    });
  }, [authenticatedUserId]);

  
  const handleCreateChat = async () => {
    try {
      //check if we already have a ChatRoom with user
      const existingChatRoom = await getCommonChatRoomWithUser(users.id);
      if(existingChatRoom) {
        navigation.navigate("singleChat", {id: newChatRoom.id});
        return;
      }
      // Create a new chat room
      const newChatRoomData = await API.graphql(
        graphqlOperation(createChatRoom, { input: {} })
      );
      const newChatRoom = newChatRoomData.data?.createChatRoom;
  
      // Add the clicked user to the chat room
      await API.graphql(
        graphqlOperation(createUserChatRoom, {
          input: { chatRoomId: newChatRoom.id, userId: id },
        })
      );
  
      // Add the authenticated user to the chat room
      const authUser = await Auth.currentAuthenticatedUser();
      await API.graphql(
        graphqlOperation(createUserChatRoom, {
          input: { chatRoomId: newChatRoom.id, userId: authUser.attributes.sub },
        })
      );
  
      // Navigate to the created chat room
      navigation.navigate('singleChat', { chatRoomID: newChatRoom.id });
    } catch (error) {
      console.log('Error creating chat:', error);
    }
  };
    

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Screen</Text>
      <FlatList
        data={users}
        renderItem={({item}) => <ChatList chat={item} />} >
        
      </FlatList>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    paddingVertical: 25,
    backgroundColor: 'white',
    
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
