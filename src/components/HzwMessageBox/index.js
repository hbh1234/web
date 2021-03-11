/*
 author: hbh
 create: 2021-02-08
 desc: 封装项目中通用删除前的提示窗口
*/
import { MessageBox, Message } from "element-ui";
let comfig = async function(ops) {
  const h = this.$createElement;
  const defaults = {
    title: "提示",
    content: "您确定要删除此文件吗?"
  };
  const options = { ...defaults, ...ops };
  try {
    return await MessageBox.confirm("", "", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      closeOnClickModal: false,
      message: h("p", null, [
        h("h3", { attrs: { class: "hzw-message-box__title" } }, options.title),
        h("p", { attrs: { class: "hzw-message-box__msg" } }, options.content)
      ]),
      customClass: "hzw-message-box"
    })
      .then(() => {
        return true;
      })
      .catch(() => {
        Message({
          message: "已取消!",
          customClass: "hzw-message"
        });
        return false;
      });
  } catch (e) {
    return false;
  }
}
export default comfig;
