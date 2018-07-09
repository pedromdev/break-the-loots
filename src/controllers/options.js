import TwitchApi from '../utils/twitch_api';
import ExtensionApi from '../extension_api';
import FieldError from '../utils/field_error';
import { isValidMessage, isValidNickname } from '../utils/validation';

const recursiveSyncFollowList = async (userId, offset = 0, limit = 100) => {
  let data = await TwitchApi.getUserFollows(userId, offset, limit);
  let mappedFollows = data.follows.map((follow) => follow.channel.name);

  if (offset + limit > data._total) {
    return mappedFollows;
  } else {
    return [ ...mappedFollows, ...(await recursiveSyncFollowList(userId, offset + limit, limit))];
  }
};

export default class OptionsController {

  static async saveMessage(message) {
    await isValidMessage(message);

    let config = await ExtensionApi.getConfigData();
    config.message = message;

    await ExtensionApi.saveConfigData(config);
    return config;
  }

  static async saveNickname(nickname) {
    await isValidNickname(nickname.trim());

    let config = await ExtensionApi.getConfigData();
    let { users } = await TwitchApi.getUserDataByUsername(nickname.trim());

    if (!users || users.length === 0) throw new FieldError('This nickname doesn\'t exist on Twitch', 'nickname');

    config.user = {
      _id: users[0]._id,
      name: users[0].name
    };

    await ExtensionApi.saveConfigData(config);
    return config.user;
  }

  static async syncFollowsList(userId) {
    let follows = await recursiveSyncFollowList(userId);
    let config = await ExtensionApi.getConfigData('twitch-follows');

    config.follows = follows;
    ExtensionApi.saveConfigData(config, 'twitch-follows');

    return config.follows;
  }

  static async saveFollowMessage(nickname, follow, message) {
    let config = await ExtensionApi.getConfigData('follows');

    if (!config[nickname]) config[nickname] = {};

    if (message === "") {
      if (config[nickname][follow]) {
        delete config[nickname][follow];
      }
    } else {
      await isValidMessage(message);

      if (config[nickname][follow]) {
        config[nickname][follow].message = message;
      } else {
        config[nickname][follow] = { message };
      }
    }

    await ExtensionApi.saveConfigData(config, 'follows');
    return config[nickname][follow];
  }
}