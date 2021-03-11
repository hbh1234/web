import http from "@/common/http.js";
/*
 * 机时中心 获取所有超算中心的所有用户账户
 * @desc 获取所有超算中心的所有用户账户
 * @param instId [type] string 工作实例ID
 */
function getHpcsAccounts() {
  return new Promise(resolve => {
    http.get(`/hpcs/accounts`).then(res => {
      resolve(res);
    });
  });
}
/*
 * 机时中心
 * @desc 统计计算次数
 */
function getHpcDetailCount() {
  return new Promise(resolve => {
    http.get("/hpc/account/detail/count").then(res => {
      resolve(res);
    });
  });
}
export default {
  getHpcsAccounts,
  getHpcDetailCount
};
