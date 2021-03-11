/*
 * @FileDescription: 左侧异步菜单数据管理
 * PS：该接口写在vuex中，是因为在进行群组解散、新建、上传文件分享到群组中，都会使用该接口和数据，目的是减少界面间的数据传递和接口重复调用。
 * @Author: hbh
 * @Date: 2021-02-19
 */
import http from "@/common/http.js";
import asyncMenu from "../staticMeu";
const state = {
  menuList: [],
  machineList: [] // 机时中心子菜单
};
const getters = {
  groupMenu(state) {
    let groupSubMenu = [];
    state.menuList.forEach(item => {
      if (item.menuName === "群组管理") {
        let childrenLen = item.children.length;
        groupSubMenu = item.children.slice(0, childrenLen - 1);
      }
    });
    return groupSubMenu;
  }
};
const mutations = {
  GET_GROUP_MENU(state, data) {
    asyncMenu.forEach(item => {
      if (item.menuName === "群组管理") {
        item.children = data.map(item => {
          item.routeName = "groupDetails?" + item.groupId;
          return item;
        });
        item.children.push({
          routeName: "createRroup",
          groupName: "+ 创建群组"
        });
      }
    });
    state.menuList = asyncMenu;
  },
  CREATE_GROUP_MENU(state, data) {
    let { groupId, groupName } = data;
    state.menuList.forEach(item => {
      if (item.menuName === "群组管理") {
        let menuData = {
          groupName,
          groupId,
          routeName: `groupDetails?${groupId}`
        };
        let len = item.children.length - 1;
        item.children.splice(len, 0, menuData);
      }
    });
  },
  CLEAR_MENU(state) {
    state.menuList = [];
  }
};
const actions = {
  // 获取群组菜单数据
  getGroupMenu({ commit }) {
    return new Promise(resovle => {
      http
        .get("/user/groups", {
          params: {
            current: 1,
            size: 1111
          }
        })
        .then(res => {
          commit("GET_GROUP_MENU", res.records);
          resovle(res.records);
        });
    });
  },
  // 创建群组菜单
  createGropuMenu({ commit }, data) {
    commit("CREATE_GROUP_MENU", data);
  },
  chear({ commit }) {
    commit("CLEAR_MENU");
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
