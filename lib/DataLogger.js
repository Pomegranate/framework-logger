/**
 * @file DataLogger
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project framework-logger
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
const _fp = require('lodash/fp')
/**
 * Provides a common log interface
 * @module DataLogger
 */

function getVerbArgs(args){
  if(_fp.isNumber(_fp.last(args))){

    // Remove the last argument from the array, so we have the correct array for logging later.
    let rv = args.splice(-1, 1)[0]
    return [rv, args]
  }
  return [0, args]
}

module.exports = class Logger{
  constructor(source, processor){
    this.source = source
    this.processor = processor
  }

  info(...args){
    let verbArgs = getVerbArgs(args)
    this.processor(this.source, 'info', verbArgs[0], verbArgs[1])
  }
  log(...args){
    let verbArgs = getVerbArgs(args)
    this.processor(this.source, 'log', verbArgs[0], verbArgs[1])
  }
  warn(...args){
    let verbArgs = getVerbArgs(args)
    this.processor(this.source, 'warn', verbArgs[0], verbArgs[1])
  }
  error(...args){
    let verbArgs = getVerbArgs(args)
    this.processor(this.source, 'error', verbArgs[0], verbArgs[1])
  }
}