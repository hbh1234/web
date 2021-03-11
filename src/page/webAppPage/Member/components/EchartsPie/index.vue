<!--
 * @FileDescription: echarts 饼图组件
 * @Author: hbh
 * @Date: 2021-02-20
 -->
<template>
  <div class="resources" ref="resources"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      option: {
        color: ["#AB7DF6", "#81C926", "#FACA00"],
        title: {
          text: "总资源数",
          subtext: "380",
          left: "center",
          top: "30%",
          textStyle: {
            fontSize: "0.16rem",
            fontWeight: "normal",
            color: "#999",
          },
          subtextStyle: {
            color: "#333",
            fontWeight: "bold",
            fontSize: 18,
          },
        },
        legend: {
          bottom: "0%",
          left: "center",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["46%", "60%"],
            avoidLabelOverlap: false,
            top: "-20%",
            label: {
              show: true,
              fontSize: "0.16rem",
              width: "0.5rem",
              overflow: "break",
              formatter: "{@score}",
            },
            labelLine: {
              length: 0,
            },
            data: [
              { value: 1048, name: "上传资源" },
              { value: 735, name: "H-box资源" },
              { value: 580, name: "云控制台资源" },
            ],
          },
        ],
      },
    };
  },
  methods: {
    echartsInit() {
      let myChart = echarts.init(this.$refs.resources);
      // 绘制图表
      myChart.setOption(this.option);
    },
  },
  async mounted() {
    await this.$nextTick();
    this.echartsInit();
  },
};
</script>
<style scoped>
.resources {
  width: 100%;
  height: 300px;
}
</style>
