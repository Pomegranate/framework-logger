/**
 * @file loggerTypeChecker
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project framework-logger
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
const _fp = require('lodash/fp')
const required = ['log', 'warn', 'info', 'error']
/**
 *
 * @module loggerTypeChecker
 */

module.exports = function(Logger){
  let Props = Object.keys(Logger)
  let hasAll = _fp.difference(required, Props)
  if(hasAll.length){
    let errMsg = `Provided Logger Object is missing "${hasAll.join(', ')}" methods. Logger must implement "log, warn, info, error" methods`
    throw new Error(errMsg)
  }

  let AllFunction = _fp.reject((m) => {
    return _fp.isFunction(Logger[m])
  }, required)

  if(AllFunction.length){
    let errMsg = `Provided Logger Object has incorrect type for "${hasAll.join(', ')}" methods. All logger properties must be functions.`
    throw new Error(errMsg)
  }

  return Logger
}