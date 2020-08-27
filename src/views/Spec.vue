<template>
  <div class="spec">
    <div class="spec_btn">
      <p>
        <el-input v-model="serachInfo.value" clearable placeholder="关键字"></el-input>
      </p>
      <p>
        <el-button type="primary" @click="serach">搜索</el-button>
      </p>
      <p>
        <el-button type="primary" @click=" dialogFormVisible = true ">
          <i class="el-icon-plus"></i> 添加规格
        </el-button>
      </p>
    </div>
    <!-- 表单 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="addInfo">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-select v-model="addInfo.c_id" placeholder="请选择">
            <el-option :label="item.name" :value="item._id" v-for="item in categoryData" :key="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-input v-model="addInfo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-input v-model="addInfo.option" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSpec('addInfo')">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="规格名称" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规格属性值" width="450">
        <template slot-scope="scope">
          <span
            style="margin-left: 10px"
            v-for="(item,index) in scope.row.option"
            :key="index"
          >{{ item + ', ' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规格归类" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.category_id | getCat(categoryData)}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作选项">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      queryInfo: {
        pageNum: 1,
        pageSize: 5,
      },
      total: 0,
      tableData: [],
      //搜索
      serachInfo: {
        value: "",
        pageNum: 1,
        pageSize: 5,
      },
      //添加
      addInfo: {
        name: "",
        c_id: "",
        option: [''],
      },
      //表单
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      category: {
        parentId: 0,
        pageNum: "",
        pageSize: "",
      },
      categoryData: [],
    };
  },
  created() {
    // this.$http
    //   .get("/api/manage/category/list", {
    //     params: { categoryId: "5f3a51c82951f011b0076ef6" },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     this.category = res.data.data.list;
    //     console.log(this.category);
    //   });
    this.getCategory();
    this.getSpec();
    // this.$http
    //   .get("/api/manage/sysAttr/get", {
    //     params: { id: "5f3a51c82951f011b0076ef6" },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   });
  },
  methods: {
    //搜索
    serach() {
      if (this.serachInfo.value === "") {
        this.$message({
          message: "请输入内容！",
          type: "warning",
        });
        return false;
      } else {
        this.$http
          .get("/api/manage/sysAttr/search", { params: this.serachInfo })
          .then((res) => {
            console.log(res.data.data);
            this.total = res.data.data.total;
            this.tableData = res.data.data.list;
          })
          .catch((error) => {});
      }
    },
    //添加
    addSpec(addInfo) {
      // this.dialogFormVisible = false;
      this.$http
        .get("/api/manage/sysAttr/add", { params: this.addInfo })
        .then((res) => {
          console.log(res);
        })
        .catch();
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      //删除
      console.log(index, row);
      this.$http
        .post("/api/manage/sysAttr/delete", { _id: row._id })
        .then((res) => {
          console.log(res);
          if (res.data.status == 0) {
            this.$message({
              message: "删除成功！",
              type: "success",
            });
            this.getSpec();
          }
        })
        .catch();
    },
    async getSpec() {
      const { data: res } = await this.$http.get("/api/manage/sysAttr/list", {
        params: this.queryInfo,
      });
      console.log(res);
      this.tableData = res.data.list;
      this.total = res.data.total;
    },
    changePage(page) {
      this.queryInfo.pageNum = page;
      console.log(this.queryInfo.pageNum);
      this.getSpec();
    },
    async getCategory() {
      const { data: res } = await this.$http.get("/api/manage/category/list", {
        params: this.category,
      });
      // console.log(res);
      this.categoryData = res.data.list;
      this.total = res.data.total;
      console.log(this.categoryData);
    },
  },
  computed: {
    option() {
      return this.tableData.forEach((item) => item.option);
    },
  },
  filters: {
    getCat(id, categoryData) {
      return categoryData.find((item) => {
        return id == item._id;
      }).name;
    },
  },
};
</script>

<style scoped>
.cell span {
  margin-left: 0 !important;
}
.spec_btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
}
.spec_btn > p {
  margin-right: 10px;
}
.el-dialog {
  text-align: left !important;
}
</style>