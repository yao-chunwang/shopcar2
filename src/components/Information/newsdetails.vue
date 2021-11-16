<template>
  <div class="news_details">
      <h4 class="title">{{newsinfo.title}}</h4>
  <div class="subtitle">
   <span>发布时间:{{newsinfo.add_time |converter}}</span>
   <span>点击次数：{{newsinfo.click}}次</span>
  </div>
   <div class="content" v-html="newsinfo.content">

  </div>
<!-- 留言框 -->
  <van-field
      v-model="message"
      rows="2"
      autosize
      label-width='0'
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
     <!-- 评论按钮 -->
    <van-button type="info" size="large" class="comment_button" @click="addcomment">评论</van-button>
     <div class="commentlist">
      <div class="item" v-for="item in comments" :key='item.id'>
        <div>{{item.user_name}}:{{item.content}}</div>
        <div>评论时间：{{item.add_time |converter('YYYY-MM-DD HH:mm:ss')}}</div>
      </div>
    </div>
    <!-- 查看按钮 -->
    <van-button plain hairline type="primary" size="large" color="red" class="view_mode" @click="loadmore" :loading='loading' loading-text='加载更多'>查看更多</van-button>
  </div>
</template>

<script>
import {getnewsdetail,getnewscomment,sendcomment} from '@/api/index'
export default {
   data(){
     return{
     id:this.$route.params.id,
      //默认第一页数据
     pageindex:1,
     message:'',
     newsinfo:{},
     comments:[],
     loading:false,
     hascomment:true
     }
   },
   methods:{
    //获取新闻详情
     getNews(){
     getnewsdetail(this.id).then(res=>{
       if(res.status===0){
         this.newsinfo=res.message[0]
       }
     })
   },
   //发表评论
   addcomment(){
      sendcomment(this.id,this.message).then(res=>{
        if(res.status===0){
          this.$toast('评论成功')
        //构造一个对象，放在comments中
        var comment={
          add_time:new Date(),
          user_name:'匿名用户',
          content:this.message
        }
        //清空
        this.comments.unshift(comment)
        this.message=''
        }
      })
   },
   //获取评论
   getcomments(){
     //请求之前判断是否有数据
     if(this.hascomment===false){
       this.$toast('没有更多数据')
       //恢复加载更多数据
        this.loading=false
       return
     }
     getnewscomment(this.id,this.pageindex).then(res=>{
       //需要把评论数据进行链接
      // this.comments=res.message
      if(res.message.length===0){
        this.$toast('已经加载完毕')
        this.hascomment=false
      }
      this.comments=this.comments.concat(res.message)

     })
   },
   //加载更多
   loadmore(){
     ++ this.pageindex
     this.getcomments()
   }
   },
   created(){
     this.getNews()
     this.getcomments()
   }
}
</script>


<style scped>
.news_details{
  padding: 6px;
  background-color: #eee;
  margin-bottom: 55px;
  margin-top: 40px;
}
.title{
  text-align: center;
  color: #404040;
}
.content{
  margin-top: 10px;
  margin-bottom: 10px;
}
.comment{
  margin-bottom: 10px;
}
.subtitle{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #888;
  height: 35px;
  color: #888;
}
.comment_button{
  margin-bottom: 10px;
  margin-top: 10px;
}
img{
  width: 100%;
}
.item{
    font-size: 14px;
    background-color: #18181818;
    margin-bottom: 8px;
    padding: 8px;
}
</style>

