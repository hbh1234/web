<!--
 * @FileDescription: 机时进度条
 * @Author: hbh
 * @Date: 2021-02-20
 -->
<template>
  <div class="time-manag-bar">
    <div class="time-manag__tag">
      <span>{{ itemData && itemData.hpcDesc }}</span>
      <strong>{{ itemData && itemData.hpcAccount }}</strong>
      <img :src="memberLevelIcon" />
      <router-link
        class="member-renewal"
        tag="strong"
        :to="{ name: 'workingSpace' }"
        >续费会员</router-link
      >
    </div>
    <el-progress
      class="hzw-progress"
      :show-text="false"
      :stroke-width="10"
      :percentage="50"
      color="#5BCB0E"
      stroke-linecap="round"
    ></el-progress>
    <div class="time-manag__number">
      <div class="time-manag__surplus">
        <span>剩余{{ itemData && itemData.hpcBalance }}</span
        >/共{{ itemData && itemData.hpcAmount }}(核时)
      </div>
      <div class="time-manag__date">
        <span>机时会员至：{{ itemData && itemData.expireDate }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    itemData: {
      type: Object
    },
  },
  data() {
    return {
      ts: require("@/assets/web_app_images/quarter-member.png")
    };
  },
  computed: {
    memberLevelIcon() {
      let iconName;
      let levelText = this.itemData && this.itemData.levelText;
      switch (levelText) {
        case "月度会员":
          iconName = require("@/assets/web_app_images/month-member.png");
          break;
        case "季度度会员":
          iconName = require("@/assets/web_app_images/quarter-member.png");
          break;
        case "年度会员":
          iconName = require("@/assets/web_app_images/year-member.png");
          break;
      }
      return iconName;
    }
  }
};
</script>
<style scoped lang="less">
@import "./style.less";
</style>
