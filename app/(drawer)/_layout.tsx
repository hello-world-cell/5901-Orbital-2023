import {withLayoutContext} from 'expo-router';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';


const DrawerNavigator = createDrawerNavigator().Navigator;

const Drawer = withLayoutContext(DrawerNavigator);

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
  };
export default function DrawerLayout() {
    return (
    <Drawer
        screenOptions={{
        headerShown:false,
        drawerActiveBackgroundColor: '#4BA09B',
        drawerActiveTintColor: 'white',
        }}>
        <Drawer.Screen 
        name='(tabs)'  
        options={{
            headerShown: false, 
            title: 'Home', 
            drawerIcon: ({focused, color, size}) => (
            <Icon name = "home" size={18} color={color} />
        ),}} />
        <Drawer.Screen 
        name='profile'  
        options={{
            headerShown: false, 
            title: 'Profile',
            drawerIcon: ({focused, color, size}) => (
                <Icon name = "person" size={18} color={color} />
            ),}} />
        <Drawer.Screen 
        name='notifications'  
        options={{
            headerShown: false, 
            title: 'Notifications',
            drawerIcon: ({focused, color, size}) => (
                <Icon name = "notifications" size={18} color={color} />
            ),}} />
    </Drawer>
    );
}