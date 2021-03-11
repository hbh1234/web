<!--
 * @FileDescription: 产品中心
 * @Author: hbh
 * @Date: 2021-0224
 -->
<template>
  <div class="app-main-layout product-layout">
    <h3 class="app-main__head">产品中心</h3>
    <div class="app-main__body">
      <!-- 上传显示列表 -->
      <hzw-table
        class="product-table"
        :data="resources"
        :options="tableOptions"
        :row-class-name="setTrCalssName"
      >
        <template v-slot:prodName="scope">
          <div @click="productDetails(scope)">
            <!-- 产品前小图标 -->
            <img class="product-icon" :src="productIcon(scope.prodName)" />
            {{ scope.prodName }}
            <!-- 产品名称后的tag -->
            <span class="product-tag">{{ scope.cloudTypeText }}</span>
          </div>
        </template>
        <!-- License有效期 -->
        <template v-slot:licenseExpireDate="scope">
          <span>{{ scope.licenseExpireDate | filterDate }}</span>
        </template>
        <!-- 开始使用时间 -->
        <template v-slot:startDate="scope">
          <span>{{ scope.startDate | filterDate }}</span>
        </template>
        <!-- 操作 -->
        <template v-slot:edit="scope">
          <div v-if="scope.startDate" class="product-btn-group">
            <el-button class="product-btn" @click="handleCancel(scope)"
              >取消订阅</el-button
            >
            <el-button
              class="product-btn product-btn-border"
              @click="handleOpenApp(scope)"
              >立即使用</el-button
            >
          </div>
          <div v-else class="product-btn-group">
            <el-button class="product-btn">详情</el-button>
            <el-button
              class="product-btn product-btn-blue"
              @click="handlesubscribe(scope)"
              >订阅使用</el-button
            >
          </div>
        </template>
      </hzw-table>
    </div>
  </div>
</template>
<script>
import productIcons from "./productIcons/productIcons.js"; // 获取产品图标
import config from "./config.js";
import api from "./api";
export default {
  name: "product",
  data() {
    return {
      instId: "",
      spaceId: "",
      loading: false,
      productList: []
    };
  },
  computed: {
    tableOptions() {
      // 表格头部配置项
      return config.productHead;
    },
    resources() {
      // 改成符合table的数据格式传入控件中
      let obj = {};
      // 格式化产品列表数据把表示状态的字段转成汉字
      obj.records = this.productList.map(item => {
        item.isCloud ? (item.isCloud = "在线版") : (item.isCloud = "");
        return item;
      });
      return obj;
    },
    // 产品前小图标
    productIcon() {
      return function(item) {
        let icons = "";
        let prodName = item.replace(/\s+/g, "").match(/[a-z]+/gi);
        if (prodName) {
          let key = prodName[0];
          icons = productIcons[key];
        } else {
          icons = productIcons.JSGL;
        }
        return icons;
      };
    }
  },
  filters: {
    // 过滤时间，如果有时间则显示时间，没有则显示“--”
    filterDate(val) {
      if (val) {
        return val;
      } else {
        return "--";
      }
    }
  },
  methods: {
    // 获取产品列表
    async getProductsUsage() {
      this.$hzwLoading.open();
      let resArray = await api.getProductsUsage();
      this.$hzwLoading.close();
      this.productList = resArray || [];
    },
    // 跳转到产品详情页面
    productDetails(rows) {
      let { prodId, prodName } = rows;
      this.$router.push({
        name: "productDetails",
        query: {
          id: prodId,
          prodName: prodName
        }
      });
    },
    // 取消订阅
    async handleCancel(scope) {
      let { prodId } = scope;
      let isCancel = await this.$hzwConfirm({
        src: require("@/assets/web_app_images/qx_dy.jpg"),
        title: "取消订阅",
        content: `确定要取消订阅该产品吗？`
      });
      if (isCancel) {
        await api.postProductsSubscribe({
          productId: prodId,
          subStatus: 0 // 0取消订阅，1开始订阅
        });
        this.getProductsUsage();
      }
    },
    // 订阅使用
    async handlesubscribe(scope) {
      let { prodId } = scope;
      let isSubscribe = await this.$hzwConfirm({
        src: require("@/assets/web_app_images/dy.png"),
        title: "确认订阅",
        content: `订阅后可助您快速找到产品进行使用`
      });
      if (isSubscribe) {
        await api.postProductsSubscribe({
          productId: prodId,
          subStatus: 1 // 0取消订阅，1开始订阅
        });
        this.getProductsUsage();
      }
    },
    // 立即使用打开应用
    async handleOpenApp(scope) {
      let { prodId } = scope;
      // 1、开通产品在线使用
      let res = await api.openForUse(prodId);
      console.log("1、开通产品在线使用", res);
      if (res.instId && res.spaceId) {
        this.instId = res.instId;
        this.spaceId = res.spaceId;
        // 2、开启工作实例
        let start = await api.postStartInsById(res.instId);
        console.log("2、开启工作实例", start);
        if (start === "开启工作实例成功") {
          this.openAppLoad();
          // 3、打开看工作实例
          this.loopOpenState();
        }
      }
    },
    // 轮询实例状态 成功后打开云应用
    loopOpenState() {
      let instid = this.instId;
      setTimeout(async () => {
        let openStatus = await api.getVievInsInfoById(instid);
        if (openStatus.statusText === "PENDING") {
          this.loopOpenState();
        } else if (openStatus.statusText === "RUNNING") {
          this.loading.close();
          this.address = openStatus.address;
          this.openWindowApp();
        }
        console.log("轮询工作实例");
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
      }, 1000);
    },
    // 设置tr的背景色
    setTrCalssName(data) {
      if (data.row.licenseExpireDate) {
        return "";
      } else {
        return "bg-tr-color";
      }
    },
    // 打开云应用load
    openAppLoad() {
      this.loading = this.$loading({
        target: ".product-layout",
        lock: true,
        text: "正在启动云实例,请稍等...",
        background: "rgba(255, 255, 255, 1)",
        customClass: "cloud-loading"
      });
    }
  },
  async mounted() {
    await this.$nextTick();
    // 获取文件列表
    this.getProductsUsage();
  }
};
</script>
<style scoped lang="less">
@import "../less/layout.less";
@import "./less/index.less";
</style>
