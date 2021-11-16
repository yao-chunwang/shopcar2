<template>
  <div class="goods_purchased">
     <router-link class="item" v-for="item in goodslist" :key="item.id" tag="div" :to="'/goodsdetal/'+item.id">
      <img v-lazy="item.img_url">
       <h3 class="goodsname">{{item.title}}</h3>
       <div class="goodsinfor">
         <div class="price">
               <span class="now">￥{{item.sell_price}}</span>
               <span class="old">￥{{item.market_price}}</span>
         </div>
         <div class="hot">
           <span>热卖中</span>
           <span>剩余{{item.stock_quantity}}件</span>
         </div>
       </div>
     </router-link>

<van-button type='danger' size='large' @click="loadmore">加载更多</van-button>
  </div>
</template>

<script>
import {getgoods}from '../../api/index'
export default {
    data () {
      return {
        goodslist:[],
        pageindex:1,
        hasgoods:true
      }
    },
    methods: {
      getgoodslist(){
        if(this.hasgoods===false){
          this.$toast('没有更多数据了')
          return
        }
        getgoods(this.pageindex).then(res=>{
          //判断是否数据加载完毕
          if(res.message.length===0){
            this.hasgoods=false
            this.$toast('数据加载完毕')
            return
          }
          if(res.status==0){
              //把原来的goodlist在连接返回
            this.goodslist=this.goodslist.concat(res.message)
            this.$toast('加载成功')
          }
        })
      },
      loadmore(){
       ++ this.pageindex
       this.getgoodslist()
      }
    },
    created () {
      this.getgoodslist()
    }
}
</script>

<style  scoped>
.goods_purchased{
      margin-top: 42px;
      margin-bottom: 50px;
      display: flex;
      flex-wrap: wrap;
      padding: 3px;
      background-color: #eee;
}
.item{
  width: 47%;
  padding: 8px;
  margin: 3px 6px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 10px;
  box-shadow: 6px 5px 13px #c1c1c1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.item img{
  height: 175px;
  width: 100%;
}
.goodsname{
  font-size: 17px;

  overflow: hidden;
}
.now{
  color: red;
  font-weight: bold;
  margin-right: 5%;
}
.old{
    text-decoration: line-through;
     font-size: 16px;
}
.hot{
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin-top: 10px;
  color: #565652;
}

</style>
