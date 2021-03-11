import http from "@/common/http.js";
/*
 * [userResource 提交资源信息，用于上传资源前获取服务器返回的资源唯一标识符(resourceId)]
 * @param name [type] string 资源名称
 * @param length [type] nteger(int64) 资源大小, 字节
 * @param groupIds [type] array 共享的群组ID列表
 */
function userResource(params) {
  return new Promise(resolve => {
    http.post("/user/resource", params).then(res => {
      resolve(res);
    });
  });
}
/*
 * [userResource 上传完成后执行该回调方法进行后处理]
 * @param resourceId [type] string 资源唯一ID
 */
function userResourceSuccess(resourceId) {
  return new Promise(resolve => {
    http.put(`/user/resource/put/success/${resourceId}`).then(res => {
      resolve(res);
    });
  });
}
// 覆盖已经上传过的文件
function putCoverUpload(params) {
  return new Promise(resolve => {
    http.put(`/user/resource`, params).then(res => {
      resolve(res);
    });
  });
}
// 取消上传
function cancelLoad(resourceId) {
  return new Promise(resolve => {
    http.put(`user/resource/${resourceId}/cancel`).then(res => {
      resolve(res);
    });
  });
}
export default {
  userResource,
  userResourceSuccess,
  putCoverUpload,
  cancelLoad
};
