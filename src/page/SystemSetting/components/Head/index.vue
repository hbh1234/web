<template>
  <div class="app-haed">
    <router-link to="/" tag="h1" class="app-head__logo">
      <img
        class="app-head__logo__icon"
        src="@/assets/web_app_images/logo.png"
      />
    </router-link>
    <div class="app-head-operation">
      <el-button
        v-show="isUploadBtn"
        class="app-head-operation__btn"
        type="primary"
        ref="upLoadCreate"
        @click="createUpload"
        >+ 上传新建</el-button
      >
      <!-- 消息 -->
      <i class="app-head-operation__msg">
        <img src="@/assets/web_app_images/mgs_icon.png" />
      </i>
      <!-- 设置 -->
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="app-head-operation__setup">
          <img src="@/assets/web_app_images/set_up_icon.png" />
        </span>
        <el-dropdown-menu slot="dropdown" class="app-head-operation__dropdown">
          <el-dropdown-item command="a">账号设置</el-dropdown-item>
          <el-dropdown-item command="b">修改密码</el-dropdown-item>
          <el-dropdown-item command="c">个人资料</el-dropdown-item>
          <el-dropdown-item command="d">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  name: "apphead",
  data() {
    return {
      isUploadBtn: false
    };
  },
  computed: {
    routerName() {
      return this.$route.name;
    }
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "a": // 账号设置
          this.$router.push({
            name: "systemSetting"
          });
          break;
        case "b": // 修改密码
          this.$router.push({
            name: "changePassword"
          });
          break;
        case "c": // 个人资料
          this.$router.push({
            name: "personalHomepage"
          });
          break;
        case "d": // 退出登录
          this.$store.dispatch("user/loginOut", this);
          break;
      }
    },
    // 新建上传
    createUpload() {
      this.$upLoad();
    }
  },
  watch: {
    routerName: {
      // 当前只有在个人云空间页面才显示上传新建按钮
      handler: function(name) {
        name === "resourcesSpace"
          ? (this.isUploadBtn = true)
          : (this.isUploadBtn = false);
      },
      immediate: true
    }
  }
};
</script>
<style scoped lang="less">
@import "./less/head.less";
</style>
