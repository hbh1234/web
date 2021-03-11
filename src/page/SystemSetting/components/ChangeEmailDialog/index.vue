<!--
 * @FileDescription: 更改手机号码
 * @Author: hbh
 * @Date: 2021-02-05
 -->
<template>
  <el-dialog
    class="change-email"
    :close-on-click-modal="false"
    title="更换邮箱"
    :visible.sync="toggle"
  >
    <el-form
      :model="form"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
    >
      <el-form-item
        prop="email"
        label="邮箱"
        :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ]"
      >
        <el-input v-model="form.email"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('dynamicValidateForm')"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        email: ""
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.toggle = false;
          this.$emit("close", this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  watch: {
    isShow: function(value) {
      if (value) {
        this.form.email = "";
      }
    }
  }
};
</script>
<style scoped lang="less">
@import "./index.less";
</style>
