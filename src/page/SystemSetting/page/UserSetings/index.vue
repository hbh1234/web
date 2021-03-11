<!--
 * @FileDescription: 账号设置
 * @Author: hbh
 * @Date: 2021-02-05
 -->
<template>
  <div class="account-seting">
    <h2 class="account-seting-title">账号设置</h2>
    <div class="account-seting__details">
      <h3>您的登录信息</h3>
      <ul class="account-seting__list">
        <li>
          <label>企业微信</label>
          <el-checkbox class="bind-checkbox" v-model="checked"
            >未绑定</el-checkbox
          >
          <p>绑定后下次登录可直接使用扫一扫功能进行扫</p>
          <span class="bind-btn">解除绑定</span>
        </li>
        <li>
          <label>微信</label>
          <el-checkbox class="bind-checkbox" v-model="checked1"
            >解除绑定</el-checkbox
          >
          <p>绑定后下次登录可直接使用扫一扫功能进行扫</p>
          <span class="bind-btn bind-active">绑定</span>
        </li>
      </ul>
    </div>
    <div class="account-seting__details account-info">
      <h3>您的账号信息</h3>
      <ul class="account-seting__list">
        <li>
          <label>手机号：</label>
          <p>18234567890</p>
          <span @click="changPhone">更换手机号</span>
        </li>
        <li>
          <label>邮箱：</label>
          <p>18234567890@163.com</p>
          <span @click="changEamil">更换邮箱</span>
        </li>
      </ul>
    </div>
    <!-- 更换邮箱 --->
    <change-email-dialog
      @close="closeEmailCallback"
      :is-show.sync="isEmailDialog"
    ></change-email-dialog>
    <!-- 更换手机号码弹出层 -->
    <change-phone-dialog
      @close="closePhoneCallback"
      :is-show.sync="isPhoneDialog"
    ></change-phone-dialog>
  </div>
</template>
<script>
import api from "../api";
export default {
  data() {
    return {
      isEmailDialog: false, //打开/关闭 更改绑定邮箱
      isPhoneDialog: false, //打开/关闭 更换手机弹出层
      checked: false,
      checked1: false
    };
  },
  components: {
    "change-email-dialog": () => import("../../components/ChangeEmailDialog"),
    "change-phone-dialog": () => import("../../components/ChangePhoneDialog")
  },
  methods: {
    // 打开更换手机弹出层
    changPhone() {
      this.isPhoneDialog = true;
    },
    // 打开更换邮箱弹出层
    changEamil() {
      this.isEmailDialog = true;
    },
    // 获取更换手机数据 调用更换手机接口 手机号码
    async closePhoneCallback(data) {
      let { verifyCode, phone } = data;
      let ops = {
        phoneNo: phone,
        verifyCode
      };
      let res = await api.putUserPhone(ops);
      if (!res) {
        console.error("更换手机号失败");
      }
    },
    // 调用更换邮箱接口
    async closeEmailCallback(data) {
      console.log("==1", data);
      let { email } = data;
      let res = await api.putUserEmail({
        email
      });
      if (res) {
        this.isEmailDialog = false;
        console.log("==1调用更换邮箱接口11", res);
      }
    }
  }
};
</script>
<style scoped lang="less">
@import "../../less/style";
</style>
