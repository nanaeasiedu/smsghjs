var test = require('tape')
var httpClient = require('../lib/httpclient')

test('httpClient[`get`, `post`, `del`, `head`, `put`]', function (t) {
  t.plan(5)

  var methods = ['get', 'post', 'put', 'del', 'head']
  methods.forEach(function (method) {
    t.equal(typeof httpClient[method], 'function', method + ' exists and is a function')
  })
})
