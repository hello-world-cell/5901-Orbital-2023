import { useState, useEffect } from 'react';
import { Link, useNavigation } from 'expo-router';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import {SafeAreaView, View, StyleSheet, Text, Image, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Keyboard} from 'react-native';
import {useAuthenticator} from '@aws-amplify/ui-react-native';
import { getUser } from '../../src/graphql/queries';
import { updateUser } from '../../src/graphql/mutations';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { Dimensions } from 'react-native';



export default function Profile() {
    const navigation = useNavigation();
    const {signOut} = useAuthenticator();

    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedUsername, setUpdatedUsername] = useState('');
    const [updatedOccupation, setUpdatedOccupation] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [keyboardVisible, setKeyboardVisible] = useState(false);


    


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
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);


  const handleImageSelection = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to upload an image.');
        return;
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setSelectedImage(result.uri);

        const updatedProfile = {
            id: user.id, // Assuming you have the user's ID stored in the `user` state
            image: result.uri,
          };

          // Make the API call to update the user's profile image
      const updateResult = await API.graphql(graphqlOperation(updateUser, { input: updatedProfile }));

      // Handle the result, display success message, etc.
      console.log('Profile image updated successfully:', updateResult);
      }
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };


  const handleEditProfile = () => {
    setEditMode(!editMode);
  };

  const handleSaveProfile = async () => {
    try {

        if (!user) {
            console.log('User data not available.');
            return;
          }
      // Update the necessary profile fields with the edited values
      const updatedProfile = {
        id: user.id, // Assuming you have the user's ID stored in the `user` state
      };
  
      // Conditionally update the profile fields if there are updated values
      if (updatedUsername !== '') {
        updatedProfile.username = updatedUsername;
      }
  
      if (updatedOccupation !== '') {
        updatedProfile.occupation = updatedOccupation;
      }
  
      if (updatedEmail !== '') {
        updatedProfile.email = updatedEmail;
      }
  
      // Make the API call to update the user's profile only if there are updated values
      if (Object.keys(updatedProfile).length > 1) {
        const result = await API.graphql(graphqlOperation(updateUser, { input: updatedProfile }));
  
        // Handle the result, display success message, etc.
        console.log('Profile updated successfully:', result);
      }
  
      // Exit the edit mode after saving the profile
      setEditMode(false);
    } catch (error) {
      console.log('Error updating profile:', error);
      // Handle the error, display error message, etc.
    }
  };
  

   
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
           
        <ScrollView contentContainerStyle={[styles.scrollViewContent, keyboardVisible && styles.scrollViewContentWithKeyboard]}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
        <View style={styles.signOutButtonContainer}>
    <Text onPress={() => signOut()} style={styles.signOutButton}>Sign out</Text>
  </View>

            <View style={styles.inputContainer}>
                <Text style={{fontWeight: 'bold', fontSize: 25}}> Hello {user?.name} !</Text>
            </View>
            <View style={styles.details}>
                {editMode ? (
            <>
              <TextInput
              style={styles.input}
              placeholder="Username"
              value={updatedUsername}
              onChangeText={setUpdatedUsername}
              />
              

              <TextInput
              style={styles.input}
              placeholder="Email"
              value={updatedEmail}
              onChangeText={setUpdatedEmail}
              />

            <TextInput
                style={styles.input}
                placeholder="Occupation"
                value={updatedOccupation}
                onChangeText={setUpdatedOccupation}
            />
            <Pressable onPress={handleImageSelection} style={styles.button}>
                 <Text style={styles.buttonText}>Upload Image</Text>
            </Pressable>

            {user?.image || selectedImage ? (
  <Image source={{ uri: selectedImage || user.image }} style={styles.selectedImage} resizeMode="cover" />
) : null}


              <Pressable onPress={handleSaveProfile} style={styles.button}>
                <Text style={styles.buttonText}>Save</Text>
              </Pressable>
            </>
          ) : (
            <>

      <Text style={{ fontSize: 20 }}>Username: {user?.username}</Text>
      <Text style={{ fontSize: 20 }}>Email: {user?.email}</Text>
      <Text style={{ fontSize: 20 }}>Occupation: {user?.occupation}</Text>
      {user?.image && (
                  <Image source={{ uri: user.image }} style={styles.selectedImage} resizeMode="cover" />
                )}
              
              <Pressable onPress={handleEditProfile} style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </Pressable>
            </>
          )}
            </View>
        </View>
        </ScrollView>
        </SafeAreaView>
    )

}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    inputContainer: {
      alignItems: 'center',
      marginBottom: 5,
    },
    image: {
      width: 91,
      height: 92,
      borderRadius: 50,
      marginBottom: 10,
    },
    details: {
      alignItems: 'center',
    },
    input: {
      width: '80%',
      fontSize: 20,
      marginBottom: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
    },
    button: {
      backgroundColor: '#4BA09B',
      padding: 10,
      paddingHorizontal: 20,
      borderRadius: 50,
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    editButton: {
      backgroundColor: '#4BA09B',
      padding: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginTop: 10,
    },
    editButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      signOutButtonContainer: {
        position: 'absolute',
        top: 50,
        left: -90,
      },
      signOutButton: {
        fontSize: 20,
        color: 'black',
        backgroundColor: '#BAB86C',
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 5,
      },
      selectedImage: {
        width: 200,
        height: 200,
        marginVertical: 10,
        borderRadius: 10,
    },
    
    
      scrollViewContentWithKeyboard: {
        paddingBottom: 0, // Adjust the value based on your UI requirements
      },
  });