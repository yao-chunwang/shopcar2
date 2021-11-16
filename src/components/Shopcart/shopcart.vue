<template>
  <div class="shopcart">
    <div class="item" v-for="(item,index) in goodsList" :key='item.id'>
      <!-- 切换按钮 -->
      <div class="switch">
       <van-switch v-model="$store.getters.getcoodsselect[item.id]"  @input="onInput(item.id,$store.getters.getcoodsselect[item.id])" />
      </div>
      <div class="thumb">
        <img :src="item.thumb_path">
      </div>
      <div class="goodsinfo">
        <div class="title">
         {{item.title}}
        </div>
        <div class="other">
          <span class="price">￥{{item.sell_price}}</span>
          <van-stepper v-model='$store.getters.getcoodsnumber[item.id]'  @change="onChange(item.id,$store.getters.getcoodsnumber[item.id])"/>
          <van-button type='danger' @click="delect(item.id,index)">删除</van-button>
        </div>
      </div>
    </div>
   <div class="total">
      <div class="bottom_button">
        <div>总计(不含运费)</div>
        <div>
          已勾选商品<span class="price">{{this.$store.getters.gettotalprice['number']}}</span>件,总价<span class="price">
            {{this.$store.getters.gettotalprice['price']}}
            </span>元
        </div>
      </div>
      <van-button type="danger">结算</van-button>
    </div>

  </div>
</template>

<script>
import {getCarGoods} from '@/api/index.js'
export default {
  data () {
    return {
      goodsList:[]
    }
  },
  methods: {
    getCarGoods(){
      //获取购物车的id
      var ids=this.$store.getters.getCarids
       getCarGoods(ids).then(res=>{
         if(res.status==0){
           this.goodsList=res.message
         }
       })
    },
    //删除购物车中的商品
    delect(id,index){
      this.goodsList.splice(index,1)
      this.$store.commit('delect',id)
    },
    //购物车选中转态
    onInput(id,selected){
      //selected参数用来获取当前选中的状态
     this.$store.commit('updata',{id,selected})
    },
    //用来控制购物车商品的购买数量
    onChange(id,number){
      this.$store.commit('updatagoods',{id,number})
    }
  },
created () {
  this.getCarGoods()
}
}
</script>

<style scoped>
.shopcart{
  margin-top: 50px;
   padding: 1px;
  background-color: #eee;
  margin-bottom: 51px;
}
.item{
  display: flex;
  background-color: #fff;
  margin: 6px;
  padding: 6px;
  align-items: center;
  justify-content: space-between;
}
.other{
  display: flex;
   justify-content: space-between;
   align-items: center;
}
.title{
  margin-bottom: 5px;
}
.price{
  color: red;
  font-weight: bold;
}
.thumb{
  margin: 0 10px;
}
.thumb img{
  width: 50px;
}
.total {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 2px;
  margin: 5px;
  align-items: center;
}
.bottom_button div {
  margin-bottom: 8px;
}
.vant {
  padding: 0px 13px;
}
</style>
