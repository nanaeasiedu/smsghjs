#SMSGHJS

[![Build Status](https://secure.travis-ci.org/ngenerio/smsghjs.png?branch=master)](https://travis-ci.org/ngenerio/smsghjs)

SMSGHJS uses [JavaScript Standard Style](https://github.com/feross/standard)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

The Standard JavaScript SDK for SMSGH API.


Still in development. You can check out the code and give reviews. I would appreciate that a lot. If there is any particular functionality you would like me to add just open an issue and I would check it out.

Check out the [smsgh developers portal](http://developers.smsgh.com) to see all the related API. It includes support for the Unified Services Payment, MESSAGING and TOP UP of the SMSGH API.

### Documentation

#### Create an `SMSGHJS` instance

```javascript
var SMSGH = require('smsghjs');

// get `clientId` and `clientSecret` from SMSGH
// `topupApiKey` is optional
// `uspToken` is optional
var newSMSGH  = new SMSGH({
  clientId: [clientId],
  clientSecret: [clientSecret],
  topupApiKey: [topupApiKey],
  uspToken: [uspToken]
})

newSMSGH.setContextPath('v3')
```

#### TOPUP

If you provided the `topupApiKey` when you were initialising `newSMSGH`, then the top up API will be made available.

```js
newSMSGH.topUpApi.topItUp({
  phone: '233270000000',
  network: 'tigo',
  lineType: 0,
  amount: 5,
  method: 'GET'
}, function (err, res) {
  // handle the error
  if (err) {}
  // do something with response
})
```

#### SMS API
This section shows how to use the SMS API

```js
var Message = SMSGH.Message
var newMessage = new Message({from: 'Me', to : '233272271893', content: 'Hello World'})

newSMSGH.messageApi.send(newMessage, function (err, res) {
    if (err) // handle the Error
    // do something with the response
})

// Send a quick message
newSMSGH.messageApi.sendQuickMessage('Me', '233272271893', 'Hello World', function (err, res) {})

// Send a scheduled message
var scheduledMessage = new Message({from: 'Me', to : '233272271893', content: 'Hello World', time: '2014-01-01 10:00:00'})
newSMSGH.messageApi.sendScheduledMessage(scheduledMessage, function (err, res) {})

// Get the details of a message
// Provide `messageId` as first argument
newSMSGH.messageApi.getMessage('6f19395db2fb497ea4ebd1e218dd3e4c', function (err, res) {})

// Query the message API
newSMSGH.messageApi.queryMessage({index: 100, limit: 2}, function (err, res){})

// Reschedule a message
newSMSGH.messageApi.rescheduleMessage('6f19395db2fb497ea4ebd1e218dd3e4c', '2014-01-01 05:00:00', function (err, res) {})

// Cancel a message
newSMSGH.messageAPI.cancelMessage('6f19395db2fb497ea4ebd1e218dd3e4c', function (err, res) {})
```

#### USP API

Docs coming up soon....

Made with ❤ by [Eugene Asiedu](https://twitter.com/ngenerio) in Ghana.
