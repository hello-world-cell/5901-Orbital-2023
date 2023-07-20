import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
//import { useNavigation } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import {API, graphqlOperation, Auth} from "aws-amplify";
import { createChatRoom, createUserChatRoom } from '../../src/graphql/mutations';
import {getCommonChatRoomWithUser} from './chatRoomService';
//change chat.user.image
const ChatList = ({chat}) => {
    const navigation = useNavigation();

    const handlePress = async () => {
        const existingChatRoom = await getCommonChatRoomWithUser(chat.id);
    
        if (existingChatRoom) {
          navigation.navigate('singleChat', { id: existingChatRoom.id });
        } else {
          const newChatRoomData = await API.graphql(
            graphqlOperation(createChatRoom, { input: {} })
          );
          const newChatRoom = newChatRoomData.data.createChatRoom;
    
          await API.graphql(
            graphqlOperation(createUserChatRoom, {
              input: { chatRoomID: newChatRoom.id, userID: chat.id },
            })
          );
    
          const authUser = await Auth.currentAuthenticatedUser();
          await API.graphql(
            graphqlOperation(createUserChatRoom, {
              input: { chatRoomID: newChatRoom.id, userID: authUser.attributes.sub },
            })
          );
    
          navigation.navigate('singleChat', { id: newChatRoom.id });
        }
      };
    //const user = chat.users.items[0].user;

    /*const handlePress = async () => {
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
                <Text style={styles.display} numberOfLines={2}>{chat.LastMessage?.text}</Text>
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
        color: "gray",
        
    },

      
})