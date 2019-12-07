require('dotenv').config();
const Discord = require('discord.js');
const superagent = require('superagent');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
var frinkiac = require('frinkiac');

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
 */
bot.on('message', msg => {
  if (msg.content.startsWith('!homer')) {
    let quote = msg.content.split('!homer');
    quote = quote.filter((quote) => { return quote !== ''; });
    quote = quote[0].trim();
    let url = frinkiac.searchURL(quote);
    (async () => {
      try {
        const res = await superagent.get(url);
        memes = res.body;
        memeUrls = [];
        memes.forEach(element => {
          memeUrls.push('https://frinkiac.com/caption/' + element.Episode + '/' + element.Timestamp);
        });
        msg.author.send(`${memeUrls.length} results found \n ${memeUrls.join('\n')}`);
      } catch (err) {
        console.error(err);
      }
    })()
  }
});
