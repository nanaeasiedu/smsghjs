var SMSGHError = require('./error')
var utils = require('./utils')
var httpClient = require('./httpClient')

function callbackWrapper (cb) {
  if (!cb || typeof cb !== 'function') {
    throw new SMSGHError('Provide callback for api request')
  }

  return function (err, res) {
    if (err) return cb(err, null)

    return cb(null, res.body)
  }
}

function USP (auth, token) {
  if (!auth) {
    throw new SMSGHError('Provide the auth object for authentication')
  }

  if (!(this instanceof USP)) return new USP(auth)
  this.defaultHeaders = {
    'Authorization': 'Basic ' + auth.basicAuth,
    'Cotent-Type': 'application/json',
    'Accept': 'application/json'
  }
}

USP.prototype.topupAirtime = function (network, amount, number, cb) {
  network = USP.NETWORK_IDS[network.toLowerCase()]
  var self = this

  if (!utils.isValidTelephoneNumber(number)) {
    throw new SMSGHError('Number `' + number + ' is invalid ')
  }

  cb = callbackWrapper(cb)

  httpClient.post({
    url: USP.BASE_URL + 'usp/airtime',
    headers: this.defaultHeaders,
    data: {
      network: network.toString(),
      amount: amount,
      phone: number,
      token: self.token
    }
  }, cb)
}

USP.prototype.payDSTV = function (account, amount, cb) {
  if (arguments.length < 2) {
    throw new SMSGHError('Provide a an account and amount')
  }
  var self = this
  cb = callbackWrapper(cb)

  httpClient.post({
    url: USP.BASE_URL + 'usp/dstv',
    headers: this.defaultHeaders,
    data: {
      account: account,
      amount: amount,
      token: self.token
    }
  }, cb)
}

USP.prototype.querySurflineDevice = function (number, cb) {
  if (!utils.isValidTelephoneNumber(number)) {
    throw new SMSGHError('Number `' + number + ' is invalid ')
  }

  cb = callbackWrapper(cb)

  httpClient.post({
    url: USP.BASE_URL + 'usp/surfline?' + number,
    headers: this.defaultHeaders,
    data: {}
  }, cb)
}

USP.prototype.bundleSurflinePlus = function (device, amount, cb) {
  if (amount > 50 || !~[1, 5, 10, 20, 50].indexOf(amount)) {
    throw new SMSGHError('Make sure the specified amount is in the range of 1,5,10,20,50')
  }
  var self = this
  cb = callbackWrapper(cb)

  httpClient.post({
    url: USP.BASE_URL + 'usp/surflineplus',
    header: this.defaultHeaders,
    data: {
      device: device.toString(),
      amount: amount,
      token: self.token
    }
  }, cb)
}

USP.prototype.bundleSurfline = function (device, amount, bundle, cb) {
  if (amount > 50 || !~[1, 5, 10, 20, 50].indexOf(amount)) {
    throw new SMSGHError('Make sure the specified amount is in the range of 1,5,10,20,50')
  }

  cb = callbackWrapper(cb)
  var self = this
  httpClient.post({
    url: USP.BASE_URL + 'usp/surflineplus',
    header: this.defaultHeaders,
    data: {
      device: device.toString(),
      amount: amount,
      bundle: bundle,
      token: self.token
    }
  }, cb)
}

USP.prototype.vodafoneInternet = function (account, amount, cb) {
  cb = callbackWrapper(cb)
  var self = this
  httpClient.post({
    url: USP.BASE_URL + 'usp/vodafone-internet',
    header: this.defaultHeaders,
    data: {
      account: account,
      amount: amount,
      token: self.token
    }
  }, cb)
}

USP.prototype.payVodafoneBills = function (account, amount, service, cb) {
  if (service !== 'postpaid' || service !== 'broadband') {
    throw new SMSGHError('The service should be either postpaid or broadband')
  }

  cb = callbackWrapper(cb)
  var self = this
  httpClient.post({
    url: USP.BASE_URL + 'usp/vodafone',
    header: this.defaultHeaders,
    data: {
      account: account,
      amount: amount,
      service: service
    }
  }, cb)
}

USP.prototype.getAccountBalance = function (cb) {
  cb = callbackWrapper(cb)

  httpClient.get({
    url: USP + 'usp/account/' + self.token,
    header: this.defaultHeaders
  }, cb)
}

USP.NETWORK_IDS = {
  airtel: 62006,
  vodafone: 62002,
  expresso: 62004,
  mtn: 62001,
  globacom: 62007,
  tigo: 62003
}

USP.BASE_URL = 'https://api.smsgh.com/'

module.exports = USP
