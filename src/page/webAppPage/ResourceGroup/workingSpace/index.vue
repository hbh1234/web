<!--
 * @FileDescription: 资源管理 -> 工作空间
 * @Author: hbh
 * @Date: 2021-02-08
 -->
<template>
  <div class="app-main-layout work-space">
    <h3 class="app-main__head">工作空间</h3>
    <div class="app-main__body">
      <!-- 上传显示列表 -->
      <hzw-table
        :data="resources"
        :options="tableOptions"
        @current-change="currentChange"
        class="work-space-table"
        @row-click="handleRowCLick"
        :before-donwload="donwloadCallaback"
        :before-del="handleClickRemoveRow"
      ></hzw-table>
    </div>
  </div>
</template>
<script>
import config from "./config.js";
import api from "./api";
export default {
  name: "workingSpace",
  data() {
    return {
      resources: {},
      pageOps: {
        current: 1, // 当前页面
        size: 10 // 每页显示条数
      }
    };
  },
  computed: {
    tableOptions() {
      return config.tableHeadParams;
    }
  },
  methods: {
    // 获取工作空间列表
    async getWorkInstanceList() {
      this.$hzwLoading.open();
      let res = await api.getWorkInstanceList(this.pageOps);
      this.$hzwLoading.close();
      this.resources = res;
    },
    // 点击当前行
    handleRowCLick(row) {
      let { spaceId, processName } = row;
      this.$router.push({
        name: "workingDetails",
        query: {
          spaceId: spaceId,
          processName: processName
        }
      });
    },
    // 切换分页
    currentChange(pageNumber) {
      this.pageOps.current = pageNumber;
      this.getWorkInstanceList(this.pageOps);
    },
    // 删除行
    async handleClickRemoveRow(item) {
      let { resourceId } = item;
      let isRemove = await this.$hzwMessageBox();
      if (isRemove) {
        // 删除当前行数据
        let reslut = await this.removeUserResources(resourceId);
        //删除成功后重新调用获取数据接口 更新视图
        if (reslut) {
          this.resetPageOps();
          this.getWorkInstanceList(this.pageOps);
        } else {
          this.$hzwMessage({
            message: "删除失败!"
          });
        }
      }
    },
    // 下载
    donwloadCallaback() {},
    // 解决：当前页面数据全部删除掉，跳转到上一页为空。
    resetPageOps() {
      let totalPage = Math.ceil((this.resources.total - 1) / this.pageOps.size);
      this.pageOps.current =
        this.pageOps.current > totalPage ? totalPage : this.pageOps.current;
    }
  },
  created() {
    // 获取资源数据
    this.getWorkInstanceList();
  }
};
</script>
<style scoped lang="less">
@import "../../less/layout.less";
@import "./less/index.less";
</style>
