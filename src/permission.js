import router from "./router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "./util/user-token";
import store from "./store";
import { Message } from "element-ui";
const whiteList = [
  "/login",
  "/register",
  "/checkRecord",
  "/register/registration",
  "/register/qualification",
  "/register/success"
];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
      NProgress.done(); // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store
          .dispatch("user/getInfo")
          .then({
            // 拉取user_info
            // const roles = res.roles
            // store.dispatch('GenerateRoutes', { roles }).then(accessRoutes => {
            //   // 测试 默认静态页面
            //   // store.dispatch('permission/generateRoutes', { roles }).then(accessRoutes => {
            //   // 根据roles权限生成可访问的路由表
            //   router.addRoutes(accessRoutes) // 动态添加可访问路由表
            //   next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
            // })
          })
          .catch(err => {
            store.dispatch("FedLogOut").then(() => {
              Message.error(err);
              console.log(err);
              next({ path: "/" });
            });
          });
      } else {
        next();
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        // if (hasPermission(store.getters.roles, to.meta.roles)) {
        //   next()
        // } else {
        //   next({ path: '/401', replace: true, query: { noGoBack: true }})
        // }
        // 可删 ↑
      }
    }
    next();
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});
router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
