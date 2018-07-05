import { GET_FOLLOW_MESSAGE, SAVE_FOLLOW_MESSAGE, FOLLOW_MESSAGE_ERROR } from '../actions/types';

export default (state = {}, action) => {
  let nicknameFollows, newFollowConfig, newState, config;

  switch(action.type) {
    case GET_FOLLOW_MESSAGE:
    case SAVE_FOLLOW_MESSAGE:
      nicknameFollows = state[action.payload.nickname] || {};
      newFollowConfig = {};
      newState = {};

      newFollowConfig[action.payload.follow] = action.payload.followConfig;
      newState[action.payload.nickname] = { ...nicknameFollows, ...newFollowConfig };

      return { ...state, ...newState };
    case FOLLOW_MESSAGE_ERROR:
      nicknameFollows = state[action.payload.nickname] || {};
      config = nicknameFollows[action.payload.follow] || {};
      newFollowConfig = {};
      newState = {};

      config.errorMessage = action.payload.message;
      newFollowConfig[action.payload.follow] = config;
      newState[action.payload.nickname] = { ...nicknameFollows, ...newFollowConfig };

      return { ...state, ...newState };
    default:
      return state;
  }
};