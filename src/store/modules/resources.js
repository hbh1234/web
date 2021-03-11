/*
 * @FileDescription: 资源管理 -> 个人空间接口数据存储
 * PS:该接口写在vuex中，是因为在使用上传新建功能时，上传成功需要调用该接口做数据刷新
 * @Author: hbh
 * @Date: 2021-02-12
 */
import http from "@/common/http.js";
import loading from "@/components/HzwLoading";
const state = {
  resourcesData: {}, // 存储资源管理数据
  resourcesPage: {
    size: 0,
    current: 0
  },
  removeStaues: null
};
const getters = {
  pageCurrent(state) {
    return state.resourcesPage.current;
  },
  pageSize(state) {
    return state.resourcesPage.size;
  }
};
const mutations = {
  GET_USER_RESCOURCES(state, res) {
    state.resourcesData = res;
    // 存储当页码
    state.resourcesPage.current = res.current;
    state.resourcesPage.size = res.size;
  },
  SET_RESCOURCES_CURRENT(state, options) {
    state.resourcesCrrent = options;
  },
  REMOVE_USER_RESOURCES(state, res) {
    state.removeStaues = res;
  },
  CLEAR(state) {
    state.resourcesData = state.resourcesPage = {};
    state.removeStaues = null;
  }
};
const actions = {
  // 调用获取资源管理接口
  getUserResources({ commit }, options) {
    loading.open();
    http.get("/user/resources", { params: options }).then(res => {
      loading.close();
      commit("GET_USER_RESCOURCES", res);
    });
  },
  // 上传后在当前页面刷新
  refreshUserResources({ commit, state }, ops) {
    // 获取存储的当前点击页
    let opstions = Object.assign(ops, state.resourcesPage);
    http.get("/user/resources", { params: opstions }).then(res => {
      console.log("上传后在当前页面刷新", res);
      commit("GET_USER_RESCOURCES", res);
    });
  },
  // 调用删除资源管理接口
  removeUserResources({ commit }, resourceId) {
    return new Promise(resolve => {
      http.delete(`/user/resource/${resourceId}`).then(res => {
        commit("REMOVE_USER_RESOURCES", res);
        resolve(res);
      });
    });
  },
  chear({ commit }) {
    commit("CLEAR");
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
