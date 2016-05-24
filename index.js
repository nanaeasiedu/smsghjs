var SMSGHError = require('./lib/error')
var TopUp = require('./lib/topup')
var SendMessage = require('./lib/sendmsg')
var USP = require('./lib/usp')
var Message = require('./lib/message')
var Auth = require('./lib/auth')

function SMSGH (opts) {
  if (!(this instanceof SMSGH)) return new SMSGH(opts)

  if (!opts.clientId || !opts.clientSecret) {
    throw new SMSGHError('`clientId` or `clientSecret` is undefined in the options provided')
  }

  this.auth = new Auth(opts.clientId, opts.clientSecret)
  this.versionNumber = 'v3'
  this.messaging = new SendMessage(this.auth, this.versionNumber)
  if (opts.topupApiKey) this.topUp = new TopUp(opts.topupApiKey)
  if (opts.uspToken) this.usp = new USP(this.auth, opts.uspToken)
}

SMSGH.prototype.setContextPath = function (versionNumber) {
  if (typeof versionNumber === 'number') {
    versionNumber = 'v' + versionNumber
  }

  this.versionNumber = versionNumber
  this.messaging.setContextPath(this.versionNumber)
}

SMSGH.TopUp = TopUp
SMSGH.SendMessage = SendMessage
SMSGH.Message = Message

module.exports = SMSGH
