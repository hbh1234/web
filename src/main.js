import Vue from "vue";
import Element from "element-ui";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./common/element.js";
import "./common/font/lib/saasfont.less";
import "./common/less/element-variables.scss";
import "./common/less/restElement.less";
import "./common/less/hzwUI.less";
import "./permission.js"; // 路有权限
import hzwComponents from "./components/index"; // 项目中的基础组件库

Vue.use(Element);
Vue.use(hzwComponents);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
