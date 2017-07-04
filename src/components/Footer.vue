<template>
  <div class="weekly">
      footer
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
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
