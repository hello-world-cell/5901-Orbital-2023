import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { listInvitations } from '../src/graphql/queries';
import { updateInvitation } from '../src/graphql/mutations';

interface Invitation {
  id: string;
  studygroupID: string;
  status: string;
  // Add any other fields from your Invitation type in the GraphQL schema
}

function ViewInvitesScreen() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  useEffect(() => {
    fetchInvitations();
  }, []);

  const fetchInvitations = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const response = await API.graphql(
        graphqlOperation(listInvitations, {
          filter: { userID: { eq: user.attributes.sub } },
        })
      );
      const invitationData = response.data.listInvitations.items;
      setInvitations(invitationData);
    } catch (error) {
      console.log('Error fetching invitations:', error);
    }
  };

  const handleAcceptInvitation = async (invitationId: string) => {
    try {
      await API.graphql(
        graphqlOperation(updateInvitation, {
          input: { id: invitationId, status: 'accepted' },
        })
      );
      // After accepting the invitation, you may want to update the UI to reflect the new status
      fetchInvitations();
    } catch (error) {
      console.log('Error accepting invitation:', error);
    }
  };

  const handleDeclineInvitation = async (invitationId: string) => {
    try {
      await API.graphql(
        graphqlOperation(updateInvitation, {
          input: { id: invitationId, status: 'declined' },
        })
      );
      // After declining the invitation, you may want to update the UI to reflect the new status
      fetchInvitations();
    } catch (error) {
      console.log('Error declining invitation:', error);
    }
  };

  const renderItem = ({ item }: { item: Invitation }) => {
    return (
      <View style={styles.invitationContainer}>
        <Text style={styles.invitationText}>Study Group Invitation</Text>
        <Text>Study Group ID: {item.studygroupID}</Text>
        <Text>Status: {item.status}</Text>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => handleAcceptInvitation(item.id)}
          disabled={item.status === 'accepted' || item.status === 'declined'}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.declineButton}
          onPress={() => handleDeclineInvitation(item.id)}
          disabled={item.status === 'accepted' || item.status === 'declined'}
        >
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Invitations</Text>
      <FlatList
        data={invitations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ width: '100%' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  invitationContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  invitationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  declineButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ViewInvitesScreen;
