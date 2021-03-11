/**
 * 全站权限配置
 */
import store from "./store";
import router from "./router";
// 不需要登录权限访问的路由
const whiteList = [
  "login",
  "forgePassword",
  "register",
  "about",
  "productList",
  "productDetails"
];
router.beforeEach((to, from, next) => {
  let toRouteName = to.path.substr(1);
  let inWhite = whiteList.includes(toRouteName);
  let accessToken = store.state.user.access_token;
  if (inWhite) {
    next();
  } else {
    if (accessToken) {
      next();
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.name
        }
      });
    }
  }
});
