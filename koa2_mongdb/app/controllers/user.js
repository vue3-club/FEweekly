'use strict'

var xss = require('xss')
var mongoose =  require('mongoose')
var User = mongoose.model('User')
var uuid = require('uuid')
import userHelper from '../dbhelper/userHelper'
//登录
exports.findByUsername = async (ctx, next) => {
    const username = ctx.request.body.params.username
    const password = ctx.request.body.params.password
    var data  = await userHelper.findByUsername({username})
    if(data){
        if(data.password==password){
           console.log("ctx.session")
           ctx.cookies.set(
            'testcookie', 
            'testcookie',
              {
                domain: '127.0.0.1',  // 写cookie所在的域名
                path: '/',       // 写cookie所在的路径
                maxAge: 10 * 60 * 1000, // cookie有效时长
                httpOnly: false,  // 是否只用于http请求中获取
                overwrite: false  // 是否允许重写
              }
            )
            ctx.session.user = {
                    username,
                    password
            }
            
            console.log(ctx.session.user)
           ctx.body = {
              status:1,
              message:'success'
            }
        }else{
            ctx.body = {
              status:2,
              message:'密码不正确'
            }
        }
        
    }else{
       ctx.body = {
          status:0,
          message:'用户名不存在'
        }
    }
}