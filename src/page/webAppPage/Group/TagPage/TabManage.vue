<!--
 * @FileDescription: 群组管理
 * @Author: hbh
 * @Date: 2021-02-20
 -->
<template>
  <div class="manage">
    <div class="manage-head">
      <div class="manage-head__group-details">
        <img src="@/assets/web_app_images/group_manage_icon.png" />
        <dl>
          <dt>{{ groupDetail.groupName }}</dt>
          <dd>{{ groupDetail.groupDesc }}</dd>
        </dl>
      </div>
      <div class="manage-head__btn-group">
        <el-button type="danger" @click="handleClickDel">解散群组</el-button>
        <el-button @click="editDroupVisible = true">修改</el-button>
        <el-button type="primary" @click="joinDialog = true">邀请</el-button>
      </div>
    </div>
    <div class="manage-table-wrap">
      <hzw-table
        :data="resources"
        :options="tableOptions"
        @current-change="currentChange"
      ></hzw-table>
    </div>
    <!-- 修改群组 -->
    <edit-group-dialog
      title="修改群组"
      :is-show.sync="editDroupVisible"
      @close="editDialogClose"
    ></edit-group-dialog>
    <!--邀请好友加入群组-->
    <groupjoin-dialog
      :group-detail="groupDetail"
      :is-show.sync="joinDialog"
    ></groupjoin-dialog>
  </div>
</template>
<script>
import config from "./config.js";
import api from "../api";
import { mapActions } from "vuex";
export default {
  props: {
    groupDetail: Object,
    activeName: String,
    routeId: String
  },
  components: {
    "edit-group-dialog": () =>
      import("@/page/webAppPage/components/GroupDialog"),
    "groupjoin-dialog": () =>
      import("@/page/webAppPage/Group/components/GroupJoinDialog")
  },
  data() {
    return {
      joinDialog: false,
      resources: {},
      editDroupVisible: false,
      unbindIcon: require("@/assets/web_app_images/removeGroup.png"),
      pageOps: {
        current: 1,
        size: 10
      }
    };
  },
  computed: {
    tableOptions() {
      return config.groupManage;
    },
    wacthNameRouter() {
      return { routeId: this.routeId, activeName: this.activeName };
    }
  },
  methods: {
    ...mapActions("nonsyncMenu", ["getGroupMenu"]),
    currentChange() {},
    // 获取列表
    async getGroupMembers() {
      this.$hzwLoading.open();
      let groupId = this.$route.query.id;
      let res = await api.getGroupMembers(groupId, this.pageOps);
      this.$hzwLoading.close();
      this.resources = res;
    },
    // 解散群组
    async handleClickDel() {
      let isRemoveGroup = await this.$hzwConfirm({
        title: "解散群组",
        content: `确定要解散群组吗？解散后该群组的内容将全部清空，请您谨慎操作！`
      });
      if (isRemoveGroup) {
        let groupId = this.$route.query.id;
        let res = await api.deleteGroup(groupId);
        if (res) {
          this.$router.push({
            name: "resourcesSpace"
          });
          this.getGroupMembers();
          // 调用群组接口更新群组子菜单
          this.getGroupMenu();
        }
      }
    },
    // 修改群组
    async editDialogClose(data) {
      let groupId = this.$route.query.id;
      let ops = Object.assign(data, { groupId, groupAvater: "" });
      let res = await api.putGroup(ops);
      if (res) {
        this.editDroupVisible = false;
        // 通知vuex，更新群组管理子菜单
        this.getGroupMenu();
        // 通知父级重新获取群组信息
        this.$emit("edit-group");
      }
    }
  },
  watch: {
    // 路由地址发生变化并且是当前项时
    wacthNameRouter: {
      handler: function(data) {
        let { activeName } = data;
        if (activeName === "third") {
          this.getGroupMembers();
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
