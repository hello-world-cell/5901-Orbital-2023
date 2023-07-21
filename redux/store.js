
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import friendListReducer from './reducer';
import { selectedUsersReducer } from './reducer';

const rootReducer = combineReducers({
  friendList: friendListReducer,
  selectedUsers: selectedUsersReducer, 
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;