/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const createInvitation = /* GraphQL */ `
  mutation CreateInvitation(
    $input: CreateInvitationInput!
    $condition: ModelInvitationConditionInput
  ) {
    createInvitation(input: $input, condition: $condition) {
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
export const updateInvitation = /* GraphQL */ `
  mutation UpdateInvitation(
    $input: UpdateInvitationInput!
    $condition: ModelInvitationConditionInput
  ) {
    updateInvitation(input: $input, condition: $condition) {
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
export const deleteInvitation = /* GraphQL */ `
  mutation DeleteInvitation(
    $input: DeleteInvitationInput!
    $condition: ModelInvitationConditionInput
  ) {
    deleteInvitation(input: $input, condition: $condition) {
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
export const createStudyGroup = /* GraphQL */ `
  mutation CreateStudyGroup(
    $input: CreateStudyGroupInput!
    $condition: ModelStudyGroupConditionInput
  ) {
    createStudyGroup(input: $input, condition: $condition) {
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
export const updateStudyGroup = /* GraphQL */ `
  mutation UpdateStudyGroup(
    $input: UpdateStudyGroupInput!
    $condition: ModelStudyGroupConditionInput
  ) {
    updateStudyGroup(input: $input, condition: $condition) {
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
export const deleteStudyGroup = /* GraphQL */ `
  mutation DeleteStudyGroup(
    $input: DeleteStudyGroupInput!
    $condition: ModelStudyGroupConditionInput
  ) {
    deleteStudyGroup(input: $input, condition: $condition) {
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
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
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
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
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
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
export const createFriendRequest = /* GraphQL */ `
  mutation CreateFriendRequest(
    $input: CreateFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    createFriendRequest(input: $input, condition: $condition) {
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
export const updateFriendRequest = /* GraphQL */ `
  mutation UpdateFriendRequest(
    $input: UpdateFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    updateFriendRequest(input: $input, condition: $condition) {
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
export const deleteFriendRequest = /* GraphQL */ `
  mutation DeleteFriendRequest(
    $input: DeleteFriendRequestInput!
    $condition: ModelFriendRequestConditionInput
  ) {
    deleteFriendRequest(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createCommentUser = /* GraphQL */ `
  mutation CreateCommentUser(
    $input: CreateCommentUserInput!
    $condition: ModelCommentUserConditionInput
  ) {
    createCommentUser(input: $input, condition: $condition) {
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
export const updateCommentUser = /* GraphQL */ `
  mutation UpdateCommentUser(
    $input: UpdateCommentUserInput!
    $condition: ModelCommentUserConditionInput
  ) {
    updateCommentUser(input: $input, condition: $condition) {
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
export const deleteCommentUser = /* GraphQL */ `
  mutation DeleteCommentUser(
    $input: DeleteCommentUserInput!
    $condition: ModelCommentUserConditionInput
  ) {
    deleteCommentUser(input: $input, condition: $condition) {
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
export const createCommentPost = /* GraphQL */ `
  mutation CreateCommentPost(
    $input: CreateCommentPostInput!
    $condition: ModelCommentPostConditionInput
  ) {
    createCommentPost(input: $input, condition: $condition) {
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
export const updateCommentPost = /* GraphQL */ `
  mutation UpdateCommentPost(
    $input: UpdateCommentPostInput!
    $condition: ModelCommentPostConditionInput
  ) {
    updateCommentPost(input: $input, condition: $condition) {
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
export const deleteCommentPost = /* GraphQL */ `
  mutation DeleteCommentPost(
    $input: DeleteCommentPostInput!
    $condition: ModelCommentPostConditionInput
  ) {
    deleteCommentPost(input: $input, condition: $condition) {
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
export const createUserChatRoom = /* GraphQL */ `
  mutation CreateUserChatRoom(
    $input: CreateUserChatRoomInput!
    $condition: ModelUserChatRoomConditionInput
  ) {
    createUserChatRoom(input: $input, condition: $condition) {
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
export const updateUserChatRoom = /* GraphQL */ `
  mutation UpdateUserChatRoom(
    $input: UpdateUserChatRoomInput!
    $condition: ModelUserChatRoomConditionInput
  ) {
    updateUserChatRoom(input: $input, condition: $condition) {
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
export const deleteUserChatRoom = /* GraphQL */ `
  mutation DeleteUserChatRoom(
    $input: DeleteUserChatRoomInput!
    $condition: ModelUserChatRoomConditionInput
  ) {
    deleteUserChatRoom(input: $input, condition: $condition) {
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
