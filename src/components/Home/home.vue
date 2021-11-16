<template>
  <div class="app_container">
     <!-- 轮播图 -->
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item v-for="item in lunBoData" :key='item.img'>
    <img :src="item.img">
  </van-swipe-item>

</van-swipe>
<!-- 九宫格 -->
   <div class="grid_view">
     <router-link class="img_test" to='/information' tag="div">
       <img src="../../assets/menu1.png">
       <p>新闻资讯</p>
     </router-link>
     <div class="img_test">
       <img src="../../assets/menu2.png">
       <p>图文分享</p>
     </div>
     <router-link class="img_test" to='/goods' tag='div'>
       <img src="../../assets/menu3.png">
       <p>商品购买</p>
     </router-link>
     <div class="img_test">
       <img src="../../assets/menu4.png">
       <p>留言反馈</p>
     </div>
     <div class="img_test">
       <img src="../../assets/menu5.png">
       <p>视频专区</p>
     </div>
     <div class="img_test">
       <img src="../../assets/menu6.png">
       <p>话费充值</p>
     </div>
     <div class="img_test">
       <img src="../../assets/menu7.png">
       <p>联系我们</p>
     </div>
     <div class="img_test">
       <img src="../../assets/menu8.png">
       <p>清仓特买</p>
     </div>
     <div class="img_test">
       <img src="../../assets/menu9.png">
       <p>一元福利</p>
     </div>
   </div>
  </div>
</template>

<script>
//导入接口请求
import {getlunbo} from '@/api/index'
export default {
   data(){
     return{
       lunBoData:[]
     }
   },
   methods: {
     getlun(){
       getlunbo().then(res=>{
         if(res.status==0){
          this.lunBoData=res.message
         }
       })
     }
   },
   created () {
     //自调用获取轮播图数据
     this.getlun()
   }
}
</script>

<style>
.app_container{
  margin-bottom: 50px;
  margin-top: 46px;
}
.van-swipe-item img{
  width: 100%;
  height: 200px;
}
.grid_view{
  display: flex;
  flex-wrap: wrap;
}
.img_test{
  width: 30%;
  margin: 2% auto;
 text-align: center;
}
.img_test img{
  width: 50%;
}
.img_test p{
  font-size: 13px;
}
</style>
