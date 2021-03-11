<!--
 * @FileDescription: 购买会员
 * @Author: hbh
 * @Date: 2021-03-01
 -->
<template>
  <div class="app-main-layout buy-member">
    <div class="app-main__body">
      <div class="buy-member-head">
        <h3>
          购买机时会员<span class="goback" @click="goback">返回上一页</span>
        </h3>
        <p>机时管理服务</p>
      </div>
      <div class="buy-member-form">
        <ul>
          <li>
            <div class="buy-member__form-item">
              <label>当前用户：</label>
              <span class="buy-member-name">{{ userName }}</span>
            </div>
          </li>
          <li>
            <div class="buy-member__form-item">
              <label>选择超算：</label>
              <el-select
                @change="selectChange"
                v-model="superComputerVue"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in superComputers"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </li>
          <li>
            <div class="buy-member__form-item">
              <label>开通时长：</label>
              <div class="buy-member-list">
                <div
                  class="buy-member-item"
                  :class="{ active: hpcItemId.itemId == item.itemId }"
                  @click="handleClickTime(item)"
                  v-for="(item, index) in hpcItemList"
                  :key="item.itemId"
                >
                  <div
                    class="member-item-name member-year"
                    :class="hpcItemIcon[index]"
                  >
                    {{ item.itemName }}
                  </div>
                  <dl class="money">
                    <dt>{{ item.coreTime }}万核时</dt>
                    <dd>仅需¥{{ item.price }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </li>
          <li class="account-line">
            <div class="buy-member__form-item">
              <label>选择账号：</label>
              <el-select
                @change="handleChangeAccount"
                v-model="account"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in accountNumber"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <p class="account-msg ">
              选择机时账号后，购买的机时会员中相应的权限将会累加到此账号中
            </p>
          </li>
          <li>
            <div class="buy-member__form-item">
              <label>支付方式：</label>
              <div class="payment-list">
                <div
                  v-for="item in paymentList"
                  :key="item.type"
                  class="payment-item"
                  :class="{ active: item.type === buyActive }"
                  @click="handleClickBuy(item)"
                >
                  <img :src="item.icon" />
                </div>
                <div class="payment-item balance">
                  <h6>账户余额</h6>
                  <span>¥{{ balance }}</span>
                </div>
              </div>
            </div>
            <div class="payment-code" v-show="buyActive != -1">
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
                  实付款：<strong>{{ money }}</strong
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
import api from "./api";
import { mapState } from "vuex";
export default {
  name: "BuyMembers",
  data() {
    return {
      backRouterName: "", // 存储返回跳转路由name
      payNo: "",
      balance: "", // 账户余额
      superComputerVue: "", // 获取选中的超算值
      hpcItemList: [], // 超算列表
      hpcItemIcon: ["member-year", "member-quarter", "member-month"],
      hpcItemId: -1,
      superComputers: [
        {
          value: "3",
          label: "上海超算"
        },
        {
          value: "1",
          label: "天津超算"
        }
      ],
      account: "", // 获取选中的账号
      accountNumber: [
        // 选择账号
        {
          value: "新开账号",
          label: "新开账号"
        },
        {
          value: "账号续费：上海超算-0001",
          label: "账号续费：上海超算-0001"
        }
      ],
      buyActive: -1,
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
      ],
      alipayCode: "", // 获取二维码
      money: "" // 实付款
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
    // 选择超算
    async selectChange(item) {
      this.$hzwLoading.open();
      let res = await api.getItemsByHpc(item);
      this.$hzwLoading.close();
      if (res) {
        this.hpcItemList = res.hpcItemList;
      }
    },
    // 选择开通时长
    handleClickTime(item) {
      this.hpcItemId = item;
      this.money = item.price;
    },
    // 选择账号
    handleChangeAccount(item) {
      console.log("选择账号", item);
    },
    // 选择支付方式
    handleClickBuy(item) {
      if (this.money != "") {
        this.buyActive = item.type;
        clearTimeout(this.timer);
        this.getItemQrcode();
      }
    },
    // 获取支付二维码
    async getItemQrcode() {
      this.$hzwLoading.open();
      let res = await api.getPayQrcode({
        itemId: this.hpcItemId.itemId,
        payType: 1,
        hpcAccountId: "",
        qrCodeWith: 90
      });
      if (res.payNo) {
        this.$hzwLoading.close();
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
        // 获取购买状态
        let res = await api.getAlipayResult(payNo);
        if (res.status == 11) {
          let { itemName, expireDate } = res.itemOrder;
          this.$router.push({
            name: "purchaseSuccess",
            query: {
              itemName,
              expireDate
            }
          });
          clearTimeout(this.timer);
          return false;
        }
        console.log("获取购买状态", res);
        this.loopTask();
      }, 2000);
    },
    // 返回上一页
    goback() {
      if (this.backRouterName == null) {
        this.backRouterName = getStore({ name: "backRouterName" });
      }
      this.$router.push({
        name: this.backRouterName
      });
    }
  },
  mounted() {
    this.getBalance();
  },
  beforeDestroy() {
    clearTimeout(this.timer);
    this.timer = null;
  },
  beforeRouteEnter(to, from, next) {
    // 获取进入的routername， 刷新防止丢失存储在session中一份
    next(function(vm) {
      vm.backRouterName = from.name;
      if (from.name) {
        setStore({
          name: "backRouterName",
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
