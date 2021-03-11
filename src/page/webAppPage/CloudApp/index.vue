<!--
 * @FileDescription: 新窗口打开的云应用
 * @Author: hbh
 * @Date: 2021-02-25 
 -->
<template>
  <div
    class="cloud-app-wrap"
    v-loading="loading"
    element-loading-text="正在启动实例，请稍等..."
    element-loading-background="rgba(0, 0, 0, .6)"
  >
    <div class="cloud-file-list">
      <h1 class="head-logo">
        <img src="@/assets/web_app_images/logo.png" />
      </h1>
    </div>
    <div class="cloud-app-main">
      <iframe class="frame-app" :src="iframeUrl" frameborder="0"></iframe>
    </div>
  </div>
</template>
<script>
// http://52.82.36.35:32945/?password=vncpassword/&spaceId=1364576509461192704
import { setStore, getStore } from "@/common/store.js";
export default {
  name: "cloudApp",
  data() {
    return {
      loading: false,
      iframeUrl: "",
      // 存储窗口数据
      parenWindowData: {
        spaceId: "",
        address: ""
      }
    };
  },
  methods: {
    // 设置IframeUrl开的地址
    // http://52.82.36.35:32945/?password=vncpassword/&spaceId=1364576509461192704
    // http://52.82.36.35:33037/?password=vncpassword/&spaceId=1364545894141583360
    setIfameUrl() {
      if (this.parenWindowData && this.parenWindowData.address) {
        let { address, spaceId } = this.parenWindowData;
        this.iframeUrl = `http://${address}&spaceId=${spaceId}`;
        this.loading = false;
      }
    },
    // 接受窗口数据
    postMessage(event) {
      let host = `http://${window.location.host}`;
      if (event.origin != host) return;
      let { address, spaceId } = event.data;
      this.parenWindowData = event.data;
      console.log("parenWindowData", this.parenWindowData);
      if (!this.parenWindowData.address) {
        this.parenWindowData = getStore({ name: "app-data" });
      } else {
        // 避免页面刷新后数据丢失，存储到localStorage中
        setStore({
          name: "app-data",
          content: { address, spaceId },
          type: "sessionStorage"
        });
      }
      this.setIfameUrl();
    }
  },
  async mounted() {
    let self = this;
    this.loading = true;
    await this.$nextTick();
    window.addEventListener("message", self.postMessage, false);
  }
};
</script>
<style lang="less">
@import "./less/index.less";
</style>
