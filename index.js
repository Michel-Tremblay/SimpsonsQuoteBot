require('dotenv').config();
const Discord = require('discord.js');
const process = require('process');
const router = require('./Features/MessageRouter');

const { ADMIN_USERNAME } = process.env;
const { BOT_USERNAME } = process.env;
const DEBUG_MODE = process.env.DEBUG;
const bot = new Discord.Client();

const { TOKEN } = process.env;

bot.on('error', (error) => {
  console.debug(error);
});

/**
 * login using the token in the .env file
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
 * @param {\Discord\Message} msg the message
 *
 * @return {String} response
 */
bot.on('message', async (msg) => {
  if (msg.content.startsWith('!homer')) {
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
        if (!res) {
          msg.channel.send('D-OH! No more :doughnut: :doughnut:');
        } else {
          msg.channel.send(res);
        }
      })
      .catch((errors) => {
        msg.author.send(errors);
      });
  }
});
