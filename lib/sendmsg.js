var httpClient = require('./httpclient')
var Message = require('./message')
var util = require('./util')

function SendMessage (clientId, clientSecret, callback) {
  if (!(this instanceof SendMessage)) return new SendMessage(clientId, clientSecret)
  this.clientId = clientId
  this.clientSecret = clientSecret
  this._auth = util.encode(this.clientId + ':' + this.clientSecret)
  this._callback = callback || function () {}
  this._headers = {
    'Accept': 'application/json',
    'Authorization': 'Basic ' + this._auth
  }
  this.lastQueryTime
}

SendMessage.prototype._callbackProvider = function (cb) {
  return (cb && typeof cb === 'function') ? cb : this._callback
}

SendMessage.prototype.setContextPath = function (versionNumber) {
  if (typeof versionNumber === 'number') {
    versionNumber = 'v' + versionNumber
  }

  this.versionNumber = versionNumber
  SendMessage.BASE_URL.replace(/v\d*/, this.versionNumber)
}

SendMessage.prototype.send = function (obj, callback) {
  if (!(obj instanceof Message)) {
    obj = Message.castToMessageObj(obj)
  }

  callback = this._callbackProvider(callback)

  httpClient.post({
    url: SendMessage.BASE_URL,
    headers: util.merge(this._headers, {'Content-Type': 'application/json'}),
    data: obj.toJSON()
  }, function (err, res) {
    if (err) return callback(err, res)
    if (res.status === 201 || (res.status / 100 | 0) === 2) {
      callback(null, res.body)
    }
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

SendMessage.prototype.sendScheduledMessage = function (obj, callback) {
  if (!(obj instanceof Message)) {
    obj = Message.castToMessageObj(obj)
  }

  if (!obj.time) {
    throw new Error('A scheduled message object must have a time value')
  }

  this.send(obj, callback)
}

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
    throw new Error('You must query within 5 second intervals.')
  }

  this.lastQueryTime = Date.now()
  callback = this._callbackProvider(callback)

  httpClient.get({
    url: SendMessage.BASE_URL + '?' + util.serialize(obj),
    headers: this._headers
  }, function (err, res) {
    if (err) return callback(err, res)
    callback(null, res)
  })
}

SendMessage.prototype.rescheduleMessage = function (msgId, time, callback) {
  if (!msgId) {
    throw new Error('Provide the message id of the message to be rescheduled')
  }

  callback = this._callbackProvider(callback)

  httpClient.put({
    url: SendMessage.BASE_URL + '/' + msgId,
    headers: util.merge(this._headers, {'Content-Type': 'application/json'}),
    data: {
      Time: time
    }
  }, function (err, res) {
    if (err) return callback(err, res)
    callback(null, res)
  })
}

SendMessage.prototype.cancel = function (msgId, callback) {
  callback = this._callbackProvider(callback)
  httpClient.del({
    url: SendMessage.BASE_URL + '/' + msgId,
    headers: this._headers
  }, function (err, res) {
    if (err) return callback(err, res)
    callback(null, res)
  })
}

SendMessage.BASE_URL = 'https://api.smsgh.com/v3/messages'

module.exports = SendMessage
