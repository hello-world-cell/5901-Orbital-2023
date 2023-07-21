export const ADD_FRIEND = 'ADD_FRIEND';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';
export const SET_SELECTED_USERS = 'SET_SELECTED_USERS';

export const addFriend = (friend) => ({
  type: ADD_FRIEND,
  payload: friend,
});

export const removeFriend = (friendId) => ({
  type: REMOVE_FRIEND,
  payload: friendId,
});

export const setSelectedUsers = (selectedUsers) => ({
  type: SET_SELECTED_USERS,
  payload: selectedUsers,
});