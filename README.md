# SMSGHJS

[![Build Status](https://secure.travis-ci.org/ngenerio/smsghjs.png?branch=master)](https://travis-ci.org/ngenerio/smsghjs)

SMSGHJS uses [JavaScript Standard Style](https://github.com/feross/standard)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

The Standard JavaScript and node.js SDK for SMSGH API.


Check out the [smsgh developers portal](http://developers.smsgh.com) to see all the related API. This library includes support for the Unified Services Payment, MESSAGING and TOP UP of the SMSGH API.

## Installation

### Node

```sh
npm install --save smsghjs
```

### Browser

Download the [`smsgh.min.js`](https://github.com/ngenerio/smsghjs/blob/master/dist/smsgh.min.js) file in the `dist` folder. Place it in your project folder:

```html
<script src="smsgh.min.js"></script>
```

Or just add this line to your html file

```html
<script src="https://raw.githubusercontent.com/ngenerio/smsghjs/master/dist/smsgh.min.js"></script>
```

## Documentation

```javascript
// Require the smsghjs lib
var SMSGH = require('smsghjs');

// get `clientId` and `clientSecret` from SMSGH
// `topupApiKey` is optional
// `uspToken` is optional
var sms  = new SMSGH({
  clientId: [clientId],
  clientSecret: [clientSecret],
  topupApiKey: [topupApiKey],
  uspToken: [uspToken]
})

sms.setContextPath('v3')
```

## TOPUP

### NOTE: The topup functionality will be deprecated soon. The same functionality is provided in the USP.

If you provided the `topupApiKey` when you were initialising `sms`, then the top up API will be made available.

```js
sms.topUp.topItUp({
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

sms.messaging.send(newMessage, function (err, res) {
    if (err) // handle the Error
    // do something with the response
})

// Send a quick message
sms.messaging.sendQuickMessage('Me', '233272271893', 'Hello World', function (err, res) {})

// Send a scheduled message
var scheduledMessage = new Message({from: 'Me', to : '233272271893', content: 'Hello World', time: '2014-01-01 10:00:00'})
sms.messaging.sendScheduledMessage(scheduledMessage, function (err, res) {})

// Get the details of a message
// Provide `messageId` as first argument
sms.messaging.getMessage('6f19395db2fb497ea4ebd1e218dd3e4c', function (err, res) {})

// Query the message API
sms.messaging.queryMessage({index: 100, limit: 2}, function (err, res){})

// Reschedule a message
sms.messaging.rescheduleMessage('6f19395db2fb497ea4ebd1e218dd3e4c', '2014-01-01 05:00:00', function (err, res) {})

// Cancel a message
sms.messaging.cancelMessage('6f19395db2fb497ea4ebd1e218dd3e4c', function (err, res) {})
```

#### USP API

Docs coming up soon....

Made with ❤ by [Eugene Asiedu](https://twitter.com/ngenerio) in Ghana.
