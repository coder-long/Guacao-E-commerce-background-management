<template>
  <div>
    <el-page-header @back="goBack" content="详情页面"></el-page-header>
    <el-divider></el-divider>
    <div class="car_body">
      <div>
        <span>订单号</span>
        <span>{{ orderInfo.orderId }}</span>
      </div>
      <div>
        <span>订单人</span>
        <span>{{ orderInfo.recipient }}</span>
      </div>
      <div>
        <span>创建时间</span>
        <span>{{ orderInfo.create_time | formatDate}}</span>
      </div>
      <div>
        <span>订单状态</span>
        <span>{{ orderInfo.paymentMethod | paymentMethod}}</span>
      </div>
      <div>
        <span>商品价格</span>
        <span>￥{{ orderInfo.allPrice }}</span>
      </div>
      <div>
        <span>支付方式</span>
        <span>{{ orderInfo.recipient }}</span>
      </div>
    </div>
    <el-divider>
      <i class="el-icon-mobile-phone"></i>
    </el-divider>
    <!-- <el-table style="width: 100%" border>
      <el-table-column label="商品名称" width="180">
        <span style="margin-left: 10px">{{ orderInfo.details[0].name }}</span>
      </el-table-column>
      <el-table-column label="商品图片" width="180">
        <span style="margin-left: 10px">{{ orderInfo.details[0].info }}</span>
      </el-table-column>
      <el-table-column label="商品信息" width="180">
        <span style="margin-left: 10px">{{ orderInfo.details[0].info }}</span>
      </el-table-column>
      <el-table-column label="单价" width="180">
        <span style="margin-left: 10px">{{orderInfo.details[0].price }}</span>
      </el-table-column>
      <el-table-column label="数量" width="180">
        <span style="margin-left: 10px">{{ orderInfo.details[0].count }}</span>
      </el-table-column>
    </el-table> -->
    <table border="1">
      <thead>
        <tr>
          <th>商品名称</th>
          <th>商品图片</th>
          <th>商品信息</th>
          <th>单价</th>
          <th>数量</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{orderInfo.details[0].name}}</td>
          <td>
            <img :src="orderInfo.details.imgs" alt />
          </td>
          <td>{{orderInfo.details[0].info}}</td>
          <td>￥{{orderInfo.details[0].price}}</td>
          <td>{{orderInfo.details[0].count}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderInfo: [],
    };
  },
  created() {
    this.getOrderInfo();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async getOrderInfo() {
      const { data: res } = await this.$http.get("/api/manage/order/info", {
        params: { value: this.$route.params.id },
      });
      console.log(res);
      this.orderInfo = res.data;
      console.log(this.orderInfo.details);
    },
  },
  filters: {
    formatDate(value) {
      // 时间戳转换日期格式方法
      if (value == null) {
        return "";
      } else {
        let date = new Date(value);
        let y = date.getFullYear(); // 年
        let MM = date.getMonth() + 1; // 月
        MM = MM < 10 ? "0" + MM : MM;
        let d = date.getDate(); // 日
        d = d < 10 ? "0" + d : d;
        let h = date.getHours(); // 时
        h = h < 10 ? "0" + h : h;
        let m = date.getMinutes(); // 分
        m = m < 10 ? "0" + m : m;
        let s = date.getSeconds(); // 秒
        s = s < 10 ? "0" + s : s;
        return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
      }
    },
    paymentMethod(value) {
      return value == 1 ? "未支付" : "已支付";
    },
  },
};
</script>

<style lang='scss' scoped>
.order_l_h {
  display: flex;
  align-items: center;
  > span {
    padding: 9px 15px;
    cursor: pointer;
    color: blue;
  }
}
.car_body {
  margin-bottom: 20px;
  > div {
    text-align: left;
    > span:nth-of-type(1) {
      font-size: 12px;
      color: #409eff;
      text-align: right;
    }
    > span:nth-of-type(2) {
      margin-left: 20px;
      font-size: 12px;
    }
  }
}
.el-page-header__content {
  font-size: 14px;
  font-weight: bold;
}
td {
  padding: 0 10px;
}
</style>