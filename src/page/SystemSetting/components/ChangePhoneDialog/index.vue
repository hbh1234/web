<!--
 * @FileDescription: 更改手机号码 与账号相关联的业务组件
 * @Author: hbh
 * @Date: 2021-02-05 :rules="ruleForm"
 -->
<template>
  <el-dialog
    class="change-phone"
    :close-on-click-modal="false"
    title="更换手机号"
    :visible.sync="toggle"
  >
    <el-form :model="form" ref="dynamicValidateForm" label-width="100px">
      <el-form-item prop="phone" label="手机号：">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item prop="verifyCode" label="验证码：">
        <el-input class="code" v-model="form.verifyCode"></el-input>
        <el-button :disabled="isBtn" class="code-btn" @click="getPhoneCode">{{
          codeBtnName
        }}</el-button>
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
import api from "./api";
import { validatePhone, validaCode } from "./valida";
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timer: null,
      isBtn: false,
      codeBtnName: "获取验证码",
      ruleForm: {
        phone: [{ validator: validatePhone, trigger: "blur", required: true }],
        verifyCode: [{ validator: validaCode, trigger: "blur", required: true }],
      },
      form: {
        phone: "",
        verifyCode: ""
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
    // 获取手机验证
    async getPhoneCode() {
      let { phone } = this.form;
      if (phone != "") {
        let res = await api.getUserPhone(phone);
        if (res) {
          this.$hzwMessage({
            message: "手机号已存在"
          });
        } else {
          this.getSmsSend();
        }
      } else {
        this.$hzwMessage({
          message: "手机号不能为空！"
        });
      }
    },
    // 手机号码没有注册过，获取手机短信 type: 1 注册
    async getSmsSend() {
      let { phone } = this.form;
      let res = await api.getUserPhone(phone, {
        type: 1
      });
      if (res === "发送短信验证码成功") {
        this.countDown();
        this.$hzwMessage({
          message: "发送短信验证码成功！"
        });
      } else {
        this.$hzwMessage({
          message: "发送短信验证码失败！"
        });
        // 倒计时60s
        this.countDown();
      }
    },
    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let { phone, verifyCode } = this.form;
          let ops = {
            phoneNo: phone,
            verifyCode: verifyCode
          };
          // 校验用户输入的短信验证码
          let res = await api.putSmsSend(ops);
          if (res === "短信验证成功") {
            this.$emit("close", this.form);
          }
        } else {
          this.$hzwMessage({
            message: "短信验证失败"
          });
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 倒计时60s
    countDown() {
      let second = 60;
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
  },
  watch: {
    isShow: function(bl) {
      if (bl) {
        Object.assign(this.$data, this.$options.data());
      } else {
        window.clearInterval(this.timer);
        this.timer = null;
      }
    }
  }
};
</script>
<style scoped lang="less">
@import "./index.less";
</style>
