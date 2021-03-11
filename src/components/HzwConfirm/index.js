/*
 author: hbh
 create: 2021-02-08
 desc: 封装项目中使用的confim弹出层，用于：绑定、取消绑定； 订阅、取消订阅
*/
import { MessageBox } from "element-ui";
let initPic = require("@/assets/web_app_images/unbind_icon.png");
let comfig = async function(ops) {
  const h = this.$createElement;
  const defaults = {
    userName: ""
  };
  const options = { ...defaults, ...ops };
  try {
    await MessageBox.confirm("", "", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      closeOnClickModal: false,
      showClose: false,
      message: h("p", null, [
        h("img", {
          attrs: {
            src: options.src || initPic,
            class: "hzw-unbind-icon"
          }
        }),
        h("h3", { attrs: { class: "hzw-unbind-title" } }, options.title),
        h("p", { attrs: { class: "hzw-unbind-msg" } }, options.content)
      ]),
      customClass: "hzw-unbind"
    });
    return true;
  } catch (e) {
    return false;
  }
}
export default comfig;
