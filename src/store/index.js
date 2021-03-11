import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import resources from "./modules/resources";
import nonsyncMenu from "./modules/nonsyncMenu";
import vuexAlong from "vuex-along";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {},
  mutations: {},
  actions: {
    cleare() {
      alert(1234);
    }
  },
  modules: {
    user,
    resources,
    nonsyncMenu
  },
  plugins: [
    vuexAlong({
      name: "user",
      local: {
        list: ["user.access_token", "user.refresh_token", "user.token_type"], // 过掉掉tokens(不把tokens存到local中去)
        // 过滤模块 ma 数据， 将其他的存入 localStorage
        isFilter: true
      }
    })
  ]
});
