'use strict';

const env = require('..');
const validation = require('../validation');
const expect = require("chai").expect;
require('chai').use(require('chai-as-promised'));

describe('env()', () => {

  it(`env should be a function:`, () => {
    expect(env).to.be.a('function');
  });

  it(`should return the default config`, async () => {
    let ev = await env();
    expect(ev).to.be.deep.equal({
      env: 'production',
      isTest: false,
      isDevelopment: false,
      logger: {
        level: 'info',
        file: '/tmp/controller.log'
      }
    });
  });

  it(`should throw an error if NODE_ENV validation fails`, (done) => {
    let node_env = process.env.NODE_ENV;
    process.env.NODE_ENV = 'XXX';
    expect(env()).to.be.rejectedWith('"NODE_ENV" must be one of [development, production, test]')
      .notify(done);
    process.env.NODE_ENV = node_env;
  });
});

describe('validation()', async () => {
  let valid = await validation();

  it(`validation should be a function`, () =>
    expect(validation).to.be.a('function'));

  it(`should have a env property`, () =>
    expect(valid).to.have.own.property('env'));

  it(`env should be [development, production, test]`, () =>
    expect(['development', 'production', 'test']).to.include(valid.env));

  it(`should have a isTest property`, () =>
    expect(valid).to.have.own.property('isTest'));

  it(`isTest should be [true, false]`, () =>
    expect([true, false]).to.include(valid.isTest));

  it(`should have a isDevelopment property`, () =>
    expect(valid).to.have.own.property('isDevelopment'));

  it(`isDevelopment should be [true, false]`, () =>
    expect([true, false]).to.include(valid.isDevelopment));

  it(`should have a logger property`, () =>
    expect(valid).to.have.own.property('logger'));

  it(`should have a logger.level property`, () =>
    expect(valid.logger).to.have.own.property('level'));

  it(`logger.level should be [error, warn, info, debug]`, () =>
    expect(['error', 'warn', 'info', 'debug']).to.include(valid.logger.level));

  it(`should have a logger.file property`, () =>
    expect(valid.logger).to.have.own.property('file'));

  it(`logger.file should not be empty`, () =>
    expect(valid.logger.file).to.not.be.empty);
});
