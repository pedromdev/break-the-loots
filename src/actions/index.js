import * as types from './types';
import FieldError from '../utils/field_error';
import ExtensionApi from '../extension_api';
import OptionsController from '../controllers/options';

export const getNickname = () => dispatch => {
  ExtensionApi.getConfigData().then((config) => {
    let { user } = config;

    dispatch({
      type: types.GET_NICKNAME,
      payload: { user }
    });
  }).catch((e) => {
    console.log('General error:', e);
    dispatch({
      type: types.EXTENSION_ERROR
    });
  });
};

export const saveNickname = nickname => dispatch => {
  OptionsController.saveNickname(nickname).then((user) => {
    dispatch({
      type: types.SAVE_NICKNAME,
      payload: { user }
    })
  }).catch((e) => {
    if (e.field === 'nickname') {
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

export const getFollowsList = () => (dispatch, getState) => {
  ExtensionApi.getConfigData('twitch-follows').then((config) => {
    let { follows } = config;

    if (follows) {
      return dispatch(({
        type: types.GET_FOLLOWS_LIST,
        payload: { follows }
      }));
    }

    syncFollowsList()(dispatch, getState);
  }).catch((e) => {
    console.log('General error:', e);
    dispatch({
      type: types.EXTENSION_ERROR
    });
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

const hasFollowConfig = (followsConfigs, username, follow) => followsConfigs[username] && followsConfigs[username][follow];

export const getFollowMessage = follow => (dispatch, getState) => {
  let { user, followsConfigs } = getState();

  if (hasFollowConfig(followsConfigs, user.name, follow)) {
    return dispatch({
      type: types.GET_FOLLOW_MESSAGE,
      payload: {
        nickname: user.name,
        follow,
        followConfig: followsConfigs[user.name][follow]
      }
    });
  }

  ExtensionApi.getConfigData('follows').then((config) => {
    dispatch({
      type: types.GET_FOLLOW_MESSAGE,
      payload: {
        nickname: user.name,
        follow,
        followConfig: hasFollowConfig(config, user.name, follow) ? config[user.name][follow] : null
      }
    });
  }).catch((e) => {
    console.log('General error:', e);
    dispatch({
      type: types.EXTENSION_ERROR,
    });
  });
};

export const saveFollowMessage = (follow, message) => (dispatch, getState) => {
  let { user } = getState();

  OptionsController.saveFollowMessage(user.name, follow, message).then((followConfig) => {
    dispatch({
      type: types.SAVE_FOLLOW_MESSAGE,
      payload: {
        nickname: user.name,
        follow,
        followConfig
      }
    });
  }).catch((e) => {
    if (e.field === 'message') {
      dispatch({
        type: types.FOLLOW_MESSAGE_ERROR,
        payload: {
          nickname: user.name,
          follow,
          message: e.message
        }
      });
    } else {
      console.log('General error:', e);
      dispatch({
        type: types.EXTENSION_ERROR,
      });
    }
  });
};