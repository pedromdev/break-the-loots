import TwitchApi from '../utils/twitch_api';
import ExtensionApi from '../extension_api';
import FieldError from '../utils/field_error';
import { isValidMessage, isValidNickname } from '../utils/validation';

const recursiveSyncFollowList = async (userId, offset = 0, limit = 100) => {
  let follows = await TwitchApi.getUserFollows(userId, offset, limit);
  let mappedFollows = follows.map((follow) => follow.channel.name);

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
    await isValidNickname(nickname);

    let config = await ExtensionApi.getConfigData();
    let users = await TwitchApi.getUserDataByUsername(nickname);

    if (users.length === 0) throw new FieldError('This nickname doesn\'t exist on Twitch', 'nickname');

    config.user = {
      _id: users[0]._id,
      name: users[0].name
    };

    await ExtensionApi.saveConfigData(config);
    return config;
  }

  static async syncFollowsList(userId) {
    let follows = await recursiveSyncFollowList(userId);
    let config = await ExtensionApi.getConfigData('twitch-follows');

    config.follows = follows;
    ExtensionApi.saveConfigData(config, 'twitch-follows');

    return config;
  }

  // TODO: Save follow message
}