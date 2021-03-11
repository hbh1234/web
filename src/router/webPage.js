// 展示类的网页路由模块
let routers = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "layout" */ "@/page/webPage/layout.vue"),
    children: [
      {
        path: "/productDetails", // 产品详情布局页
        name: "productDetails",
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/page/webPage/ProductDetails"
          )
      },
      {
        path: "/productList", // 产品详情布局页
        name: "ProductList",
        component: () =>
          import(/* webpackChunkName: "layout" */ "@/page/webPage/ProductList")
      },
      {
        path: "/about", // 关于我们
        name: "about",
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/page/webPage/ProductDetails"
          )
      }
    ]
  }
];
export default routers;
