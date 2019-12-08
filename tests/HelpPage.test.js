const help = require('../Features/Help');

/**
 * Help page test when no flag is used
 */
it('Shows the help page when no flag is used', async () => {
  let result = help.help(null);
  result.then(res => {
    expect(res).toEqual(`
  Greetings, friend. Do you wish to look as happy as me? Well, you've got the power inside you right now. Use it, by sending \`!homer -m <quote>\` to any channel and I will search Frinkiac a meme representing your quote. Don't delay. Eternal happiness is only a command away!
  ` );
  });
});

/**
 * Help page test when -h flag is used
 */
it('Shows the help page when -h flag is used', async () => {
  let result = help.help("-h");
  result.then(res => {
    expect(res).toEqual(`
  Greetings, friend. Do you wish to look as happy as me? Well, you've got the power inside you right now. Use it, by sending \`!homer -m <quote>\` to any channel and I will search Frinkiac a meme representing your quote. Don't delay. Eternal happiness is only a command away!
  `);
});
});

/**
 * Help page test when -m flag is used
 */
it('Shows the help page when -h flag is used', async () => {
  let result = help.help("-m");
  result.then(res => {
    expect(res).toEqual(`
  Greetings, friend. Do you wish to look as happy as me? Well, you've got the power inside you right now. Use it, by sending \`!homer -m <quote>\` to any channel and I will search Frinkiac a meme representing your quote. Don't delay. Eternal happiness is only a command away!
  `);
});
});

/**
 * Help page test when -c flag is used
 */
it('Shows the help page when -h flag is used', async () => {
  let result = help.help("-c");
  result.then(res => {
    expect(res).toEqual(`
  Greetings, friend. Do you wish to look as happy as me? Well, you've got the power inside you right now. Use it, by sending \`!homer -m <quote>\` to any channel and I will search Frinkiac a meme representing your quote. Don't delay. Eternal happiness is only a command away!
  `);
});
});

/**
 * Help page test when -f flag is used
 */
it('Shows the help page when -h flag is used', async () => {
  let result = help.help("-c");
  result.then(res => {
    expect(res).toEqual(`
  Greetings, friend. Do you wish to look as happy as me? Well, you've got the power inside you right now. Use it, by sending \`!homer -m <quote>\` to any channel and I will search Frinkiac a meme representing your quote. Don't delay. Eternal happiness is only a command away!
  `);
});
});
module.exports = this;