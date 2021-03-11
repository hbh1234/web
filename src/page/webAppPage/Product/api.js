import http from "@/common/http.js";
import qs from "qs";
/*
 * 产品中心 获取产品列表，包含用户订阅状态
 * @desc 获取产品列表，包含用户订阅状态，需要用户已登录
 * @param cloudType [type] string  产品云类型，0:所有类型，1:软件云，2:工具云，3:算力云，4:数据云
 * @param subStatus [type] string 产品订阅状态，0:未订阅使用，1:已订阅使用，-1:不过滤订阅状态
 */
function getProductsUsage() {
  return new Promise(resolve => {
    http.get("/products/usage").then(res => {
      resolve(res);
    });
  });
}
/*
 * 产品中心 订阅/取消订阅产品
 * @desc 订阅/取消订阅产品
 * @param productId [type] string  产品ID
 * @param subStatus [type] integer 订阅状态，0-取消订阅，1-开始订阅
 */
function postProductsSubscribe(params) {
  let ops = qs.stringify(params);
  return new Promise(resolve => {
    http.post(`/products/subscribe?${ops}`, { params }).then(res => {
      resolve(res);
    });
  });
}

/**
 * 开通产品在线使用
 * 使用产品ID注册对应的工作实例，注册后可在实例列表中查询到
 */
function openForUse(productId) {
  return new Promise(resolve => {
    http.post(`/workInstance/register/${productId}`).then(res => {
      resolve(res);
    });
  });
}
/**
 * 开启一个工作实例
 * 传入instId申请启动一个工作实例，返回成功表示申请成功。注：返回成功后还需要使用接口‘查看工作实例’获取实例的运行状态和访问地址等信息
 */
function postStartInsById(insId) {
  return new Promise(resolve => {
    http.post(`/workInstance/start/${insId}`).then(res => {
      resolve(res);
    });
  });
}
/**
 * 查看工作实例的信息
 */
function getVievInsInfoById(insId) {
  return new Promise(resolve => {
    http.get(`/workInstance/${insId}`).then(res => {
      resolve(res);
    });
  });
}
export default {
  getProductsUsage,
  postProductsSubscribe,
  openForUse,
  getVievInsInfoById,
  postStartInsById
};
