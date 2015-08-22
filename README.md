#SMSGHJS

[![Build Status](https://secure.travis-ci.org/ngenerio/smsghjs.png?branch=master)](https://travis-ci.org/ngenerio/smsghjs)

The Standard JavaScript SDK for SMSGH API.

It includes support for the Unified Services Payment of the SMSGH API.

SMSGHJS uses [JavaScript Standard Style](https://github.com/feross/standard)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Still in development. You can check out the code and give reviews. I would appreciate that a lot. If there is any particular functionality you would like me to add just open an issue and I would check it out.

This library is not yet complete. Check out the [smsgh developers portal](http://developers.smsgh.com) to see all the related API. Only the message and top up API have been implemented.

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
var Message = SMSGH.Message

smsgh.setContextPath('v3')

// Get `clientId` and `clientSecret` from SMSGH
var smsgh = new SMSGH(clientid, clientSecret)
var newMessage = new Message({from: 'Me', to : '233272271893', content: 'Hello World'})


smsgh.messageApi.send(newMessage, function (err, res) {
    if (err) // handle the Error
    // do something with the response
  })
```

Made with ❤ by [Eugene Asiedu](https://twitter.com/ngenerio) in Ghana.
