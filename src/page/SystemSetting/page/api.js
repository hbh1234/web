import http from "@/common/http.js";
//提交手机号修改
function putUserPhone(params) {
  return new Promise(resolve => {
    http.put(`/user/phone`, params).then(res => {
      resolve(res);
    });
  });
}
/*
 * 用户中心/用户设置 —— 提交邮箱修改
 * @desc 处理用户修改邮箱请求，用户已登录前提下
 * @param phone [type] string 手机号
 */
function putUserEmail(params) {
  return new Promise(resolve => {
    http.put(`/user/email`, params).then(res => {
      resolve(res);
    });
  });
}
export default {
  putUserPhone,
  putUserEmail
};
