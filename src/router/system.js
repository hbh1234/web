// 展示类的网页路由模块
let routers = [
  {
    path: "/system_setting",
    redirect: "/user_set_page",
    component: () =>
      import(
        /* webpackChunkName: "layout" */ "@/page/SystemSetting/layout.vue"
      ),
    children: [
      {
        path: "/user_set_page", // 账户设置
        name: "systemSetting",
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/page/SystemSetting/page/UserSetings"
          )
      },
      {
        path: "/change_password", // 修改密码
        name: "changePassword",
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/page/SystemSetting/page/ChangePassword"
          )
      }
    ]
  }
];
export default routers;
