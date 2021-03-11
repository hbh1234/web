<!--
 * @FileDescription: 会员中心
 * @Author: hbh
 * @Date: 2021-02-23
 -->
<template>
  <div class="app-main-layout member-bg-color">
    <div class="app-main__body member">
      <!-- 头部 --->
      <div class="member-user">
        <!-- 用户信息 -->
        <hzw-panel title="客服支持" class="member-user-panel">
          <div class="member-user__details">
            <ul>
              <li>
                <label>客服电话：</label
                ><span class="ellipsis">400-8765-4321</span>
              </li>
              <li>
                <label>客服邮箱：</label
                ><span title="saas-support@hzwtech.com"
                  >saas-support@hz<br />wtech.com</span
                >
              </li>
            </ul>
          </div>
        </hzw-panel>
        <!-- 统计列表 -->
        <hzw-panel title="数据统计" class="statistics-panel">
          <div class="member-user__statistics">
            <router-link
              tag="div"
              :to="{ name: item.path }"
              class="member-user__statistics-block"
              v-for="(item, index) in statisticsList"
              :key="index"
            >
              <img :src="item.icon" />
              <dl>
                <dt>{{ item.number }}</dt>
                <dd>{{ item.name }}</dd>
              </dl>
            </router-link>
          </div>
        </hzw-panel>
      </div>
      <!-- 资产统计 -->
      <div class="member-section">
        <hzw-panel title="资产统计" class="asset-statistics">
          <div class="member-section-wrap">
            <div class="member-section__inner">
              <h5 class="member-title">
                <i class="icon-mhc-member"></i>机时会员
              </h5>
              <p>
                <span class="number"> {{ memberNumber }} </span>个机时会员
              </p>
              <router-link
                class="member-purchase-btn member-btn"
                tag="button"
                :to="{ name: 'buyMembers' }"
                >购买会员</router-link
              >
            </div>
            <div class="member-section__inner member-section__inner--line">
              <h5 class="recharge-title">
                <i class="icon-wallet"></i>账户余额(元)
              </h5>
              <p>
                <span class="number">{{ balance }}</span>
              </p>
              <router-link
                class="member-btn"
                tag="button"
                :to="{ name: 'rechargeMembers' }"
                >充值</router-link
              >
            </div>
          </div>
        </hzw-panel>
      </div>
      <!--- 中间管理区域 --->
      <div class="member-section">
        <hzw-panel path-name="workingSpace" title="资源管理" class="my-panel">
          <!-- 引入饼图控件 -->
          <echarts-pie></echarts-pie>
        </hzw-panel>
        <hzw-panel title="群组管理" class="my-panel">
          <div class="group__block">
            <h6>我创建的</h6>
            <div class="group__list">
              <div
                class="group__list-item"
                v-for="item in groupCreate.slice(0, 2)"
                :key="item.groupId"
              >
                <img src="@/assets/web_app_images/groupavatar.png" />
                <dl>
                  <dt class="ellipsis">{{ item.groupName }}</dt>
                  <dd>共{{ item.groupMemberCount }}人</dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="group__block">
            <h6>我加入的</h6>
            <span v-if="groupJoin.length === 0" class="group__init"
              >暂无加入的群组</span
            >
            <div v-else class="group__list">
              <div
                class="group__list-item"
                v-for="item in groupJoin"
                :key="item.groupId"
              >
                <img src="@/assets/web_app_images/groupavatar.png" />
                <dl>
                  <dt>{{ item.groupName }}</dt>
                  <dd>共{{ item.groupMemberCount }}人</dd>
                </dl>
              </div>
            </div>
          </div>
        </hzw-panel>
        <hzw-panel path-name="workingSpace" title="云控制台" class="my-panel">
          <div class="console">
            <h6 class="console__title">运行中</h6>
            <span v-if="startWorkList.length === 0" class="console-init"
              >暂无数据</span
            >
            <ul v-else class="console__list">
              <li
                v-for="(item, index) in startWorkList.slice(0, 3)"
                :key="index"
                class="console__list-item"
              >
                {{ item.processName }}
              </li>
            </ul>
            <h6 class="console__title">已停止</h6>
            <span v-if="stopWorkList.length === 0" class="console-init"
              >暂无数据</span
            >
            <ul v-else class="console__list">
              <li
                v-for="(item, index) in stopWorkList.slice(0, 3)"
                :key="index"
                class="console__list-item"
              >
                <p class="ellipsis">{{ item.processName }}</p>
                <span>2020/12/30</span>
              </li>
            </ul>
          </div>
        </hzw-panel>
      </div>
      <!-- 底部 -->
      <div class="member-section">
        <hzw-panel title="机时管理" class="my-panel-big">
          <div class="time-manage">
            <hpc-progerss
              v-for="item in allAccountList.slice(0, 3)"
              :key="item.hpcAccount"
              :item-data="item"
              class="my-progress"
            ></hpc-progerss>
          </div>
        </hzw-panel>
        <hzw-panel title="已订阅产品" class="my-panel-big">
          <span class="product-init" v-if="productList.length == 0"
            >暂无数据</span
          >
          <ul v-else class="product-list">
            <li
              class="product-item"
              v-for="(item, index) in productList"
              :key="index"
            >
              <img :src="item.icon" />
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </hzw-panel>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import api from "./api";
import productIcons from "./mapData/productIcons.js"; // 获取产品图标
import statistics from "./mapData/statistics.js"; // 获取产品图标
export default {
  name: "Member",
  components: {
    "echarts-pie": () => import("./components/EchartsPie"),
    "hpc-progerss": () => import("@/page/webAppPage/components/HpcProgress")
  },
  data() {
    return {
      groupLen: [], // 群组数
      allAccounts: [], // 机时数据
      groupCreate: [], // 我创建的群组
      groupJoin: [], // 我加入的群组
      productList: [], // 已订阅产品
      startWorkList: [], // 开始工作列表
      stopWorkList: [], // 停止工作列表
      statisticsList: [], // 统计列表
      balance: "", // 账户余额
      resourcesCount: "", // 已上传资源
      sharedCount: "", // 总共享次数
      detailCount: "", // 计算次数
      caccountsSum: "", // 机时总数
      memberNumber: "" // 机时会员个数
    };
  },
  computed: {
    ...mapState({
      // 全部机时列表
      allAccountList() {
        let resArray = [];
        this.allAccounts.forEach(item => {
          if (item.hpcAccountList && item.hpcAccountList.length > 0) {
            item.hpcAccountList.forEach(subItem => {
              subItem.hpcDesc = item.hpcDesc;
            });
            resArray.push(...item.hpcAccountList);
          }
        });
        return resArray;
      }
    })
  },
  methods: {
    // 获取已上传资源
    async getResourcesCount() {
      let res = await api.getResourcesCount();
      res && (this.resourcesCount = res);
      // 获取统计列表
      this.getStatisticsList();
    },
    // 总共享次数
    async getSharedCount() {
      let res = await api.getSharedCount();
      this.sharedCount = res || 0;
      // 获取统计列表
      this.getStatisticsList();
    },
    // 统计计算次数
    async getHpcDetailCount() {
      let res = await api.getHpcDetailCount();
      this.detailCount = res || 0;
      // 获取统计列表
      this.getStatisticsList();
    },
    // 获取用户产品订阅
    async getUserProducts() {
      let res = await api.getProductsUsage();
      if (res.length > 0) {
        let productUsedList = res;
        productUsedList.forEach(item => {
          // item.subStatus: 1 已经订阅， 0: 未订阅
          if (item.subStatus == 1) {
            let prodName = item.prodName.replace(/\s+/g, "").match(/[a-z]+/gi);
            if (prodName) {
              let key = prodName[0];
              this.productList.push({
                name: key,
                icon: productIcons[key]
              });
            } else {
              this.productList.push({
                name: "机时租赁服务",
                icon: productIcons.JSGL
              });
            }
            // 获取统计列表
            this.getStatisticsList();
          }
        });
      }
    },
    // 获取所有超算中心用户账户的机时余额总和
    async getHpCaccountsBalance() {
      let res = await api.getHpCaccountsBalance();
      this.caccountsSum = res || 0;
      // 获取统计列表
      this.getStatisticsList();
    },
    // 获取账户余额
    async getBalance() {
      let res = await api.getBalance();
      this.balance = res.balance || 0;
      // 获取统计列表
      this.getStatisticsList();
    },
    // 获取机时会员个数
    async getMemberNumber() {
      this.$hzwLoading.open();
      let res = await api.getAllAccounts();
      this.memberNumber = res.length || 0;
      this.$hzwLoading.close();
    },
    // 获取云控制台工作实例列表
    async getWorkList() {
      let res = await api.getInsList({
        current: 1,
        size: 10
      });
      if (res) {
        let { records } = res;
        if (records.length === 0) return;
        this.getWorkInstance(records);
      }
    },
    /*
     * @desc 获取云控制台工作实例列表状态
     * @param status 0：停止;1：正在启动; 2：已启动; 3：其他
     */
    getWorkInstance(records) {
      records.forEach(async item => {
        let res = await api.getWorkInstance(item.instId);
        if (res) {
          let { status } = res;
          if (status === 0) {
            this.stopWorkList.push(item);
          } else if (status === 2) {
            this.startWorkList.push(item);
          }
        }
      });
    },
    // 获取群组
    async getUserGroup() {
      let res = await api.getGroups();
      if (res) {
        let { records } = res;
        this.groupLen = records.length;
        // 获取统计列表
        this.getStatisticsList();
        this.getSummary(records);
      }
    },
    // 获取群组概览- 调用该接口获取创建群组人数
    getSummary(records) {
      if (records && records.length > 0) {
        records.forEach(async item => {
          if (item.roleId === "1") {
            // 我创建的
            let res = await api.getGroupSummary(item.groupId);
            this.groupCreate.push(res);
          } else if (item.roleId === "2") {
            // 我加入的
            let res = await api.getGroupSummary(item.groupId);
            this.groupJoin.push(res);
          }
        });
      }
    },
    // 获取机时管理数据
    async getAllAccounts() {
      let res = await api.getHpcsAccounts();
      this.allAccounts = res || 0;
    },
    // 获取统计列表
    getStatisticsList() {
      // caccountsSum
      statistics.forEach(item => {
        switch (item.name) {
          case "已上传资源":
            item.number = this.resourcesCount;
            break;
          case "我的群组":
            item.number = this.groupLen;
            break;
          case "总共享次数":
            item.number = this.sharedCount;
            break;
          case "计算次数":
            item.number = this.detailCount;
            break;
          case "机时总数":
            item.number = this.caccountsSum;
            break;
          case "账户余额":
            item.number = this.balance;
            break;
          case "已订阅产品":
            item.number = this.productList.length;
            break;
        }
      });
      this.statisticsList = statistics;
    }
  },
  created() {
    this.getResourcesCount();
    this.getSharedCount();
    this.getHpcDetailCount();
    this.getUserProducts();
    this.getHpCaccountsBalance();
    this.getBalance();
    this.getMemberNumber();
    this.getWorkList();
    this.getUserGroup();
    // this.$hzwLoading.open();
    this.getAllAccounts();
  }
};
</script>
<style scoped lang="less">
@import "../less/layout.less";
@import "./less/style.less";
</style>
