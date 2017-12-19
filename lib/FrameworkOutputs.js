/**
 * @file Outputs
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project framework-logger
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
const _fp = require('lodash/fp')
/**
 *
 * @module FrameworkOutputs
 */

class FrameworkOutputs{
  constructor({chalk, colored, logLevel, separator = '-', color = 'magenta'}){
    this.chalk = chalk
    this.colored = colored
    this.logLevel = logLevel
    this.separator = separator
    this.color = color
  }

  rightBar(message, separator, color){

    separator = separator || this.separator
    color = color || this.color

    let formatted = message ? message + ' ' : []
    let count = (formatted.length >= 80) ? 0 : 80 - formatted.length


    if(!count){
      formatted = _fp.truncate({length: 80}, formatted)
    } else {
      formatted = formatted + _fp.fill(0, count, separator ,  Array(count)).join('')
    }

    if(this.colored){
      return this.chalk.bold[color](formatted)
    }

    return formatted

  }

}

module.exports = FrameworkOutputs