/**
 * @file Outputs
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project framework-logger
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
const tap = require('tap')
const _fp = require('lodash/fp')
const Outputs = require('../../lib/FrameworkOutputs')
const chalk = require('chalk')

/**
 *
 * @module Outputs
 */

tap.test('Framework outputs', (t) => {

  t.test('Right Bar output - With color', (t) => {
    let Color = new Outputs({chalk:chalk, colored: true, logLevel:4})
    let none = Color.rightBar()
    let short = Color.rightBar('one', '*')
    let long = Color.rightBar('123456789012345678901234567890123456789012345678901234567890abcdefghijklmopqrstuvwxyz', '*')
    t.equal(none.length, 99, 'No input outputs 98 chars with color codes.')
    t.equal(short.length, 99, 'Short input outputs 98 chars with color codes.')
    t.equal(long.length, 99, 'Long input outputs 98 chars with color codes.')
    t.done()
  })

  t.test('Right Bar output - No color', (t) => {
    let Color = new Outputs({chalk:chalk, colored: false, logLevel:4})
    let none = Color.rightBar()
    let short = Color.rightBar('one', '*', 'red')
    let long = Color.rightBar('123456789012345678901234567890123456789012345678901234567890abcdefghijklmopqrstuvwxyz', '*', 'red')
    t.equal(none.length, 80, 'Short input outputs 80 chars without color codes.')
    t.equal(short.length, 80, 'Short input outputs 80 chars without color codes.')
    t.equal(long.length, 80, 'Long input outputs 80 chars without color codes.')
    t.done()
  })

  t.done()

})