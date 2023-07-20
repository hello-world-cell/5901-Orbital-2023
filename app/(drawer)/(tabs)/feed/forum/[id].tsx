import {Text} from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import Tweet from '../../../../../components/Tweet';
import { useSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { getPost } from '../../../../../src/graphql/queries';

export default function TweetScreen() {
    const {id} = useSearchParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
      const fetchPost = async () => {
        try {
          const postData = await API.graphql(
            graphqlOperation(getPost, { id })
          );
          const fetchedPost = postData.data.getPost;
          setPost(fetchedPost);
        } catch (error) {
          console.log('Error fetching post:', error);
        }
      };
  
      fetchPost();
    }, [id]);
  
    if(!post){
        return <Text>Post {id} not found!</Text>
    }
     return <Tweet tweet={post} />;
}