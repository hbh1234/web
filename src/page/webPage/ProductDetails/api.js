import http from "@/common/http.js";
/*
 * 产品中心
 * @desc 产品详情
 * @param productId [type] string productId
 */
function getProduct(productId) {
  return new Promise(resolve => {
    http.get(`/product/${productId}`).then(res => {
      resolve(res);
    });
  });
}
export default {
  getProduct
};
