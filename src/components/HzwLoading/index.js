/*
 author: hbh
 create: 2021-02-27
 desc: loading 请求前显示loading 请求后关闭loading
*/
import { Loading } from "element-ui";

export default {
  loading: null,
  open(ops = {}) {
    // 打开loading
    let defaults = {
      target: document.querySelector(".layout-content"),
      text: "加载中……",
      background: "rgba(255, 255, 255, 1)",
      lock: true
    };
    let options = Object.assign(defaults, ops);
    this.loading = Loading.service(options);
  },
  close() {
    // 关闭loading
    if (this.loading != null) {
      this.loading.close();
    }
  }
};
