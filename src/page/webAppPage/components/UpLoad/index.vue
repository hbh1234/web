<!--
 * @FileDescription: 上传控件
 * @Author: hbh
 * @Date: 2021-02-12
 -->
<template>
  <!--- 上传弹出层 --->
  <div>
    <el-dialog
      title="上传文件"
      custom-class="hzw-upload"
      :visible.sync="toggle"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <h3 class="hzw-upload__validate">
        支持格式rar .zip .doc .docx .pdf .jpg等，最大限制为100M
      </h3>
      <div id="upload-btn" class="hzw-upload-area">
        <div class="hzw-upload-area__content">
          <img
            class="hzw-upload-area__icon"
            src="@/assets/web_app_images/upload_icon.png"
          />
          <p v-if="flowFile.name" class="hzw-upload-area__text">
            {{ fileDetail }}
          </p>
          <p class="hzw-upload-area__text">{{ fileBtn }}</p>
        </div>
      </div>
      <template v-if="uploadFiles.length === 1">
        <div class="hzw-upload__radio">
          <label>权限设置：</label>
          <el-radio-group v-model="shared">
            <el-radio :label="0">仅自己可见</el-radio>
            <el-radio :label="1">群组可见</el-radio>
          </el-radio-group>
        </div>
        <div v-show="shared === 1" class="hzw-upload__checkbox-gourp">
          <el-checkbox-group v-model="checkedCities">
            <el-checkbox
              v-for="item in groupMenuList"
              :label="item.groupId"
              :key="item.groupId"
            >
              {{ item.groupName }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
        <el-button type="primary" class="hzw-upload__btn" @click="handleUpdata"
          >确定上传</el-button
        >
      </template>
    </el-dialog>
    <!--- 上传状态 -->
    <up-load-status
      :is-show.sync="isShowStatus"
      :status="fromDate"
      :percentage="percentage"
      @continue-upload="continueUpload"
      @complete="complete"
      @cancel-upload="cancelUpload"
    ></up-load-status>
  </div>
</template>
<script>
import UpLoadStatus from "./UploadStatus";
import { mapState, mapGetters } from "vuex";
import Flow from "@flowjs/flow.js"; // 上传控件
import SparkMD5 from "spark-md5"; // 快速读取文件
import api from "./api";
import { mapActions } from "vuex";
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  components: {
    UpLoadStatus
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cancel: null,
      isShowStatus: false, // 显示/隐藏上传状态提示层
      // 上传配置项
      flowOptions: {
        //目标上传 URL，默认POST
        target: "/api/user/resource/put",
        singleFile: true,
        //分块大小(单位：字节)
        chunkSize: 1024 * 1024,
        //上传文件时文件内容的参数名，对应chunk里的Multipart对象名，默认对象名为file
        fileParameterName: "file",
        //失败后最多自动重试上传次数
        maxChunkRetries: 3,
        //是否开启服务器分片校验，对应GET类型同名的target URL
        testChunks: true,
        withCredentials: true,
        query: {
          resourceId: ""
        },
        headers: {}
      },
      // 上传文件的最大限制2GB
      MaxFileSize: 100 * 1024 * 1024,
      flowFile: {}, // 获取上传文件对象
      uploadFiles: [], // 获取上传文件chunks数量
      uploadBtnName: "点击选择文件进行上传",
      upLoadSatus: 0, // 上传状态 0 上传中 1 成功 2 失败
      percentage: 0, // 上传进度
      shared: 0,
      checkedCities: [],
      cities: cityOptions,
      accept: [".jpg", ".jpeg", ".zip", ".doc", ".docx", ".pdf", ".rar"].join(
        ","
      ),
      fromDate: {
        shared: 0,
        upLoadSatus: 0
      }
    };
  },
  computed: {
    ...mapState({
      token: state => {
        return state.user.access_token;
      }
    }),
    ...mapGetters({
      groupMenuList: ["nonsyncMenu/groupMenu"], // 群组数据
      pageCurrent: ["resources/pageCurrent"], // 获取当前页,目的：上传完成后，在当前页刷新
      pageSize: ["resources/pageSize"] // 获取每页条数
    }),
    fileBtn() {
      if (this.flowFile.name) {
        return "重新上传";
      } else {
        return "点击选择文件进行上传";
      }
    },
    fileDetail() {
      // 上传文件名称、大小
      let fileName = this.uploadFiles[0].name;
      let fileSize = (this.uploadFiles[0].size / (1024 * 1024)).toFixed(2);
      return `${fileName}(${fileSize})M`;
    },
    // 弹出层显示/隐藏
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
    ...mapActions("resources", ["removeUserResources", "getUserResources"]),
    ...mapActions("nonsyncMenu", ["getGroupMenu"]),
    // 上传新建
    handleCreateUpData() {},
    // 确定上传
    async handleUpdata() {
      if (this.flow && this.flow.files[0]) {
        const { name, size } = this.flow.files[0];
        // 上传前调用接口设置获取resourceId， 给flow设置resourceId
        let res = await api.userResource({
          name,
          length: size,
          groupIds: this.checkedCities
        });
        if (res) {
          this.isShowStatus = true; //打开上传状态
          this.flowOptions.query.resourceId = res.resourceId;
          this.flow.files[0].resume();
        } else {
          if (window.status == 409) {
            let isCoverfile = await this.$hzwMessageBox({
              title: "重复上传",
              content: "是否覆盖已经上传的文件？"
            });
            // 确认覆盖上传过的文件
            if (isCoverfile) {
              this.coverUpload();
            }
          }
        }
      }
    },
    async coverUpload() {
      const { name, size } = this.flow.files[0];
      // 调用覆盖接口
      let res = await api.putCoverUpload({
        name: name,
        length: size,
        groupIds: this.checkedCities
      });
      if (res.resourceId) {
        this.isShowStatus = true; //打开上传状态
        this.flowOptions.query.resourceId = res.resourceId;
        this.flow.files[0].resume();
      }
    },
    // 继续上传
    continueUpload() {
      this.$emit("complete", this.fromDate);
      this.fromDate.upLoadSatus = this.fromDate.percentage = this.percentage = 0;
      this.uploadFiles = [];
      this.toggle = true;
    },
    // 完成上传
    complete() {
      this.toggle = false;
    },
    // 取消上传
    async cancelUpload() {
      let resourceId = this.flowOptions.query.resourceId;
      if (this.flow && this.flow.files[0]) {
        this.flow.files[0].cancel();
        this.toggle = false;
        // 调用回滚接口
        await api.cancelLoad(resourceId);
      }
    },
    // 重置上传数据
    uploadReset() {
      Object.assign(this.$data, this.$options.data());
    },
    // 初始化上传控件
    flowInit() {
      // 设置请求头
      this.flowOptions.headers = {
        Authorization: `Bearer ${this.token}`
      };
      this.flow = new Flow(this.flowOptions);
    },
    // 监听上传事件
    flowMonitorEvent() {
      if (!this.flow) return;
      let updateBtn = document.getElementById("upload-btn");
      // accept 定义上传文件的类型
      // false不允许选择目录、true防止多个文件上传、accept上传的文件格式
      this.flow.assignBrowse(updateBtn, false, true, {
        accept: [".jpg", ".jpeg", ".zip", ".doc", ".docx", ".pdf", ".rar"].join(
          ","
        )
      });
      this.flow.assignDrop(updateBtn);
      // 添加上传的文件
      this.flow.on("fileAdded", file => {
        if (file.size > this.MaxFileSize) {
          this.$hzwMessage("上传文件不能大于100M");
          return;
        }
        this.uploadFiles = this.flow.files;
        this.calculationFileMd5(file);
      });
      // 上传成功
      this.flow.on("fileSuccess", () => {
        api.userResourceSuccess(this.flowOptions.query.resourceId).then(res => {
          if (res) {
            this.fromDate.upLoadSatus = 1;
            let pageOps = {
              size: this.pageSize,
              current: this.pageCurrent
            };
            let ops = Object.assign(pageOps, this.fromDate);
            // 通知vuex更新资源管理数据
            this.getUserResources(ops);
          }
        });
      });
      // 获取文件上传进度
      this.flow.on("fileProgress", () => {
        this.percentage = this.flow.progress() * 100;
      });
      // 文件上传错误
      this.flow.on("fileError", function(file, message) {
        this.upLoadSatus = 2;
        this.fromDate.upLoadSatus = 2;
        console.error("fileError", file, message);
      });
    },
    // 利用spark-md5读取计算文件，加快文件上传速度
    calculationFileMd5(file) {
      // file.pause()暂停上传
      file.pause();
      let time = new Date().getTime();
      let fileReader = new FileReader(); //创建FileReader实例
      let blobSlice = File.prototype.slice;
      let currentChunk = 0;
      const chunkSize = 10 * 1024 * 1000; // 以每片chunkSize大小来逐次读取
      let chunks = Math.ceil(file.size / chunkSize); // 总分片数量
      let spark = new SparkMD5.ArrayBuffer(); // spark  用于计算md5
      //由于计算整个文件的Md5太慢，因此采用只计算第1块文件的md5的方式
      let chunkNumberMD5 = 1;
      nextChunk();
      fileReader.onload = e => {
        if (e.target) spark.append(e.target.result);
        if (currentChunk < chunkNumberMD5) {
          nextChunk();
        } else {
          let md5 = spark.end();
          file.uniqueIdentifier = md5;
          console.log(
            `MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${
              file.size
            } 用时：${new Date().getTime() - time} ms`
          );
        }
      };
      fileReader.onerror = () => {
        this.$message.error(`文件${file.name}读取出错，请检查该文件`);
        file.cancel();
      };
      function nextChunk() {
        let start = currentChunk * chunkSize;
        let end =
          start + chunkSize >= file.size ? file.size : start + chunkSize;
        fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
        currentChunk++;
        console.log("计算第" + currentChunk + "块");
      }
    }
  },
  watch: {
    isShow: function(isOpen) {
      if (isOpen) {
        this.uploadReset();
        this.$nextTick(() => {
          this.flowInit();
          this.flowMonitorEvent();
        });
      }
    }
  }
};
</script>
<style lang="less">
@import "./style.less";
</style>
