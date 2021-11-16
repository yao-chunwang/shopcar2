<template>
  <div class="information">
<!-- 加载刷新 -->
<van-loading size="24px" vertical v-show="flag">加载中...</van-loading>
<!-- 下拉刷新 -->
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
<router-link class="item" v-for="item in getinforlist" :key='item.id' tag="div" :to="'/newsdetails/'+item.id">
      <div class="img_container">
        <img :src="item.img_url">
        </div>
          <div class="info">
         <h3>{{item.title}}</h3>
          <div class="time_click">
            <div>发布时间:{{item.add_time |converter}}</div>
            <div class="click">点击次数：{{item.click}}次</div>
          </div>
        </div>
    </router-link>
</van-pull-refresh>

  </div>
</template>
<script>
import {getinfor} from '@/api/index'
export default {
  data(){
    return{
       getinforlist:[],
       isLoading:false,
       flag:true,

    }
  },
  methods:{
      getinfor(haspull){
       getinfor(haspull).then(res=>{
         if(res.status==0){
           this.flag=false ,
           this.isLoading=false
           this.getinforlist=res.message
         }
       })
      },
      //下拉刷新事件
      onRefresh(){
       //重新请求数据
       this.getinfor(true)
      }
  },
  created(){
    //加载新闻数据
    this.getinfor(false)

  }
}
</script>

<style scoped>
.information{
  margin-top: 50px;
  padding: 5px;
  margin-bottom: 50px;
}
.item{
  display: flex;
  align-items: center;
  border-bottom:1px solid #d1cece;
  margin-bottom: 5px;
  background-color: #eee;
}
.time_click{
  display: flex;
  font-size: 13px;
  color: #888;
}
.info{
  margin-left: 20px;
}
.info h3{
 font-size: 17px;
}
.info .time_click{
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-right: 45px;
  color: #888;
  margin-bottom: 20px;
  width: 100%;
}
.img_container{
  width: 100px;
  height: 90px;
}
 img{
   width: 100px;
   height: 90px;
 }
</style>
