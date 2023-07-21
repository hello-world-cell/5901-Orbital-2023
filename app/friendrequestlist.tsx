import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { listFriendRequests } from '../src/graphql/queries';
import { getUser } from '../src/graphql/queries';

export default function friendrequestlist() {
  const [friendRequests, setFriendRequests] = useState([]);
  const [senderUsernames, setSenderUsernames] = useState([]);

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  useEffect(() => {
    const fetchSenderUsernames = async () => {
      try {
        const senderIDs = friendRequests.map((request) => request.senderID);
        const usernames = await Promise.all(
          senderIDs.map(async (senderID) => {
            const sender = await API.graphql(
              graphqlOperation(getUser, { id: senderID })
            );
            return sender.data.getUser.username;
          })
        );
        setSenderUsernames(usernames);
      } catch (error) {
        console.error('Error fetching sender usernames:', error);
      }
    };

    fetchSenderUsernames();
  }, [friendRequests]);

  const fetchFriendRequests = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const currentUserId = currentUser.attributes.sub;

      const result = await API.graphql(
        graphqlOperation(listFriendRequests, {
          filter: {
            receiverID: {
              eq: currentUserId,
            },
          },
        })
      );

      const requests = result.data.listFriendRequests.items;
      setFriendRequests(requests);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View>
      <Text>{senderUsernames[index]} sent a Friend Request</Text>
      {/* Add more UI components to display the friend request details */}
    </View>
  );

  return (
    <View>
      <Text>Friend Requests</Text>
      <FlatList
        data={friendRequests}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Styles for your component
});
