"use strict";

module.exports = async () => {
  // get a validate env object
  let env;
  try {
    env = await require("./validation")();
  } catch (e) {
    throw new Error('"NODE_ENV" must be one of [development, production, test]');
  }

  return env;
};
