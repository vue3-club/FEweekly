'use strict'

var mongoose = require('mongoose')
var weeklylist = mongoose.model('weeklylist')

exports.add = async weeklylist => {
  weeklylist = await weeklylist.save()
  return weeklylist
}

exports.list = async () => {
  var query = weeklylist.find().sort({period:-1})
  var res = []
  await query.exec(function(err, weeklylist) {
    if (err) {
      res = []
    } else {
      res = weeklylist
    }
  })
  return res
}

exports.del = async ({ _id }) => {
  var flag = false
  console.log('flag==========>' + flag)
  await weeklylist.remove({ _id }, function(err) {
    if (err) {
      flag = false
    } else {
      flag = true
    }
  })
  console.log('flag=====await=====>' + flag)
  return flag
}

exports.getWeeklyFindById = async ({ period }) => {
  var res = []
  await weeklylist.find({ period: period }, function(err, weeklylist) {
    if (err) {
      res = []
    } else {
      res = weeklylist
    }
  })
  return res
}

exports.update = async (wherestr, updatestr) => {
  var res = []
  await weeklylist.update(wherestr, updatestr, function(err, weeklylist) {
    if (err) {
      res = []
    } else {
      return weeklylist
    }
  })
}
