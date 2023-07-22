import {View, SafeAreaView, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import Message from '../../../../components/ChatsScreen/Message';
import InputBox from '../../../../components/ChatsScreen/InputBox';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listChatRooms} from '../../../../components/ChatsScreen/queries';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getChatRoom } from '../../../../src/graphql/queries';

const SingleChat = () => {
    
    const [chatRoom, setChatRoom] = useState(null);
    const route = useRoute();
    const navigation = useNavigation();
    const chatroomID = route.params.id;
    //console.log("route: ", route);
    //console.log("chatroomID: ", chatroomID);

    useEffect(() => {
        API.graphql(graphqlOperation(getChatRoom, {id: chatroomID})).then(
            (result) => {
                const chatRoomData = result.data?.getChatRoom;
                console.log("Chat room data fetched:", chatRoomData);
                setChatRoom(chatRoomData);
            }
        );
    }, [chatroomID]);


    /*useEffect(() => {
        const fetchChatRooms = async () => {
            const authUser = await Auth.currentAuthenticatedUser();
            const response = await API.graphql(
                graphqlOperation(listChatRooms, {id: authUser.attributes.sub})
            )

            setChatRoom(response.data.getUser.ChatRooms.items);

        };

        fetchChatRooms();
    }, []);*/

    useEffect(() => {
        navigation.setOptions({title: route.params.name});
    }, [route.params.name])

    if(!chatRoom) {
        return <ActivityIndicator />;
    }

    // Sort the messages in ascending order based on their createdAt timestamp
  //const sortedMessages = chatRoom.Messages.items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const sortedMessages = chatRoom.Messages?.items
    ? chatRoom.Messages.items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    : [];


    
    console.log("Rendering Chatroom: ", chatRoom);
    console.log("Rendering Chatroom with messages: ", chatRoom.Messages);
    console.log("sorted messages: ", sortedMessages);

    return(
       
            <View style={{flex: 1}}>
            <FlatList
                data={sortedMessages || []}
                renderItem={({item}) => <Message message={item} /> }
                style={{padding: 10
                }}
                 >
            </FlatList>
            <InputBox chatroom={chatRoom} />
            </View>
       
    );
};

export default SingleChat;


