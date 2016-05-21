var test = require('tape')
var Message = require('../lib/message')

test('message object throws exception without important params', function (t) {
  t.plan(1)

  var opts = {
    type: 0,
    time: 'Thu Jun 11 2015 18:16:22'
  }

  t.throws(function () {
    Message(opts)
  })
})

test('toJSON method test', function (t) {
  t.plan(1)

  var opts = {
    from: 'SMSGHJS',
    to: '+233252271893',
    content: 'Hello World',
    type: '0'
  }

  t.deepEqual(new Message(opts).toJSON(), {
    From: 'SMSGHJS',
    To: '+233252271893',
    Direction: 'out',
    Content: 'Hello World',
    Type: '0'
  })
})
