#SMSGHJS

[![Build Status](https://secure.travis-ci.org/ngenerio/smsghjs.png?branch=master)](https://travis-ci.org/ngenerio/smsghjs)

JavaScript library that interfaces with the SMSGH api

Still in development. You can check out the code and give reviews. I would appreciate that a lot. If there is any particular functionality you would like me to add just open an issue and I would check it out.

This library is not yet complete. Check out the [smsgh developers portal](http://developers.smsgh.com) to see all the related api. Only the message and top up api have been implemented.

Tests are being written

###TOPUP

To get started you need an api key from [smsgh](http://smsgh.com) to use it.

Create a new `TopUp` object with the `apiKey` and top up some number with it

```js
var TopUp = require('smsghjs').TopUp
// replace MYAPIKEY with the api key given you by SMSGH
var myTopUpObj = new TopUp(MYAPIKEY)

myTopUpObj.topItUp({
  phone: '2332000000000',
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

###SMS API
To use the sms api, you have to get your client id and client secret.


```js
var SMSGH = require('smsghjs')
var SendMessage = SMSGH.SendMessage
var Message = SMSGH.Message

var smsApi = new SendMessage(CLIENT_ID, CLIENT_SECRET, API_VERSION)
var msgObj = Message({
  from: 'SMSGHJS',
  to: '2332000000000',
  content: 'Hello World'
})

smsApi.send(msgObj, function (err, res) {
  // handle the error
  if (err) {}
  // do something with response
})

```
SMSGHJS uses [JavaScript Standard Style](https://github.com/feross/standard)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
