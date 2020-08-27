<template>
  <div class="ProductDetai">
    <el-page-header @back="goBack" content="添加商品"></el-page-header>
    <el-divider></el-divider>
    <el-card class="box-card" shadow="never">
      <div v-for="o in 7" :key="o" class="text item">
        <el-button type="primary" plain disabled>按钮按钮</el-button>
        {{'列表内容 ' + o }}
        <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getDeatls(msg) {
      console.log(msg);
    },
  },
};
</script>

<style >
.text.item {
  text-align: left;
}
.ProductDetai .el-button{
    margin-right: 10px;
}
</style>