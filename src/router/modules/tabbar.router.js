/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2020-07-17 23:18:08
 * @LastEditors: Jack
 * @LastEditTime: 2020-08-07 17:44:23
 * @Deprecated: 否
 * @FilePath: /vue-app-framework/src/router/modules/tabbar.router.js
 */
const tabbar = [
  {
    path: "/mine",
    name: "mine",
    component: () => import("@/views/mine/mine"),
    meta: { isShowBottomTabbar: true }
  },
  {
    path: "/mutualaid",
    name: "mutualaid",
    component: () => import("@/views/mutualaid/mutualaid"),
    meta: { isShowBottomTabbar: true }
  },
  {
    path: "/transaction",
    name: "transaction",
    component: () => import("@/views/transaction/transaction"),
    meta: { isShowBottomTabbar: true }
  },
  {
    path: "/capital",
    name: "capital",
    component: () => import("@/views/capital/capital"),
    meta: { isShowBottomTabbar: true }
  },
  {
    path: "/me",
    name: "me",
    component: () => import("@/views/me/me"),
    meta: { isShowBottomTabbar: true }
  },
]

export default tabbar;
