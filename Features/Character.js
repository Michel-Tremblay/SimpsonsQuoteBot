require('dotenv').config();
const process = require('process');
const rp = require('request-promise');

/**
 * get env variables for Google Search API
 */
const { GOOGLE_API_KEY } = process.env;
const { SEARCH_ENGINE_ID } = process.env;
const SEARCH_KEY = `key=${GOOGLE_API_KEY}`;
const CX = `cx=${SEARCH_ENGINE_ID}`;
const { BASE_URL } = process.env;

module.exports = {
  characterSearch: async (character) => {
    const options = {
      uri: `${BASE_URL}${CX}&${SEARCH_KEY}&q=${character.trim()}`,
      headers: {
        'User-Agent': 'Request-Promise',
      },
    };
    const result = await rp(options).then((res) => {
      const obj = JSON.parse(res);
      return obj.items[0].link;
    }, (error) => error).catch((error) => error);
    return result;
  },
};
