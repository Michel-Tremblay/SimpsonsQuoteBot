require('dotenv').config();
const Discord = require('discord.js');
const Promise = require('bluebird');
const rp = require('request-promise');
const bot = new Discord.Client();
const process = require('process');
const TOKEN = process.env.TOKEN;
const frinkiac = require('frinkiac');

console.info('Starting... :)');

/**
 * login using the token in the .env file 
 */
bot.login(TOKEN);

/**
 * On bot ready
 * 
 * log the Discord id of the user
 * 
 * @return {String} Discord user id confirmation
 */
bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

/**
 * On new message
 * 
 * if it starts with !homer, get the message and look up the quote
 * 
 * @params {String} msg the message
 * 
 * @return {String} URL to image result
 * 
 * @TODO: hollow this out so that it's just a router to individual features 
 * based on the command used to invoke it
 */
bot.on('message', msg => {
  if (msg.content.startsWith('!homer')) {
    let quote = msg.content.split('!homer');
    quote = quote.filter(quote => { return quote !== ''; });
    quote = quote[0].trim();
    let url = frinkiac.searchURL(quote);
    let options = {
      uri: url,
      headers: {
          'User-Agent': 'Request-Promise'
      },
      json: true
  };
    rp(options).then(results => {
      let memes = [];
      results.forEach(result => {
        memes.push(frinkiac.captionURL(result.Episode, result.Timestamp));
      });
      return Promise.map(memes, obj => {
        return rp(obj).then(body => {
          return JSON.parse(body);
        }).catch(reason => {
          console.debug(reason);
        });
      });
    }).then(memes => {
      return new Promise((resolve, reject) => {
        let reply = ``;
        let knownEpisodes = [];
        if (!memes) {
          return reject('Could not resolve memes');
        }
        /*
          probably should not count punctuation and maybe some tolerance to 
          whitespace
        */
        memes.forEach(meme => {
          meme.Subtitles.forEach(subtitle => {
            if (
              subtitle.Content == quote &&
              !knownEpisodes.includes(subtitle.Episode)
            ) {
              knownEpisodes.push(subtitle.Episode);
              reply += `${frinkiac.memeURL(subtitle.Episode, subtitle.Timestamp,subtitle.Content)}`;
            }
          });
        });
         return resolve(reply); 
      });
    }).then(memes => {
      msg.author.send(memes);
    }).catch(reason => {
      console.debug(reason);
    });
  }
});


