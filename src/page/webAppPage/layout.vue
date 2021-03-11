<!--
 * @FileDescription: 进入应用界面 布局页
 * @Author: hbh
 * @Date: 2021-02-05
 -->
<template>
  <div class="layout-app">
    <div class="layout-head" :class="{ 'layout-head--relative': isMemberPage }">
      <app-head></app-head>
    </div>
    <div class="layout-body" :class="{ 'layout-body--relative': isMemberPage }">
      <div class="layout-content">
        <div class="layout-aside">
          <app-menu></app-menu>
        </div>
        <div class="layout-main" id="appMian">
          <router-view />
        </div>
      </div>
      <ul class="fixedtool">
        <router-link tag="li" :to="{ name: 'buyMembers' }">
          <i class="icon-gwc"></i>
          <p>购买机时</p>
        </router-link>
        <router-link tag="li" :to="{ name: 'rechargeMembers' }">
          <i class="icon-wallet"></i>
          <p>充值</p>
        </router-link>
      </ul>
    </div>
    <div class="layout-foot" :class="{ 'layout-foot--relative': isMemberPage }">
      <app-foot></app-foot>
    </div>
    <!-- 上传控件 -->
    <up-load :is-show.sync="isUpload"></up-load>
  </div>
</template>
<script>
import Vue from "vue";
import AppHead from "./components/AppHead";
import AppFoot from "./components/AppFoot";
import AppMenu from "./components/AppMenu";
import UpLoad from "@/page/webAppPage/components/UpLoad";
//import { mapActions } from "vuex";
export default {
  components: {
    AppHead,
    AppFoot,
    AppMenu,
    UpLoad
  },
  data() {
    return {
      pageOps: {
        isMemberPage: false,
        current: 1, // 当前页面
        size: 10 // 每页显示条数
      },
      isUpload: false
    };
  },
  computed: {
    routeName() {
      return this.$route.name;
    }
  },
  methods: {
    createUpload() {
      this.isUpload = true;
    }
  },
  mounted() {
    // 为使用方便使用，减少组件之间的通讯传值，把上传方法挂载vue对象上
    Vue.prototype.$upLoad = this.createUpload;
  },
  watch: {
    routeName: {
      handler: function(currentRouteName) {
        // 当前是会员中心、购买会员、充值 布局修改高度自动撑开body
        if (
          currentRouteName === "member" ||
          currentRouteName === "machineGroup" ||
          currentRouteName === "buyMembers" ||
          currentRouteName === "rechargeMembers"
        ) {
          this.isMemberPage = true;
        } else {
          this.isMemberPage = false;
        }
      },
      immediate: true
    }
  }
};
</script>
<style scoped lang="less">
@import "./less/layout.less";
</style>
