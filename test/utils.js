var test = require('tape')
var utils = require('../lib/utils')

test('encode test', function (t) {
  t.plan(1)
  t.equal(utils.encode('abc'), 'YWJj', 'enocding to base64 works')
})

test('serialize test', function (t) {
  t.plan(2)

  var expectedForTrueForAll = 'names=Napoleon%20%26%20Albert%20Einstein&status=dead'
  var expectedForFalseProps = 'names=Napoleon & Albert Einstein&status=dead'
  var obj = {
    names: 'Napoleon & Albert Einstein',
    status: 'dead'
  }

  t.equal(utils.serialize(obj, true, true), expectedForTrueForAll, 'serialize props and values both encoded works')
  t.equal(utils.serialize(obj, true, false), expectedForFalseProps, 'serialize props and values with values not encoded works')
})

test('merge test', function (t) {
  t.plan(1)

  var objA = {
    gender: 'male'
  }

  var objB = {
    name: 'Albert Einstein'
  }

  var mergedObj = {
    gender: 'male',
    name: 'Albert Einstein'
  }

  t.deepEqual(utils.merge(objA, objB), mergedObj, 'merge works')
})

test('validate phone numbers test', function (t) {
  t.plan(3)

  t.ok(utils.isValidTelephoneNumber('0272271893'), 'telephone number is valid')
  t.ok(utils.isValidTelephoneNumber('233272271893'), 'telephone number is still valid')
  t.notOk(utils.isValidTelephoneNumber('33272271893'), 'telephone number is so invalid')
})
