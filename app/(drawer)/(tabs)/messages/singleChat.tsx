import {View, SafeAreaView, Text, StyleSheet, FlatList} from 'react-native';
import Message from '../../../../components/ChatsScreen/Message';
import InputBox from '../../../../components/ChatsScreen/InputBox';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listChatRooms} from '../../../../components/ChatsScreen/queries';
import { useEffect, useState } from 'react';

const SingleChat = () => {
    const [chatRoom, setChatRoom] = useState([]);

    useEffect(() => {
        const fetchChatRooms = async () => {
            const authUser = await Auth.currentAuthenticatedUser();
            const response = await API.graphql(
                graphqlOperation(listChatRooms, {id: authUser.attributes.sub})
            )

            setChatRoom(response.data.getUser.ChatRooms.items);

        };

        fetchChatRooms();
    }, [])

    return(
       
            <View style={{flex: 1}}>
            <FlatList
                data={chatRoom}
                renderItem={({item}) => <Message message={item} /> }
                style={{padding: 10
                }}
                inverted >
            </FlatList>
            <InputBox />
            </View>

            

       
    );
};

export default SingleChat;


