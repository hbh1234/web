<template>
  <div class="admin-head">
    <h1 class="admin-head-logo">
      <img src="@/assets/admin_images/logo.png" />
      <span class="admin-head-title">{{ title }}</span>
    </h1>
  </div>
</template>
<style scoped lang="less">
@import "./less/head.less";
</style>
<script>
export default {
  data() {
    return {
      title: ""
    };
  },
  watch: {
    $route: {
      handler(routeName) {
        this.title = routeName.meta.title;
      },
      immediate: true
    }
  }
};
</script>
