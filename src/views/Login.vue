<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <div class="login-box">
          <h3>用户登陆</h3>
          <el-form
            status-icon
            class="demo-ruleForm"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
          >
            <el-form-item prop="username">
              <el-input
                placeholder="请输入用户名"
                type="text"
                autocomplete="off"
                v-model="ruleForm.username"
              >
                <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                placeholder="请输入密码"
                type="password"
                autocomplete="off"
                v-model="ruleForm.password"
              >
                <i slot="prefix" class="el-input__icon el-icon-view"></i>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import store from "../store/index";
export default {
  data() {
    return {
      ruleForm: { username: "", password: "" },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
      },

      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        //数据校验的方法
        const loading = this.$loading({
          lock: true,
          text: "登陆中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });

        if (valid) {
          //发请求跳转页面

          let { data: res } = await this.$http.post(
            "/api/login",
            this.ruleForm
          );
          console.log(res);
          if (res.status != 0) return this.$message.error("登陆失败");

          this.$message.success("登录成功。");
          this.$store.state.userName = res.data.username;
          //将登录成功的token保存到客户端 的sessionstorge
          window.sessionStorage.setItem("token", res.token);
          window.sessionStorage.setItem("userInfo", JSON.stringify(res.data));
          //编程式导航跳转到后台主页
          this.$router.replace("/home");
        } else {
          this.$message.error("请正确填写!");
        }
        loading.close();
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleLogin() {
      this.$router.push(`/my/honghong?gender=0`);

      this.$router.replace({
        name: "user",
        params: {
          id: "honghong",
        },
        query: {
          gender: "0", //组件通讯的方式
        },
      });

      // replace 不产生历史记录  登陆就会使用

      // router.go(-1)
    },
  },
};
</script>

<style >
.login-box {
  padding: 20px 40px;
  background-color: #a6a0a080;
}

.login-box h3 {
  text-align: center;
}
</style>