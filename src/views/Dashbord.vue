<template>
  <div class="content">
    <!-- 侧边栏 -->
    <aside>
      <el-row class="tac">
        <el-col :span="24">
          <h5>
            <img src="http://118.24.25.7:5000/img/logo.6f4321c1.png" alt />
          </h5>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <router-link to="/home">
              <el-menu-item index="4">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
              </el-menu-item>
            </router-link>

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-shop"></i>
                <span>商品</span>
              </template>
              <el-menu-item-group>
                <router-link to="/category">
                  <el-menu-item index="1-1">品类管理</el-menu-item>
                </router-link>
                <router-link to="/product">
                  <el-menu-item index="1-2">商品管理</el-menu-item>
                </router-link>
                <router-link to="/spec">
                  <el-menu-item index="1-3">规格属性</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>用户</span>
              </template>
              <el-menu-item-group>
                <router-link to="/user">
                  <el-menu-item index="1-4">用户管理</el-menu-item>
                </router-link>
                <router-link to="/role">
                  <el-menu-item index="1-5">权限管理</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-platform-eleme"></i>
                <span>订单</span>
              </template>
              <el-menu-item-group>
                <router-link to="/order">
                  <el-menu-item index="1-6">订单管理</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </aside>
    <!-- 右边 -->
    <div class="box">
      <!-- 头部 -->
      <header>
        <div class="user">
          <img src="../assets/logo.png" alt />
          <span>{{user}}</span> |
          <el-button @click="logout">退出登录</el-button>
        </div>
      </header>
      <!-- 内容 -->
      <content>
        <div class="con_box">
          <router-view></router-view>
        </div>
      </content>
      <!-- 底部 -->
      <footer>
        <h5>Created By 你大爷 At 2020.08</h5>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$confirm("确定退出, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "欢迎下次光临!",
          });

          //清除token  跳转页面
          window.sessionStorage.clear();

          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出登录",
          });
        });
    },
  },
  computed: {
    user() {
      return JSON.parse(window.sessionStorage.getItem("userInfo")).username;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" >
.content {
  width: 100%;
  height: 100%;
  display: flex;
}
aside {
  width: 15%;
  height: 100%;
  background-color: #2b2e33;
}
.box {
  width: 85%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
header {
  flex: 0.8;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
  min-height: 60px;
  position: relative;
  z-index: 100;
}
content {
  flex: 8.6;
  padding: 30px;
  overflow-y: scroll;
  background-color: #f3f3f3;
}
footer {
  flex: 0.6;
  background-color: #f3f3f3;

  > h5 {
    text-align: center;
    line-height: 30px;
  }
}
.tac h5 {
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #32323a;
  > img {
    width: 160px;
  }
}
.el-submenu__title {
  background-color: #2b2e33 !important;
}
.user {
  height: 60px;
  line-height: 60px;
  float: right;
  padding: 0 20px;
  > img {
    width: 20px;
    vertical-align: middle;
    margin-right: 10px;
  }
  > span {
    margin-right: 10px;
  }
  > .el-button {
    margin-left: 10px;
    padding: 2px 15px;
  }
}

.el-menu-vertical-demo li:nth-of-type(1),
.el-submenu__title {
  text-align: left;
}
li.el-menu-item {
  text-align: center;
}
.con_box {
  padding: 20px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  background-color: white;
}
</style>