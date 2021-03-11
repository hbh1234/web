<template>
  <div class="user-bar">
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        <div class="user-bar-wrap">
          <div class="user-bar-icon">
            <i class="icon-client"></i>
          </div>
          <span class="user-bar-username">账号111111</span>
          <span class="user-bar-tag">上海交通大学</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
      </span>
      <el-dropdown-menu slot="dropdown" class="user-bar-dropdown">
        <el-dropdown-item
          :command="item"
          v-for="item in userList"
          :key="item.id"
        >
          <div class="user-bar-wrap">
            <span class="user-bar-username">账号{{ item.userName }}</span>
            <span class="user-bar-tag">{{ item.shoolName }}</span>
          </div>
          <span class="user-bar-relieve">解绑</span>
        </el-dropdown-item>
        <el-dropdown-item :command="bindUser" class="user-bar-binding">
          绑定新账号
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  props: {
    userList: {
      type: Array
    }
  },
  data() {
    return {
      bindUser: {
        id: 1,
        userName: "bindUser"
      }
    }
  },
  methods: {
    handleCommand(command) {
      this.$emit("command", command);
    }
  }
}
</script>
<style scoped lang="less">
@import "./style.less";
</style>
