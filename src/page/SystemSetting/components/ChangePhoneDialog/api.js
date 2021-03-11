import http from "@/common/http.js";
/*
 * 用户中心/用户设置 —— 验证手机号
 * @desc 验证手机号是否重复
 * @param phone [type] string 手机号
 */
function getUserPhone(phone) {
  return new Promise(resolve => {
    http.get(`/user/phone/${phone}`).then(res => {
      resolve(res);
    });
  });
}
/*
 * 用户中心/短信验证 —— 获取短信验证码
 * @desc 给指定的手机号发送验证短信
 * @param phone [type] string 手机号
 * @param type [type] integer 类型,0重置密码|1注册用户|2支付
 */
function getSmsSend(phone, params) {
  return new Promise(resolve => {
    http.get(`/sms/send/${phone}`, { params: params }).then(res => {
      resolve(res);
    });
  });
}
/*
 * 用户中心/短信验证 —— 验证短信验证码
 * @desc 校验用户输入的短信验证码
 * @param phone [type] string 手机号
 * @param verifyCode [type] string 验证码
 */
function putSmsSend(params) {
  return new Promise(resolve => {
    http.put(`/sms/check`, params).then(res => {
      resolve(res);
    });
  });
}
export default {
  getUserPhone,
  getSmsSend,
  putSmsSend
};
