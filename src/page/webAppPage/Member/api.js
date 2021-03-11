import http from "@/common/http.js";
/*
 * 资源管理/个人云空间
 * @desc 统计用户已上传资源数量
 */
function getResourcesCount() {
  return new Promise(resolve => {
    http.get("/user/resources/count").then(res => {
      resolve(res);
    });
  });
}
/*
 * 资源管理/个人云空间
 * @desc 统计用户已分享资源数量
 */
function getSharedCount() {
  return new Promise(resolve => {
    http.get("/user/resources/shared/count").then(res => {
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
/*
 * 机时中心
 * @desc 获取所有超算中心用户账户的机时余额总和
 */
function getHpCaccountsBalance() {
  return new Promise(resolve => {
    http.get("/hpcs/accounts/balance").then(res => {
      resolve(res);
    });
  });
}
/*
 * 机时中心
 * @desc 获取所有超算中心的所有用户账户
 */
function getAllAccounts() {
  return new Promise(resolve => {
    http.get("/hpcs/accounts").then(res => {
      resolve(res);
    });
  });
}
/*
 * 机时中心
 * @desc 查看工作实例
 * @param instId [type] string 工作实例ID
 */
function getWorkInstance(instId) {
  return new Promise(resolve => {
    http.get(`/workInstance/${instId}`).then(res => {
      resolve(res);
    });
  });
}
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
 * 会员中心/用户余额
 * @desc 用户余额
 */
function getBalance() {
  return new Promise(resolve => {
    http.get("/user/balance").then(res => {
      resolve(res);
    });
  });
}
/*
 * 云控制台/工作实例
 * @desc 获取当前用户的工作实例，注：每个实例的状态要通过接口‘查看工作实例’获取
 * @param current [type] integer 当前页，默认1
 * @param size    [type] 每页大小，默认10
 */
function getInsList(params) {
  return new Promise(resolve => {
    http.get(`/workInstance/list`, { params }).then(res => {
      resolve(res);
    });
  });
}
/*
 * 群组管理/本人群组
 * @desc 获取本人所有群组信息
 * @param current [type] integer 当前页，默认1
 * @param size    [type] 每页大小，默认10
 */
function getGroups(params) {
  return new Promise(resolve => {
    http.get(`/user/groups`, { params }).then(res => {
      resolve(res);
    });
  });
}
/*
 * 群组管理/群组信息 - 获取群组概览
 * @desc 获取群组概览信息：群组名称、群组介绍、共享资源数量、本人发布/共享的资源数量、群成员数量
 * @param groupId [type] string 群组id
 */
function getGroupSummary(groupId) {
  return new Promise(resolve => {
    http.get(`/group/summary/${groupId}`).then(res => {
      resolve(res);
    });
  });
}
/*
 * 产品中心
 * @desc 获取产品列表，包含用户订阅状态
 */
function getProductsUsage() {
  return new Promise(resolve => {
    http.get("/products/usage").then(res => {
      resolve(res);
    });
  });
}
/**
 * 获取指定超算中心的所有商品
 */
function getItemsByHpc(hpcId) {
  return new Promise(resolve => {
    http.get(`/hpc/${hpcId}/items`).then(res => {
      resolve(res);
    });
  });
}
// 获取支付的二维码
function getBalanceQrcode(params) {
  return new Promise(resolve => {
    http.post("/pay/balance/qrcode", params).then(res => {
      resolve(res);
    });
  });
}
// 获取购买的二维码
function getPayQrcode(params) {
  return new Promise(resolve => {
    http.post("/pay/item/qrcode", params).then(res => {
      resolve(res);
    });
  });
}
// 获取支付状态
function getAlipayResult(payNo) {
  return new Promise(resolve => {
    http.get(`/pay/${payNo}/status`).then(res => {
      resolve(res);
    });
  });
}
export default {
  getResourcesCount,
  getSharedCount,
  getHpcDetailCount,
  getProductsUsage,
  getHpCaccountsBalance,
  getBalance,
  getAllAccounts,
  getWorkInstance,
  getInsList,
  getGroups,
  getGroupSummary,
  getHpcsAccounts,
  getBalanceQrcode,
  getAlipayResult,
  getItemsByHpc,
  getPayQrcode
};
