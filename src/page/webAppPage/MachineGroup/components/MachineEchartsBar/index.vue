<!--
 * @FileDescription: echarts 饼图组件
 * @Author: hbh
 * @Date: 2021-02-20
 -->
<template>
  <div class="machine-echart-bar">
    <div class="machine-tag">
      时间
      <span class="tag active">近一周</span>
      <span class="tag">近半月</span>
      <span class="tag">近一月</span>
      <span class="tag">近一年</span>
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
    </div>
    <div class="echart-bar" ref="resources"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      rightDateRange: [],
      option: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        grid: {
          left: "0",
          right: "0",
          bottom: "0",
          top: "10%",
          containLabel: true
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            top: 120,
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)"
            }
          }
        ]
      }
    };
  },
  methods: {
    echartsInit() {
      let myChart = echarts.init(this.$refs.resources);
      // 绘制图表
      myChart.setOption(this.option);
    }
  },
  async mounted() {
    await this.$nextTick();
    this.echartsInit();
  }
};
</script>
<style lang="less">
@import "./index.less";
</style>
