require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const process = require("process");
const TOKEN = process.env.TOKEN;

it('Should log into the Discord service', async () => {
  bot.login(TOKEN);
  expect(bot.on("ready", () => {
    console.info(`Logged in as ${bot.user.tag}!`);
    return true;
  })).resolves.toEqual(true);
  
});


