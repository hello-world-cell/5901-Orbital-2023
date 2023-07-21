import { Amplify, Auth, API, graphqlOperation} from 'aws-amplify';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import awsconfig from '../src/aws-exports';
import {Authenticator} from '@aws-amplify/ui-react-native';
import {getUser} from '../src/graphql/queries';
import {createUser} from '../src/graphql/mutations';
import { Image } from 'react-native';
import { Provider } from 'react-redux';
import store from '../redux/store';

Amplify.configure(awsconfig);

/*
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';
*/
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
};

const getRandomImage = () => {
  return (
    <Image 
      source={require('../assets/images/logoMascot.jpeg')}
      style={{
        width: 257,
        height: 242,
        aspectRatio: 1
      }}
    />
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  const saveUserToDB = async (user) => {
    console.log("saving user")
    try {
      const result = await API.graphql(graphqlOperation(createUser, { input: user }));
      //const { data } = result;
      //console.log("User saved:", data.createUser);   
    } catch (error) {
      console.log("error saving user", error);
    }
  }
  useEffect(() => {
    const updateUser = async() => {
      //get current auhtneticated user
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});
      if(userInfo) {
          //check if user already exist in database
          const userData = await API.graphql(graphqlOperation(getUser, {id: userInfo.attributes.sub} ))
          //console.log(userData)
          if(!userData.data.getUser) {
            const user = {
              id: userInfo.attributes.sub,
              username: userInfo.username,
              email: userInfo.attributes.email,
              name: userInfo.username,
              image: getRandomImage(),
              
            }
            await saveUserToDB(user);
          } else{
            console.log('User already exists');
          }
      }
      //if it doesn't, create the user in the database
    }
    updateUser();

  }, [])

  
  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
     {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  return (
    <>
        <Provider store={store}>

      <Authenticator.Provider>
        <Authenticator>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          <Stack.Screen name='newpost' options={{title: 'Post'}} />
    

        </Stack>
      </ThemeProvider>
        </Authenticator>
      </Authenticator.Provider>
      </Provider>

    </>
  );
}
