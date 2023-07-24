import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
//import { useNavigation } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import {API, graphqlOperation, Auth} from "aws-amplify";
import { createChatRoom, createUserChatRoom } from '../../src/graphql/mutations';
import {getCommonChatRoomWithUser} from './chatRoomService';
import { useState, useEffect } from 'react';
import { getChatRoom } from '../../src/graphql/queries';
//change chat.user.image
const ChatList = ({chat}) => {
    const navigation = useNavigation();
    const [lastMessage, setLastMessage] = useState(null);

    useEffect(() => {
      const fetchLastMessage = async () => {
        try {
          const existingChatRoom = await getCommonChatRoomWithUser(chat.id);
          const chatRoomData = await API.graphql(
            graphqlOperation(getChatRoom, { id: existingChatRoom?.chatRoom?.id })
          );
          const lastMessage = chatRoomData.data.getChatRoom?.LastMessage;
          setLastMessage(lastMessage);
        } catch (error) {
          console.error('Error fetching last message:', error);
        }
      };
  
      fetchLastMessage();
    }, []);

    const handlePress = async () => {
      console.log('Clicked chat id:', chat.id);
        const existingChatRoom = await getCommonChatRoomWithUser(chat.id);
        console.log('Existing chat room:', existingChatRoom);
        console.log('Existing chat room ID:', existingChatRoom?.chatRoom?.id);
        //console.log('Existing chat room ID:', existingChatRoom.id);
    
        if (existingChatRoom) {
          console.log('Navigating to existing chat room with id:', existingChatRoom?.chatRoom?.id);
          navigation.navigate('singleChat', { id: existingChatRoom?.chatRoom?.id });
        } else {
          console.log('Creating a new chat room...');
          const newChatRoomData = await API.graphql(
            graphqlOperation(createChatRoom, { input: {} })
          );
          const newChatRoom = newChatRoomData.data.createChatRoom;
          console.log('New chat room created with id:', newChatRoom.id);
    
          await API.graphql(
            graphqlOperation(createUserChatRoom, {
              input: { chatRoomId: newChatRoom.id, userId: chat.id },
            })
          );
    
          const authUser = await Auth.currentAuthenticatedUser();
          await API.graphql(
            graphqlOperation(createUserChatRoom, {
              input: { chatRoomId: newChatRoom.id, userId: authUser.attributes.sub },
            })
          );
          console.log('Navigating to new chat room with id:', newChatRoom.id);
          navigation.navigate('singleChat', { id: newChatRoom.id });
        }
      };
    //const user = chat.users.items[0].user;

    /* const handlePress = async () => {
        //check if we already have a chatroom with user
        const existingChatRoom = await getCommonChatRoomWithUser(chat.id);
        if(existingChatRoom) {
            navigation.navigate('singleChat', {id: existingChatRoom.id});
        
        }
        
        //create a new chat room
        const newChatRoomData = await API.graphql(
            graphqlOperation(createChatRoom, {input: {}})
          );
          console.log(newChatRoomData);
          if (!newChatRoomData.data?.createChatRoom) {
            console.log("Error fetching chat");
          }
          const newChatRoom = newChatRoomData.data?.createChatRoom;

        //add the clicked user to the chat
        await API.graphql(graphqlOperation(createUserChatRoom, {
            input: {chatRoomId: newChatRoom.id, userId: chat.id },
        })
        );
        //add the authenticated user to the chat
        const authUser = await Auth.currentAuthenticatedUser();
        await API.graphql(graphqlOperation(createUserChatRoom, {
            input: {chatRoomId: newChatRoom.id, userId: authUser.attributes.sub},
        })
        );
        navigation.navigate('singleChat', {id: newChatRoom.id});
      };*/
    
      
    return (
        <Pressable onPress={handlePress} style={styles.container}>
            <Image 
              source={{uri: chat?.image}}
              style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.name}>@{chat?.username}</Text>
                <Text style={styles.display} numberOfLines={1}>{lastMessage ? lastMessage?.text : 'No messages yet'}</Text>
            </View>
        </Pressable>

    )
    };
export default ChatList;

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        height: 70,
    },

    content: {
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'lightgray',
        marginLeft: 10
    },

    name: {
        fontWeight: "bold",
    },

    display: {
        color: "grey",
        
    },

      
})