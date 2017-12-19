/**
 * @file Logger
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project framework-logger
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
const checkLogger = require('./loggerTypeChecker')
const _fp = require('lodash/fp')
/**
 *
 * @module Logger
 */

class PomegranateLogger{
  constructor({Logger, Name, verbocity, logColor = 'green', chalk}){
    this.Logger = checkLogger(Logger)
    this.Name = `${Name}:`
    this.verbocity = verbocity
    this.logColor = logColor
    this.chalk = chalk
  }

  _doLog(args, method, color){
    //Bail early if this log is above the set verbocity
    if(_fp.isNumber(_fp.last(args))){

      // Remove the last argument from the array, so we have the correct array for logging later.
      let rv = args.splice(-1, 1)[0]
      if(rv > this.verbocity){
        return
      }
    }

    // Slap our name on the front.
    args.unshift(this.Name)


    /* Losing logged objects to [Object object] was a problem in Pomegranate v5.x
     * This was due to the entire array of arguments being supplied to chalk.
     * this would cast any objects inside to a string, and we all know what that results in.
     *
     * This way we only wrap existing string objects in colors.
     */
    let toLogger = _fp.map((item) => {
      if(_fp.isString(item)){
        return this.chalk[color](item)
      }
      return item
    }, args)

    /* Ill admit, Im not sure exactly why this has to be applied, but without it
     * It will log out the color escape codes.
     */
    return this.Logger[method].apply(this.Logger, toLogger)
  }

  log(...args){
    return this._doLog(args, 'log', this.logColor)
  }
  warn(...args){
    return this._doLog(args, 'log', 'yellow')
  }
  error(...args){
    return this._doLog(args, 'log', 'red')
  }
  info(...args){
    return this._doLog(args, 'log', 'blue')
  }

}


module.exports = PomegranateLogger
