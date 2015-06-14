var test = require('tape')
var TopUp = require('../lib/topup')

test('TopUp throws without an apiKey', function (t) {
  t.plan(1)

  t.throws(function () {
    TopUp()
  })
})

test('TopUp base url', function (t) {
  t.plan(1)

  t.equal(TopUp.BASE_URL, 'https://api.smsgh.com/credit/topup', 'TopUp base url is accurate')
})

test('instance of TopUp has an apiKey property', function (t) {
  t.plan(2)

  var topMyPhoneUp = new TopUp('4jko65bzasla0a209hbio232na')
  t.equal(typeof topMyPhoneUp.apiKey, 'string', 'instance of TopUp has an apiKey property')
  t.equal(topMyPhoneUp.apiKey, '4jko65bzasla0a209hbio232na', 'the apiKey is accurate')
})
