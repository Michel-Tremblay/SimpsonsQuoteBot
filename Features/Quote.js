const frinkiac = require('frinkiac');
const rp = require('request-promise');

const MEME_QUOTE_PUNCTUATION_TOLERANCE_REGEX = /[,.'"]/gm;

module.exports = {
  getQuote: async (quote) => {
    const url = frinkiac.searchURL(quote);
    const options = {
      uri: url,
      headers: {
        'User-Agent': 'Request-Promise',
      },
      json: true,
    };
    try {
      const results = await rp(options).catch((errors) => errors);
      const result = results[0];
      const captionURL = frinkiac.captionURL(result.Episode, result.Timestamp);
      const memes = await rp(captionURL)
        .then((body) => JSON.parse(body))
        .catch((errors) => errors);
      const subtitle = memes.Subtitles.find((title) => {
        const match = title.Content.replace(
          MEME_QUOTE_PUNCTUATION_TOLERANCE_REGEX,
          '',
        );
        return match.toLowerCase().includes(quote.toLowerCase());
      });
      if (!subtitle) {
        throw new Error('No result');
      }
      return frinkiac.memeURL(
        subtitle.Episode,
        subtitle.RepresentativeTimestamp,
        subtitle.Content,
      );
    } catch (e) {
      return e;
    }
  },
};
