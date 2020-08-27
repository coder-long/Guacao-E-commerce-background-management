<template>
  <div class="product_add">
    <el-page-header @back="goBack" content="添加商品"></el-page-header>
    <el-divider></el-divider>

    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="商品名称" prop="name">
        <el-input type="text" v-model="ruleForm.name" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入商品描述"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="ruleForm.price" placeholder="请输入商品价格"></el-input>
      </el-form-item>
      <el-form-item label="起始库存" prop="count">
        <el-input v-model="ruleForm.count" placeholder="请输入起始库存"></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="category" clearable>
        <el-select v-model="ruleForm.category" placeholder="请选择活动区域" clearable>
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品规格" prop="category" clearable>
        <el-select v-model="ruleForm.category" placeholder="请选择活动区域" clearable>
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <!-- 图片上传 -->
      <el-form-item label="商品图片">
        <el-upload
          action="http://118.24.25.7:5000/api/manage/img/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload="true"
          :http-request="beforeUpload"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <!-- 编辑 -->
      <div class="editor">
        <p>
          <label class="el-form-item__label" style="width: 100px;">商品详情</label>
        </p>
        <p>
          <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          ></quill-editor>
        </p>
      </div>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { quillEditor } from "vue-quill-editor"; // 调用富文本编辑器
import "quill/dist/quill.snow.css"; // 富文本编辑器外部引用样式  三种样式三选一引入即可
//import 'quill/dist/quill.core.css'
//import 'quill/dist/quill.bubble.css'
export default {
  data() {
    return {
      ruleForm: {
        categoryId: "5f3b36682951f011b0076f0b", //分类ID
        pCategoryId: "0", //父分类ID
        name: "", //名称
        desc: "", //描述
        price: "", //价格
        detail: "", //商品详情
        // count: "", //库存
        // category: "", //分类
        imgs: [], //商品图片名数组
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        desc: [
          { required: true, message: "请输入商品描述", trigger: "blur" },
          {
            type: "string",
            message: "必须是文字",
          },
          {
            min: 5,
            max: 100,
            message: "长度在 5 到 100 个字符",
            trigger: "blur",
          },
        ],
        category: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { clearable: true },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        count: [
          { required: true, message: "请输入起始库存", trigger: "blur" },
          // { type: "number", message: "库存必须是数字" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      //图片相关
      dialogImageUrl: "",
      dialogVisible: false,
      content: `<p>hello world</p>`,
      editorOption: {},
    };
  },
  methods: {
    async AddProduct() {
      const { data: res } = await this.$http.post(
        "/api/manage/product/add",
        this.ruleForm
      );
      console.log(res);
    },
    goBack() {
      this.$router.go(-1);
    },
    //提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("error submit!!");
          return false;
        } else {
          alert("submit!");
          this.AddProduct();
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(file);
    },
    handleDownload(file) {
      console.log(file);
    },
    onEditorReady(editor) {}, // 准备编辑器
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {
      console.log(this.content);
    }, // 内容改变事件
    saveHtml: function (event) {
      alert(this.content);
    },
    //图片上传
    beforeUpload(file) {
      let fd = new FormData(); //通过form数据格式来传
      fd.append("image", file.file); //传文件
      this.$http
        .post("/api/manage/img/upload", fd)
        .then((res) => {
          let data = res.data;
          if (!data.status) {
            this.$message({
              message: "上传成功",
              type: "success",
            });
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch((error) => {});
    },
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
};
</script>

<style lang='scss'>
.product_add .el-input__inner {
  width: 750px;
}
div.ql-editor {
  min-height: 300px;
}
.quill-editor,
.el-textarea {
  width: 750px;
}
.el-input,
.el-form-item__content {
  text-align: left;
}
.ql-toolbar,
.editor {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.el-input__suffix {
  display: none;
}
.el-form-item--feedback {
  padding-top: 20px;
}
</style>