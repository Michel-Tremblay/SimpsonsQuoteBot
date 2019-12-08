const quote = require('../Features/Quote');

it('requests a meme and returns the URL', async () => {
  await expect(quote.getQuote('my retirement grease')).resolves.toEqual('https://frinkiac.com/meme/S10E01/1120785?b64lines=KCBnYXNwaW5nKTogTVkgUkVUSVJFTUVOVCBHUkVBU0Uh');
});

module.exports = this;