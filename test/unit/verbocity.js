/**
 * @file verbocity
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project framework-logger
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

const tap = require('tap')
const _fp = require('lodash/fp')
const Logger = require('../../lib/Logger')
const chalk = require('chalk')
/**
 *
 * @module verbocity
 */


const customLogger = {
  log: function(...args) {return args},
  info: function(...args) {return args},
  warn: function(...args) {return args},
  error: function(...args) {return args}
}


tap.test('Verbocity levels', (t) => {

  t.test('No verbocity', (t) => {
    let logger = new Logger({Logger: customLogger, Name: 'Test', verbocity: 0, logColor: 'green', chalk: chalk})

    let a = logger.log('this is a string', {obj: 'this is one', v: 1})
    let b = logger.warn('this is a string', {obj: 'this is one', v: 1})
    let c = logger.error('this is a string', {obj: 'this is one', v: 1})
    let d = logger.info('this is a string', {obj: 'this is one', v: 1})

    t.ok(a, 'Log output when no log level set.')
    t.ok(b, 'Log output when no log level set.')
    t.ok(c, 'Log output when no log level set.')
    t.ok(d, 'Log output when no log level set.')
    t.done()
  })

  t.test('Verbocity 0', (t) => {
    let logger = new Logger({Logger: customLogger, Name: 'Test', verbocity: 0, logColor: 'green', chalk: chalk})

    let a = logger.log('this is a string', {obj: 'this is one', v: 1}, 1)
    let b = logger.warn('this is a string', {obj: 'this is one', v: 1}, 2)
    let c = logger.error('this is a string', {obj: 'this is one', v: 1}, 3)
    let d = logger.info('this is a string', {obj: 'this is one', v: 1}, 4)

    t.notOk(a, 'No log output for level 1.')
    t.notOk(b, 'No log output for level 2.')
    t.notOk(c, 'No log output for level 3.')
    t.notOk(d, 'No log output for level 4.')
    t.done()
  })

  t.test('Verbocity 1', (t) => {
    let logger = new Logger({Logger: customLogger, Name: 'Test', verbocity: 1, logColor: 'green', chalk: chalk})

    let a = logger.log('this is a string', {obj: 'this is one', v: 1}, 1)
    let b = logger.warn('this is a string', {obj: 'this is one', v: 1}, 2)
    let c = logger.error('this is a string', {obj: 'this is one', v: 1}, 3)
    let d = logger.info('this is a string', {obj: 'this is one', v: 1}, 4)

    t.ok(a, 'Log output for level 1.')
    t.notOk(b, 'No log output for level 2.')
    t.notOk(c, 'No log output for level 3.')
    t.notOk(d, 'No log output for level 4.')
    t.done()
  })

  t.test('Verbocity 2', (t) => {
    let logger = new Logger({Logger: customLogger, Name: 'Test', verbocity: 2, logColor: 'green', chalk: chalk})

    let a = logger.log('this is a string', {obj: 'this is one', v: 1}, 1)
    let b = logger.warn('this is a string', {obj: 'this is one', v: 1}, 2)
    let c = logger.error('this is a string', {obj: 'this is one', v: 1}, 3)
    let d = logger.info('this is a string', {obj: 'this is one', v: 1}, 4)

    t.ok(a, 'Log output for level 1.')
    t.ok(b, 'Log output for level 2.')
    t.notOk(c, 'No log output for level 3.')
    t.notOk(d, 'No log output for level 4.')

    t.done()
  })

  t.test('Verbocity 3', (t) => {
    let logger = new Logger({Logger: customLogger, Name: 'Test', verbocity: 3, logColor: 'green', chalk: chalk})

    let a = logger.log('this is a string', {obj: 'this is one', v: 1}, 1)
    let b = logger.warn('this is a string', {obj: 'this is one', v: 1}, 2)
    let c = logger.error('this is a string', {obj: 'this is one', v: 1}, 3)
    let d = logger.info('this is a string', {obj: 'this is one', v: 1}, 4)

    t.ok(a, 'Log output for level 1.')
    t.ok(b, 'Log output for level 2.')
    t.ok(c, 'Log output for level 3.')
    t.notOk(d, 'No log output for level 4.')
    t.done()
  })

  t.test('Verbocity 4', (t) => {
    let logger = new Logger({Logger: customLogger, Name: 'Test', verbocity: 4, logColor: 'green', chalk: chalk})

    let a = logger.log('this is a string', {obj: 'this is one', v: 1}, 1)
    let b = logger.warn('this is a string', {obj: 'this is one', v: 1}, 2)
    let c = logger.error('this is a string', {obj: 'this is one', v: 1}, 3)
    let d = logger.info('this is a string', {obj: 'this is one', v: 1}, 4)

    t.ok(a, 'Log output for level 1.')
    t.ok(b, 'Log output for level 2.')
    t.ok(c, 'Log output for level 3.')
    t.ok(d, 'Log output for level 4.')
    t.done()
  })

  t.done()
})
