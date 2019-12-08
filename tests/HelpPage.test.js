const help = require("../Features/Help");

/**
 * Help page test when no flag is used
 */
it("Shows the help page when no flag is used", async () => {
  let result = help.help(null);
  expect(result).toEqual(help.responsePage);
});

/**
 * Help page test when -h flag is used
 */
it("Shows the help page when -h flag is used", async () => {
  let result = help.help("-h");
  expect(result).toEqual(help.responsePage);
});
module.exports = this;
