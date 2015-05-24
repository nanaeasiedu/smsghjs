var util = require('util')

function SMSGHError (message) {
  Error.call(this)
  this.message = 'SMSGHJS: ' + message
  this.stack = new Error().stack
}
util.inherits(SMSGHError, Error)

SMSGHError.prototype.name = 'SMSGHError'
SMSGHError.prototype.toString = function () {
  return this.message
}

module.exports = SMSGHError
