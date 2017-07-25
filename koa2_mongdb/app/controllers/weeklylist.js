'use strict'
var mongoose =  require('mongoose')
var Weeklylist = mongoose.model('weeklylist')
import weeklylistHelper from '../dbhelper/weeklylistHelper'

exports.add = async (ctx, next) => {
    const cover_url = ctx.request.body.params.cover_url
    const period = ctx.request.body.params.period
    const title = ctx.request.body.params.title
    const info = JSON.stringify(ctx.request.body.params.info)
    var weeklylist = new Weeklylist({
        cover_url: cover_url,
        period: period,
        title: title,
        info: info
    })
    var weeklylist2 =  await weeklylistHelper.add(weeklylist)
    if(weeklylist2){
        ctx.body = {
        success: true,
        data : weeklylist2
        }
    }

}

exports.list = async (ctx, next) => {
    // console.log(ctx.session)
    console.log(`list-session:${JSON.stringify(ctx.session)}`)
    var data = await weeklylistHelper.list()
    ctx.body = {
        status:1,
        message:'success',
        result:data
    }
}

exports.del = async (ctx, next) => {
    const _id = ctx.request.query._id
    var data  = await weeklylistHelper.del({_id})
    ctx.body = {
        success: true,
        data
    }
  
}
exports.getWeeklyFindById = async (ctx, next) => {
    const period = ctx.request.query.period
    var data  = await weeklylistHelper.getWeeklyFindById({period})
    ctx.body = {
        status:1,
        message:'success',
        result:data
    }
}

exports.update = async (ctx, next) => {
    const _id = ctx.request.body.params._id
    const cover_url = ctx.request.body.params.cover_url
    const period = ctx.request.body.params.period
    const title = ctx.request.body.params.title
    const info = JSON.stringify(ctx.request.body.params.info)
    var wherestr = {'_id' : _id};
    var updatestr = {'cover_url': cover_url,'period':period,'title':title,'info':info};

    await weeklylistHelper.update(wherestr, updatestr, function(error,weeklyClassificate){//查询条件,更新对象
        if(error) {
          console.log(error);
        } else {
          console.log('weeklyClassificate!');
        }   
  });   
  ctx.body = {
    status:1,
    message:'success',
    result:''
  } 
   
}