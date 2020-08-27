<template>
    <div>
        <router-link to="/search/posi">职位搜索</router-link>
        <router-link to="/search/comp">公司搜索</router-link>
         
        {{msg}} 

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data(){
        return {
            msg:""
        }
    },
    beforeRouteEnter(to,from,next){ //路由匹配成功了 ，但是这个组件还没有实例化完成之前执行
        //console.log(this)


        setTimeout(()=>{


             //手动的加个loading 


             //请求回来的数据是不是赋给 msg 

            next((vm)=>{ //vm 就是当前组件实例
            
                 vm.msg = "我是异步请求回来的数据1"

            })
            

        },600)


    },
    mounted(){
        console.log(this)
    },
    beforeRouteLeave(to,from,next){ //当中这个组件被切走的时候
          //当前是 表单输入 50个 48 突然一下点错了，给用户一个提示 .防止的误操作
          next()
    },

}
</script>

<style lang="less">
    
</style>