"use strict";

const joi = require('joi');

// the validation schema
const envSchema = joi.object({
  // enviroment setup
  NODE_ENV: joi.string()
  .valid('development', 'production', 'test')
  .default('production'),
  // logger level
  LOGGER_LEVEL: joi.string()
  .valid('error', 'warn', 'info', 'debug')
  .default('info'),
  // logger output file
  LOG_FILE: joi.string().default('/tmp/controller.log')
}).unknown()
.required();

module.exports = async function () {

  const validation = joi.validate(process.env, envSchema);

  if (validation.error) {
    const errors = [];
    validation.error.details.forEach( detail => {
      errors.push(detail.message);
    });
    // process failed
    throw new Error(`env validation error: ${errors.join(", ")}`);
  }

  // return the env object
  return {
    env: validation.value.NODE_ENV,
    isTest: validation.value.NODE_ENV === 'test',
    isDevelopment: validation.value.NODE_ENV === 'development',
    logger: {
      level: validation.value.LOGGER_LEVEL,
      file: validation.value.LOG_FILE
    }
  };
};
