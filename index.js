require('dotenv').config();
const Discord = require('discord.js');
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
    frinkiac.search(quote)
    .then(function(res) {
        if (res.status !== 200) {
            throw res;
        } else {
            return res.data;
        }
    })
    .then(function(data) {
        var memeURLs = data.map(frinkiac.memeMap, frinkiac);
        if (Array.isArray(memeURLs)) {
          url = memeURLs[memeURLs.length];
          msg.channel.send(url);
        } else {
          msg.channel.send(memeURLs);
        }
    })
    .catch(function(err) {
        throw err;
    });
  }
});
