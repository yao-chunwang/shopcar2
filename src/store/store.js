import Vue from 'vue'
import Vuex from 'vuex'

//安转vuex到vue身上
Vue.use(Vuex)
    //一开始，本地存储可能已经有购物车数据
const carData = JSON.parse(localStorage.getItem('carData') || '[]')

const store = new Vuex.Store({
    //state用来提供数据
    state: {
        carData: carData
    },
    //mutations 对state中的数进行增删改
    mutations: {
        //添加商品到购物车，本地存储
        add(state, goods) {
            var hasgoofs = false //用来判断是否有相同商品
            state.carData.forEach(function(item, index) {
                if (item.id == goods.id) {
                    hasgoofs = true
                        //会直接修改原来商品的数据
                    item.number += parseInt(goods.number)
                }
            })
            if (hasgoofs == false) {
                //把商品存储到state中，再同步到本地存储
                state.carData.push(goods)
            }
            //同步到本地存储
            localStorage.setItem('carData', JSON.stringify(state.carData))
        },
        //删除商品
        delect(state, id) {
            state.carData.forEach(function(item, index) {
                    //找到指定id进行删除
                    if (item.id == id) {
                        state.carData.splice(index, 1)
                    }
                })
                //同步到本地存储
            localStorage.setItem('carData', JSON.stringify(state.carData))
        },
        //修改商品的选中转态
        updata(state, goods) {
            state.carData.forEach(function(item, index) {
                    //找到商品id,并修改
                    if (item.id == goods.id) {
                        item.selected = goods.selected
                    }
                }),
                localStorage.setItem('carData', JSON.stringify(state.carData))
        },
        //修改商品的购买数量
        updatagoods(state, goods) {
            state.carData.forEach(function(item, index) {
                    //找到商品id,并修改
                    if (item.id == goods.id) {
                        item.number = goods.number
                    }
                }),
                localStorage.setItem('carData', JSON.stringify(state.carData))
        },

    },
    //getters 获取state中的数据
    //外部调用通过this.$store.getters.getcarnumber
    getters: {
        //获取购物车商品数量
        getcarnumber(state) {
            var totalnumber = 0
            state.carData.forEach(function(item, index) {
                totalnumber += item.number
            })
            return totalnumber
        },
        //获取购物车中商品的id,并最终放回一个字符串形式
        getCarids(state) {
            var ids = [] //为了存储商品id
            state.carData.forEach(function(item, index) {
                ids.push(item.id)
            })
            return ids.toString()
        },
        //获取购物车中选中的总数量和价格
        gettotalprice(state) {
            var obj = {
                number: 0,
                price: 0
            }
            state.carData.forEach(function(item, index) {
                if (item.selected == true) {
                    obj.number += item.number
                    obj.price += item.number * item.price
                }
            })
            return obj
        },
        //获取指定商品的数量
        getcoodsnumber(state) {
            var obj = {}
            state.carData.forEach(function(item, index) {
                obj[item.id] = item.number
            })
            return obj
        },
        //获取商品选中状态
        getcoodsselect(state) {
            var obj = {}
            state.carData.forEach(function(item, index) {
                obj[item.id] = item.selected
            })
            return obj
        },
    }

})
export default store
