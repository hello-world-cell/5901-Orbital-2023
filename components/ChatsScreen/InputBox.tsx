import {View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

const InputBox = () => {
    const [newMes, setNewMes] = useState('');

    const onSend = () => {
        console.warn("sending: ", newMes);
        setNewMes('');
    }

    return (
        <KeyboardAvoidingView>
        <View style={styles.container} >
            <TextInput 
                value={newMes}
                onChangeText={setNewMes}
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