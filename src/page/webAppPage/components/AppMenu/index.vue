<!--
 * @FileDescription: 左侧菜单组件
 * @Author: hbh
 * @Date: 2021-02-05
 -->
<template>
  <div class="app-menu">
    <div class="app-menu__user">
      <img
        class="app-menu__user--pic"
        src="@/assets/web_app_images/user_pic.png"
      />
      <ul class="app-menu__user__list">
        <li>hbh1234</li>
        <li>
          <label>Email：</label>
          <p title="4537439921@qq.com">4537439921@qq.com</p>
        </li>
        <li>
          <label>Phone：</label>
          <p>13157111986</p>
        </li>
        <router-link tag="li" :to="{ name: 'personalHomepage' }" class="go-tome"
          >进入个人主页>></router-link
        >
      </ul>
    </div>
    <div class="app-menu_list">
      <el-menu @select="handleClickCurrent">
        <template v-for="(item, index) in menuList">
          <!-- 有子项的一级菜单 -->
          <el-submenu :index="item.routeName" :key="index" v-if="item.children">
            <!-- 菜单前的icon -->
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.menuName }}</span>
            </template>
            <template>
              <el-menu-item
                v-for="(subItem, i) in item.children"
                :key="i"
                :index="subItem.routeName"
                >{{ subItem.groupName }}</el-menu-item
              >
            </template>
          </el-submenu>
          <!-- 没有子项的一级菜单 -->
          <el-menu-item v-else :index="item.routeName" :key="item.routeName">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.menuName }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <!-- 创建群组弹出窗口 -->
    <create-group-dialog
      title="创建群组"
      :is-show.sync="createDroupVisible"
      @close="createGroupMenu"
    ></create-group-dialog>
  </div>
</template>
<script>
import createGroupDialog from "../GroupDialog";
import api from "./api";
import { mapActions, mapState } from "vuex";
export default {
  name: "appmenu",
  components: {
    createGroupDialog
  },
  data() {
    return {
      createDroupVisible: false // 显示/
    };
  },
  computed: {
    ...mapState({
      menuList: state => {
        return state.nonsyncMenu.menuList;
      }
    })
  },
  methods: {
    ...mapActions("nonsyncMenu", ["getGroupMenu", "createGropuMenu"]),
    // 选择当前菜单
    handleClickCurrent(indexPath) {
      // 获取机时中心菜单
      let pathLen = indexPath.split("?");
      if (indexPath === "createRroup") {
        this.createDroupVisible = true;
        return false;
      }
      if (pathLen.length > 1) {
        // 动态获取的二级菜单
        this.$router.push({
          name: pathLen[0],
          query: {
            id: pathLen[1]
          }
        });
      } else {
        this.$router.push({
          name: indexPath
        });
      }
    },
    // 创建群组管理子菜单
    async createGroupMenu(form) {
      let { groupName, groupDesc } = form;
      let res = await api.postGroup({ groupName, groupDesc });
      if (res) {
        // 创建群组子菜单
        this.createGropuMenu(res);
        // 关闭创建弹窗
        this.createDroupVisible = false;
      } else {
        this.$message.error("群组已存在");
      }
    }
  },
  created() {
    // 获取群主菜单
    this.getGroupMenu();
  }
};
</script>
<style scoped lang="less">
@import "./less/menu.less";
</style>
