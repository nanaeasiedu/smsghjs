var test = require('tape')
var SMSGH = require('../index')

var sms = new SMSGH({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
})

var Message = SMSGH.Message
var testMessage = new Message({ from: 'SMSGHJS', to: '233272271893', content: 'Testing SMSGH API WRAPPER LIBRARY' })

sms.setContextPath('v3')

test('Should send sms message', function (t) {
  t.plan(2)

  sms.messaging.send(testMessage, function (err, res) {
    t.notOk(err, 'No error message')
    t.ok(res, 'Message was sent successfully')
  })
})

test('Should send quick sms message using', function (t) {
  t.plan(2)

  sms.messaging.sendQuickMessage(testMessage.from, testMessage.to, 'Sending a quick message', function (err, res) {
    t.notOk(err, 'No error sending quick message')
    t.ok(res, 'Quick message was sent successfully')
  })
})
