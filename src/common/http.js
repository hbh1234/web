/*
 * @FileDescription: 请求后端接口公用方法
 * 禁止混入个人相关业务代码
 * @Author: HBH
 * @Date: 2021-02-02
 */
import message from "@/components/HzwMessage";
import axios from "axios";
import Cookie from "js-cookie";
import store from "@/store";
import router from "@/router/index";
import loading from "@/components/HzwLoading";
//import qs from "qs";
const Axios = axios.create();
// 取消请求
Axios.CancelToken = axios.CancelToken;
Axios.defaults.baseURL = "/api";
// 链接超时 10s
Axios.defaults.timeout = 20000;
// CORS 跨域允许携带资源凭证
Axios.defaults.withCredentials = true;
//设置请求传递数据的格式(get)
Axios.defaults.headers["Content-Type"] = "application/json";
//设置请求拦截器
Axios.interceptors.request.use(
  config => {
    let token = store.state.user.access_token || Cookie.get("access_token");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  error => {
    console.error("请求错误~");
    return Promise.reject(error);
  }
);
// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    if (res.status === 200) {
      return res.data;
    }
  },
  err => {
    const { response } = err;
    if (response) {
      // 服务器返回结果
      switch (response.status) {
        case 400:
          //关闭loading加载
          loading.close();
          message()({
            message: response.data
          });
          console.error("400参数错误");
          break;
        case 401: // 未登录
          router.push({
            name: "login"
          });
          //关闭loading加载
          loading.close();
          console.error("401 未登录");
          break;
        case 403: // 服务器理解请求，但是拒绝执行（token过期）
          //关闭loading加载
          loading.close();
          router.push({
            name: "login"
          });
          console.error("403 token过期!");
          break;
        case 404: // 找不大地址
          //关闭loading加载
          loading.close();
          break;
        case 409: // 上传文件重名
          window.status = 409;
          loading.close();
          break;
        case 500:
          //关闭loading加载
          loading.close();
          message()({
            message: response.data
          });
          break;
      }
    } else {
      // 服务器没有返回结果 1、服务器崩掉 2、客户端网络连接失败
      if (!window.navigator.onLine) {
        console.error("网络连接失败!");
      }
      return Promise.reject(err);
    }
  }
);
export default Axios;
