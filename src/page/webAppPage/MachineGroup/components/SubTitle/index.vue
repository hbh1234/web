<!--
 * @FileDescription: 副标题
 * @Author: hbh
 * @Date: 2021-02-28
 -->
<template>
  <div class="subtitle">
    <h6>(消费机时=运行时长*占用字节的总核数)</h6>
    <div class="machine-table-head">
      <el-date-picker
        class="machine-picker"
        v-model="rightDateRange"
        type="daterange"
        :clearable="false"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <div class="machine-show-page">
        每页显示 |
        <el-select v-model="value" placeholder="请选择">
          <el-option label="5条" value="5"></el-option>
          <el-option label="10条" value="10"></el-option>
          <el-option label="15条" value="15"></el-option>
        </el-select>
      </div>
      <el-button class="machine-export-btn">导出</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "5",
      rightDateRange: [new Date(), new Date()],
    };
  }
};
</script>
<style lang="less">
@import "./index.less";
</style>
