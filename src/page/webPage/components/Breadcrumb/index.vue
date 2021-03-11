<!--
 * @FileDescription: 面包屑导航
 * @Author: hbh
 * @Date: 2021-02-23
 -->
<template>
  <div class="web-page-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"
        ><i class="icon-gps"></i>首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>产品中心</el-breadcrumb-item>
      <el-breadcrumb-item>{{ prodName }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      prodName: ""
    };
  },
  mounted() {
    this.prodName = this.$route.query.prodName;
  }
};
</script>
<style lang="less">
@import "./index.less";
</style>
