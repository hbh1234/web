<!--
 * @FileDescription: 面版布局
 * @Author: HBH
 * @Date: 2021-02-23
 -->
<template>
  <div class="member-panel">
    <div class="member-panel__head">
      <h5 class="member-panel__title-bg">{{ title }}</h5>
      <!-- 扩展标题插槽 -->
      <slot v-if="$slots.subtitle" name="subtitle"></slot>
      <router-link
        v-if="pathName != ''"
        :to="{ name: pathName }"
        tag="a"
        class="member-panel__title-sm"
        >查看</router-link
      >
    </div>
    <div class="member-panel__body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "hzw-panel",
  props: {
    title: {
      type: String,
      required: true
    },
    pathName: {
      type: String,
      default: ""
    }
  }
};
</script>
<style scoped lang="less">
@import "./index.less";
</style>
