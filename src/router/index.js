import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: () => import("@/views/home/index")
    },
    {
      path: "/login",
      component: () => import("@/views/login/index")
    },
    {
      path: "/register",
      component: () => import("@/views/register/index"),
      children: [
        {
          path: "",
          redirect: "registration"
        },
        {
          path: "registration",
          component: () => import("@/views/register/registration")
        },
        {
          path: "qualification",
          component: () => import("@/views/register/qualification")
        },
        {
          path: "success",
          component: () => import("@/views/register/success")
        }
      ]
    },
    {
      path: "/checkRecord",
      component: () => import("@/views/checkrecord/index")
    }
  ]
});

export default router;
