<!--
 * @FileDescription: 资源管理 -> 个人空间 —— 默认没有数据展示页
 * @Author: hbh
 * @Date: 2021-02-08
 -->
<template>
  <div class="resources-space-init">
    <div class="resources-space-init__iner">
      <img src="@/assets/web_app_images/resource-upload.png" />
      <p>您还没有上传的内容哦 立即上传内容打造自</p>
      <el-button class="btn" type="primary" @click="openUploadDialog"
        >+ 上传新建</el-button
      >
    </div>
    <!-- 上传控件 -->
    <!-- <up-load :is-show.sync="isUpload" @complete="completeCallBack"></up-load> -->
  </div>
</template>
<script>
import { mapActions } from "vuex";
//import UpLoad from "@/page/webAppPage/components/UpLoad";
export default {
  components: {
    //UpLoad
  },
  data() {
    return {
      isUpload: false
    };
  },
  methods: {
    ...mapActions("resources", ["refreshUserResources"]),
    // 上传新建
    openUploadDialog() {
      this.isUpload = true;
    }
  }
};
</script>
<style scoped lang="less">
@import "./style.less";
</style>
