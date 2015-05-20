var request = require('superagent')

function HTTPClient (opts, callback) {
  if (!opts.url) {
    throw new Error('Provide a url for the request')
  }

  this.url = opts.url
  this.method = opts.method === 'delete' ? 'del' : opts.method
  this.data = opts.data || null
  this.headers = opts.headers || {}
  this.request = request[this.method](this.url)
  this.cb = callback && typeof callback === 'function' ? callback : function () {}

  this.headers['Accept'] = 'application/json'
  this.prepareForReq()
  this.makeRequest()
}

HTTPClient.prototype.setHeader = function (headers, val) {
  if (typeof headers === 'string' && val) {
    var actualHeader = headers
    headers = {}
    headers[actualHeader] = val
  }
  for (var prop in headers) {
    if (headers.hasOwnProperty(prop)) this.headers[prop] = headers[prop]
  }
}

HTTPClient.prototype.prepareForReq = function () {
  this.request.set(this.headers)
  if (this.data) {
    this.request.send(this.data)
  }
}

HTTPClient.prototype.makeRequest = function () {
  var self = this
  this.request.end(function (err, res) {
    if (err) {
      return self.cb(err, res)
    }
    self.cb(null, res)
  })
}

function httpClient (opts, callback) {
  return new HTTPClient(opts, callback)
}

['get', 'post', 'put'].forEach(function (method) {
  httpClient[method] = function (opts, callback) {
    opts.method = method
    return new HTTPClient(opts, callback)

  }
})

httpClient.HTTPClient = HTTPClient
module.exports = httpClient
