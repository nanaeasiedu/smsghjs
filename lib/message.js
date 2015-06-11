var SMSGHError = require('./error')

/**
 * To check whether the given object contains the necssary params to send a message
 * @param  {Object}  obj
 * @return {Boolean}
 */
function isAnImportantParamMissing (obj) {
  var i = 0
  var l = Message._importantParams.length

  for (; i < l; i++) {
    var value = obj[Message._importantParams[i]]
    if (value === null || value === undefined) {
      return true
    }
  }
}

/**
 * The message object used in the send message api
 * @param {Object} opts Contains the params to be sent using the message api
 */
function Message (opts) {
  if (!(this instanceof Message)) return new Message(opts)

  this.type = opts.type || 0
  this.clientReference = opts.clientReference || null
  this.direction = opts.direction || null
  this.flashMessage = opts.flash || null
  this.messageId = opts.messageId || null
  this.networkId = opts.networkId || null
  this.rate = opts.rate || null
  this.registeredDelivery = opts.registeredDelivery || null
  this.status = opts.status || null
  this.time = opts.time || null
  this.udh = opts.udh || null
  this.units = opts.units || null
  this.updateTime = opts.updateTime || null

  if (isAnImportantParamMissing(opts)) {
    throw new SMSGHError('An important parameter is missing from the object provided. Important params are from, to and content')
  }

  var i = 0
  var l = Message._importantParams.length
  for (i = 0; i < l; i++) {
    this[Message._importantParams[i]] = opts[Message._importantParams[i]]
  }
}

/**
 * Returns the properties and values of the message object as JSON string
 * @return {String}
 */
Message.prototype.toJSON = function () {
  var objToJSON = {}
  var self = this

  for (var prop in self) {
    if (self.hasOwnProperty(prop) && self[prop] && typeof self[prop] !== 'function') {
      var value = self[prop]
      if (prop === 'to') {
        value = !~value.indexOf('+') ? ('+' + value) : value
      }
      objToJSON[prop.charAt(0).toUpperCase() + prop.substr(1)] = value
    }
  }

  return JSON.stringify(objToJSON)
}

Message.castToMessageObj = function (obj) {
  return new Message(obj)
}

Message._importantParams = ['content', 'from', 'to']

module.exports = Message
