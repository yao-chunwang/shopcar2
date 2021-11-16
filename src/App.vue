<template>
  <div id="app">
    <!-- 头部部分 -->
    <van-nav-bar
  fixed
  title="爱购商城"
  :left-text="backTack"
  :left-arrow='isBack'
  @click-left='goback'
/>
<!-- 中间部分 -->
<router-view></router-view>
<!-- 底部导航 -->
<van-tabbar v-model="active">
  <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
  <van-tabbar-item icon="cart-o" to='/shopcart' :info='this.$store.getters.getcarnumber'>购物车</van-tabbar-item>
  <van-tabbar-item icon="friends-o" to="/preson">个人中心</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
   data(){
     return{
       active:0,
       backTack:'',
       isBack:false
     }
   },
   methods: {
     goback(){
       //返回上一页
       this.$router.go(-1)
     }
   },
   watch: {
     $route:function(newPath,oldPath){
       if(newPath.path=='/home'){
         this.backTack=''
         this.isBack=false
       }else{
         this.backTack='返回'
         this.isBack=true
       }
     }
   }
}
</script>

<style>

.van-nav-bar {
  background-color: rgb(113, 113, 250);
}
 .van-nav-bar__title{
  font-size: 18px;
  font-weight: 600px;
  color: white;
}
.van-nav-bar .van-icon {
 color: white;
}
.van-nav-bar__left .van-nav-bar__text{
  color: white;
}
.van-nav-bar__text{
  color: white;
}
</style>
