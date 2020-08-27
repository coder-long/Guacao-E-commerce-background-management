<template>
  <div class="pruduct">
    <div class="pro_btn">
      <p>
        <el-select v-model="value" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </p>

      <p>
        <el-input v-model="keywords" clearable placeholder="关键字"></el-input>
      </p>
      <p>
        <el-button type="primary" @click="serach">搜索</el-button>
      </p>
      <p>
        <el-button type="primary" @click="addProduct">
          <i class="el-icon-plus"></i> 添加商品
        </el-button>
      </p>
    </div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="商品名称" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品描述" width="300">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品规格" width="180">
        <template slot-scope="scope">
          <span
            style="margin-left: 10px"
            v-for="(item,index) of scope.row.specAttr[0]"
            :key="index"
          >{{index +':'+item+", " }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品价格" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">￥{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品状态">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >{{scope.row.status?'下架':'上架'}}</el-button>
          <el-button size="mini" type="text">{{scope.row.status?'销售中':'已下架'}}</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetails(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
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
  name: "product",
  data() {
    return {
      serachInfo: {
        pageNum: 1,
        pageSize: 5,
        productName: "",
        productDesc: "",
      },
      updateStatus: {
        productId: "",
        status: 0,
      },
      update: "上架",
      queryInfo: {
        pageNum: 1,
        pageSize: 5,
      },
      total: 0,
      tableData: [],
      specAttr: [],
      options: [
        {
          value: "productName",
          label: "根据商品名称搜索",
        },
        {
          value: "productDesc",
          label: "根据商品描述搜索",
        },
      ],
      value: "",
      keywords: "",
    };
  },
  created() {
    this.getPruduct();
  },
  methods: {
    addProduct() {
      this.$router.push("/product/productadd");
    },
    //搜索
    serach() {
      if (this.value == "") {
        this.$message({
          type: "warning",
          message: "请输入关键字！",
        });
        return;
      }
      if (this.value == "productName") {
        this.serachInfo = {
          pageNum: 1,
          pageSize: 5,
          productName: this.keywords,
        };
      } else {
        this.serachInfo = {
          pageNum: 1,
          pageSize: 5,
          productDesc: this.keywords,
        };
      }
      this.getSearchPruduct();
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.updateStatus.productId = row._id;
      this.updateStatus.status = !row.status + 0;
      this.updateState();
      this.getPruduct();
    },
    handleUpdate(index, row) {
      this.$router.push(`/product/productUpdate/${row._id}`);
      console.log(row);
    },
    //查看详情
    handleDetails(index, row) {
      console.log(row);
      this.$router.push(`/product/productDetai/${row._id}`);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    async updateState() {
      const { data: res } = await this.$http.post(
        "/api/manage/product/updateStatus",
        this.updateStatus
      );
    },
    async getPruduct() {
      const { data: res } = await this.$http.get("/api/manage/product/list", {
        params: this.queryInfo,
      });
      this.tableData = res.data.list;
      this.total = res.data.total;
    },
    async getSearchPruduct() {
      const { data: res } = await this.$http.get("/api/manage/product/search", {
        params: this.serachInfo,
      });
      this.tableData = res.data.list;
      this.total = res.data.total;

      console.log(res.data);
    },
    changePage(page) {
      this.queryInfo.pageNum = page;
      console.log(this.queryInfo.pageNum);
      // this.tableData = [];
      this.getPruduct();
    },
  },
  filters: {
    updeta(id, item) {
      return item.find((itm) => {
        return id == itm._id;
      });
    },
  },
  // watch: {
  //   data(updateStatus, newval) {
  //     console.log(updateStatus);
  //     console.log(newval);
  //   },
  // },
};
</script>

<style  scoped>
.cell span {
  margin-left: 0 !important;
}
.pro_btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
}
.pro_btn > p {
  margin-right: 10px;
}
</style>