<!--
 * @FileDescription: 面包屑导航
 * @Author: hbh
 * @Date: 2021-02-23
 -->
<template>
  <div class="user-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"
        ><i class="icon-gps"></i>首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>消息</el-breadcrumb-item>
      <el-breadcrumb-item>设置</el-breadcrumb-item>
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
<style scope lang="less">
@import "./index.less";
</style>
