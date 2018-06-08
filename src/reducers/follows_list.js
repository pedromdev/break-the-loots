import { GET_FOLLOWS_LIST, SYNC_FOLLOWS_LIST, FOLLOWS_LIST_ERROR } from '../actions/types';

export default (state = undefined, action) => {
  switch(action.type) {
    case GET_FOLLOWS_LIST:
    case SYNC_FOLLOWS_LIST:
      let { follows } = action.payload;
      return { list: follows };
    case FOLLOWS_LIST_ERROR:
      let { message } = action.payload;
      return { ...state, message };
    default:
      return state;
  };
};