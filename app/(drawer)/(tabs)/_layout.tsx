import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, useNavigation } from 'expo-router';
import { Pressable, useColorScheme, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../../constants/Colors';
import { useEffect, useState } from 'react';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {getUser} from '../../../src/graphql/queries';
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'calendar',
};

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}


function AvatarHeader({user}){
  const navigation = useNavigation();
  return(
    <Pressable onPress={() => navigation.openDrawer()}>
      <Image 
      src={user?.image}
      style={{width: 30, aspectRatio: 1, borderRadius: 40, marginLeft: 10}}/>
    </Pressable>   
  )
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState(null);
  useEffect(() => {
    //get the current user
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});
      if(!userInfo){
        return;
      }
      try {
        const userData = await API.graphql(graphqlOperation(getUser, {id: userInfo.attributes.sub}))
        if(userData){
          setUser(userData.data.getUser);
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchUser();
  }, [])

  return (
    
    <Tabs
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#4BA09B',
        tabBarIcon: ({color, size, focused}) => {
          let iconName;

          if (route.name === 'feed') {
            iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
          } else if (route.name === 'calendar') {
            iconName = focused? 'ios-calendar-sharp' : 'ios-calendar-outline'
          } else if (route.name === 'groups') {
            iconName = focused? 'ios-person-sharp' : 'ios-person-outline';
          } else if (route.name === 'start') {
            iconName = focused? 'ios-add-circle-sharp' : 'ios-add-circle-outline';
          } else if (route.name === 'chat') {
            iconName = focused? 'ios-mail-sharp' : 'ios-mail-outline';
          }

          return <Icon name={iconName} size={22} color={color} />;
        },

      })}>
      <Tabs.Screen
        name="feed"
        options={{
          title: 'FORUM',
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerLeft: () => (
            <AvatarHeader user={user} />
          )
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'CALENDAR',
        }}
      />
       <Tabs.Screen
        name="groups"
        options={{
          title: 'GROUPS',
        }}
      />
       <Tabs.Screen
        name="start"
        options={{
          title: 'START',
        }}
      />
       <Tabs.Screen
        name="chat"
        options={{
          title: 'CHAT',
        }}
      />
    </Tabs>
    
  );
}
