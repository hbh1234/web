// 登录后相关应用的路由模块
let routers = [
  {
    path: "/", // 资源管理
    redirect: "/resources_space",
    component: () =>
      import(
        /* webpackChunkName: "resourceManage" */ "../page/webAppPage/layout.vue"
      ),
    children: [
      {
        path: "Member", //会员中心
        name: "member",
        component: () =>
          import(/* webpackChunkName: "member" */ "../page/webAppPage/Member")
      },
      {
        path: "buy_members", //购买机时会员
        name: "buyMembers",
        component: () =>
          import(
            /* webpackChunkName: "buyMembers" */ "../page/webAppPage/Member/BuyMembers.vue"
          )
      },
      {
        path: "recharge_members", //充值机时会员
        name: "rechargeMembers",
        component: () =>
          import(
            /* webpackChunkName: "rechargeMembers" */ "../page/webAppPage/Member/RechargeMembers.vue"
          )
      },
      {
        path: "recharge_success", //充值成功
        name: "rechargeSuccess",
        component: () =>
          import(
            /* webpackChunkName: "SuccessPage" */ "../page/webAppPage/Member/components/RechargeSuccess"
          )
      },
      {
        path: "purchase_success", //购买成功
        name: "purchaseSuccess",
        component: () =>
          import(
            /* webpackChunkName: "SuccessPage" */ "../page/webAppPage/Member/components/PurchaseSuccess"
          )
      },
      {
        path: "product", //产品中心
        name: "Product",
        component: () =>
          import(/* webpackChunkName: "product" */ "../page/webAppPage/Product")
      },
      {
        path: "cloud_console", //云控制台
        name: "cloudConsole",
        component: () =>
          import(
            /* webpackChunkName: "cloudConsole" */ "../page/webAppPage/CloudConsole"
          )
      },
      {
        path: "machine_roup", //机时中心
        name: "machineGroup",
        component: () =>
          import(
            /* webpackChunkName: "TimeCenterGroup" */ "../page/webAppPage/MachineGroup"
          )
      },
      {
        path: "resources_space", // 资源管理菜单-> 个人工作空间
        name: "resourcesSpace",
        component: () =>
          import(
            /* webpackChunkName: "resourceManage" */ "../page/webAppPage/ResourceGroup/ResourcesSpace"
          )
      },
      {
        path: "resources_hbox", // 资源管理菜单-> Hbox
        name: "Hbox",
        component: () =>
          import(
            /* webpackChunkName: "ResourcesHbox" */ "../page/webAppPage/ResourceGroup/Hbox"
          )
      },
      {
        path: "workings_space", // 资源管理菜单-> 工作空间
        name: "workingSpace",
        component: () =>
          import(
            /* webpackChunkName: "workingSpace" */ "../page/webAppPage/ResourceGroup/workingSpace"
          )
      },
      {
        path: "workings_space_details/:spaceId?/:processName?", // 资源管理菜单-> 工作空间-文件列表
        name: "workingDetails",
        component: () =>
          import(
            /* webpackChunkName: "workingSpaceDetails" */ "../page/webAppPage/ResourceGroup/workingSpace/workingSpaceDetails.vue"
          )
      },
      {
        path: "group_details/:id?", // 群组管理
        name: "groupDetails",
        component: () =>
          import(
            /* webpackChunkName: "groupdetails" */ "../page/webAppPage/Group"
          )
      },
      {
        path: "personal_homepage", // 个人主页
        name: "personalHomepage",
        component: () =>
          import(
            /* webpackChunkName: "personalHomepage" */ "../page/webAppPage/PersonalHomepage"
          )
      }
    ]
  },
  {
    path: "/cloud_app",
    name: "cloudApp",
    component: () =>
      import(/* webpackChunkName: "CloudApp" */ "../page/webAppPage/CloudApp")
  }
];
export default routers;
