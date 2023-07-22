import {Text, View, Image, StyleSheet} from 'react-native';
import { Auth } from 'aws-amplify';
import { useState, useEffect } from 'react';
import moment from 'moment';

const Message = ({message}) => {
    const [isMe, setIsMe] = useState(false);

    useEffect(() => {
        const isSelf = async () => {
            const authUser = await Auth.currentAuthenticatedUser();
            setIsMe(message.userID === authUser.attributes.sub);
        };
        isSelf();
    }, [])
    
    return (
        <View style={[styles.container, {
            backgroundColor: isMe ? '#4BA09B' : 'white',
            alignSelf: isMe ? 'flex-end' : 'flex-start',
        }]}>
            <Text>{message.text}</Text>
            <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>

        </View>
    );
        
}
const styles = StyleSheet.create({
    container: {
        margin: 5,
        borderRadius: 10,
        padding: 10,
        maxWidth: '80%'
    },
    time: {
        color: 'grey',
        alignSelf: 'flex-end'
    }
})
export default Message;