import { GET_NICKNAME, SAVE_NICKNAME, NICKNAME_ERROR } from '../actions/types';

export default (state = null, action) => {
  switch(action.type) {
    case GET_NICKNAME:
    case SAVE_NICKNAME:
      let { user } = action.payload;
      return user || null;
    case NICKNAME_ERROR:
      let { message } = action.payload;
      return { ...state, errorMessage: message };
    default:
      return state;
  };
};