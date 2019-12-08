const MAIN_HELP_PAGE = `
Greetings, friend. Do you wish to look as happy as me? Well, you've got the power inside you right now. Use it, by sending \`!homer -m <quote>\` to any channel and I will search Frinkiac for a meme representing your quote. Don't delay. Eternal happiness is only a command away!
`;

module.exports = {
  help: async command => {
    switch (command) {
      case null:
        return MAIN_HELP_PAGE;
      case "-m":
        return MAIN_HELP_PAGE;
      case "-h":
        return MAIN_HELP_PAGE;
      case "-c":
        return MAIN_HELP_PAGE;
      case "-f":
        return MAIN_HELP_PAGE;
      default:
        return MAIN_HELP_PAGE;
    }
  }
}