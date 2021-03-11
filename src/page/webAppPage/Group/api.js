import http from "@/common/http.js";
/*
 * @path 群组信息-> 获取群组概览
 * @desc 获取群组概览信息：群组名称、群组介绍、共享资源数量、本人发布/共享的资源数量、群成员数量
 * @param groupId [type] string 群组id
 */
let getSummary = function(params) {
  return new Promise(resovle => {
    http.get(`/group/summary/${params.groupId}`).then(res => {
      resovle(res);
    });
  });
};
/*
 * @path 群组信息-> 获取群组动态
 * @desc 查询群组动态
 * @param groupId [type] string 群组id
 * @param current [type] integer 当前页，默认1
 * @param size [type] integer 每页大小，默认10
 */
let getGroupActivities = function(groupId, params) {
  return new Promise(resovle => {
    http.get(`/group/activities/${groupId}`, { params }).then(res => {
      resovle(res);
    });
  });
};
/*
 * @path 群组成员-> 获取群组成员列表
 * @desc 获取某个群组的所有成员列表，包括权限信息
 * @param groupId [type] string 群组id
 * @param current [type] integer 当前页，默认1
 * @param size [type] integer 每页大小，默认10
 */
let getGroupMembers = function(groupId, params) {
  return new Promise(resovle => {
    http.get(`/group/members/${groupId}`, { params: params }).then(res => {
      resovle(res);
    });
  });
};
/*
 * @path 群组成员-> 删除群组
 * @desc 指定成员进行移除
 * @param groupId [type] string 群组id
 * @param memberId [type] string memberId
 */
let deleteGroup = function(groupId) {
  return new Promise(resovle => {
    http.delete(`/group/${groupId}`).then(res => {
      resovle(res);
    });
  });
};
/*
 * @path 群组资源-> 获取群组共享资源列表
 * @desc 获取群组中所有共享资料列表，包括本人分享的
 * @param groupId [type] string 群组id
 * @param current [type] integer 当前页，默认1
 * @param size [type] integer 每页大小，默认10
 */
let getGroupResource = function(groupId, params) {
  return new Promise(resovle => {
    http.get(`/group/resource/${groupId}`, {params}).then(res => {
      resovle(res);
    });
  });
};
/*
 * @path 群组资源-> 取消分享文件
 * @desc 获取消分享多个文件到多个群组
 * @param body(资源分享)
 */
let deleteShare = function(params) {
  return new Promise(resovle => {
    http.delete(`/group/share`, { data: params }).then(res => {
      resovle(res);
    });
  });
};
/*
 * @path 群组管理/群组信息-> 修改群组信息
 * @desc 修改群组信息
 * @param groupAvater [type] string 群组头像
 * @param groupDesc [type] string 群组摘要
 * @param groupId [type] string 需要修改的群组id
 * @param groupName [type] string 群组名称
 */
let putGroup = function(params) {
  return new Promise(resovle => {
    http.put(`/group`, params).then(res => {
      resovle(res);
    });
  });
};
/*
 * @path 群组管理/群组成员-> 生成群组邀请码
 * @desc 生成一个可以邀请别人加入的邀请码（默认有效期2个星期）
 * @param groupId [type] string 群组ID
 */
let getGroupInvite = function(groupId) {
  return new Promise(resovle => {
    http.get(`/group/invite/${groupId}`).then(res => {
      resovle(res);
    });
  });
};
export default {
  getSummary,
  getGroupMembers,
  deleteGroup,
  getGroupActivities,
  getGroupResource,
  deleteShare,
  putGroup,
  getGroupInvite
};
