var utils = {}

utils.encode = function (text) {
  return new Buffer(text).toString('base64')
}

/**
 * serialize  It takes and object and turns its properties and values into a url-encoded form
 * @param  {Object} obj    Object whose properties and values are going to be encoded
 * @return {String}
 */
utils.serialize = function (obj, encodeProp, encodeValue) {
  var strArr = []

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      strArr.push((encodeProp ? encodeURIComponent(prop) : prop) + '=' + (encodeValue ? encodeURIComponent(obj[prop]) : obj[prop]))
    }
  }

  return strArr.join('&')
}

utils.merge = function () {
  var obj = {}
  var args = [].slice.call(arguments, 0)

  for (var i = 0, l = args.length; i < l; i++) {
    for (var prop in args[i]) {
      if (args[i].hasOwnProperty(prop) && !!args[i][prop]) {
        obj[prop] = args[i][prop]
      }
    }
  }

  return obj
}

module.exports = utils
