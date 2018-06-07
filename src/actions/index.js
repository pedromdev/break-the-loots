import * as types from './types';
import FieldError from '../utils/field_error';
import OptionsController from '../controllers/options';

export const saveNickname = nickname => dispatch => {
  OptionsController.saveNickname(nickname).then((user) => {
    dispatch({
      type: types.SAVE_NICKNAME,
      payload: { user }
    })
  }).catch((e) => {
    if (e instanceof FieldError && e.field === 'nickname') {
      dispatch({
        type: types.NICKNAME_ERROR,
        payload: {
          message: e.message
        }
      });
    } else {
      console.log('General error:', e);
    }
  });
};

export const syncFollowsList = () => (dispatch, getState) => {
  let { user } = getState();

  if (!user || !user._id) {
    return dispatch({
      type: types.FOLLOWS_LIST_ERROR,
      payload: {
        message: 'It\'s required to save your nickname before sync'
      }
    });
  }

  OptionsController.syncFollowsList(user._id).then((follows) => {
    dispatch({
      type: types.SYNC_FOLLOWS_LIST,
      payload: { follows }
    });
  }).catch((e) => {
    console.log('General error:', e);
    dispatch({
      type: types.EXTENSION_ERROR
    });
  })
};