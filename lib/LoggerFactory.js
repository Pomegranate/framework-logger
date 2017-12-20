/**
 * @file LoggerFacade
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project framework-logger
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
const PomegranateLogger = require('./Logger')

/**
 *
 * @module LoggerFacade
 */



module.exports = function LoggerFacade({Logger, verbocity, logColor, chalk}){
  return function(AppendName, opts = {overrideVerbocity: false, overrideColor: false}){
    let v_ovr = opts.overrideVerbocity >= 0 ? opts.overrideVerbocity : verbocity
    return new PomegranateLogger({
      Name: AppendName,
      Logger: Logger,
      verbocity: v_ovr,
      logColor: opts.overrideColor || logColor,
      chalk: chalk
    })
  }
}