require('dotenv').config();
const Discord = require('discord.js');

const bot = new Discord.Client();
const process = require('process');

const { TOKEN } = process.env;
const { CI } = process.env;
const { ADMIN_USERNAME } = process.env;
const { BOT_USERNAME } = process.env;
const DEBUG_MODE = process.env.DEBUG;
const help = require('./Features/Help');
const memeGenerator = require('./Features/Quote');

const MODE_IDENTIFICATION_REGEX = /-[hmcf]\s/;

/**
 * login using the token in the .env file
 * do not run if doing tests - throws UnhandledPromiseRejection
 */

bot.login(TOKEN).then(() => {
  console.log('me so hungy');
}).catch((error) => {
  console.debug(error);
});

/**
 * routeMsg
 *
 * route the given message to the appropriate handler
 *
 * @param {\Discord.js\Message} msg the message that was sent
 *
 * @return string
 */
const routeMsg = async (msg) => {
  let command = msg.content.replace('!homer', '');
  let result = null;
  command = command.trim();
  const modes = command.match(MODE_IDENTIFICATION_REGEX);
  command = command.replace(MODE_IDENTIFICATION_REGEX, '').trim();
  let mode = null;
  if (!modes) {
    mode = '-h';
  } else if (Array.isArray(modes)) {
    mode = modes[0].trim();
  } else {
    mode = modes.trim();
  }
  command = command.replace(mode, '');
  switch (mode) {
    case '-m': // Meme generation
      result = memeGenerator.getQuote(command);
      if (!result) {
        throw new Error('D-OH! No more :doughnuts:');
      }
      return result;
    case '-h': // help
      result = help.help(command);
      break;
    default:
      result = help.help(command);
      break;
  }
  return result;
};

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
    if (
      DEBUG_MODE
      && msg.author.username !== ADMIN_USERNAME
      && msg.author.username !== BOT_USERNAME
    ) {
      msg.channel.send(
        'Homer is getting some work done and may not yield results',
      );
    }
    await routeMsg(msg)
      .then((res) => {
        msg.channel.send(res);
      })
      .catch((errors) => {
        msg.author.send(errors);
      });
  }
});

module.exports = {
  routeMsg,
};
