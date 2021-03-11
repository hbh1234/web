<template>
  <div class="personal-item">
    <h3 class="personal-title">
      {{ title
      }}<span class="personal-edit" @click="handleClickEdit">{{
        editStr
      }}</span>
    </h3>
    <div class="personal-edit__group" v-show="isShowEdit">
      <el-input class="personal-txt" size="mini" v-model="value" />
      <el-button class="personal-add-btn" size="mini"
        ><i class="el-icon-plus"></i
      ></el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "PersonelItemEdit",
  props: {
    title: String
  },
  data() {
    return {
      editStr: "编辑"
    };
  },
  computed: {
    isShowEdit() {
      return this.editStr === "编辑" ? false : true;
    }
  },
  methods: {
    handleClickEdit() {
      this.editStr === "编辑"
        ? (this.editStr = "保存")
        : (this.editStr = "编辑");
    }
  }
};
</script>
<style lang="less">
@import "./index.less";
</style>
