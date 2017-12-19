/**
 * @file instantiation
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project framework-logger
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
const tap = require('tap')
const _fp = require('lodash/fp')
const Logger = require('../../lib/Logger')
const chalk = require('chalk')
/**
 *
 * @module instantiation
 */
const missingMethods = {
  log: function(){},
  info: function(){}
}

const customLogger = {
  log: function() {},
  info: function() {},
  warn: function() {},
  error: function() {}
}

const badTypes = {
  log: 1,
  info: function() {},
  warn: function() {},
  error: function() {}
}

const isCorrect = (LO,t) => {
  t.ok(_fp.isFunction(LO.log), 'Has log method.')
  t.ok(_fp.isFunction(LO.info), 'Has info method.')
  t.ok(_fp.isFunction(LO.warn), 'Has warn method.')
  t.ok(_fp.isFunction(LO.error), 'Has error method.')
}

tap.test('Instantiation', (t) => {

  t.test('Correctly instantiates with a valid logger object - console', (t) => {
    let logger = new Logger({Logger: console, Name: 'Test', verbocity: 3, logColor: 'green', chalk: chalk})
    isCorrect(logger, t)
    t.done()
  })

  t.test('Correctly instantiates with a valid logger object - custom', (t) => {
    let logger = new Logger({Logger: customLogger, Name: 'Test', verbocity: 4, logColor: 'green', chalk: chalk})
    isCorrect(logger, t)
    t.done()
  })

  t.test('Throws with an invalid logger object', (t) => {
    let MissingLogger = () => {
      let logger = new Logger({Logger: missingMethods, Name: 'Test', verbocity: 4, logColor: 'green', chalk: chalk})
    }
    t.throws(MissingLogger, "Class instantiation throws when provided a logger object missing methods.")
    t.done()
  })

  t.test('Throws with an logger object with incorrect types', (t) => {
    let MissingLogger = () => {
      let logger = new Logger({Logger: badTypes, Name: 'Test', verbocity: 4, logColor: 'green', chalk: chalk})
    }
    t.throws(MissingLogger, "Class instantiation throws when provided a logger object mithout all function types.")
    t.done()
  })

  t.test('Defaults to green when no logColor set.', (t) => {
    let logger = new Logger({Logger: console, Name: 'Test', verbocity: 4, chalk: chalk})
    t.equal(logger.logColor, 'green', "Corectly set the default.")

    t.done()
  })


  t.done()
})
