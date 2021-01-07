/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2020-07-17 23:17:58
 * @LastEditors: Roy
 * @LastEditTime: 2020-07-18 00:00:55
 * @Deprecated: 否
 * @FilePath: /vue-app-framework/src/router/login.router.js
 */
const routers = [
  {
    path: "/",
    name: "",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/login/register")
  },
  {
    path: "/forget",
    name: "forget",
    component: () => import("@/views/login/forget")
  },
]

// Router.beforeEach((to, from, next) => {
//   //debugger
//   if (to.path === '/login') {
//     next();
//   } else {
//     let token = localStorage.getItem('tokens');
//     if (!token) {
//       next('/login');
//     } else {
//       next();
//     }
//   }
// })

export default routers;

