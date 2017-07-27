<template>
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
      weekly:{
          cover_url: '', 
          period: '', 
          title: '',
          info:[]
			}
    }
  },
  methods: {
		//列表
		list:async function(){
        let that = this
        let para = { period: 1 }
        // const res = await http.get(frontUrl+'api/weeklylist/getWeeklyFindById',para)
				// if(res.data.result[0]){
        //       that.weekly = res.data.result[0];
        //       that.weekly.info=JSON.parse(res.data.result[0].info)
        // }
        axios.get(frontUrl+'/api/weeklylist/getWeeklyFindById', {
          params: para,
          withCredentials: true
        })
        .then(function (res) {
            if(res.data.result[0]){
              that.weekly = res.data.result[0];
              that.weekly.info=JSON.parse(res.data.result[0].info)
            }
        })
        .catch(function (error) {
          console.log(JSON.stringify(error));
        });

        
		}
  },
  mounted() {
		this.list();

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
