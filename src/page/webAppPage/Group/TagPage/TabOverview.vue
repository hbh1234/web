<!--
 * @FileDescription: 群组概览
 * @Author: hbh
 * @Date: 2021-02-19
 -->
<template>
  <div class="overview">
    <!-- 头部数据统计 -->
    <div class="overview-head">
      <div class="overview-head-block">
        <h4>{{ groupDetail.groupName }}</h4>
        <p>
          {{ groupDetail.groupDesc }}
        </p>
      </div>
      <div class="overview-head-list-block orange">
        <dl>
          <dt>{{ groupDetail.totalSharedCount }}</dt>
          <dd>共享资源</dd>
        </dl>
        <img src="@/assets/web_app_images/group_icon_1.png" />
      </div>
      <div class="overview-head-list-block green">
        <dl>
          <dt>{{ groupDetail.userSharedCount }}</dt>
          <dd>我的共享</dd>
        </dl>
        <img src="@/assets/web_app_images/group_icon_2.png" />
      </div>
      <div class="overview-head-list-block red">
        <dl>
          <dt>{{ groupDetail.groupMemberCount }}</dt>
          <dd>小组成员</dd>
        </dl>
        <img src="@/assets/web_app_images/group_icon_3.png" />
      </div>
    </div>
    <!-- 最新动态 -->
    <div class="overview-body">
      <h4 class="overview-title">
        <strong>最新动态</strong>
        <span class="overview-title__search">查看全部>> </span>
      </h4>
      <!-- 无数据默认显示 -->
      <info-page v-if="activitieList.length == 0"></info-page>
      <div v-else class="overview-scroll">
        <table class="overview-list">
          <tr v-for="item in activitieList.slice(0, 6)" :key="item.logId">
            <td width="100">{{ item.username }}</td>
            <td width="140" class="font-color-9">{{ item.logDate }}</td>
            <td class="icon">
              <strong class="font-color-9">共享了</strong>
              {{ item.msg }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import InfoPage from "../components/InfoPage/index.vue";
import api from "../api";
export default {
  props: {
    groupDetail: {
      type: Object
    },
    routeId: {
      // 路由id
      type: String
    },
    activeName: String
  },
  components: {
    InfoPage
  },
  data() {
    return {
      activitieList: [] // 动态列表
    };
  },
  computed: {
    wacthNameRouter() {
      return { routeId: this.routeId, activeName: this.activeName };
    }
  },
  methods: {
    // 获取最新动态
    async getGroupActivities() {
      this.$hzwLoading.open();
      let res = await api.getGroupActivities(this.routeId, {
        current: 1,
        size: 10
      });
      this.$hzwLoading.close();
      res.records && (this.activitieList = res.records);
    }
  },
  watch: {
    wacthNameRouter: {
      handler: function(data) {
        let { activeName } = data;
        if (activeName === "first") {
          this.getGroupActivities();
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="less">
@import "./less/style.less";
</style>
