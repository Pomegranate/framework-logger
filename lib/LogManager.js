/**
 * @file LogManager
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project framework-logger
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
const _fp = require('lodash/fp')
const DataLogger = require('./DataLogger')
/**
 *
 * @module LogManager
 */

module.exports = class LogManager {
  constructor(){
    this.handlers = []
  }

  process(source, severity, verbocity, message){
    _fp.each((handle) => {
      // console.log(source, severity, message)
      let cloneMessage = _fp.cloneDeep(message)
      handle(source, severity, verbocity, cloneMessage)
    }, this.handlers)
  }

  createLogger(source){
    return new DataLogger(source, this.process.bind(this))
  }

  addHandler(handler){
    this.handlers.push(handler)
  }
}