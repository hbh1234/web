<!--
 * @FileDescription: 注册
 * @Author: hbh
 * @Date: 2021-02-05
 -->
<template>
  <div class="register">
    <h6 class="register-title">重新设置登录密码</h6>
    <div class="register-step">
      <hzw-steps :data="steps" :active="currentStep"></hzw-steps> 
    </div>
    <div class="register-from-wrap">
      <!-- step 1 手机验证 -->
      <el-form
        :model="formPhone"
        :rules="formPhoneRules"
        ref="formPhone"
        v-show="currentStep === 0"
      >
        <el-form-item label="手机号：" prop="phoneNumber">
          <el-input v-model="formPhone.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item class="register-password" label="验证码：">
          <el-input v-model="formPhone.phoneCode"></el-input>
          <el-button
            @click="getPhoneCode"
            :disabled="isBtn"
            class="register-code"
            >{{ codeBtnName }}</el-button
          >
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
import api from "./api";
import { validatePhone, validaCode } from "./valida";
export default {
  name: "register",
  data() {
    return {
      codeBtnName: "获取验证码",
      isBtn: false,
      steps: [{ name: "验证手机" }, { name: "设置密码" }, { name: "修改成功" }],
      currentStep: 0,
      formPhone: {
        // 手机、验证码
        phoneNumber: "",
        phoneCode: ""
      },
      formPhoneRules: {
        // 手机、验证码
        phoneNumber: [{ validator: validatePhone, trigger: "blur" }],
        phoneCode: [{ validator: validaCode, trigger: "blur" }]
      },
      form: {
        name: "1111"
      }
    };
  },
  methods: {
    // 获取手机验证码
    getPhoneCode() {
      this.$refs.formPhone.validate(async valid => {
        if (valid) {
          let phoneNumber = this.formPhone.phoneNumber;
          let res = await api.getUserSmsPhoneVerify(phoneNumber, {
            type: 0 // 重置密码
          });
          console.log("===1", res);
          //this.countDown();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    next() {
      this.currentStep++;
    },
    submitForm(el, nextNumber) {
      this.currentStep = nextNumber;
    },
    // 倒计时60s
    countDown() {
      let second = 60;
      this.isBtn = true;
      this.timer = setInterval(() => {
        if (second <= 0) {
          clearInterval(this.timer);
          second = 60;
          this.isBtn = false;
          this.codeBtnName = "重新获取";
          return false;
        }
        this.isBtn = true;
        second = second - 1;
        this.codeBtnName = `${(second + "").padStart(2, "0")}s`;
      }, 1000);
    }
  }
};
</script>
<style lang="less" scope>
@import "./less/register.less";
</style>
