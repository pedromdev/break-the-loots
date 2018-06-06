import axios from 'axios';

const CLIENT_ID = 'oldy3pla2n7nh43mxo1lkqq9x0ka2u';
const API_URL = 'https://api.twitch.tv/kraken';

const getRequest = async (endpoint) => {
  let response = await axios.get(`${API_URL}/${endpoint}`, {
    headers: {
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Client-ID': CLIENT_ID
    }
  });

  return response.data;
};

export default class TwitchApi {

  static async getUserDataByUsername(username) {
    return await getRequest(`users?login=${username}`);
  }

  static async getUserFollows(userId, offset, limit) {
    return await getRequest(`users/${userId}/follows/channels?offset=${offset}&limit=${limit}&direction=asc&sortby=login`);
  }
}