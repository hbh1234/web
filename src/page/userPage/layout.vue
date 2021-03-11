<!--
 * @FileDescription:用户布局页面 包含:用户注册、登录、忘记密码页面
 * @Author: hbh
 * @Date: 2021-02-08
 -->
<template>
  <div class="layout-admin">
    <div class="layout-admin-head">
      <admin-head></admin-head>
    </div>
    <div class="layout-admin-body">
      <router-view />
    </div>
    <div class="layout-admin-foot">
      <admin-foot></admin-foot>
    </div>
  </div>
</template>
<script>
import adminHead from "./components/Head";
import adminFoot from "./components/Foot";
export default {
  components: {
    adminHead,
    adminFoot
  }
};
</script>
<style lang="less">
@import "./less/layout.less";
</style>
