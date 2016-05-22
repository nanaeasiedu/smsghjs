var request = require('superagent')
var SMSGHError = require('./error')

var httpClient = {}

var reqArr = ['get', 'post', 'put', 'del', 'head']

reqArr.forEach(function (method) {
  httpClient[method] = function (opts, callback) {
    if (!opts.url) {
      throw new SMSGHError('No URL was specified for the request. Provide `url` in the options object')
    }

    opts.headers || (opts.headers = {})

    var requestObj = request[method](opts.url)
    var cb = callback && typeof callback === 'function' ? callback : function () {}

    requestObj.set(opts.headers)

    if (opts.data) {
      requestObj.send(opts.data)
    }

    requestObj.end(function (err, res) {
      if (err) {
        return cb(err, res)
      }
      cb(null, res)
    })
  }
})

module.exports = httpClient
