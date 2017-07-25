'use strict'
const Router = require('koa-router')
const user = require('../app/controllers/user')
const weeklyClassificate = require('../app/controllers/weeklyClassificate')
const weeklylist = require('../app/controllers/weeklylist')
module.exports = function(){
	var router = new Router({
      prefix: '/api'
  })
  //分类
  router.post('/weeklyClassificate/add',weeklyClassificate.add)
  router.get('/weeklyClassificate/list',weeklyClassificate.list)
  router.get('/weeklyClassificate/del',weeklyClassificate.del)
  router.post('/weeklyClassificate/update',weeklyClassificate.update)
  //周刊
  router.post('/weeklylist/add',weeklylist.add)
  router.get('/weeklylist/del',weeklylist.del)
  router.post('/weeklylist/update',weeklylist.update)
  //登录
  router.post('/user/login',user.findByUsername)
  //周刊列表全部(对外暴露接口)
  router.get('/weeklylist/list',weeklylist.list)
  //根据周刊期号返回某一期(对外暴露接口)
  router.get('/weeklylist/getWeeklyFindById',weeklylist.getWeeklyFindById)
  return router
}
