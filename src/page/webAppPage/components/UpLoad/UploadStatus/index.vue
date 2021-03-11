<!--
 * @FileDescription: 上传控件状态
 * @Author: hbh
 * @Date: 2021-02-12
 -->
<template>
  <el-dialog
    :visible.sync="toggle"
    width="30%"
    :show-close="false"
    custom-class="upload-status"
    :close-on-click-modal="false"
  >
    <!-- 上传中 --->
    <div>
      <div class="upload-progress__wrap">
        <el-progress
          class="upload-status__progress"
          type="circle"
          :status="uploadDetail.status"
          :percentage="percentage"
        ></el-progress>
        <img class="upload-status__icon" :src="uploadDetail.icon" />
      </div>
      <h6 class="upload-progress__title">{{ uploadDetail.title }}</h6>
      <p class="upload-progress__msg">{{ uploadDetail.content }}</p>
      <span slot="footer" class="dialog-footer">
        <div class="upload-status-info" v-show="!uploadDetail.status">
          <el-button @click="cancelUpload" class="upload-status__cancel"
            >取消上传
          </el-button>
        </div>
        <div
          class="upload-status-continue"
          v-show="uploadDetail.status === 'success'"
        >
          <el-button @click="continueToUpload" class="upload-status__cancel"
            >继续上传</el-button
          >
          <el-button
            @click="complete"
            type="primary"
            class="upload-status__cancel"
            >完成</el-button
          >
        </div>
        <div
          class="upload-status-continue"
          v-show="uploadDetail.status === 'exception'"
        >
          <el-button @click="closeUpload" class="upload-status__cancel"
            >放弃上传</el-button
          >
          <el-button
            @click="againUpload"
            type="primary"
            class="upload-status__cancel"
            >重新上传</el-button
          >
        </div>
      </span>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    status: {
      type: Object
    },
    isShow: {
      type: Boolean,
      default: false
    },
    percentage: {
      // 上传进度
      type: Number,
      default: 0
    }
  },
  computed: {
    // 显示上传的不同状态
    uploadDetail() {
      let obj;
      switch (this.status.upLoadSatus) {
        case 0:
          obj = {
            icon: require("@/assets/web_app_images/uploading_icon.png"),
            title: "文件上传中…",
            content: "请不要关闭窗口，耐心等待"
          };
          break;
        case 1:
          obj = {
            status: "success",
            icon: require("@/assets/web_app_images/upload_success_icon.png"),
            title: "上传成功！",
            content: "可在【个人中心】-【资源管理】中查看"
          };
          break;
        case 2:
          obj = {
            status: "exception",
            icon: require("@/assets/web_app_images/upload_err_icon.png"),
            title: "上传失败！",
            content: "请及时检查网络设置，重新试试"
          };
          break;
      }
      return obj;
    },
    toggle: {
      set(val) {
        this.$emit("update:isShow", val);
      },
      get() {
        return this.isShow;
      }
    }
  },
  methods: {
    // 放弃上传
    closeUpload() {
      this.toggle = false;
      this.$emit("cancel-upload");
    },
    // 取消上传
    cancelUpload() {
      this.toggle = false;
      this.$emit("cancel-upload");
    },
    // 继续上传
    continueToUpload() {
      this.toggle = false;
      this.$emit("continue-upload");
    },
    //重新上传
    againUpload() {
      this.toggle = false;
      this.$emit("continue-upload");
    },
    // 完成上传
    complete() {
      this.toggle = false;
      this.$emit("complete");
    }
  }
};
</script>
<style lang="less">
@import "./style.less";
</style>
