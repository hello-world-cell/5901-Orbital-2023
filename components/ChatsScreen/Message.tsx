import {Text, View, Image, StyleSheet} from 'react-native';

const Message = ({message}) => {
    const isSelf = () => {
        return message.user?.id == 'u1';
    }
    return (
        <View style={[styles.container, {
            backgroundColor: isSelf() ? '#4BA09B' : 'white',
            alignSelf: isSelf() ? 'flex-end' : 'flex-start',
        }]}>
            <Text>{message.text}</Text>
            <Text style={styles.time}>{message.createdAt}</Text>

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