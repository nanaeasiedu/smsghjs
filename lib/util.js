var util = {}

util.encode = function (text) {
  if (window && window.btoa) {
    return window.btoa(text)
  }

  // check if runtime is nodejs or io.js
  if (process && process.setImmediate) {
    return new Buffer(text).toString('base64')
  }
}

/**
 * serialize  It takes and object and turns its properties and values into a url-encoded form
 * @param  {Object} obj    Object whose properties and values are going to be encoded
 * @return {String}
 */
util.serialize = function (obj) {
  var strArr = []

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      strArr.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]))
    }
  }

  return strArr.join('&')
}

module.exports = util
