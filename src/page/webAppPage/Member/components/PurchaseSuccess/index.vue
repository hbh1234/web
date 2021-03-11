<!--
 * @FileDescription: 充值成功
 * @Author: hbh
 * @Date: 2021-02-20
 -->
<template>
  <div class="recharge-success">
    <div class="recharge-success__inner">
      <img src="@/assets/web_app_images/zf_success.png" />
      <h4>支付成功！</h4>
      <p>
        恭喜您成为机时{{ routerData.itemName }}，有效期至：{{
          routerData.expireDate
        }}
      </p>
      <div class="recharge-success__btn-group">
        <el-button @click="handleClickGoBack" class="recharge-success__btn btn-border"
          >返回个人中心</el-button
        >
        <el-button class="recharge-success__btn" type="primary"
          >查看详情</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      balance: "",
      routerData: {}
    };
  },
  methods: {
    handleClickGoBack() {
      this.$router.push({
        name: "member"
      });
    }
  },
  mounted() {
    this.routerData = this.$route.query;
  }
}
</script>
<style lang="less">
.recharge-success {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
}
.recharge-success__inner {
  width: 400px;
  text-align: center;
  img {
    width: 300px;
  }
  h4 {
    font-size: 28px;
  }
  p {
    font-size: 18px;
    color: #999;
    padding: 20px 0 32px 0;
  }
  .recharge-success__btn {
    width: 180px;
    height: 58px;
  }
  .btn-border {
    border: 1px solid #4496ff;
    color: #4496ff;
  }
}
</style>
