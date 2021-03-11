<!--
 * @FileDescription: 云控制台
 * @Author: hbh
 * @Date: 2021-02-25
 -->
<template>
  <div class="app-main-layout cloud-console">
    <h3 class="app-main__head">云控制台</h3>
    <div class="app-main__body">
      <!-- 表格 --->
      <hzw-table
        :data="resources"
        :options="tableOptions"
        sort="status"
        @current-change="currentChange"
      >
        <template v-slot:processName="scope">
          <i class="icon-folder file-icon"></i>
          <span
            @click="handleClickOpenApp(scope)"
            :class="isClickLink(scope.address)"
          >
            {{ scope.processName }}
          </span>
        </template>
        <!-- 状态转文字 -->
        <template v-slot:status="scope">
          {{ scope.status | filterStatus }}
        </template>
        <!-- 计算运行时长 -->
        <template v-slot:duration="scope">
          {{ fomartDuration(scope) }}
        </template>
        <!-- 操作 -->
        <template v-slot="scope">
          <i
            @click="handleClickToggle(scope)"
            :class="toggleIcon(scope)"
            class="edit-icon"
          ></i>
          <i @click="handleClickDel(scope)" class="icon-del"></i>
        </template>
      </hzw-table>
    </div>
  </div>
</template>
<script>
import config from "./config.js";
import api from "./api.js";
import { deepClone } from "@/common/util.js";
import moment from "moment";
export default {
  name: "cloud-console",
  data() {
    return {
      loading: null,
      resources: {},
      instId: "",
      spaceId: "",
      pageOps: {
        current: 1, // 当前页面
        size: 10 // 每页显示条数
      }
    };
  },
  computed: {
    // 表格头部字段配置
    tableOptions() {
      return config.tableHeadParams;
    },
    // 播放暂停icon切换
    toggleIcon() {
      return function(scope) {
        // scope.status = 2已启动  0 停止
        return scope.status == 2 ? "icon-stop" : "icon-bof";
      };
    },
    // 运行时长
    fomartDuration() {
      return function(scope) {
        let start = scope.instStartTimeMs;
        let end = scope.instLastTimeMs;
        if (start && end) {
          return moment.duration(end - start).humanize();
        }
      };
    },
    // 可点击样式
    isClickLink() {
      return function(scope) {
        let isLink = scope.indexOf("null");
        return isLink === -1 ? "blue-color" : "";
      };
    }
  },
  filters: {
    // 运行状态转换成文字
    filterStatus(val) {
      let str = ["停止", "正在启动", "已启动"];
      return str[val] || "";
    }
  },
  methods: {
    // 获取云控制台工作实例列表
    async getWorkList() {
      this.$hzwLoading.open();
      let res = await api.getInsList(this.pageOps);
      if (res) {
        this.resources = await this.getWorkInstance(res);
        this.$hzwLoading.close();
        this.resetPageOps();
      }
    },
    /*
     * @desc 获取云控制台工作实例列表状态， 把获取好的状态添加回去
     * @param status 0：停止;1：正在启动; 2：已启动; 3：其他
     */
    async getWorkInstance(res) {
      let cloneRes = deepClone(res);
      cloneRes.records = await Promise.all(
        res.records.map(item => {
          // eslint-disable-next-line no-async-promise-executor
          return new Promise(async resolve => {
            let resWorkInstance = await api.getWorkInstance(item.instId);
            resolve({
              ...item,
              status: resWorkInstance.status,
              address: resWorkInstance.address
            });
          });
        })
      );
      return cloneRes;
    },
    // 单击标题-打开应用
    handleClickOpenApp(scope) {
      this.instId = scope.instId;
      this.spaceId = scope.spaceId;
      this.address = scope.address;
      let isLink = scope.address.indexOf("null");
      // 可打开云应用
      if (isLink == -1) {
        this.openWindowApp();
      }
    },
    // 单击运行/暂停
    async handleClickToggle(scope) {
      let isLink = scope.address.indexOf("null");
      this.instId = scope.instId;
      this.spaceId = scope.spaceId;
      if (isLink == -1) {
        // 云应用已经打开了需要暂停该应用
        let res = await api.stopInstance(this.instId);
        if (res === "停止工作实例成功") {
          this.$hzwMessage({
            message: res
          });
          this.getWorkList();
        } else {
          this.$hzwMessage({
            message: res
          });
        }
      } else {
        //开一个云实例
        let res = await api.postWorkInstancestart(this.instId);
        if (res === "开启工作实例成功") {
          this.openAppLoad();
          this.loopOpenState();
        }
      }
    },
    // 轮询实例状态 成功后打开云应用
    loopOpenState() {
      let instid = this.instId;
      setTimeout(async () => {
        let openStatus = await api.getWorkInstance(instid);
        if (openStatus.statusText === "PENDING") {
          this.loopOpenState();
        } else if (openStatus.statusText === "RUNNING") {
          this.loading.close();
          this.address = openStatus.address;
          this.openWindowApp();
        }
      }, 1000);
    },
    // 新窗口打开应用
    openWindowApp() {
      // 接收数据的子窗口需要验证是不是同源
      let host = `http://${window.location.host}`;
      let postDate = {};
      let routeData = this.$router.resolve({
        path: "/cloud_app"
      });
      var popup = window.open(routeData.href, "_blank");
      // 确保数据传递成功 延迟1s传递数据
      setTimeout(() => {
        postDate.address = this.address;
        postDate.spaceId = this.spaceId;
        popup.postMessage(postDate, host);
        // 更新视图状态
        this.getWorkList();
      }, 1000);
    },
    // 删除当前行
    async handleClickDel(scope) {
      let isRemove = await this.$hzwMessageBox();
      if (isRemove) {
        let { instId } = scope;
        let res = await api.delInsById(instId);
        if (res) {
          this.getWorkList();
        }
      }
    },
    // 切换分页
    currentChange(pageNumber) {
      this.pageOps.current = pageNumber;
      this.getWorkList();
    },
    // 解决：当前页面数据全部删除掉，跳转到上一页为空。
    resetPageOps() {
      let totalPage = Math.ceil((this.resources.total - 1) / this.pageOps.size);
      this.pageOps.current =
        this.pageOps.current > totalPage ? totalPage : this.pageOps.current;
    },
    // 打开云应用load
    openAppLoad() {
      this.loading = this.$loading({
        target: ".cloud-console",
        lock: true,
        text: "正在启动云实例,请稍等...",
        background: "rgba(255, 255, 255, 1)",
        customClass: "cloud-loading"
      });
    }
  },
  created() {
    this.getWorkList();
  }
};
</script>
<style lang="less">
@import "../less/layout.less";
@import "./less/index.less";
</style>
