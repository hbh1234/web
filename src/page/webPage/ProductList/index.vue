<!--
 * @FileDescription: 产品列表
 * @Author: hbh
 * @Date: 2021-02-24
 -->
<template>
  <div class="product-list">
    <h2 class="product-list__title">
      <span class="product-list__inner"><i></i>全部软件产品</span>
    </h2>
    <div class="roduct-list__tag">
      <ul class="product-list__tag-list">
        <li class="product-tag-item active">全部产品</li>
        <li class="product-tag-item">COMPUTING CLOUD</li>
        <li class="product-tag-item">EXPERIENCE CLOUD</li>
        <li class="product-tag-item">TOOL CLOUD</li>
      </ul>
    </div>
    <div class="product-list-warp">
      <div
        @click="handleClickToDetails(item)"
        class="product-item"
        v-for="item in list"
        :key="item.prodId"
      >
        <div class="product-pic">
          <img :src="item.img" />
        </div>
        <div class="product-content">
          <h3>{{ item.prodName }}</h3>
          <p>{{ item.brief }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "./api.js";
export default {
  name: "productList",
  data() {
    return {
      list: []
    };
  },
  methods: {
    // 获取产品列表
    async getProducts() {
      this.$hzwLoading.open();
      let res = await api.getProducts();
      this.list = res && res.records;
      this.$hzwLoading.close();
    },
    // 跳转到详情
    handleClickToDetails(item) {
      let { prodId, prodName } = item;
      this.$router.push({
        name: "productDetails",
        query: {
          id: prodId,
          prodName: prodName
        }
      });
    }
  },
  mounted() {
    this.getProducts();
  }
};
</script>
<style lang="less">
@import "./less/index.less";
</style>
