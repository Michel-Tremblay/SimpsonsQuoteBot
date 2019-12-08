require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const process = require("process");
const TOKEN = process.env.TOKEN;
const DEBUG_MODE = process.env.DEBUG;

const MODE_IDENTIFICATION_REGEX = /-[hmcf]\s/;

/**
 * login using the token in the .env file
 */
bot.login(TOKEN);

/**
 * On new message
 *
 * if it starts with !homer, get the message and look up the quote
 *
 * @params {String} msg the message
 *
 * @return {String} response
 */
bot.on("message", async msg => {
  console.debug(msg);
  if (msg.content.startsWith("!homer")) {
    if (
      DEBUG_MODE &&
      msg.author.username !== "Selleal" &&
      msg.author.username !== "SimpsonsQuotes"
    ) {
      msg.channel.send(
        "Homer is getting some work done and may not yield results"
      );
    }
    await routeMsg(msg).then(res => {
      msg.channel.send(res);
    });
  }
});

/**
 * routeMsg
 * 
 * route the given message to the appropriate handler
 * 
 * @param {\Discord.js\Message} msg the message that was sent
 * 
 * @return string | null
 */
var routeMsg = async (msg) => {
  let command = msg.content.replace("!homer", "");
  command = command.trim();
  let modes = command.match(MODE_IDENTIFICATION_REGEX);
  command = command.replace(MODE_IDENTIFICATION_REGEX, "").trim();
  let mode = null;
  if (!modes) {
    mode = "-h";
  } else if (Array.isArray(modes)) {
    mode = modes[0].trim();
  } else {
    mode = modes.trim();
  }
  command = command.replace(mode, "");
  switch (mode) {
    case "-m": // Meme generation
      var memeGenerator = require("./Features/Quote");
      return new Promise((resolve, reject) => {
        let result = memeGenerator.getQuote(command);
        if (!result) {
          reject("D-OH! No more :doughnuts:");
        }
        resolve(result);
      });
    case "-c": // Character lookup
      var character = require("./Features/Character");
      return new Promise((resolve, reject) => {
        var result = character.characterSearch(command);
        if (!result) {
          reject("D-OH! No more :doughnuts:");
        }
        resolve(result);
      });
    case "-f":
      break;
    case "-h": // help
      var help = require("./Features/Help");
      var helpPage = help.help(command);
      msg.author.send(helpPage);
      break;
  }
};

module.exports = {
  routeMsg
};
