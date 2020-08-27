<template>
  <div>
    <div class="or_h" style="display:flex">
      <el-select v-model="value"  placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="inputMsg" placeholder="关键字" clearable></el-input>
      <el-button type="primary" class="or_serch" @click="serch">
        <i class="el-icon-search"></i> 搜索
      </el-button>
    </div>
    <el-divider></el-divider>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="订单号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收件人" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.recipient }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.paymentMethod | paymentMethod}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单总价" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">￥{{ scope.row.allPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.create_time | formatDate}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/order/orderList' }">
            <el-button size="mini" type="text">查看详情</el-button>
          </el-breadcrumb-item>
        </el-breadcrumb>-->
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="text">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="queryInfo.pageSize"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputMsg: "",
      queryInfo: {
        pageNum: 1,
        pageSize: 3,
      },
      total: 0,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      options: [
        {
          value: "orderId",
          label: "按照订单号搜索",
        },
        {
          value: "recipient",
          label: "按照收件人搜索",
        },
      ],
      value: "",
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    async getOrderList() {
      const { data: res } = await this.$http.get("/api/manage/order/list", {
        params: this.queryInfo,
      });
      this.total = res.data.total;
      this.tableData = res.data.list;
      // console.log(res);
    },
    handleEdit(index, row) {
      // console.log(index, "000", row);
      this.$router.push(`/order/orderList/${row._id}`);
    },
    changePage(page) {
      this.queryInfo.pageNum = page;
      this.getUserList();
    },
    async serch() {
      if (this.inputMsg === "") {
        this.$message({
          type: "warning",
          message: "请填入内容！",
        });
        return false;
      }
      const { data: res } = await this.$http.get("/api/manage/order/search", {
        params: {
          type: this.value,
          value: this.inputMsg,
          pageNum: 1,
          pageSize: 2,
        },
      });
      this.total = res.data.total;
      this.tableData = res.data.list;
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

<style lang="scss" scoped>
.or_h.or_h {
  display: flex !important;
  height: 40px;
  align-items: center;
  justify-content: flex-start;
}
.el-input__inner {
  width: 220px !important;
}
div.el-input {
  width: 220px !important;
}
</style>