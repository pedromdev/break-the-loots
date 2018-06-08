import { combineReducers } from 'redux';
import nicknameReducer from './nickname';
import followsListReducer from './follows_list';
import followsConfigsReducer from './follows_configs';

export default combineReducers({
  user: nicknameReducer,
  follows: followsListReducer,
  followsConfigs: followsConfigsReducer,
});