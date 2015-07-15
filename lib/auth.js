var utils = require('./utils')
var SMSGHError = require('./error')

function Auth (clientId, clientSecret) {
  if (!arguments.length || arguments.length < 2) {
    throw new SMSGHError('Provide authentication parameters')
  }

  if (!(this instanceof Auth)) return new Auth(clientId, clientSecret)

  this.clientId = clientId
  this.clientSecret = clientSecret
  this.basicAuth = utils.encode(this.clientId + ':' + this.clientSecret)
}

module.exports = Auth
