/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2020-07-17 23:18:17
 * @LastEditors: Roy
 * @LastEditTime: 2020-07-18 00:02:18
 * @Deprecated: 否
 * @FilePath: /vue-app-framework/src/router/page1.router.js
 */
const routers = [
  {
    path: "/mine",
    name: "mine",
    component: () => import("@/views/mine/mine"),
    meta: { isShowBottomTabbar: true }
  },
  {
    path: "/mine/mall",
    name: "mall",
    component: () => import("@/views/mine/mall")
  },
  {
    path: "/mall/records",
    name: "records",
    component: () => import("@/views/mine/records")
  },
  {
    path: "/mine/miningMachinery",
    name: "miningMachinery",
    component: () => import("@/views/mine/miningMachinery")
  },
]

export default routers;