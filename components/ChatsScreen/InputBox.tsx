import {View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createMessage, updateChatRoom } from '../../src/graphql/mutations';

const InputBox = ({chatroom}) => {
    const [text, setText] = useState('');

    const onSend = async () => {
        console.warn("sending: ", text);

        const authUser = await Auth.currentAuthenticatedUser();

        const newMessage = {
            chatroomID: chatroom.id,
            text,
            userID: authUser.attributes.sub,
        };
        const newMessageData = await API.graphql(graphqlOperation(createMessage, {input: newMessage} ));
        setText("");

        //set message as last message of the chatroom
        await API.graphql(graphqlOperation(
            updateChatRoom, {input: {
                chatRoomLastMessageId: newMessageData.data.createMessage.id,
                id: chatroom.id,
            },
        }
        ));
    };

    return (
        <KeyboardAvoidingView>
        <View style={styles.container} >
            <TextInput 
                value={text}
                onChangeText={setText}
                style={styles.input} 
                placeholder='type your questions...' />
            <MaterialIcons onPress={onSend} style={styles.send} name="send" size={24} color="#4BA09B" />
        </View>
        </KeyboardAvoidingView>
    );
};

export default InputBox;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'smoke-white',
        padding: 5
    },
    input: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 50,
        paddingHorizontal: 10,
        borderColor: 'lightgrey',
        padding: 5,
        marginHorizontal: 10
    },
    send: {
        padding: 5
    }
})