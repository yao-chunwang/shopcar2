// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//图片懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload);
Vue.use(Lazyload, {
    lazyComponent: true,
});
//引入store数据管理
import store from './store/store'
Vue.config.productionTip = false

//过滤全局时间转化器
import moment from 'moment';
Vue.filter('converter', function(dataStr, pattern = 'YYYY-MM-DD') {
    return moment(dataStr).format(pattern)
})


new Vue({
    el: '#app',
    router,
    //挂载对象
    store,
    components: { App },
    template: '<App/>'
})
