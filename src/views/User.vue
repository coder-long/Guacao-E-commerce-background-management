<template>
  <div>
    <div class="create_user">
      <el-button type="primary" @click="CreateBtn">创建用户</el-button>
    </div>
    <!-- 创建用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" center="center">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="role_id">
          <el-select v-model="form.role_id" placeholder="请选择活动区域">
            <el-option
              :label="item.name"
              :value="item._id"
              v-for="item in userRoleList"
              :key="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button type="primary" @click="createUser('form')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户 -->
    <el-dialog title="修改用户" :visible.sync="ModifydialogFormVisible" center="center">
      <el-form :model="ModifyForm" :rules="rules" ref="ModifyForm">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="ModifyForm.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="ModifyForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="ModifyForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="role_id">
          <el-select v-model="ModifyForm.role_id" placeholder="请选择活动区域">
            <el-option
              :label="item.name"
              :value="item._id"
              v-for="item in userRoleList"
              :key="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ModifyForm')">取 消</el-button>
        <el-button type="primary" @click="MOdifyUser('ModifyForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="用户名" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.create_time | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限角色" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.role_id | role(roles)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        pageSize: 3,
      },
      pageSize: 5,
      userList: [],
      total: 0,
      tableData: [],
      roles: [],
      dialogFormVisible: false,
      ModifydialogFormVisible: false,
      form: {
        username: "",
        password: "",
        phone: "",
        email: "",
        role_id: "",
      },
      ModifyForm: {
        _id: "",
        username: "",
        phone: "",
        email: "",
        role_id: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error("手机号格式错误"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { type: "email", message: "请输入正确邮箱", trigger: "blur" },
        ],
        role_id: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
      center: false,
      check: true,
      createBtn: {
        pageNum: 1,
        pageSize: "",
      },
      userRoleList: [], //权限角色
      Difference: "", //区别修改与
    };
  },
  created() {
    this.getUserList();
    // console.log(this.roles);
  },
  methods: {
    resetForm(formName) {
      //重置
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
      this.ModifydialogFormVisible = false;
    },
    CreateBtn() {
      this.dialogFormVisible = true;
      // console.log(this.form.role_id);
      this.$http
        .get("/api/manage/role/list", { params: this.createBtn })
        .then((res) => {
          this.userRoleList = res.data.data.list;
          // console.log(res.data.data.list);
        });
    },
    createUser(formName) {
      //创建用户
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.form.role_id);
          this.$http.post("/api/manage/user/add", this.form).then((res) => {
            console.log(res.data);
            if (res.data.status == 0) {
              this.$message({
                type: "success",
                message: "创建成功",
              });
              this.getUserList();
              this.dialogFormVisible = false;
            }
          });
        } else {
          this.$message({
            type: "warning",
            message: "创建失败，请确认信息是否填写完整！",
          });
          return false;
        }
      });
    },
    MOdifyUser(formName) {
      //修改用户
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.form.role_id);
          this.dialogFormVisible = false;
          this.$http
            .post("/api/manage/user/update", this.ModifyForm)
            .then((res) => {
              // console.log(res.data);
              if (res.data.status == 0) {
                this.$message({
                  type: "success",
                  message: "修改成功",
                });
                this.ModifydialogFormVisible = false;
                this.getUserList();
              }
            });
        } else {
          this.$message({
            type: "warning",
            message: "创建失败，请确认信息是否填写完整！",
          });
          return false;
        }
      });
    },
    async getUserList() {
      const { data: res } = await this.$http.get("/api/manage/user/list", {
        params: this.queryInfo,
      });

      this.userList = res.data.list;
      this.tableData = res.data.list;
      this.total = res.data.total;
      this.roles = res.data.roles;
      // console.log(res.data.roles);
    },
    //修改
    handleEdit(index, row) {
      this.ModifydialogFormVisible = true;
      this.ModifyForm.username = row.username;
      this.ModifyForm._id = row._id;
      this.ModifyForm.phone = row.phone;
      this.ModifyForm.email = row.email;
      this.$http
        .get("/api/manage/role/list", { params: this.createBtn })
        .then((res) => {
          this.userRoleList = res.data.data.list;
          // console.log(res.data.data.list);
        });
      // console.log(index, row);
    },

    //分页
    changePage(page) {
      // console.log(11, page);
      this.queryInfo.pageNum = page;
      // console.log("uuuuuu", this.queryInfo.pageNum);
      // this.tableData = [];
      this.getUserList();
    },
    //删除
    handleDelete(index, row) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http
            .post("/api/manage/user/delete", {
              userId: row._id,
            })
            .then((res) => {
              if (res.data.status === 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.getUserList();
              }
            });

          // console.log(index, row);
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
    role(id, roles) {
      return roles.find((item) => {
        return id === item._id;
      }).name;
    },
  },
};
</script>

<style scoped>
.create_user {
  display: flex;
  justify-content: flex-start;
  padding-bottom: 10px;
}
</style>