import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/home.vue'
import Shopcart from '@/components/Shopcart/shopcart.vue'
import Preson from '@/components/Preson/preson.vue'
import Information from '@/components/Information/information.vue'
import Newsdetails from '@/components/Information/newsdetails.vue'
import Goods from '@/components/Car/goods.vue'
import Goodsdetal from '@/components/Car/goodsdetal.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/shopcart',
            component: Shopcart
        },
        {
            path: '/preson',
            component: Preson
        },
        {
            path: '/information',
            component: Information
        },
        {
            path: '/newsdetails/:id',
            component: Newsdetails,
        },
        //商品购买
        {
            path: '/goods',
            component: Goods,
        },
        //商品详情页
        {
            path: '/goodsdetal/:id',
            component: Goodsdetal,
        },
    ]
})
