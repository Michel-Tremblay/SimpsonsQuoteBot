const help = require("../Features/Help");

/**
 * Help page test when no flag is used
 */
it("Shows the help page when no flag is used", async () => {
  let result = help.help(null);
  result.then(res => {
    expect(res).toEqual(help.MAIN_HELP_PAGE);
  });
});

/**
 * Help page test when -h flag is used
 */
it("Shows the help page when -h flag is used", async () => {
  console.debug(help);
  let result = help.help("-h");
  result.then(res => {
    expect(res).toEqual(help.MAIN_HELP_PAGE);
  });
});
module.exports = this;
