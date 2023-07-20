import { StyleSheet } from 'react-native';
import { Text, View, Image } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Learn Lasso</Text>
         </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#18A7B5', // Teal blue background color
    padding: 20,
  },
  title: {
    fontSize: 30, // Increase the font size to make it big
    fontWeight: 'bold',
    color: '#BAB86C', // Yellow text color
    top: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
});
