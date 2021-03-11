<!--
 * @FileDescription: 机时中心
 * @Author: hbh
 * @Date: 2021-02-05
 -->
<template>
  <div class="app-main-layout machine-ceneter">
    <!-- 选择机时账号 --->
    <div class="buy-machine">
      <div class="buy-machine-container">
        <div class="buy-machine-bar">
          <label>当前账号</label>
          <el-select
            popper-class="buy-machine-select"
            v-model="currentAccountId"
            placeholder="请选择"
            @change="changeSelect"
          >
            <el-option
              v-for="item in accountsOptions"
              :key="item.accountId"
              :label="item.hpcDesc + item.hpcAccount"
              :value="item.accountId"
            >
              <div class="select-item">
                <span>{{ item.hpcDesc }}{{ item.hpcAccount }}</span>
                <span class="taggle-txt">切换</span>
              </div>
            </el-option>
            <el-option
              class="bind-other"
              value="other"
              label="绑定其他账号"
            ></el-option>
          </el-select>
        </div>
        <router-link
          class="pay-btn"
          tag="el-button"
          type="primary"
          :to="{ name: 'buyMembers' }"
          >购买机时</router-link
        >
      </div>
    </div>
    <!-- 选择机时账号 --->
    <div class="app-main__body">
      <!-- 机时账号信息 -->
      <hzw-panel title="机时账号信息" class="machine-panel-head">
        <div class="machine-user">
          <div class="machine-user-name">
            <span class="machine-user-name__inner">{{
              currentSelectItem && currentSelectItem.hpcDesc
            }}</span>
          </div>
          <hpc-progerss
            :item-data="currentSelectItem"
            class="machine-user-progerss"
          ></hpc-progerss>
          <span class="machine-unbind">解除绑定</span>
        </div>
      </hzw-panel>
      <!-- 统计(核时) -->
      <div class="machine-statistics">
        <hzw-panel title="今日使用统计(核时)" class="machine-panel-pie">
          <div class="machine-user">
            <machine-echarts-pic
              :data-count="detailCount"
            ></machine-echarts-pic>
          </div>
        </hzw-panel>
        <hzw-panel title="总使用统计(核时)" class="machine-panel-bar">
          <machine-echarts-bar></machine-echarts-bar>
        </hzw-panel>
      </div>
      <hzw-panel title="机时使用明细" class="machine-details">
        <template v-slot:subtitle>
          <!-- 副标题 日期 分页 导出 --->
          <sub-title></sub-title>
          <!-- 表格 --->
        </template>
        <hzw-table
          :data="resources"
          :options="tableOptions"
          @current-change="currentChange"
        ></hzw-table>
      </hzw-panel>
    </div>
  </div>
</template>
<script>
import api from "./api.js";
import config from "./config.js";
export default {
  name: "machine-group",
  components: {
    "hpc-progerss": () => import("@/page/webAppPage/components/HpcProgress"),
    "sub-title": () => import("./components/SubTitle"),
    "machine-echarts-pic": () => import("./components/MachineEchartsPic"),
    "machine-echarts-bar": () => import("./components/MachineEchartsBar")
  },
  data() {
    return {
      accounts: [], // 获取所有机时账号
      detailCount: 0, // 计算次数
      resources: {},
      currentAccountId: ""
    };
  },
  computed: {
    // 表格头部字段配置
    tableOptions() {
      return config.tableHeadParams;
    },
    accountsOptions() {
      let arr = [];
      this.accounts.forEach(item => {
        if (item.hpcAccountList.length > 0) {
          item.hpcAccountList.forEach(subItem => {
            subItem.hpcDesc = item.hpcDesc;
            arr.push(subItem);
          });
        }
      });
      return arr;
    },
    // 获取当前机时数据
    currentSelectItem() {
      return this.accountsOptions.find(item => {
        if (item.accountId === this.currentAccountId) {
          return item;
        }
      });
    }
  },
  methods: {
    // 获取所有机时账号
    async getHpcsAccounts() {
      this.$hzwLoading.open();
      let res = await api.getHpcsAccounts();
      if (res.length > 0) {
        this.accounts = res;
        this.currentAccountId = res[0].hpcAccountList[0].accountId;
        this.getHpcDetailCount();
        this.$hzwLoading.close();
      }
    },
    // 统计计算次数
    async getHpcDetailCount() {
      let res = await api.getHpcDetailCount();
      this.detailCount = res || 0;
    },
    // 机时账号切换事件
    changeSelect() {
      console.log("==1", this.currentSelectItem);
      //alert(this.selectItem);
    },
    // 分页事件
    currentChange() {}
  },
  async mounted() {
    await this.$nextTick();
    this.getHpcsAccounts();
  }
};
</script>
<style lang="less">
@import "./less/index.less";
</style>
