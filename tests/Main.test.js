const fs = require('fs');
const router = require('../index');

it('Should return meme link', async () => {
  try {
    fs.readFile('./samples/SampleDiscordMessage.json', async (err, data) => {
      if (err) {
        return err;
      }
      await expect(router.routeMsg(JSON.parse(data)))
        .resolves.toEqual('https://frinkiac.com/meme/S09E17/942924?b64lines=V0hPQS4uLiBUSU1FIEhBUyBSQVZBR0VEIFlPVVIgT05DRS1ZT1VUSEZVTCBMT09LUy4%3D');
      return null;
    });
  } catch (e) {
    return e;
  }
  return null;
});
