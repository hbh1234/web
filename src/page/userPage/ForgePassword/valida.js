import { isMobile, validatenum } from "@/common/validate.js";
export const validatePhone = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请填写手机号码！"));
  } else {
    if (value !== "") {
      let res = isMobile(value);
      if (res) {
        callback();
      } else {
        callback(new Error("请输入有效手机号码！"));
      }
    }
  }
}
export const validaCode = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请填写验证码！"));
  } else {
    if (value !== "") {
      let res = validatenum(value, 2);
      if (!res) {
        callback();
      } else {
        callback(new Error("验证码格式错误！"));
      }
    }
  }
}