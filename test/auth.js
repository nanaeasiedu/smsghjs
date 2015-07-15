var test = require('tape')
var Auth = require('../lib/auth')

test('auth test: should throw without params', function (t) {
  t.plan(1)

  t.throws(function () {
    Auth()
  })
})

test('auth test: should encode auth and have clientId and clientSecret', function (t) {
  t.plan(3)

  var authObject = new Auth('eugene', 'asiedu')

  t.equal(authObject.clientId, 'eugene', 'clientId is `eugene`')
  t.equal(authObject.clientSecret, 'asiedu', 'clientSecret is `asiedu`')
  t.equal(authObject.basicAuth, 'ZXVnZW5lOmFzaWVkdQ==', 'basicAuth is correct')
})
