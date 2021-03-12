import Vue from "vue";
import VueRouter from "vue-router";
import user from "./user.js";
import system from "./system.js";
import webAppRouters from "./webApp.js";
import webPageRouters from "./webPage.js";
Vue.use(VueRouter);
//获取原型对象上的push函数 解决路菜单重复点击跳转路由浏览器报错bug
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法 解决路菜单重复点击跳转路由浏览器报错bug
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const routes = [
  ...system,
  ...user, // 登录、注册、忘记密码路由模块
  ...webAppRouters, // 应用页面路由模块
  ...webPageRouters // 页面展示路由模块
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
