<!--
 * @FileDescription: 绑定账号数据的弹出层
 * @Author: HBH
 * @Date: 2021-02-08
 -->
<template>
  <el-dialog
    class="bind-dialog"
    title="绑定Hbox账号设置"
    :visible.sync="toggle"
    :close-on-click-modal="false"
  >
    <el-form :model="newForm">
      <template v-for="item in options">
        <!-- text 控件 -->
        <el-form-item
          :key="item.id"
          v-if="item.type == 'text'"
          :label="item.name"
        >
          <el-input v-model="newForm[item.id]"></el-input>
        </el-form-item>
        <el-form-item
          :key="item.id"
          v-if="item.type == 'password'"
          :label="item.name"
        >
          <el-input type="password" v-model="newForm[item.id]"></el-input>
        </el-form-item>
        <!-- select 控件 -->
        <el-form-item
          :key="item.id"
          :label="item.name"
          v-if="item.type == 'select'"
        >
          <el-select v-model="newForm[item.id]" :placeholder="item.placeholder">
            <template v-for="item in item.option">
              <el-option
                :key="item.value"
                :label="item.lable"
                :value="item.value"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClickBind">确认绑定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "hzw-band-dialog",
  props: {
    isShow: {
      type: Boolean
    },
    options: {
      type: Array
    },
    model: {
      type: Object
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      newForm: {}
    };
  },
  computed: {
    toggle: {
      get() {
        return this.isShow;
      },
      set(val) {
        this.$emit("update:isShow", val);
      }
    }
  },
  methods: {
    // 确定绑定
    handleClickBind() {
      this.toggle = false;
      this.$emit("close", this.newForm);
    }
  },
  watch: {
    isShow: function(newVal) {
      if (newVal) {
        Object.assign(this.$data, this.$options.data());
      }
    }
  }
}
</script>
<style scoped lang="less">
@import "./style.less";
</style>
