require("dotenv").config();
const process = require("process");
const DEBUG_MODE = process.env.DEBUG;
const MODE_IDENTIFICATION_REGEX = /-[hmcf]\s/;

it ('Should return meme link', async() => {
  await expect(main('!homer -m time has ravaged your once-youthful looks')).resolves.toEqual('https://frinkiac.com/meme/S09E17/942924?b64lines=V0hPQS4uLiBUSU1FIEhBUyBSQVZBR0VEIFlPVVIgT05DRS1ZT1VUSEZVTCBMT09LUy4%3D');
});

/**
 * main
 * 
 * imitation of the on message routine executed in index.js
 * 
 * @param {String} msg Command to execute
 * 
 * !this is really stupid. i should really be importing index.js and calling the routine 
 */
var main = msg => {
  if (msg.content.startsWith("!homer")) {
    if (
      DEBUG_MODE &&
      msg.author.username !== "Selleal" &&
      msg.author.username !== "SimpsonsQuotes"
    ) {
      return(
        "Homer is getting some work done and may not yield results"
      );
    }
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
      case "-m":
        var memeGenerator = require("./Features/Quote");
        var url = new Promise((resolve, reject) => {
          let result = memeGenerator.getQuote(command);
          if (!result) {
            reject("D-OH! No more doughnuts");
          }
          resolve(result);
        });
        url
          .then(result => {
            return(result || "D-OH! No more doughnuts");
          })
          .catch(error => {
            console.log(error);
          });
        break;
      case "-h":
        var help = require("./Features/Help");
        var helpPage = new Promise((resolve, reject) => {
          let result = help.help(command);
          if (!result) {
            reject("D-OH! No more doughnuts");
          }
          resolve(result);
        });
        helpPage
          .then(result => {
            return(result);
          })
          .catch(error => {
            console.log(error);
          });
        break;
      case "-c":
        var character = require("./Features/Character");
        var characterSearch = new Promise((resolve, reject) => {
          let result = character.characterSearch(command);
          if (!result) {
            reject("D-OH! No more doughnuts");
          }
          resolve(result);
        });
        characterSearch
          .then(result => {
            return(result);
          })
          .catch(error => {
            console.log(error);
          });
        break;
      case "-f":
        break;
    }
  }
};
module.exports = main;