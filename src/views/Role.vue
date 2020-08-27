<template>
  <div class="roule">
    <div class="btn">
      <el-button type="primary" @click="createUser">创建角色</el-button>
    </div>
    <el-divider></el-divider>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="角色名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.create_time | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="授权时间" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.auth_time | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="授权人" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.auth_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">设置权限</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="设置权限" :visible.sync="dialogTableVisible">
      <el-tag>{{ item }}</el-tag>
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        ref="tree"
        :props="defaultProps"
        @check-change="checkChange"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="setPermission">确 定</el-button>
      </span>
    </el-dialog>

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
import store from "../store/index";
export default {
  data() {
    return {
      queryInfo: {
        pageNum: 1,
        pageSize: 5,
      },
      total: 0,
      tableData: [],
      dialogTableVisible: false,
      data: [
        {
          id: 1,
          menus_route: "/home",
          label: "首页",
        },
        {
          id: 2,
          menus_route: "/goods",
          label: "商品",
          children: [
            {
              id: 3,
              menus_route: "/category",
              label: "品类管理",
            },
            {
              id: 4,
              menus_route: "/product",
              label: "商品管理",
            },
            {
              id: 5,
              menus_route: "/spec",
              label: "规格属性",
            },
          ],
        },
        {
          id: 6,
          menus_route: "/user",
          label: "用户",
          children: [
            {
              id: 7,
              menus_route: "/users",
              label: "用户管理",
            },
            {
              id: 8,
              menus_route: "/role",
              label: "权限管理",
            },
          ],
        },
        {
          id: 9,
          menus_route: "/order",
          label: "订单",
          children: [
            {
              id: 10,
              menus_route: "/orders",
              label: "订单管理",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      item: "",
      setPermissionInfo: {
        _id: "",
        menus: [],
        auth_time: "",
        auth_name: "",
      },
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    setPermission() {
      this.dialogTableVisible = false;
      this.$http
        .post("/api/manage/role/update", this.setPermissionInfo)
        .then((res) => {
          // console.log(res.data);
          !res.data.status
            ? this.$refs.tree.setCheckedKeys([])
            : this.$message({
                type: "error",
                message: "权限设置失败",
              });
        })
        .catch();
      this.getRoles();
      // console.log(this.$refs.tree.getCheckedNodes());
    },
    checkChange(a, b, c) {
      // console.log(a, b, c);
      if (b && this.setPermissionInfo.menus.indexOf(a.menus_route) == -1) {
        this.setPermissionInfo.menus.push(a.menus_route);
      } else {
        this.setPermissionInfo.menus.find((item, index) => {
          if (
            a.menus_route === item &&
            this.setPermissionInfo.menus.indexOf(item) != -1
          ) {
            this.setPermissionInfo.menus.splice(index, 1);
          }
        });
      }
    },
    handleEdit(index, row) {
      // console.log(index, row);
      this.dialogTableVisible = true;
      this.item = `当前设置角色:${row.name}`;
      this.setPermissionInfo._id = row._id;
      //取登录用户的信息
      this.setPermissionInfo.auth_name = JSON.parse(
        window.sessionStorage.getItem("userInfo")
      ).username;

      this.setPermissionInfo.auth_time = row.auth_time;

      // console.log(this.$store.state);
    },
    handleDelete(index, row) {
      // console.log(index, row);
    },
    async getRoles() {
      const { data: res } = await this.$http.get("/api/manage/role/list", {
        params: this.queryInfo,
      });

      this.tableData = res.data.list;
      this.total = res.data.total;
    },
    changePage(page) {
      this.queryInfo.pageNum = page;
      // console.log(this.queryInfo.pageNum);
      // this.tableData = [];
      this.getRoles();
    },
    createUser() {
      this.$prompt("请输入角色名称", "添加角色", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: "",
        inputErrorMessage: "",
      })
        .then(({ value }) => {
          this.$http
            .post("/api/manage/role/add", { roleName: value })
            .then((res) => {
              // console.log(res);
              if (res.data.status === 0)
                this.$message({
                  type: "success",
                  message: "角色创建成功。",
                });
            });
        })
        .catch(() => {});
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
  },
};
</script>

<style lang='scss'scoped >
.btn {
  display: flex;
  align-items: flex-st art;
}
.el-dialog__title {
  float: left;
}
</style>