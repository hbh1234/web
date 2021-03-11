<!--
 * @FileDescription: 账户充值
 * @Author: hbh
 * @Date: 2021-03-01
 -->
<template>
  <div class="app-main-layout recharge-member">
    <div class="app-main__body">
      <div class="buy-member-head recharge-member-head">
        <h3>账户充值<span @click="goback" class="goback">返回上一页</span></h3>
        <p>持续保障您的资金安全，帮您存储学术资金，方便用于下次购买机时会员</p>
      </div>
      <div class="buy-member-form">
        <ul>
          <li>
            <div class="buy-member__form-item">
              <label>当前用户：</label>
              <span class="buy-member-name"> {{ userName }} </span>
            </div>
          </li>
          <li>
            <div class="buy-member__form-item">
              <label>账户余额：</label>
              <span class="buy-member-name">{{ balance }}</span>
            </div>
          </li>
          <li class="account-line">
            <div class="buy-member__form-item">
              <label>充值金额：</label>
              <el-input
                v-model="payValue"
                @input="handleChangeInput"
                class="recharge-amount__input"
                placeholder="请输入您要充值的金额"
              ></el-input>
              <p class="input-error" v-show="isError">数字或两位小数</p>
            </div>
          </li>
          <li>
            <div class="buy-member__form-item">
              <label>支付方式：</label>
              <div class="payment-list">
                <div
                  class="payment-item"
                  :class="{ active: item.type == active }"
                  :key="item.type"
                  v-for="item in paymentList"
                  @click="handleClickPayment(item)"
                >
                  <img :src="item.icon" />
                </div>
              </div>
            </div>
            <div class="payment-code" v-show="isPaymentCode">
              <div class="payment-code-pic">
                <iframe
                  :srcdoc="alipayCode"
                  frameborder="no"
                  border="0"
                  marginwidth="0"
                  marginheight="0"
                  scrolling="no"
                  width="100%"
                  height="100%"
                  style="overflow: hidden"
                >
                </iframe>
              </div>
              <div class="payment-details">
                <h5>
                  实付款：<strong>{{ paymentNumber }}</strong
                  >元
                </h5>
                <p class="payment-type zfb-code">支付宝APP扫码支付</p>
                <!-- <p class="payment-type wx-code">微信APP扫码支付</p> -->
              </div>
            </div>
            <p class="payment-success">
              支付后点击“完成”返回支付结果，支付成功
            </p>
          </li>
        </ul>
      </div>
      <dl class="purchase-explain">
        <dt>购买说明：</dt>
        <dd>
          支付后点击“完成”返回支付结果，支付成功即同意《鸿云Saas机时会员服务协议》
        </dd>
      </dl>
    </div>
  </div>
</template>
<script>
import { setStore, getStore } from "@/common/store.js";
import { mapState } from "vuex";
import api from "./api";
export default {
  name: "BuyMembers",
  data() {
    return {
      backRouterName: "", // 存储返回跳转路由name
      timer: null,
      balance: "", // 账户余额
      payValue: "", // 充值金额
      paymentNumber: "", // 实付金额
      isPaymentCode: false, // 付款二维码
      active: -1,
      isError: false,
      alipayCode: "", // 二维码
      payNo: "",
      paymentList: [
        {
          type: 1, // 支付宝
          icon: require("@/assets/web_app_images/zfb.png")
        },
        {
          type: 2, // 微信
          icon: require("@/assets/web_app_images/wxzf.png")
        },
        {
          type: 3, // 在线
          icon: require("@/assets/web_app_images/oline-zf.png")
        }
      ]
    };
  },
  computed: {
    ...mapState({
      userName(state) {
        return state.user.userDatail.username;
      }
    })
  },
  methods: {
    // 获取账户余额
    async getBalance() {
      let res = await api.getBalance();
      this.balance = res.balance || 0;
    },
    // 判读输入的值是否为数组
    handleChangeInput() {
      let reg = /^(([1-9]\d*)(\.\d{1,2})?)$|(0\.0?([1-9]\d?))$/;
      if (this.payValue != "") {
        if (reg.test(this.payValue)) {
          this.isError = false;
        } else {
          // 输入的值错误隐藏支付code
          this.isError = true;
          this.active = -1;
          this.isPaymentCode = false;
          clearTimeout(this.timer);
        }
      }
    },
    // 选择支付方式
    handleClickPayment(item) {
      if (!this.isError && this.payValue != "") {
        // 打开支付方式
        this.active = item.type;
        this.paymentNumber = this.payValue;
        this.isPaymentCode = true;
        clearTimeout(this.timer);
        this.getBalanceQrcode();
      } else {
        this.isPaymentCode = false;
      }
    },
    // 获取支付二维码
    async getBalanceQrcode() {
      let res = await api.getBalanceQrcode({
        payValue: parseFloat(this.payValue),
        payType: 1,
        qrCodeWith: 90
      });
      if (res) {
        this.alipayCode = res.payForm;
        this.payNo = res.payNo;
        this.loopTask();
      }
    },
    // 轮询任务
    loopTask() {
      let payNo = this.payNo;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(async () => {
        let res = await api.getAlipayResult(payNo);
        if (res.state == 11) {
          // 支付成功跳转到支付成功页面
          let balance = res.balanceOrder;
          this.$router.push({
            path: "recharge_uccess",
            query: {
              balance: balance + ""
            }
          });
          clearTimeout(this.timer);
          return false;
        }
        this.loopTask();
      }, 2000);
    },
    goback() {
      if (this.backRouterName == null) {
        this.backRouterName = getStore({ name: "RechargeBackRouterName" });
      }
      this.$router.push({
        name: this.backRouterName
      });
    }
  },
  mounted() {
    this.getBalance();
  },
  beforeRouteEnter(to, from, next) {
    // 获取进入的routername， 刷新防止丢失存储在session中一份
    next(function(vm) {
      vm.backRouterName = from.name;
      if (from.name) {
        setStore({
          name: "RechargeBackRouterName",
          content: from.name,
          type: "session"
        });
      }
    });
  }
};
</script>
<style lang="less">
@import "../less/layout.less";
@import "./less/style.less";
</style>
