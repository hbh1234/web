<!--
 * @FileDescription: 产品详情页
 * @Author: hbh
 * @Date: 2021-02-24
 -->
<template>
  <div class="product-details">
    <h2 class="product-details-title">{{ details.prodName }}</h2>
    <p class="product-details-briefly">{{ details.brief }}</p>
    <!-- 应用下载 -->
    <div class="product-details__down-load">
      <img class="product-details-pic" :src="details.img" />
      <div class="product-details__down-load-inner">
        <h3 class="product-details__down-load-title">
          Nanodcal 量子输运计算软件
        </h3>
        <h4 class="product-details__down-load-edition">
          <label>产品版本：</label>
          <button
            :class="{ 'btn--active': btnActive === 0 }"
            class="down-btn"
            @click="btnActive = 0"
          >
            单机版本
          </button>
          <button
            :class="{ 'btn--active': btnActive === 1 }"
            class="down-btn"
            @click="btnActive = 1"
          >
            在线版本
          </button>
        </h4>
        <el-button
          type="primary"
          class="product-details-online-btn"
          @click="handleClickOnlie"
          >在线使用</el-button
        >
      </div>
    </div>
    <div class="product-panel">
      <h4 class="product-panel-title"><span>培训视频</span></h4>
      <div class="product-panel-body">
        <div class="product-panel-vidoe">
          <ul class="product-panel-vidoe__list">
            <li :key="item.fileId" v-for="item in details.productResourceList">
              <div class="vidoe-mark"></div>
              <img :src="item.coverUrl" />
              <p>{{ item.fileName }}</p>
            </li>
          </ul>
          <div class="video-more">
            <span>更多<br />视频<br /></span><br /><i class="icon-more"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="product-panel">
      <h4 class="product-panel-title"><span>产品介绍</span></h4>
      <div class="product-panel-body">
        <div
          v-html="details.content"
          :class="{ 'product-max-content': isMore }"
        ></div>
        <p class="product-toggle-more" @click="handleClickMore">
          {{ moreStr }}<i class="icon-more" :class="icon"></i>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import api from "./api.js";
export default {
  name: "product-details",
  data() {
    return {
      btnActive: 0, //0单机版本; 1 在线版本
      productId: "",
      details: {},
      isMore: true
    };
  },
  computed: {
    moreStr() {
      return this.isMore ? "展开全部" : "收起";
    },
    icon() {
      return this.isMore ? "down" : "up";
    }
  },
  methods: {
    // 获取产品详情
    async getProduct() {
      this.$hzwLoading.open();
      let res = await api.getProduct(this.productId);
      this.$hzwLoading.close();
      this.details = res || {};
    },
    // 在线使用
    handleClickOnlie() {
      // 后期需要判断使用状态
      // if (this.btnActive === 0) {
      //   if (this.details.isLocal) {
      //     alert("可以本地下载");
      //   }
      // } else {
      //   if (this.details.isCloud) {
      //     alert("可以云上使用");
      //   }
      // }
    },
    // 显示更多
    handleClickMore() {
      this.isMore ? (this.isMore = false) : (this.isMore = true);
    }
  },
  mounted() {
    this.productId = this.$route.query.id;
    this.getProduct();
  }
};
</script>
<style scope lang="less">
@import "./less/index";
</style>
