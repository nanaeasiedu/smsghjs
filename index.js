var SMSGHError = require('./lib/error')
var TopUp = require('./lib/topup')
var SendMessage = require('./lib/sendmsg')
var USP = require('./lib/usp')
var Message = require('./lib/message')
var Auth = require('./lib/auth')

function SMSGH (opts) {
  if (!(this instanceof SMSGH)) return new SMSGH(opts)

  if (!opts.clientId || !opts.clientSecret) {
    throw new SMSGHError('Make sure clientid and clientSecret are both defined')
  }

  this.auth = new Auth(opts.clientId, opts.clientSecret)
  this.versionNumber = 'v3'
  this.messageApi = new SendMessage(this.auth, this.versionNumber)
  if (opts.topupApiKey) this.topUpApi = new TopUp(opts.topupApiKey)
  if (opts.uspToken) this.uspApi = new USP(this.auth, opts.uspToken)
}

SMSGH.prototype.setContextPath = function (versionNumber) {
  if (typeof versionNumber === 'number') {
    versionNumber = 'v' + versionNumber
  }

  this.versionNumber = versionNumber
  this.messageApi.setContextPath(this.versionNumber)
}

SMSGH.TopUp = TopUp
SMSGH.SendMessage = SendMessage
SMSGH.Message = Message

module.exports = SMSGH
