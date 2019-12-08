require("dotenv").config();
const process = require("process");
const rp = require("request-promise");

/**
 * get env variables for Google Search API 
 */
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;
const SEARCH_KEY = `key=${GOOGLE_API_KEY}`;
const CX = `cx=${SEARCH_ENGINE_ID}`;
const BASE_URL = process.env.BASE_URL;

module.exports = {
  characterSearch: async character => {
    let options = {
      uri: `${BASE_URL}${CX}&${SEARCH_KEY}&q=${character.trim()}`,
      headers: {
        "User-Agent": "Request-Promise"
      },
    }
    let result = await rp(options).then(result => {
      let obj = JSON.parse(result);
      return obj.items[0].link;
    }, error => {
      return error;
    }).catch(error => {
      return error;
    });
    return result;
  }
}