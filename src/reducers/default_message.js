import { GET_MESSAGE, SAVE_MESSAGE, MESSAGE_ERROR } from '../actions/types';

const defaultState = { value: 'Loots #{count}' };

export default (state = defaultState, action) => {

  switch(action.type) {
    case GET_MESSAGE:
      let { message } = action.payload;

      return message ? { value: message } : state;
    case SAVE_MESSAGE:
      let { message } = action.payload;

      return { value: message };
    case MESSAGE_ERROR:
      let { message } = action.payload;

      return { ...state, errorMessage: message };
  }
};