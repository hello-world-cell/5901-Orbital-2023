import {Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import Tweet from '../../../../../components/Tweet';
import { useSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { getPost } from '../../../../../src/graphql/queries';
import { listComments } from '../../../../../src/graphql/queries';
import { StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { createComment } from '../../../../../src/graphql/mutations';


export default function TweetScreen() {
    const {id} = useSearchParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
      const fetchPost = async () => {
        try {
          //fetch post details
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
      fetchComments(id); // Fetch comments when the id changes

    }, [id]);

    const fetchComments = async (postId) => {
      try {
        const commentsData = await API.graphql(graphqlOperation(listComments, {
          filter: {
            postId: { eq: postId },
          },
        }));
        const commentsList = commentsData.data.listComments.items;
        setComments(commentsList);
      } catch (error) {
        console.log('Error fetching comments:', error);
      }
    };
    
    const handleCommentSubmit = async () => {
      try {
        
      // Get the authenticated user's ID
      const authUser = await Auth.currentAuthenticatedUser();
      const userID = authUser.attributes.sub; // Replace with the correct attribute for your user ID

      // Create the comment object to be sent to the backend
      const newComment = {
        content: commentText,
        userID: userID,
      };

      // Call the createComment mutation to add the comment to the database
      await API.graphql(graphqlOperation(createComment, { input: newComment }));
        console.warn('Submitted comment:', commentText);
      
        // Clear the comment input box after submission
        setCommentText('');
      } catch (error) {
        console.log('Error submitting comment:', error);
      }
    };
    
  
    if(!post){
        return <Text>Post {id} not found!</Text>
    }
    return (
      <>
        {/* Display the post details */}
        <Tweet tweet={post} />
    
        {/* Display the comments */}
        {comments.map((comment) => (
          <View key={comment.id}>
            <Text>{comment.content}</Text>
            {/* Add any other comment details you want to display */}
          </View>
        ))}
    
        {/* Place the comment input and submission button in a separate View */}
        <View style={styles.commentContainer}>
          <TextInput
            value={commentText}
            onChangeText={setCommentText}
            placeholder="Write your comment..."
            style={styles.commentInput}
          />
          <TouchableOpacity style={styles.Button} onPress={handleCommentSubmit}>
        <Entypo name="paper-plane" size={24} color="#4BA09B" />
      </TouchableOpacity>
        </View>
      </>
    );
    
    
}

const styles = StyleSheet.create({
  // Your existing styles...

  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginRight: 10,
    borderRadius: 10,
  },

  Button: {
    color: '#4BA09B',
  }
});
