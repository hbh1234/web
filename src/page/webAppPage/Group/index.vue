<!--
 * @FileDescription: 群组管理
 * @Author: hbh
 * @Date: 2021-02-08
 -->
<template>
  <div class="group-manage">
    <el-tabs class="group-manage-tabs" v-model="activeName">
      <el-tab-pane label="群组概览" name="first"
        ><tab-overview
          :active-name="activeName"
          :route-id="routeId"
          :group-detail="groupDetails"
        ></tab-overview
      ></el-tab-pane>
      <el-tab-pane label="全部共享" name="second">
        <tab-share :active-name="activeName" :route-id="routeId"></tab-share>
      </el-tab-pane>
      <el-tab-pane label="群组管理" name="third">
        <tab-manage
          :active-name="activeName"
          :route-id="routeId"
          :group-detail="groupDetails"
          @edit-group="editGroup"
        ></tab-manage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import TabOverview from "./TagPage/TabOverview";
import TabShare from "./TagPage/TabShare";
import TabManage from "./TagPage/TabManage";
import api from "./api.js";
export default {
  components: {
    TabOverview,
    TabShare,
    TabManage
  },
  data() {
    return {
      activeName: "first",
      groupDetails: {} // 群组信息
    };
  },
  computed: {
    routeId() {
      return this.$route.query.id;
    }
  },
  methods: {
    // 获取群组信息
    async getSummary() {
      let res = await api.getSummary({ groupId: this.routeId });
      this.groupDetails = res;
    },
    // 当前群组管理tag页中,修改了群组数据，调用该方法重新获取群组信息
    editGroup() {
      this.getSummary();
    }
  },
  watch: {
    routeId: {
      handler: function() {
        // 获取路由地址ID
        this.getSummary();
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style lang="less">
@import "./less/index.less";
</style>
