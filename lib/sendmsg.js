var util = require('util')
var httpClient = require('./httpclient')
var Message = require('./message')
var utils = require('./utils')
var SMSGHError = require('./error')

/**
 * The main constructor used for sending messages
 * @param {Auth} auth       The authentication details
 * @param {String} apiVersion The API version to use for request (Versioned API)
 */
function SendMessage (auth, apiVersion) {
  if (!(this instanceof SendMessage)) return new SendMessage(auth, apiVersion)
  this._noopCallback = function () {}
  this._headers = {
    'Accept': 'application/json',
    'Authorization': 'Basic ' + auth.basicAuth
  }
  this.versionNumber = apiVersion || 'v3'
  this.lastQueryTime = 0
  this.setContextPath()
}

SendMessage.prototype._callbackProvider = function (cb) {
  return (cb && typeof cb === 'function') ? cb : this._noopCallback
}

/**
 * setContextPath is used to set the version to use for the API requests
 * @param {String} versionNumber
 */
SendMessage.prototype.setContextPath = function (versionNumber) {
  versionNumber = versionNumber || this.versionNumber
  SendMessage.BASE_URL = util.format(SendMessage.BASE_URL_PLC, versionNumber)
}

/**
 * sends a message
 * @param {Message} The message object to send
 * @param {Function} A callback to handle the request
 */
SendMessage.prototype.send = function (obj, callback) {
  if (!(obj instanceof Message)) {
    obj = Message.castToMessageObj(obj)
  }

  callback = this._callbackProvider(callback)

  httpClient.post({
    url: SendMessage.BASE_URL,
    headers: utils.merge(this._headers, {'Content-Type': 'application/json'}),
    data: obj.toJSON()
  }, function (err, res) {
    if (err) return callback(err, res)
    if (res.status === 201 || (res.status / 100 | 0) === 2) {
      return callback(null, res.body)
    }

    callback(null, res.body)
  })
}

SendMessage.prototype.sendQuickMessage = function (from, to, content, cb) {
  var msgObj = new Message({
    from: from,
    to: to,
    content: content
  })

  this.send(msgObj, cb)
}

/**
 * sends a scheduled message
 * @param {Message} The message object to send
 * @param {Function} A callback to handle the request
 */
SendMessage.prototype.sendScheduledMessage = function (obj, callback) {
  if (!(obj instanceof Message)) {
    obj = Message.castToMessageObj(obj)
  }

  if (!obj.time) {
    throw new SMSGHError('A scheduled message object must have a time value')
  }

  this.send(obj, callback)
}

/**
 * Get the details of a message
 * @param  {String}   msgId    The ID of the message
 * @param  {Function} callback The callback called when the response arrives
 */
SendMessage.prototype.getMessage = function (msgId, callback) {
  callback = this._callbackProvider(callback)

  httpClient.get({
    headers: this._headers,
    url: SendMessage.BASE_URL + '/' + msgId
  }, function (err, res) {
    if (err) return callback(err, res)
    callback(null, res.body)
  })
}

SendMessage.prototype.queryMessage = function (obj, callback) {
  if (this.lastQueryTime && (~~((Date.now() - this.lastQueryTime) / 1000)) < 5) {
    throw new SMSGHError('Query must be within 5 second intervals')
  }

  this.lastQueryTime = Date.now()
  callback = this._callbackProvider(callback)

  httpClient.get({
    url: SendMessage.BASE_URL + '?' + utils.serialize(obj),
    headers: this._headers
  }, function (err, res) {
    if (err) return callback(err, res)
    callback(null, res.body)
  })
}

/**
 * Reschedules a message to be that has already been scheduled
 * @param  {String}   msgId    The ID of the message to be reschueduled
 * @param  {Date | String}   time     The time to use for the new schedule
 * @param  {Function} callback Function called when request finishes
 */
SendMessage.prototype.rescheduleMessage = function (msgId, time, callback) {
  if (!msgId) {
    throw new SMSGHError('Provide the message id of the message to be rescheduled')
  }

  callback = this._callbackProvider(callback)

  httpClient.put({
    url: SendMessage.BASE_URL + '/' + msgId,
    headers: utils.merge(this._headers, {'Content-Type': 'application/json'}),
    data: {
      Time: time
    }
  }, function (err, res) {
    if (err) return callback(err, res)
    callback(null, res.body)
  })
}

SendMessage.prototype.cancel = function (msgId, callback) {
  callback = this._callbackProvider(callback)
  httpClient.del({
    url: SendMessage.BASE_URL + '/' + msgId,
    headers: this._headers
  }, function (err, res) {
    if (err) return callback(err, res)
    callback(null, res.body)
  })
}

SendMessage.BASE_URL_PLC = 'https://api.smsgh.com/%s/messages'
SendMessage.BASE_URL = ''

module.exports = SendMessage
