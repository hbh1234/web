<!--
 * @FileDescription: 系统设置包含了 账号设置、修改密码
 * @Author: hbh
 * @Date: 2021-02-23
 -->
<template>
  <div>
    <div class="user-set-head">
      <user-set-head></user-set-head>
    </div>
    <!-- 面包屑 -->
    <web-breadcrumb></web-breadcrumb>
    <div class="user-set-body">
      <div class="user-set-container">
        <!-- 左侧菜单 -->
        <div class="user-set-aside">
          <h3 class="user-set__menu-title">设置</h3>
          <ul class="user-set__menu-list">
            <router-link tag="li" :to="{ name: 'systemSetting' }"
              >账号设置</router-link
            >
            <router-link tag="li" :to="{ name: 'changePassword' }"
              >修改密码</router-link
            >
          </ul>
        </div>
        <!-- 右侧主体 -->
        <div class="user-set-main">
          <router-view />
        </div>
      </div>
    </div>
    <div class="user-set-foot">
      <user-set-foot></user-set-foot>
    </div>
  </div>
</template>
<script>
import UserSetHead from "./components/Head";
import UserSetFoot from "./components/Foot";
import webBreadcrumb from "./components/Breadcrumb";
export default {
  components: {
    UserSetHead,
    UserSetFoot,
    webBreadcrumb
  }
};
</script>
<style scoped lang="less">
@import "./less/layout.less";
@import "./less/style.less";
</style>
