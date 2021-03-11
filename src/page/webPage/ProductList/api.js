import http from "@/common/http.js";
/*
 * 产品中心
 * @desc 获取所有产品
 * @param cloudType [type] string 产品云类型，0-所有类型，1-软件云，2-工具云，3-算力云，4-数据云
 * @param current [type] integer 当前页，默认1
 * @param size [type] integer 每页大小，默认10
 */
function getProducts(params) {
  return new Promise(resolve => {
    http.get(`/products`, { params }).then(res => {
      resolve(res);
    });
  });
}
export default {
  getProducts
};
