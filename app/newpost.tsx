import { useState, useEffect } from 'react';
import { Link, useNavigation } from 'expo-router';
import {SafeAreaView, View, StyleSheet, Text, Image, TextInput, Pressable} from 'react-native';
import { API, graphqlOperation, Auth, Storage } from 'aws-amplify';
import { getUser } from '../src/graphql/queries';
import {createPost} from '../src/graphql/mutations';
import 'react-native-get-random-values';

export default function Post() {
    const [text, setText] = useState("");
    const [user, setUser] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
        const { data } = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub }));
        setUser(data.getUser);
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

    const onPostPress = async () => {
        try {
            const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});
            const newPost = {
                content: text,
                userID: userInfo.attributes.sub,
                image: imageUrl,
                comment: 0
            }
            await API.graphql(graphqlOperation(createPost, {input: newPost}))
            setText('');
            navigation.goBack();
        } catch(e){
            console.log(e);
        }
    }

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Link href="../" style={{fontSize: 18}}>
                    Cancel
                </Link>
                <Pressable onPress={onPostPress} style={styles.button}>
                    <Text style={styles.buttonText}>Post</Text>
                </Pressable>
            </View>
            <View style={styles.inputContainer}>
                <Image src={user?.image} style={styles.image} />
                <TextInput 
                    value={text}
                    onChangeText={setText}
                    placeholder='Any questions?' 
                    multiline
                    numberOfLines={5}
                    style={{flex: 1}}
                    />
            </View>
            <TextInput 
                    value={imageUrl}
                    onChangeText={setImageUrl}
                    placeholder='Url link (optional)' 
                    style={styles.imagePicture}
                    />
        </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    button: {
        backgroundColor: '#4BA09B',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
    },
    image: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 50,
        marginRight: 10,
    },

    pickImage: {
        color: '#4BA09B',
        fontSize: 18
    },

    imagePicture: {
   
        marginVertical: 10,
       
    }

})