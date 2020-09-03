import hasRole from "./hasRole";
import hasPermi from "./hasPermi";
import isActive from "./isActive";
import isApprove from "./isApprove";
import isCounties from "./isCounties";
const install = function(Vue) {
  Vue.directive("hasRole", hasRole);
  Vue.directive("hasPermi", hasPermi);
  Vue.directive("isActive", isActive);
  Vue.directive("isApprove", isApprove);
  Vue.directive("isCounties", isCounties);
};

if (window.Vue) {
  window["hasRole"] = hasRole;
  window["hasPermi"] = hasPermi;
  window["isActive"] = isActive;
  window["isApprove"] = isApprove;
  window["isCounties"] = isCounties;
  Vue.use(install) // eslint-disable-line
}

export default install;
