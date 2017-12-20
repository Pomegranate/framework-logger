/**
 * @file Facade
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project framework-logger
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

const tap = require('tap')
const _fp = require('lodash/fp')
const LoggerF = require('../../lib/LoggerFactory')
const chalk = require('chalk')
/**
 *
 * @module Factory
 */

const customLogger = {
  log: function(...args) {return args},
  info: function(...args) {return args},
  warn: function(...args) {return args},
  error: function(...args) {return args}
}

tap.test('Facade wrapping Logger', (t) => {

  t.test('Creates Named Instances', (t) => {
    let LoggerFactory = LoggerF({
      Logger: customLogger,
      verbocity: 4,
      logColor: 'green',
      chalk:chalk
    })

    t.type(LoggerFactory, 'function')

    let Pomegranate = LoggerFactory('Pomegranate', {overrideColor: 'magenta'})
    let out1 = Pomegranate.log('hello')

    t.equal(out1.length, 2, 'args contains 2 items.')
    t.match(out1[0], /35m/, 'Has the correct color code')
    t.match(out1[1], /35m/, 'Has the correct color code')
    t.match(out1[0], /Pomegranate/, 'Has the correct prefix')


    let Default = LoggerFactory('Default')
    let out2 = Default.log('hello')
    t.equal(out2.length, 2, 'args contains 2 items.')
    t.match(out2[0], /32m/, 'Has the correct color code')
    t.match(out2[1], /32m/, 'Has the correct color code')
    t.match(out2[0], /Default/, 'Has the correct prefix')


    t.done()
  })

  t.test('Overriding verbocity', (t) => {
    let LoggerFactory = LoggerF({
      Logger: customLogger,
      verbocity: 4,
      logColor: 'green',
      chalk:chalk
    })
    let Color = LoggerFactory('Color', {overrideVerbocity: 0})
    let v0 = Color.log('hello', 0)
    let v1 = Color.log('hello', 1)
    let v2 = Color.log('hello', 2)
    let v3 = Color.log('hello', 3)
    let v4 = Color.log('hello', 4)

    t.ok(v0, 'Logs 0 verbiocity')
    t.notOk(v1, 'Does not log 1 verbocity')
    t.notOk(v2, 'Does not log 2 verbocity')
    t.notOk(v3, 'Does not log 3 verbocity')
    t.notOk(v4, 'Does not log 4 verbocity')

    t.done()
  })

  t.done()
})