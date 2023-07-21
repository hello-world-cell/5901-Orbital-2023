// reducers.js

import { ADD_FRIEND, REMOVE_FRIEND } from './actions';
import { SET_SELECTED_USERS } from './actions';

const initialState = {
  friendList: [],

};

const friendListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FRIEND:
      return {
        ...state,
        friendList: [...state.friendList, action.payload],
      };
    case REMOVE_FRIEND:
      return {
        ...state,
        friendList: state.friendList.filter((friend) => friend !== action.payload),

      };
    default:
      return state;
  }
};

//export default friendListReducer;


const initialState1 = {
  selectedUsers: [],
};

export const selectedUsersReducer = (state = initialState1, action) => {
  switch (action.type) {
    case SET_SELECTED_USERS:
      return {
        ...state,
        selectedUsers: action.payload,
      };
    default:
      return state;
  }
};

export default friendListReducer;