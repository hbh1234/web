//左侧菜单静态数据（左侧菜单中群组二级菜单、机时中心二级菜单从接口中获取，其他菜单均是静态）
// PS: routeName的名称要与路由中的name保持一致
let menuList = [
  {
    menuName: "会员中心", // 路由名称
    icon: "icon-qz", // 路由前的图标
    routeName: "member" // 跳转路由的name
  },
  {
    menuName: "产品中心",
    icon: "icon-cpzx",
    routeName: "Product" // 跳转路由的name
  },
  {
    menuName: "云控制台",
    icon: "icon-cpzx",
    routeName: "cloudConsole" // 跳转路由的name
  },
  {
    menuName: "机时管理",
    icon: "icon-jszx",
    routeName: "machineGroup" // 跳转路由的name
  },
  {
    routeName: "resources", // 路由跳转地址
    menuName: "资源管理", // 一级菜单名称
    icon: "icon-zygl",
    children: [
      {
        routeName: "resourcesSpace",
        groupName: "个人云空间"
      },
      {
        routeName: "Hbox",
        groupName: "Hbox"
      },
      {
        routeName: "workingSpace",
        groupName: "工作空间"
      }
    ]
  },
  {
    menuName: "群组管理",
    icon: "icon-qz",
    routeName: "asyn-qz",
    children: []
  }
];
export default menuList;
