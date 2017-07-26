'use strict'

const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
mongoose.set('debug', true)
mongoose.Promise = global.Promise
const db = 'mongodb://localhost/feweekly'
mongoose.Promise = require('bluebird')
mongoose.connect(db,{useMongoClient:true})

/**
 * 获取数据库表对应的js对象所在的路径
 * @type {[type]}
 */
const models_path = path.join(__dirname, '/app/models')

/**
 * 已递归的形式，读取models文件夹下的js模型文件，并require
 * @param  {[type]} modelPath [description]
 * @return {[type]}           [description]
 */
var walk = function(modelPath) {
  fs
    .readdirSync(modelPath)
    .forEach(function(file) {
      var filePath = path.join(modelPath, '/' + file)
      var stat = fs.statSync(filePath)

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(filePath)
        }
      }
      else if (stat.isDirectory()) {
        walk(filePath)
      }
    })
}
walk(models_path)

require('babel-register')
const Koa = require('koa')
const logger = require('koa-logger')
//应用处理 session 的中间件
const session = require("koa-session")
const bodyParser = require('koa-bodyparser')
var cors = require('koa2-cors')
const app = new Koa()
app.use(logger())
app.use(bodyParser())

app.keys = ['feweekly'];
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
};

app.use(session(CONFIG, app));

// 应用处理 session 的中间件
// app.use(session({
//     key: "SESSIONID"
// }));


app.use(cors({
  origin: (ctx)=> ctx.request.header.origin,
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
const router = require('./config/router')()

app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(9090)
console.log('koa2_mongdb started at port 9090...');