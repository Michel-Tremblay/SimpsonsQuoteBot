const SUPPORTED_COMMANDS_REGEX = /./g;
const MAIN_HELP_PAGE = `
LINE ONE 
LINE TWO
`;

module.exports = {
  help: async command => {
    console.debug(command);
      if (!command) {
        return MAIN_HELP_PAGE;
      }
  }
}