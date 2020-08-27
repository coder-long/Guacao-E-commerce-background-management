<template>
  <div>
      
      <input type="text" :value="user" @input="handleName($event.target.value)">

      {{user}}

      <p v-for="f in benzFours" :key="f.name">
          {{f.name}}
      </p>
      <button @click="handleName('洪哥哥哥')">改变Name</button>

      <button @click="handleFours">获取4s</button>
  </div>

</template>

<script>

import { mapState,mapGetters,mapMutations  } from 'vuex'

export default {
  data() {
    return {
      msg: "职位页面",
    };
  },
  methods: {
      //...mapMutations(["UPDATE_NAME"]),
       ...mapMutations({
           handleName:"UPDATE_NAME"
       }),
       handleFours(){
           this.$store.dispatch("fours/fetchFours") //加上命名空间前缀
       }
    //   handleName(){
    //       this.$store.commit("UPDATE_NAME","红红") //提交一个mutation
    //   } 
  },
  computed: {
     //...mapState(["userName"]) //扩展运算符
     ...mapState({
         user:(state)=> state.app.userName //只有state需要加模块名
     }),
     ...mapGetters("fours",["benzFours"]),
    //  benzFours(){
    //      return this.$store.getters.benzFours
    //  }

    //  userName(){
    //      return this.$store.state.userName
    //  }

  }
};
</script>

<style lang="less">
</style>