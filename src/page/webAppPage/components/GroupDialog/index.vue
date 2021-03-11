<!--
 * @FileDescription: 创建群组、修改群组弹出窗
 * @Author: hbh
 * @Date: 2021-02-19
 -->
<template>
  <el-dialog
    :close-on-click-modal="false"
    class="create-group"
    :title="title"
    :visible.sync="toggle"
  >
    <el-form ref="ruleForm" :rules="rules" :model="form">
      <el-form-item label="群组名：" prop="groupName">
        <el-input
          placeholder="为你的群组起个名字吧（最长20个字）"
          v-model="form.groupName"
          maxlength="20"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="群组简介：">
        <el-input
          placeholder="简单介绍一下你的群组..."
          rows="5"
          type="textarea"
          v-model="form.groupDesc"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        class="create-group__btn"
        type="primary"
        @click="handleClickBtn"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "createGroupDialog",
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    title: String
  },
  data() {
    return {
      dialogFormVisible: true,
      form: {
        groupName: "",
        groupDesc: ""
      },
      rules: {
        groupName: [
          { required: true, message: "请输入群组名称", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    toggle: {
      get() {
        return this.isShow;
      },
      set(val) {
        this.$emit("update:isShow", val);
      }
    }
  },
  methods: {
    // 确定
    handleClickBtn() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$emit("close", this.form);
        }
      });
    }
  },
  watch: {
    toggle(newVal) {
      if (!newVal) {
        this.form.groupName = this.form.groupDesc = "";
      }
    }
  }
};
</script>
<style lang="less">
@import "./style.less";
</style>
