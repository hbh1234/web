<!--
 * @FileDescription: 资源管理 -> 个人空间
 * @Author: hbh
 * @Date: 2021-02-08
 -->
<template>
  <div class="app-main-layout resources-space">
    <h3 class="app-main__head">个人云空间</h3>
    <div class="app-main__body">
      <!-- 未上传显示默认上传页面 -->
      <resources-space-init v-show="len"></resources-space-init>
      <!-- 上传显示列表 -->
      <hzw-table
        v-show="!len"
        :data="resources"
        :options="tableOptions"
        @current-change="currentChange"
        :before-donwload="donwloadCallaback"
        :before-del="delRowsCallBack"
        :before-share="shareCallaback"
      ></hzw-table>
    </div>
  </div>
</template>
<script>
import config from "./config.js";
import { mapState, mapActions } from "vuex";
export default {
  name: "resources-space",
  components: {
    "resources-space-init": () => import("./components/ResourcesSpaceInit")
  },
  data() {
    return {
      size: 10,
      pageOps: {
        current: 1, // 当前页面
        size: 10 // 每页显示条数
      }
    };
  },
  computed: {
    ...mapState({
      // 获取资源管理数据对象
      resources: state => {
        return state.resources && state.resources.resourcesData;
      }
    }),
    len() {
      // 资源管理列表数据为空显示默认上传页面
      let records = this.resources.total;
      return records === 0 ? true : false;
    },
    tableOptions() {
      return config.tableHeadParams;
    }
  },
  methods: {
    ...mapActions("resources", ["getUserResources", "removeUserResources"]),
    // 切换分页
    currentChange(pageNumber) {
      this.pageOps.current = pageNumber;
      //this.resetPageOps();
      this.getUserResources(this.pageOps);
    },
    // 下载前的回调
    donwloadCallaback() {
      alert("删除当前行");
    },
    // 分享的前的回调
    shareCallaback() {
      alert("分享的前的回调");
    },
    // 删除前的回调
    async delRowsCallBack(item) {
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
    }
  },
  created() {
    // 获取资源数据
    this.getUserResources(this.pageOps);
  }
};
</script>
<style scoped lang="less">
@import "../../less/layout.less";
</style>
