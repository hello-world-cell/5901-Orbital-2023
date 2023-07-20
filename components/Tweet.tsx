import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import { TweetType } from '../types';
import {EvilIcons} from '@expo/vector-icons';
import {Link} from 'expo-router';
import { useEffect } from 'react';
import moment from 'moment';

type TweetProps = {
    tweet: TweetType;
}

const Tweet = ({tweet}: TweetProps) => {
  
    return(
    <Link href={`/feed/forum/${tweet.id}`} asChild>
      <Pressable style={styles.container}>
     
        <Image 
          src={tweet.user?.image} 
          style={styles.userImage} 
        />
      <View style={styles.mainContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.name}>{tweet.user?.name}</Text>
          <Text style={styles.username}>(@{tweet.user?.username} </Text>
          <Text style={styles.createdAt}>{moment(tweet.createdAt).fromNow()})</Text>
        </View>
        <Text style={styles.content}>{tweet.content}</Text>
        {tweet.image && <Image source={{uri: tweet.image}} style={styles.image} />}
        <View style={styles.footer}>
            <EvilIcons name='comment' size={22} color='gray' />
            <Text style={{fontSize: 12, color: 'grey'}}>{tweet.comment}</Text>
        </View>
      </View>
      </Pressable>
    </Link>
   
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 0.5,
      borderColor: 'lightgrey',
      backgroundColor: 'white'
  
    },
  
    userImage: {
      width: 50, 
      height:50, 
      borderRadius: 50
    },
  
    mainContainer: {
      marginLeft: 10,
      flex: 1,
  
    },
    name: {
      fontWeight: 'bold',
    },
  
    content: {
      lineHeight: 20,
      marginTop: 5,
    },

    image: {
        width: '100%',
        aspectRatio: 16/9,
        marginTop: 10,
        borderRadius: 15,
    },

    username: {
        color: 'grey',
        marginLeft: 5,

    },
    
    createdAt: {
      color: 'grey',
      marginleft: 10
    },

    footer: {
        flexDirection: 'row',
        marginVertical: 5,
    }
  
  
  });
  
  export default Tweet;