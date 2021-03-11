import HzwTable from "./HzwTable/index.vue";
import HzwConfirm from "./HzwConfirm";
import HzwMessageBox from "./HzwMessageBox";
import HzwMessage from "./HzwMessage";
import HzwBandDialog from "./HzwBandDialog";
import HzwPanel from "./HzwPanel";
import HzwLoading from "./HzwLoading";
import HzwSteps from "./HzwSteps";
let components = [HzwTable, HzwBandDialog, HzwPanel, HzwSteps];
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue) {
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component));
  Vue.prototype.$hzwConfirm = HzwConfirm;
  Vue.prototype.$hzwMessageBox = HzwMessageBox;
  Vue.prototype.$hzwMessage = HzwMessage();
  Vue.prototype.$hzwLoading = HzwLoading;
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default {
  install
};
