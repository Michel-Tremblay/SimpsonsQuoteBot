const help = require('./Help');
const memeGenerator = require('./Quote');

const MODE_IDENTIFICATION_REGEX = /-[hm]\s/;

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
      result = memeGenerator.getQuote(command).then((res) => res).catch(() => false);
      break;
    case '-h': // help
      result = help.help(command);
      break;
    default:
      result = help.help(command);
      break;
  }
  return result;
};

module.exports = {
  routeMsg,
};
