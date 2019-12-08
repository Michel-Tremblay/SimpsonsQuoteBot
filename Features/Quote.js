const frinkiac = require("frinkiac");
const rp = require("request-promise");

const MEME_QUOTE_PUNCTUATION_TOLERANCE_REGEX = /[,.'"]/gm;

module.exports = {
  getQuote: async quote => {
    let url = frinkiac.searchURL(quote);
    let options = {
      uri: url,
      headers: {
        "User-Agent": "Request-Promise"
      },
      json: true
    };
    let res = await rp(options)
      .then(
        results => {
          let result = results[0];
          let url = frinkiac.captionURL(result.Episode, result.Timestamp);
          return rp(url)
            .then(body => {
              return JSON.parse(body);
            })
            .catch(reason => {
              console.debug(reason);
            });
        },
        reason => {
          return reason;
        }
      )
      .catch(reason => {
        return reason;
      })
      .then(memes => {
        var result = "";
        memes.Subtitles.forEach(subtitle => {
          let match = subtitle.Content.replace(
            MEME_QUOTE_PUNCTUATION_TOLERANCE_REGEX,
            ""
          );
          if (match.toLowerCase().indexOf(quote.toLowerCase()) !== -1) {
            result = frinkiac.memeURL(
              subtitle.Episode,
              subtitle.RepresentativeTimestamp,
              subtitle.Content
            );
          }
        });
        return result;
      });
    return res;
  }
};
