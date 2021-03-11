/*
 * @FileDescription: 用户登录的数据存储到vuex中，组件之间共享
 * @Author: hbh
 * @Date: 2021-02-12
 */
import Cookie from "js-cookie";
import http from "@/common/http.js";
const state = {
  isLoginOut: false,
  access_token: "" || Cookie.get("access_token"),
  refresh_token: "" || Cookie.get("refresh_token"),
  token_type: "" || Cookie.get("token_type"),
  userDatail: {} // 用户详情
};
const mutations = {
  LOGIN(state, res) {
    // 安全性考虑，有关token的数据存储到cookies中，其他用户登录数据存储在local中
    for (let key in res) {
      switch (key) {
        case "access_token":
          state.access_token = res[key];
          Cookie.set("access_token", res[key]);
          break;
        case "refresh_token":
          state.refresh_token = res[key];
          Cookie.set("refresh_token", res[key]);
          break;
        case "token_type":
          state.token_type = res[key];
          Cookie.set("token_type", res[key]);
          break;
        default:
          // 存储用户信息
          state.userDatail[key] = res[key];
      }
    }
    state.isLoginOut = false;
  },
  LOGIN_OUT(state, self) {
    Cookie.remove("access_token");
    Cookie.remove("refresh_token");
    Cookie.remove("token_type");
    state.isLoginOut = true;
    self.$router.push({
      name: "login"
    });
  }
};
const actions = {
  // 用户登录
  login({ commit }, loginData) {
    return new Promise(resolve => {
      http.post("/user/login", loginData).then(res => {
        if (res) {
          commit("LOGIN", res);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },
  // 退出登录
  loginOut({ commit }, self) {
    http.post("/user/logout").then(() => {
      commit("LOGIN_OUT", self);
    });
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
