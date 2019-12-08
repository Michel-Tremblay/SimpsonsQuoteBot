const character = require('../Features/Character');

it('Should return link to character page on simpsons.fandom', async () => {
    await expect(character.characterSearch('apu')).resolves.toEqual('https://simpsons.fandom.com/wiki/Apu_Nahasapeemapetilon');
});

module.exports = this;