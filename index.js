require("dotenv").config();
const Discord = require("discord.js");
const Promise = require("bluebird");
const rp = require("request-promise");
const bot = new Discord.Client();
const process = require("process");
const TOKEN = process.env.TOKEN;
const DEBUG_MODE = process.env.DEBUG;
const frinkiac = require("frinkiac");

const MEME_QUOTE_PUNCTUATION_TOLERANCE_REGEX = /[,.']/gm;

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
    let quote = msg.content.split("!homer");
    quote = quote.filter(quote => {
      return quote !== "";
    });
    quote = quote[0].trim();
    let url = frinkiac.searchURL(quote);
    let options = {
      uri: url,
      headers: {
        "User-Agent": "Request-Promise"
      },
      json: true
    };
    rp(options)
      .then(
        results => {
          let memes = [];
          results.forEach(result => {
            memes.push(frinkiac.captionURL(result.Episode, result.Timestamp));
          });
          return Promise.map(memes, obj => {
            return rp(obj)
              .then(body => {
                return JSON.parse(body);
              })
              .catch(reason => {
                console.debug(reason);
              });
          });
        },
        reason => {
          msg.channel.send(reason);
        }
      ).then(
        memes => {
          return new Promise((resolve, reject) => {
            let knownEpisodes = [];
            if (!memes) {
              return reject("Could not resolve memes");
            }
            let responses = [];
            responses.push(
              memes.forEach(meme => {
                return new Promise((resolve, reject) => {
                  let reply = "";
                  meme.Subtitles.forEach(subtitle => {
                    let match = subtitle.Content.replace(
                      MEME_QUOTE_PUNCTUATION_TOLERANCE_REGEX,
                      ""
                    );
                    if (
                      (match.toLowerCase().indexOf(quote.toLowerCase()) !==
                        -1 ||
                        match.toLowerCase() == quote.toLowerCase()) &&
                      !knownEpisodes.includes(subtitle.Episode)
                    ) {
                      console.log(`Another Match ${match}`);
                      knownEpisodes.push(subtitle.Episode);
                      console.log(subtitle.Episode + "\n");
                      console.log(subtitle.RepresentativeTimestamp + "\n");
                      console.log(subtitle.Content + "\n");
                      msg.channel.send(
                        `${frinkiac.memeURL(
                          subtitle.Episode,
                          subtitle.RepresentativeTimestamp,
                          subtitle.Content
                        )}`
                      );
                      return;
                    }
                  });
                  if (reply == "") {
                    reject("DOH! Outta memes");
                  }
                  resolve(reply);
                });
              })
            );
            return resolve(responses);
          });
        },
        reason => {
          console.log(reason);
        }
      )
      .then(
        memes => {
          if (!memes) {
            setTimeout(() => {
              if (!memes) {
                msg.channel.send(memes);
              } else {
                msg.channel.send("DOH! Outta beer");
              }
            }, 3000);
          }
        },
        reason => {
          msg.channel.send(reason);
        }
      );
  }
});
