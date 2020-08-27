<template>
  <div class="catefory">
    <div class="category_h">
      <p>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>
            <a href="javascript:void(0)" @click="change">首页</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </p>
      <p>
        <el-button type="primary" @click="addclass">
          <i class="el-icon-plus"></i> 添加分类
        </el-button>
      </p>
    </div>
    <el-divider></el-divider>

    <el-table :data="categoryData" style="width: 100%" border>
      <el-table-column label="商品分类" width="680">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作选项">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改分类</el-button>
          <el-button
            size="mini"
            v-show="show"
            @click="handleDelete(scope.$index, scope.row)"
            title="scope.row.name"
          >查看子类</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="category.pageSize"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      title: "",
      categoryData: [],
      addClass: {
        parentId: "0",
        categoryName: "",
      },
      changeClass: {
        categoryId: "",
        categoryName: "",
      },
      category: {
        parentId: "0",
        pageNum: 1,
        pageSize: 5,
      },
      total: 0,
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    change() {
      this.title = "";
      this.show = true;
      this.category.parentId = 0;
      this.getCategory();
    },
    async getCategory() {
      const { data: res } = await this.$http.get("/api/manage/category/list", {
        params: this.category,
      });
      // console.log(res);
      this.categoryData = res.data.list;
      this.total = res.data.total;
    },
    async addList() {
      const { data: res } = await this.$http.post(
        "/api/manage/category/add",
        this.addClass
      );
      // console.log(res);
    },
    // 更新品类名称
    async getchangeList() {
      const { data: res } = await this.$http.post(
        "/api/manage/category/update",
        this.changeClass
      );
      // console.log(res);
    },
    addclass() {
      this.$prompt("分类名称", "添加分类", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: "",
      })
        .then(({ value }) => {
          // console.log(value);
          this.addClass.categoryName = value;
          // console.log(this.addClass.parentId);
          this.category.parentId = this.addClass.parentId;
          this.addList();
          this.getCategory();
          this.$message({
            type: "success",
            message: "添加成功！",
          });
        })
        .catch(() => {});
    },
    changePage(page) {
      this.category.pageNum = page;
      this.getCategory();
    },
    handleEdit(index, row) {
      this.$prompt("分类名称", "添加分类", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: "",
        inputErrorMessage: "邮箱格式不正确",
      })
        .then(({ value }) => {
          this.changeClass.categoryName = value;
          this.changeClass.categoryId = row._id;
          // console.log(index, row._id);
          this.getchangeList();
          this.getCategory();
          this.$message({
            type: "success",
            message: "修改成功！",
          });
        })
        .catch(() => {});
    },
    handleDelete(index, row) {
      this.show = false;
      // console.log(index, row);
      this.title = row.name;
      this.category.parentId = row._id;
      this.addClass.parentId = row._id;
      // console.log(this.addClass);
      this.getCategory();
    },
  },
};
</script>

<style>
.category_h {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style> 