<!--
 * @FileDescription: 资源管理 -> 工作空间-查看文件列表
 * @Author: hbh
 * @Date: 2021-02-08
 -->
<template>
  <div class="app-main-layout work-space-details">
    <h3 class="app-main__head">
      工作空间<i class="el-icon-arrow-right"></i
      ><span class="app-main__head--sm">{{ routeData.processName }}</span>
    </h3>
    <div class="app-main__body">
      <!-- 上传显示列表 -->
      <hzw-table
        class="work-space-table"
        :data="resources"
        :options="tableOptions"
        @current-change="currentChange"
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
      routeData: {}, // 路由数据
      resources: {}, // table数据
      pageOps: {
        current: 1, // 当前页面
        size: 10 // 每页显示条数
      }
    };
  },
  computed: {
    tableOptions() {
      return config.workDetails;
    }
  },
  methods: {
    // 切换分页
    currentChange(pageNumber) {
      this.pageOps.current = pageNumber;
      //this.resetPageOps();
      this.getUserResources(this.pageOps);
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
          this.getUserResources(this.pageOps);
        } else {
          this.$hzwMessage({
            message: "删除失败!"
          });
        }
      }
    },
    // 解决：当前页面数据全部删除掉，跳转到上一页为空。
    resetPageOps() {
      let totalPage = Math.ceil((this.resources.total - 1) / this.pageOps.size);
      this.pageOps.current =
        this.pageOps.current > totalPage ? totalPage : this.pageOps.current;
    },
    // 获取文件列表
    async getWorkspaceResourceList() {
      let { spaceId } = this.routeData;
      let res = await api.getWorkspaceResourceList({
        path: "/",
        spaceId
      });
      this.resources = {
        records: res,
        size: 10,
        total: 1
      };
    }
  },
  created() {
    this.routeData = this.$route.query;
    // 获取文件列表
    this.getWorkspaceResourceList();
  }
};
</script>
<style scoped lang="less">
@import "../../less/layout.less";
@import "./less/index.less";
</style>
