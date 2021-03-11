<!--
 * @FileDescription: 注册
 * @Author: hbh
 * @Date: 2021-02-05
 -->
<template>
  <div class="register">
    <h6 class="register-title">
      欢迎加入鸿云！请按照步骤进行注册
    </h6>
    <div class="register-step">
      <hzw-steps :data="steps" :active="currentStep"></hzw-steps>
    </div>
    <div class="register-from-wrap">
      <!-- step 1 手机验证 -->
      <el-form :model="form" v-show="currentStep === 0">
        <el-form-item label="手机号：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item class="register-password" label="验证码：">
          <el-input v-model="form.name"></el-input>
          <el-button class="register-code" type="">验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            class="register-next-btn"
            type="primary"
            @click="submitForm('ruleForm', 1)"
            >下一步</el-button
          >
        </el-form-item>
      </el-form>
      <!-- step 2 设置密码 -->
      <el-form :model="form" v-show="currentStep === 1">
        <el-form-item label="设置密码：">
          <el-input v-model="form.name" placeholder="请设置密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：">
          <el-input v-model="form.name" placeholder="请再次确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="register-next-btn"
            type="primary"
            @click="submitForm('ruleForm', 2)"
            >下一步</el-button
          >
        </el-form-item>
      </el-form>
      <!-- step 3 绑定邮箱 -->
      <div class="register-success" v-show="currentStep === 2">
        <img
          class="register-success__pic"
          src="@/assets/admin_images/edit_succes_pic.png"
        />
        <h6 class="register-success__title">修改成功！</h6>
        <p class="register-success__msg">已为您修改成功，请重新登录账号～</p>
        <el-button
          class="register-success__login-btn"
          type="primary"
          @click="submitForm('ruleForm')"
          >立即登录</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "register",
  data() {
    return {
      steps: [{ name: "验证手机" }, { name: "设置密码" }, { name: "绑定邮箱" }],
      currentStep: 0, // 当前环节
      form: {
        name: "1111"
      }
    };
  },
  methods: {
    next() {
      this.currentStep++;
    },
    submitForm(el, nextNumber) {
      this.currentStep = nextNumber;
    }
  }
};
</script>
<style lang="less" scope>
@import "./less/register.less";
</style>
