require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const process = require("process");
const TOKEN = process.env.TOKEN;
const DEBUG_MODE = process.env.DEBUG;

const MODE_IDENTIFICATION_REGEX = /-[hmcf]\s/;
console.info("Starting... :)");

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
bot.on("ready", () => {
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
 * @TODO:
 *  *  hollow this out so that it's just a router to individual features based on the command used to invoke it
 */
bot.on("message", msg => {
  if (msg.content.startsWith("!homer")) {
    if (
      DEBUG_MODE &&
      msg.author.username !== "Selleal" &&
      msg.author.username !== "SimpsonsQuote"
    ) {
      msg.channel.send(
        "Homer is getting some work done and may not yield results"
      );
    }
    let command = msg.content.replace("!homer", "");
    command = command.trim();
    let modes = command.match(MODE_IDENTIFICATION_REGEX);
    command = command.replace(MODE_IDENTIFICATION_REGEX, "").trim();
    let mode = null;
    if (!modes) {
      mode = "h";
    } else if (Array.isArray(modes)) {
      mode = modes[0].trim();
    } else {
      mode = modes.trim();
    }
    switch (mode) {
      case "-m":
        var memeGenerator = require("./Features/Quote");
        var url = new Promise((resolve, reject) => {
          resolve(memeGenerator.getQuote(command));
        });
        url.then(result => {
          msg.channel.send(result || 'DOH! No more doughnuts');
        });
        break;
      case "-h":
        var help = require("./help.js");
        help(command);
        break;
      case "-c":
        break;
      case "-f":
        break;
    }
  }
});
