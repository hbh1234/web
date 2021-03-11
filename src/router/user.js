// 用户登录 注册 忘记密码相关路由模块
import UserLayout from "../page/userPage/layout";
export default [
  {
    path: "/login",
    redirect: "/",
    component: UserLayout,
    children: [
      {
        path: "/", // 登录
        name: "login",
        meta: {
          title: "用户登录"
        },
        component: () =>
          import(
            /* webpackChunkName: "loginName" */ "../page/userPage/Login/index.vue"
          )
      },
      {
        path: "/forgePassword", //忘记密码
        name: "ForgePassword",
        meta: {
          title: "忘记密码"
        },
        component: () =>
          import(
            /* webpackChunkName: "loginName" */ "../page/userPage/ForgePassword/index.vue"
          )
      },
      {
        path: "/register", //注册
        name: "Register",
        meta: {
          title: "账号注册"
        },
        component: () =>
          import(
            /* webpackChunkName: "loginName" */ "../page/userPage/Register/index.vue"
          )
      }
    ]
  }
];
