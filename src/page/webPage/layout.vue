<!--
 * @FileDescription: webPage布局页面 包含：产品列表、产品详情
 * @Author: hbh
 * @Date: 2021-02-23
 -->
<template>
  <div>
    <web-page-head></web-page-head>
    <!-- 面包屑 -->
    <web-breadcrumb></web-breadcrumb>
    <div class="web-page-body">
      <router-view />
    </div>
    <web-page-foot></web-page-foot>
  </div>
</template>
<script>
import webPageHead from "./components/Head";
import webPageFoot from "./components/Foot";
import webBreadcrumb from "./components/Breadcrumb";
export default {
  components: {
    webPageHead,
    webPageFoot,
    webBreadcrumb
  }
};
</script>
<style scoped>
.web-page-body {
  width: 1440px;
  margin: 0 auto;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
}
</style>
