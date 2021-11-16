import axios from 'axios'
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
    //导出接口数据
axios.defaults.baseURL = 'http://127.0.0.1:3000/api'

//请求轮播数据
export const getlunbo = async function() {
        var res = await axios.get('/getlunbo')
        return res.data
    }
    //请求新闻列表数据
export const getinfor = async function(hasfull) {
        var res = await axios.get('/getnewslist')
        if (hasfull) {
            Toast('刷新成功')
        }
        return res.data
    }
    //获取新闻详情
export const getnewsdetail = async function(id) {
        var res = await axios.get('getnew/' + id)
        return res.data
    }
    //获取新闻评论
export const getnewscomment = async function(id, pageindex) {
        var res = await axios.get('/getcomments/' + id + '?pageindex=' + pageindex)
        return res.data
    }
    //提交评论 post请求
export const sendcomment = async function(id, content) {
        var params = new URLSearchParams()
        params.append('content', content)
        var res = await axios.post('/postcomment/' + id, params)
        return res.data
    }
    //获取商品列表
export const getgoods = async function(pageindex) {
    var res = await axios.get('/getgoods?pageindex=' + pageindex)
    return res.data
}

//获取商品的轮播图片
export const getgoodsthumb = async function(id) {
    var res = await axios.get('/getthumbimages/' + id)
    return res.data
}

export const getGoodsInfo = async function(id) {
        var res = await axios.get('/getgoodsinfo/' + id)
        return res.data
    }
    //获取购物车商品
export const getCarGoods = async function(ids) {
    var res = await axios.get('/getshopcarlist/' + ids)
    return res.data
}