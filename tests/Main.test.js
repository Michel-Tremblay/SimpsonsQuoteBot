const fs = require('fs');
const path = require('path');
const router = require('../Features/MessageRouter');
const help = require('../Features/Help');
// message samples
const memeMessageJson = 'samples/MemeMessage.json';
const helpMessageJson = 'samples/HelpMessage.json';
const defaultMessageJson = 'samples/NoFlagMessage.json';
const InvalidFlagMessageJson = 'samples/InvalidFlagMessage.json';
const NonQuoteMessageJson = 'samples/NonQuoteMessage.json';
const NoTriggerMessageJson = 'samples/NoTriggerMessage.json';

// eslint-disable-next-line consistent-return
it('Should return meme link', () => {
  const jsonData = fs.readFileSync(path.join(__dirname, memeMessageJson), 'utf8');
  const message = JSON.parse(jsonData);
  router.routeMsg(message).then((msg) => {
    expect(msg).toEqual('https://frinkiac.com/meme/S09E17/942924?b64lines=V0hPQS4uLiBUSU1FIEhBUyBSQVZBR0VEIFlPVVIgT05DRS1ZT1VUSEZVTCBMT09LUy4%3D');
  }).catch((error) => error);
});

// eslint-disable-next-line consistent-return
it('Should return help message', () => {
  const jsonData = fs.readFileSync(path.join(__dirname, helpMessageJson), 'utf8');
  const message = JSON.parse(jsonData);
  router.routeMsg(message).then((msg) => {
    expect(msg).toEqual(help.responsePage);
  }).catch((error) => error);
});

// eslint-disable-next-line consistent-return
it('Should return help message (no flag)', () => {
  const jsonData = fs.readFileSync(path.join(__dirname, defaultMessageJson), 'utf8');
  const message = JSON.parse(jsonData);
  router.routeMsg(message).then((msg) => {
    expect(msg).toEqual(help.responsePage);
  }).catch((error) => error);
});

// eslint-disable-next-line consistent-return
it('Should return help message (invalid flag)', () => {
  const jsonData = fs.readFileSync(path.join(__dirname, InvalidFlagMessageJson), 'utf8');
  const message = JSON.parse(jsonData);
  router.routeMsg(message).then((msg) => {
    expect(msg).toEqual(help.responsePage);
  }).catch((error) => error);
});

// eslint-disable-next-line consistent-return
it('Should return meme not found message', () => {
  const jsonData = fs.readFileSync(path.join(__dirname, NonQuoteMessageJson), 'utf8');
  const message = JSON.parse(jsonData);
  router.routeMsg(message).then((msg) => {
    expect(msg).toEqual('D-OH! No more :doughnut: :doughnut:');
  }).catch((error) => error);
});

// eslint-disable-next-line consistent-return
it('Should return meme not found message', () => {
  const jsonData = fs.readFileSync(path.join(__dirname, NoTriggerMessageJson), 'utf8');
  const message = JSON.parse(jsonData);
  router.routeMsg(message).then((msg) => {
    expect(msg).toEqual('');
  }).catch((error) => error);
});
