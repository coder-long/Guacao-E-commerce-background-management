import Vue from 'vue';
import Vuex from 'vuex'
import {
  GET_USERINFO
} from './mutations-type'
import {
  getLogin
} from '../api/common'

Vue.use(Vuex)

//创建仓库

/*
   1.state,单一状态树 就是一个普通对象，用来真正存放数据的地方 
           可以直接通过 $store.state拿，一般把它映射成计算属性

   2.getters,相对与是state的派生数据 

   3.mutations, 是修改仓库数据的地方

   4.actions, 用来做异步的请求的地方，请求回来的数据再提交mutation

   5.module 分模块 

*/
const store = new Vuex.Store({



  //这是仓库 存放数据的地方  全局能拿到数据  每个组件都能改变这里面的数据 大管家 
  state: {
    count: 900,
    userInfo: {},
    userName: ''
  },

  //这里是修改数据的地方  
  mutations: {

    [GET_USERINFO](state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    getLogin({
      commit
    }, obj) {
      return new Promise((resolve, reject) => {

        getLogin(obj).then((userInfo) => {
          commit('GET_USERINFO', userInfo.data)
          resolve(userInfo.data)
        })


      })

    }

  },
  getters: {

  },
  module: {

  }
})



export default store
