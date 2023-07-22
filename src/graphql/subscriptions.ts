/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
    onCreateComment(filter: $filter) {
      id
      content
      userID
      createdAt
      updatedAt
      Users {
        nextToken
        __typename
      }
      Posts {
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
    onUpdateComment(filter: $filter) {
      id
      content
      userID
      createdAt
      updatedAt
      Users {
        nextToken
        __typename
      }
      Posts {
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
    onDeleteComment(filter: $filter) {
      id
      content
      userID
      createdAt
      updatedAt
      Users {
        nextToken
        __typename
      }
      Posts {
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const onCreateInvitation = /* GraphQL */ `
  subscription OnCreateInvitation(
    $filter: ModelSubscriptionInvitationFilterInput
  ) {
    onCreateInvitation(filter: $filter) {
      id
      userID
      status
      studygroupID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateInvitation = /* GraphQL */ `
  subscription OnUpdateInvitation(
    $filter: ModelSubscriptionInvitationFilterInput
  ) {
    onUpdateInvitation(filter: $filter) {
      id
      userID
      status
      studygroupID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteInvitation = /* GraphQL */ `
  subscription OnDeleteInvitation(
    $filter: ModelSubscriptionInvitationFilterInput
  ) {
    onDeleteInvitation(filter: $filter) {
      id
      userID
      status
      studygroupID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateStudyGroup = /* GraphQL */ `
  subscription OnCreateStudyGroup(
    $filter: ModelSubscriptionStudyGroupFilterInput
  ) {
    onCreateStudyGroup(filter: $filter) {
      id
      name
      icon
      members
      userID
      isActive
      Invitations {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateStudyGroup = /* GraphQL */ `
  subscription OnUpdateStudyGroup(
    $filter: ModelSubscriptionStudyGroupFilterInput
  ) {
    onUpdateStudyGroup(filter: $filter) {
      id
      name
      icon
      members
      userID
      isActive
      Invitations {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteStudyGroup = /* GraphQL */ `
  subscription OnDeleteStudyGroup(
    $filter: ModelSubscriptionStudyGroupFilterInput
  ) {
    onDeleteStudyGroup(filter: $filter) {
      id
      name
      icon
      members
      userID
      isActive
      Invitations {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onCreateChatRoom(filter: $filter) {
      id
      Messages {
        nextToken
        __typename
      }
      users {
        nextToken
        __typename
      }
      LastMessage {
        id
        text
        chatroomID
        userID
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
      __typename
    }
  }
`;
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onUpdateChatRoom(filter: $filter) {
      id
      Messages {
        nextToken
        __typename
      }
      users {
        nextToken
        __typename
      }
      LastMessage {
        id
        text
        chatroomID
        userID
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
      __typename
    }
  }
`;
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onDeleteChatRoom(filter: $filter) {
      id
      Messages {
        nextToken
        __typename
      }
      users {
        nextToken
        __typename
      }
      LastMessage {
        id
        text
        chatroomID
        userID
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
      __typename
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
      id
      text
      chatroomID
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onUpdateMessage(filter: $filter) {
      id
      text
      chatroomID
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
    onDeleteMessage(filter: $filter) {
      id
      text
      chatroomID
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateFriendRequest = /* GraphQL */ `
  subscription OnCreateFriendRequest(
    $filter: ModelSubscriptionFriendRequestFilterInput
  ) {
    onCreateFriendRequest(filter: $filter) {
      id
      senderID
      receiverID
      status
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateFriendRequest = /* GraphQL */ `
  subscription OnUpdateFriendRequest(
    $filter: ModelSubscriptionFriendRequestFilterInput
  ) {
    onUpdateFriendRequest(filter: $filter) {
      id
      senderID
      receiverID
      status
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteFriendRequest = /* GraphQL */ `
  subscription OnDeleteFriendRequest(
    $filter: ModelSubscriptionFriendRequestFilterInput
  ) {
    onDeleteFriendRequest(filter: $filter) {
      id
      senderID
      receiverID
      status
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
      id
      content
      image
      comment
      userID
      comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
      id
      content
      image
      comment
      userID
      comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
      id
      content
      image
      comment
      userID
      comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      name
      username
      occupation
      image
      email
      Posts {
        nextToken
        __typename
      }
      Messages {
        nextToken
        __typename
      }
      ChatRooms {
        nextToken
        __typename
      }
      FriendRequests
      friendrequests {
        nextToken
        __typename
      }
      StudyGroups {
        nextToken
        __typename
      }
      comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      name
      username
      occupation
      image
      email
      Posts {
        nextToken
        __typename
      }
      Messages {
        nextToken
        __typename
      }
      ChatRooms {
        nextToken
        __typename
      }
      FriendRequests
      friendrequests {
        nextToken
        __typename
      }
      StudyGroups {
        nextToken
        __typename
      }
      comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      name
      username
      occupation
      image
      email
      Posts {
        nextToken
        __typename
      }
      Messages {
        nextToken
        __typename
      }
      ChatRooms {
        nextToken
        __typename
      }
      FriendRequests
      friendrequests {
        nextToken
        __typename
      }
      StudyGroups {
        nextToken
        __typename
      }
      comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCommentUser = /* GraphQL */ `
  subscription OnCreateCommentUser(
    $filter: ModelSubscriptionCommentUserFilterInput
  ) {
    onCreateCommentUser(filter: $filter) {
      id
      commentId
      userId
      comment {
        id
        content
        userID
        createdAt
        updatedAt
        __typename
      }
      user {
        id
        name
        username
        occupation
        image
        email
        FriendRequests
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCommentUser = /* GraphQL */ `
  subscription OnUpdateCommentUser(
    $filter: ModelSubscriptionCommentUserFilterInput
  ) {
    onUpdateCommentUser(filter: $filter) {
      id
      commentId
      userId
      comment {
        id
        content
        userID
        createdAt
        updatedAt
        __typename
      }
      user {
        id
        name
        username
        occupation
        image
        email
        FriendRequests
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCommentUser = /* GraphQL */ `
  subscription OnDeleteCommentUser(
    $filter: ModelSubscriptionCommentUserFilterInput
  ) {
    onDeleteCommentUser(filter: $filter) {
      id
      commentId
      userId
      comment {
        id
        content
        userID
        createdAt
        updatedAt
        __typename
      }
      user {
        id
        name
        username
        occupation
        image
        email
        FriendRequests
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCommentPost = /* GraphQL */ `
  subscription OnCreateCommentPost(
    $filter: ModelSubscriptionCommentPostFilterInput
  ) {
    onCreateCommentPost(filter: $filter) {
      id
      commentId
      postId
      comment {
        id
        content
        userID
        createdAt
        updatedAt
        __typename
      }
      post {
        id
        content
        image
        comment
        userID
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCommentPost = /* GraphQL */ `
  subscription OnUpdateCommentPost(
    $filter: ModelSubscriptionCommentPostFilterInput
  ) {
    onUpdateCommentPost(filter: $filter) {
      id
      commentId
      postId
      comment {
        id
        content
        userID
        createdAt
        updatedAt
        __typename
      }
      post {
        id
        content
        image
        comment
        userID
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCommentPost = /* GraphQL */ `
  subscription OnDeleteCommentPost(
    $filter: ModelSubscriptionCommentPostFilterInput
  ) {
    onDeleteCommentPost(filter: $filter) {
      id
      commentId
      postId
      comment {
        id
        content
        userID
        createdAt
        updatedAt
        __typename
      }
      post {
        id
        content
        image
        comment
        userID
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateUserChatRoom = /* GraphQL */ `
  subscription OnCreateUserChatRoom(
    $filter: ModelSubscriptionUserChatRoomFilterInput
  ) {
    onCreateUserChatRoom(filter: $filter) {
      id
      chatRoomId
      userId
      chatRoom {
        id
        createdAt
        updatedAt
        chatRoomLastMessageId
        __typename
      }
      user {
        id
        name
        username
        occupation
        image
        email
        FriendRequests
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUserChatRoom = /* GraphQL */ `
  subscription OnUpdateUserChatRoom(
    $filter: ModelSubscriptionUserChatRoomFilterInput
  ) {
    onUpdateUserChatRoom(filter: $filter) {
      id
      chatRoomId
      userId
      chatRoom {
        id
        createdAt
        updatedAt
        chatRoomLastMessageId
        __typename
      }
      user {
        id
        name
        username
        occupation
        image
        email
        FriendRequests
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUserChatRoom = /* GraphQL */ `
  subscription OnDeleteUserChatRoom(
    $filter: ModelSubscriptionUserChatRoomFilterInput
  ) {
    onDeleteUserChatRoom(filter: $filter) {
      id
      chatRoomId
      userId
      chatRoom {
        id
        createdAt
        updatedAt
        chatRoomLastMessageId
        __typename
      }
      user {
        id
        name
        username
        occupation
        image
        email
        FriendRequests
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
