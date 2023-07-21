import { StyleSheet, Image, View, FlatList, Pressable} from 'react-native';
import tweets from '../../../../assets/data/tweets';
import Tweet from '../../../../components/Tweet';
import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';
import {useState, useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import {listPosts} from '../../../../src/graphql/queries';
import { getUser } from '../../../../src/graphql/queries';
export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const[loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const postsData = await API.graphql(graphqlOperation(listPosts));
      console.log(postsData)
      const posts = postsData.data.listPosts.items;
  const postsWithUserData = await Promise.all(posts.map(async (post) => {
    const userData = await API.graphql(graphqlOperation(getUser, { id: post.userID }));
    const user = userData.data.getUser;
    return { ...post, user };
  }));
      setPosts(postsWithUserData);

    }catch(e) {
      console.log(e);
    } finally {
      setLoading(false);
    }

  }
  
  useEffect(() => {
    
    fetchPosts();
  }, []);

  return ( 
    <View style={styles.page}>
      <FlatList 
        data={posts} 
        renderItem={({item}) => <Tweet tweet={item} />}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={fetchPosts}
      />

      <Link href='/newpost' asChild>
        <Entypo 
          name="plus" 
          size={24} 
          color="white"
          style={styles.floatingButton} 
        />
      </Link>
    </View>
    
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  floatingButton: {
    backgroundColor: '#4BA09B',
    width: 50,
    height: 50,
    borderRadius: 25,
    textAlign: 'center',
    lineHeight: 50,
    position: 'absolute',
    right: 15,
    bottom: 15,
    overflow: 'hidden'

  }
});
