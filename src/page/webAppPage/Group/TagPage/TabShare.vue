<!--
 * @FileDescription: 全部共享
 * @Author: hbh
 * @Date: 2021-02-19
 -->
<template>
  <div class="share">
    <!-- 无数据默认显示 -->
    <info-page v-if="resources.total === 0"></info-page>
    <hzw-table
      v-else
      :data="resources"
      :options="tableOptions"
      @current-change="currentChange"
      :before-donwload="donwloadCallaback"
      :before-del="handleClickRemoveRow"
    ></hzw-table>
  </div>
</template>
<script>
import config from "./config.js";
import InfoPage from "../components/InfoPage/index.vue";
import api from "../api";
export default {
  components: {
    InfoPage
  },
  props: {
    activeName: String,
    routeId: String
  },
  data() {
    return {
      resources: {},
      pageOps: {
        size: 10,
        current: 1
      }
    };
  },
  computed: {
    tableOptions() {
      return config.groupShare;
    },
    wacthNameRouter() {
      return { routeId: this.routeId, activeName: this.activeName };
    }
  },
  methods: {
    // 获取全部共享资源
    async getGroupResource() {
      this.$hzwLoading.open();
      let res = await api.getGroupResource(this.routeId, this.pageOps);
      this.$hzwLoading.close();
      this.resources = res;
    },
    // 删除行
    async handleClickRemoveRow(item) {
      let isRemove = await this.$hzwMessageBox();
      if (isRemove) {
        // 删除当前行数据
        let reslut = await api.deleteShare({
          groupIds: [this.routeId],
          resourceIds: [item.resourceId]
        });
        //删除成功后重新调用获取数据接口 更新视图
        if (reslut) {
          this.resetPageOps();
          this.getGroupResource();
        } else {
          this.$hzwMessage({
            message: "删除失败!"
          });
        }
      }
    },
    //下载
    donwloadCallaback() {
      alert("下载");
    },
    currentChange(pageNum) {
      alert(pageNum);
    },
    // 解决：当前页面数据全部删除掉，跳转到上一页为空。
    resetPageOps() {
      let totalPage = Math.ceil((this.resources.total - 1) / this.pageOps.size);
      this.pageOps.current =
        this.pageOps.current > totalPage ? totalPage : this.pageOps.current;
    }
  },
  watch: {
    // 路由地址发生变化并且是当前项时
    wacthNameRouter: {
      handler: function(data) {
        let { activeName } = data;
        if (activeName === "second") {
          this.getGroupResource();
        }
      },
      deep: true
    }
  }
};
</script>
<style lang="less">
@import "./less/style.less";
</style>
