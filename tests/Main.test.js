const router = require('../index');
const fs = require("fs");

it ('Should return meme link', async() => {
  fs.readFile('./samples/SampleDiscordMessage.json', async (err, data) => {
    await expect(router.routeMsg(data)).resolves.toEqual('https://frinkiac.com/meme/S09E17/942924?b64lines=V0hPQS4uLiBUSU1FIEhBUyBSQVZBR0VEIFlPVVIgT05DRS1ZT1VUSEZVTCBMT09LUy4%3D');
  });
});
