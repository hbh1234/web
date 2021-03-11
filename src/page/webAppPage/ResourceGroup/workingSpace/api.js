import http from "@/common/http.js";
/*
 * 云控制台/工作实例 分页获取用户实例
 * @desc 获取当前用户的工作实例，注：每个实例的状态要通过接口‘查看工作实例’获取
 * @param name [type] string 资源名称
 * @param current [type] integer 当前页，默认1
 * @param size [type] integer 每页大小，默认10
 */
function getWorkInstanceList(params) {
  return new Promise(resolve => {
    http.get("/workInstance/list", { params }).then(res => {
      resolve(res);
    });
  });
}
/*
 * 云控制台/工作空间 获取文件列表
 * @desc 获取文件列表
 * @param path [type] string 目录相对路径
 * @param spaceId [type] string 工作空间ID
 */
function getWorkspaceResourceList(params) {
  return new Promise(resolve => {
    http.get("/workspace/resource/list", { params }).then(res => {
      resolve(res);
    });
  });
}
// /workspace/resource/list
export default {
  getWorkInstanceList,
  getWorkspaceResourceList
};
