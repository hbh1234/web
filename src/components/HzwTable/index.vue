<!--
 * @FileDescription: 结合当前项目的ui样式，对el-table进行二次简单封装
 * @Author: HBH
 * @Date: 2021-02-01
 -->
<template>
  <div class="hzw-table-wrap">
    <el-table
      :data="data.records"
      class="hzw-table"
      header-row-class-name="hzw-table-th"
      @row-click="handleRowCLick"
      :row-class-name="rowClassName"
      :default-sort="{ prop: sort, order: 'descending' }"
    >
      <template v-for="item in options">
        <el-table-column
          :align="item.align"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          v-if="item.type === 'slot'"
          :class-name="item.class"
        >
          <!-- 作用域 -->
          <template slot-scope="scope">
            <!-- 命名 -->
            <slot
              v-if="item.slotName"
              :name="item.slotName"
              v-bind="scope.row"
            ></slot>
            <!-- 匿名 -->
            <slot v-else v-bind="scope.row">
              <div @click.stop class="edit" v-if="item.prop === 'edit'">
                <!-- 下载 -->
                <i
                  v-if="isDonwload"
                  @click="handleClickDownLoad(scope.row)"
                  class="icon-download hzw-table__operation-icon"
                ></i>
                <!-- 分享 -->
                <i
                  v-if="isShare"
                  @click="handleClickShare(scope.row)"
                  class="icon-share hzw-table__operation-icon"
                ></i>
                <!-- 删除 -->
                <i
                  v-if="isDel"
                  @click="handleClickDel(scope.row)"
                  class="icon-del my-icon-del hzw-table__operation-icon"
                ></i>
              </div>
            </slot>
          </template>
        </el-table-column>
        <el-table-column
          :class-name="item.class"
          v-else
          :align="item.align"
          :width="item.width"
          :key="item.name"
          :prop="item.prop"
          :label="item.label"
        ></el-table-column>
      </template>
    </el-table>
    <!-- 分页组件 --->
    <div class="hzw-table-page" v-if="data.size">
      <el-pagination
        @current-change="currentChange"
        background
        layout="prev, pager, next"
        :total="data.total"
        :page-size="data.size"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "hzw-table",
  props: {
    rowClassName: Function,
    options: Array, // 表格头部字段的配置项
    //排序字段
    sort: {
      type: String,
      default: ""
    },
    data: {
      // body渲染的数据
      type: Object
    },
    beforeDonwload: {
      // 下载前的回调
      type: Function
    },
    beforeDel: {
      // 删除前的回调
      type: Function
    },
    beforeShare: {
      // 分享前的回调
      type: Function
    }
  },
  computed: {
    // 传递下载回调函数 则显示下载图标
    isDonwload() {
      return typeof this.beforeDonwload === "function" ? true : false;
    },
    // 传递删除回调函数 则显示下载图标
    isDel() {
      return typeof this.beforeDel === "function" ? true : false;
    },
    // 传递分享回调函数 则显示分享图标
    isShare() {
      return typeof this.beforeShare === "function" ? true : false;
    }
  },
  methods: {
    // 下载回调事件
    handleClickDownLoad(item) {
      this.beforeDonwload && this.beforeDonwload(item);
    },
    // 分享回调事件
    handleClickShare(item) {
      this.beforeShare && this.beforeShare(item);
    },
    // 删除回调事件
    handleClickDel(item) {
      this.beforeDel && this.beforeDel(item);
    },
    // 单击行点事件
    handleRowCLick(row, column, event) {
      this.$emit("row-click", row, column, event);
    },
    // 分页事件
    currentChange(pageIndex) {
      this.$emit("current-change", pageIndex);
    }
  }
};
</script>
<style scoped lang="less">
@import "./style.less";
</style>
