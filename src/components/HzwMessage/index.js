/*
 author: hbh
 create: 2021-02-13
 desc: 封装项目中通用提示窗口
*/
import { Message } from "element-ui";
let message = function() {
  let defaults = {
    message: "删除成功！"
  };
  let msgObj = null;
  return function(opstions) {
    let ops = Object.assign(defaults, opstions);
    if (!msgObj) {
      msgObj = Message({
        message: ops.message,
        customClass: "hzw-message",
        onClose() {
          msgObj = null;
        }
      });
    }
  };
};
export default message;
