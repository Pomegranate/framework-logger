/**
 * @file LogManager
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project framework-logger
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';

const tap = require('tap')
const _fp = require('lodash/fp')
const DataLogger = require('../../lib/DataLogger')
const LogManager = require('../../lib/LogManager')

tap.test('Creating a LogManager', (t) => {

  let Manager = new LogManager()
  t.type(Manager, LogManager)

  t.test('Handling Messages', (t) => {


    t.test('Creating a logger and handling messages', (t) => {

      Manager.addHandler((source, severity,level, messageArr) => {
        t.equal(source, 'test', `Log source is test - ${severity}`)
        t.ok(severity, `Log severity - ${severity}`)
        if(severity === 'error'){
          t.equal(level, 4, `Log level is 4 - ${severity}`)
        } else {
          t.equal(level, 0, `Log level is 0 - ${severity}`)
        }
      })

      let Logger = Manager.createLogger('test')
      t.type(Logger, DataLogger)
      Logger.info('hello')
      Logger.log('hello')
      Logger.warn('uhoh')
      Logger.error('boom', 4)

      t.done()
    })
    t.done()
  })

  t.done()
})