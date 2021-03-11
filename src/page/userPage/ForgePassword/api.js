import http from "@/common/http.js";
/*
 * 获取短信验证码
 * @desc 给指定的手机号发送验证短信
 * @param phone [type] string 手机号
 * 正式地址/user/sms/${phone}/verify
 * 测试地址/user/sms/{phone}/code
 */
function getUserSmsPhoneVerify(phone, params) {
  console.log("phone", phone);
  console.log("params", params);
  return new Promise(resolve => {
    http.get(`/user/sms/${phone}/code`, params).then(res => {
      resolve(res);
    });
  });
}
/*
 * 验证短信验证码
 * @desc 校验用户输入的短信验证码
 * @param phone [type] string 手机号
 * 正式地址/user/sms/${phone}/verify
 * 测试地址/user/sms/{phone}/code
 */
function putUserSmsPhoneVerify(params) {
  return new Promise(resolve => {
    http.put(`/user/sms/verify`, params).then(res => {
      resolve(res);
    });
  });
}
export default {
  getUserSmsPhoneVerify,
  putUserSmsPhoneVerify
}