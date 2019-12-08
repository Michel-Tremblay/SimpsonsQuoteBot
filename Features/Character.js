require("dotenv").config();
const process = require("process");
const rp = require("request-promise");

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;
const SEARCH_KEY = `key=${GOOGLE_API_KEY}`;
const CX = `cx=${SEARCH_ENGINE_ID}`;
const BASE_URL = process.env.BASE_URL;


module.exports = {
  fu: async arg => {
    let options = {
      uri: `${BASE_URL}/search${CX}&${SEARCH_KEY}&q=${arg.trim()}`,
      headers: {
        "User-Agent": "Request-Promise"
      },
    }
    return await rp(options).then(result => {
      console.debug(result);
    }, error => {
      console.debug(error);
    }).catch(error => {
      console.debug(error);
    });
  }
}