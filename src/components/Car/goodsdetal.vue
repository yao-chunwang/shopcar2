<template>
  <div class="goodsdetal_container">
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item v-for="item in lunbodata" :key="item.src">
    <img :src="item.src">
  </van-swipe-item>
</van-swipe>
<div class="goodsinfo">
  <div class="goodsname">{{goodsinfo.title}}</div>
  <div class="price">
    <span>市场价:￥<span class="mark">{{goodsinfo.market_price}}</span></span>
    <span class="nowprice">本店价:<span class="nowprice_1">￥{{goodsinfo.sell_price}}</span></span>
  </div>
  <div class="goddsnumber">
    <span>购买数量:</span>
    <van-stepper v-model="value" />
  </div>
  <div class="btn-group">
    <van-button type="info">立即购买</van-button>
    <van-button type="danger" @click="addgoods">加入购物车</van-button>
  </div>
</div>
<div class="otherinfo">
  <div class="title">
      <h3>其他信息</h3>
  </div>
<div class="goods">
 <span>商品货号:{{goodsinfo.goods_no}}</span>
 <span>库存情况:{{goodsinfo.stock_quantity}}件</span>
 <span>上架时间:{{goodsinfo.add_time |converter}}</span>
</div>
</div>
  </div>
</template>

<script>
import {getgoodsthumb,getGoodsInfo}from '@/api/index.js'
export default {
  data () {
    return {
      id:this.$route.params.id,
      lunbodata:[],
      goodsinfo:{},
      value:1
    }
  },
  methods: {
    getlunbo(){
      getgoodsthumb(this.id).then(res=>{
        if(res.status==0){
          this.lunbodata=res.message
        }
      })
    },
    getgoodsinfo(){
      getGoodsInfo(this.id).then(res=>{
        if(res.status==0){
           this.goodsinfo=res.message[0]
        }
      })
    },
    // 加入商品到购物车
    addgoods(){
      //构造一个商品对象用于存储
      var goods={
        id:this.id,
        number:this.value, //商品数量
        price:this.goodsinfo.sell_price,
        selected:true
      }
      this.$store.commit('add', goods)
    }
  },
  created () {
    this.getlunbo()
    this.getgoodsinfo()
  }
}
</script>

<style scoped>
.goodsdetal_container{
  background-color: #eee;
  padding:5px 8px;
  margin-top: 46px;
  margin-bottom: 53px;
}
.van-swipe{
  width: 100%;
  height: 240px;
  border-radius: 10px;
  text-align: center;
  background-color: white;
}
.goodsinfo{
  background-color: white;
  padding:5px 8px;
  margin-top: 10px;
  border-radius: 10px;
}
.goodsname{
    font-size: 20px;
    border-bottom: 1px solid black;
    font-weight: bold;
    margin: 10px 0px;
    margin-bottom: 10px;
}
.goddsnumber{
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
}
.van-stepper{
  margin-left: 10px;
}

.btn-group{
  display: flex;
  justify-content: space-between;
}
.van-button{
  width: 180px;
}
.mark{
  text-decoration: line-through;
}
.nowprice{
  margin-left: 40px;
}
.nowprice_1{
  color: red;
  font-weight: bold;
}
.otherinfo{
  background-color: white;
  padding:5px 8px;
  margin-top: 10px;
  border-radius: 10px;
}
.title{
  border-bottom: 1px solid #88888888;
  margin: 15px 0px;
}
.goods{
  display: flex;
  /* 竖着排列 */
  flex-direction: column;
  justify-content: space-between;
}
.goods span{
margin: 2px 0px;
}
img{
  height: 240px;
}
</style>
