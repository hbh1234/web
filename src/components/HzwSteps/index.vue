<!--
 * @FileDescription: 步骤 用于 用户注册、忘记密码、更改密码等页面
 * @Author: HBH
 * @Date: 2021-02-23
 -->
<template>
  <el-steps
    class="hzw-steps"
    :space="200"
    :active="active"
    finish-status="success"
  >
    <el-step :title="item.name" v-for="item in data" :key="item.name"></el-step>
  </el-steps>
</template>
<script>
export default {
  name: "hzw-steps",
  props: {
    data: {
      // step名称
      type: Array,
      default: () => {
        return [];
      }
    },
    active: {
      //当前环节
      type: Number,
      default: 0
    },
    space: {
      // 间距
      type: String,
      default: "200"
    }
  }
};
</script>
<style lang="less">
@import "./index.less";
</style>
