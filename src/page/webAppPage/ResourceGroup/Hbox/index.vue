<!--
 * @FileDescription: 资源管理 -> Hbox
 * @Author: hbh
 * @Date: 2021-02-08
 -->
<template>
  <div class="app-main-layout resources-space">
    <h3 class="app-main__head">
      <!-- 绑定用户列表 -->
      <user-bind-list
        :user-datail="user"
        :user-list="userUnbindList"
        @command="changeCommand"
      ></user-bind-list>
    </h3>
    <div class="app-main__body">
      <hzw-table :data="tableData" :options="tableOptions"></hzw-table>
    </div>
    <hzw-band-dialog
      :options="bindDialogOptions"
      :is-show.sync="isBindDialog"
      @close="closeBindDialog"
    ></hzw-band-dialog>
  </div>
</template>
<script>
import UserBindList from "./components/UserBindList";
import config from "./config.js";
import { tableList, unbindList } from "./mock.js";
export default {
  name: "resources-space",
  components: {
    UserBindList
  },
  data() {
    return {
      user: {},
      userUnbindList: [], // 用户解绑列表
      tableData: {},
      unbindIcon: require("@/assets/web_app_images/unbind_icon.png"),
      isBindDialog: false,
      formData: {}
    };
  },
  computed: {
    tableOptions() {
      return config.tableHeadParams;
    },
    bindDialogOptions() {
      return config.bindDialogForm;
    }
  },
  methods: {
    // 获取绑定列表
    getUnbindList() {
      this.userUnbindList = unbindList;
    },
    // 接触绑定
    async changeCommand(item) {
      // 绑定新用户
      if (item.userName === "bindUser") {
        // 打开绑定弹出层
        this.isBindDialog = true;
      } else {
        let isUnbind = await this.$hzwConfirm({
          title: "解除绑定",
          content: `确定要解除${item.userName}账号与平台的连接吗?`
        });
        alert(isUnbind);
      }
    },
    closeBindDialog(formData) {
      console.log("formData", formData);
    }
  },
  created() {
    this.tableData = tableList;
    this.getUnbindList();
  }
};
</script>
<style scoped lang="less">
@import "../../less/layout.less";
@import "./less/style.less";
</style>
