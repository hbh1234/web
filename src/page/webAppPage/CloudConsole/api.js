import http from "@/common/http.js";
/*
 * 云控制台/工作实例
 * @desc 获取当前用户的工作实例，注：每个实例的状态要通过接口‘查看工作实例’获取
 * @param current [type] integer 当前页，默认1
 * @param size    [type] integer 每页大小，默认10
 */
function getInsList(params) {
  return new Promise(resolve => {
    http.get(`/workInstance/list`, { params }).then(res => {
      resolve(res);
    });
  });
}
/*
 * 云控制台/工作实例 开启工作实例
 * @desc 传入instId申请启动一个工作实例，返回成功表示申请成功。注：返回成功后还需要使用接口‘查看工作实例’获取实例的运行状态和访问地址等信息
 * @param instId [type] string 工作实例ID
 */
function postWorkInstancestart(insId) {
  return new Promise(resolve => {
    http.post(`/workInstance/start/${insId}`).then(res => {
      resolve(res);
    });
  });
}
/*
 * 云控制台/工作实例 查看工作实例
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
 * 云控制台/工作实例 停止工作实例
 * @desc 停止工作实例后，可使用该instId调用接口‘开启工作实例’再次启动
 * @param instId [type] string 工作实例ID
 */
function stopInstance(instId) {
  return new Promise(resolve => {
    http.post(`/workInstance/stop/${instId}`).then(res => {
      resolve(res);
    });
  });
}
/**
 * 删除一个工作实例
 */
function delInsById(instId) {
  return new Promise(resolve => {
    http.delete(`/workInstance/${instId}`).then(res => {
      resolve(res);
    });
  });
}
export default {
  getInsList,
  getWorkInstance,
  postWorkInstancestart,
  stopInstance,
  delInsById
};
