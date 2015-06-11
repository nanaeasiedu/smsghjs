var SMSGHError = require('./lib/error')
var TopUp = require('./lib/topup')
var SendMessage = require('./lib/sendmsg')
var Message = require('./lib/message')

function SMSGH (clientId, clientSecret, apiKey) {
  if (!(this instanceof SMSGH)) return new SMSGH(clientId, clientSecret, apiKey)

  if (clientId === undefined || clientSecret === undefined) {
    throw new SMSGHError('Make sure clientid and clientSecret are both defined')
  }

  this.clientId = clientId
  this.clientSecret = clientSecret
  this.apiKey = apiKey
  this.versionNumber = 'v3'
  this.messageApi = new SendMessage(clientId, clientSecret, this.versionNumber)
  if (this.apiKey) this.topUpApi = new TopUp(apiKey)
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
