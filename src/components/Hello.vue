<template>
  <div style="position:relative">
  <div class="weekly">
    <div class="cover">
      <img v-bind:src="weekly.cover_url" alt="">
    </div>
    <div class="main">
      <div class="category"  v-for="info in weekly.info">
        <h2 class="category_title">👍🏼{{info.type_name}}</h2>
        <ul class="list">
          <li v-for="list in info.list" >
            <h3><a :href="list.url">{{list.title}}</a></h3>
            <p class="desc">{{list.describe}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <el-menu :default-active="activeIndex2" mode="horizontal" @select="handleSelect" style="width:116px; position:fixed; left:75%; top:300px; border-top:1px solid #e5e5e5; background:#fff; margin-right:640px;">
      <el-submenu index="2">
            <template slot="title">往期内容</template>
            <div  v-for="data in weeklyPeriod">
                 <el-menu-item :index="data.period">第{{data.period}}期</el-menu-item>
            </div>
      </el-submenu>
   </el-menu>
  </div>
</template>
<script>
import http from '../utils/http'
import {frontUrl} from '../../config/frontUrl'
import axios from 'axios'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to FEweekly',
      period:"1",
      activeIndex: '1',
      activeIndex2: '1',
      weekly:{
          cover_url: '', 
          period: '', 
          title: '',
          info:[]
      },
      weeklyPeriod:{

      }
    }
  },
  methods: {
    handleSelect(key, keyPath) {
        this.list(key);
    },
		//获得每期内容
		list:async function(period){
        let that = this
        let para = { period: period }
        const res = await http.get(frontUrl+'/api/weeklylist/getWeeklyFindById',para)
				if(res.data.result[0]){
              that.weekly = res.data.result[0];
              that.weekly.info=JSON.parse(res.data.result[0].info)
        } 
    },
    //获得期数列表
    listPeriod:async function(){
        let that = this
        const res = await http.get(frontUrl+'/api/weeklylist/list')
				if(res.data.result[0]){
              that.weeklyPeriod = res.data.result;
              that.weekly = res.data.result[0];
              that.weekly.info=JSON.parse(res.data.result[0].info)
        }
    }
  },
  mounted() {
		// this.list(this.period);
    this.listPeriod();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import (reference) "../shared.less";
  .weekly{
    width:@bodyWdith;
    margin: 22px auto 0;
    border: 1px solid #ccc;
    background: #fff;
    @media (max-width: @bodyWdith) {
      width: 100%;
      margin: 0;
      border: none;
    }
  }
  .main{
    padding: 40px;
  }
  .category{
    .category_title{
      color: @defaultColor;
      margin-bottom: 8px;
    }
    .desc{
      margin: 8px  0;
      padding-left: 8px;
      border-left: 3px solid @lightColor;
      margin-left: 15px;
    }
    .list{
      li{
        margin-bottom: 25px;
      }
    }
  }
  .cover{
    height: 220px;
    background: #d4d4dd;
    overflow: hidden;
    img{
      min-width: 100%;
      min-height: 100%;
      vertical-align: middle;
      filter: blur(3px);
    }
  }
</style>
