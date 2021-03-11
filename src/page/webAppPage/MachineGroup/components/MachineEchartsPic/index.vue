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
  props: {
    dataCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      option: {
        color: ["#639FFF", "#ccc"],
        title: {
          text: "总使用量",
          subtext: "",
          left: "center",
          top: "40%",
          textStyle: {
            fontSize: "0.16rem",
            fontWeight: "normal",
            color: "#999"
          },
          subtextStyle: {
            color: "#333",
            fontWeight: "bold",
            fontSize: "0.28rem"
          }
        },
        legend: {
          bottom: "30",
          left: "center"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["64%", "80%"],
            avoidLabelOverlap: false,
            top: "0%",
            label: {
              show: false
            },
            data: [{ value: 100 }, { value: 0 }]
          }
        ]
      }
    };
  },
  methods: {
    echartsInit() {
      let myChart = echarts.init(this.$refs.resources);
      this.option.title.subtext = this.dataCount + "";
      this.option.series[0].data[0].value = this.dataCount / 100;
      this.option.series[0].data[1].value = 1 - this.dataCount / 100;
      // 绘制图表
      myChart.setOption(this.option);
    }
  },
  async mounted() {
    //await this.$nextTick();
    //this.echartsInit();
  },
  watch: {
    dataCount: function() {
      this.$nextTick(() => {
        this.echartsInit();
      })
    }
  }
};
</script>
<style scoped>
.resources {
  width: 100%;
  height: 300px;
}
</style>
