/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2020-07-17 23:18:24
 * @LastEditors: Roy
 * @LastEditTime: 2020-07-18 00:02:28
 * @Deprecated: 否
 * @FilePath: /vue-app-framework/src/router/page2.router.js
 */
const routers = [
  {
    path: "/mutualaid",
    name: "mutualaid",
    component: () => import("@/views/mutualaid/mutualaid"),
    meta: { isShowBottomTabbar: true }
  },
  {
    path: "/mutualaid/providehelp",
    name: "providehelp",
    component: () => import("@/views/mutualaid/providehelp")
  },
  {
    path: "/mutualaid/gethelp",
    name: "gethelp",
    component: () => import("@/views/mutualaid/gethelp")
  },
  {
    path: "/mutualaid/complaint",
    name: "complaint",
    component: () => import("@/views/mutualaid/complaint")
  },
  {
    path: "/complaint/complaintRecord",
    name: "complaintRecord",
    component: () => import("@/views/mutualaid/complaintRecord")
  },
]

export default routers;