require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const process = require('process');
const router = require('./Features/MessageRouter');

const { ADMIN_USERNAME } = process.env;
const { BOT_USERNAME } = process.env;
const DEBUG_MODE = process.env.DEBUG;
const bot = new Discord.Client();

const { TOKEN } = process.env;

/**
 * login using the token in the .env file
 * do not run if doing tests - throws UnhandledPromiseRejection
 */
bot.login(TOKEN).then(() => {
  // eslint-disable-next-line no-console
  console.log('me so hungy');
}).catch((error) => {
  // eslint-disable-next-line no-console
  console.debug(error);
});

/**
 * On new message
 *
 * if it starts with !homer, get the message and look up the quote
 *
 * @params {String} msg the message
 *
 * @return {String} response
 */
bot.on('message', async (msg) => {
  if (msg.content.startsWith('!homer')) {
    fs.writeFile('./message.txt', JSON.stringify(msg), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
    if (
      DEBUG_MODE
      && msg.author.username !== ADMIN_USERNAME
      && msg.author.username !== BOT_USERNAME
    ) {
      msg.channel.send(
        'Homer is getting some work done and may not yield results',
      );
    }
    await router.routeMsg(msg)
      .then((res) => {
        msg.channel.send(res);
      })
      .catch((errors) => {
        msg.author.send(errors);
      });
  }
});
