import http from "@/common/http.js";
/*
 * [userResource 创建群组提交数据接口
 * @param groupName [type] string 群组名称
 * @param groupAvater [type] string 每群组头像
 * @param groupDesc [type] string 群组摘要
 */
let postGroup = function(params) {
  return new Promise(resovle => {
    http.post("/group", params).then(res => {
      resovle(res);
    });
  });
};
export default {
  postGroup
};
