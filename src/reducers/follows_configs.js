import { GET_FOLLOW_MESSAGE, SAVE_FOLLOW_MESSAGE, FOLLOW_MESSAGE_ERROR } from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case GET_FOLLOW_MESSAGE:
    case SAVE_FOLLOW_MESSAGE:
      let nicknameFollows = state[action.payload.nickname] || {};
      let newFollowConfig = {};
      let newState = {};

      newFollowConfig[action.payload.follow] = action.payload.followConfig;
      newState[action.payload.nickname] = { ...nicknameFollows, ...newFollowConfig };

      return { ...state, ...newState };
    case FOLLOW_MESSAGE_ERROR:
      let nicknameFollows = state[action.payload.nickname] || {};
      let config = nicknameFollows[action.payload.follow] || {};
      let newFollowConfig = {};
      let newState = {};

      config.errorMessage = action.payload.message;
      newFollowConfig[action.payload.follow] = config;
      newState[action.payload.nickname] = { ...nicknameFollows, ...newFollowConfig };

      return { ...state, ...newState };
    default:
      return state;
  }
};