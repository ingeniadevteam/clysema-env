"use strict";

module.exports = async () => {
  // get a validate env object
  let env;
  try {
    env = await require("./validation")();
  } catch (e) {
    throw e;
  }

  return env;
};
