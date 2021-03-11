<template>
  <div class="app-main-layout home-page">
    <h3 class="app-main__head">个人主页</h3>
    <div class="app-main__body">
      <!-- 基本信息 --->
      <div class="personal-info">
        <h3 class="personal-title">
          基本信息<span class="personal-edit">编辑</span>
        </h3>
        <div class="personal-info-wrap">
          <img
            class="personal-pic"
            src="@/assets/web_app_images/personal_pic.jpg"
          />
          <ul class="personal-info__list">
            <li><label>姓名：</label>1234</li>
            <li><label>研究方向：</label>1234</li>
          </ul>
        </div>
      </div>
      <personel-item-edit title="个人介绍"></personel-item-edit>
      <personel-item-edit title="机构院校"></personel-item-edit>
      <personel-item-edit title="教育经历"></personel-item-edit>
      <personel-item-edit title="工作经历"></personel-item-edit>
      <personel-item-edit title="论文成果"></personel-item-edit>
      <personel-item-edit title="荣誉获奖"></personel-item-edit>
      <personel-item-edit title="发明专利"></personel-item-edit>
      <personel-item-edit title="学术著作"></personel-item-edit>
    </div>
  </div>
</template>
<script>
export default {
  name: "xxxx",
  components: {
    "personel-item-edit": () => import("./components/PersonelItemEdit")
  },
  data() {
    return {
      value: ""
    };
  }
};
</script>
<style lang="less">
@import "./less/index.less";
</style>
