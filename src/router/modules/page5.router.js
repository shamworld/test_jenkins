/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2020-07-17 23:18:44
 * @LastEditors: Roy
 * @LastEditTime: 2020-07-17 23:18:45
 * @Deprecated: 否
 * @FilePath: /vue-app-framework/src/router/page4.js
 */
const routers = [
  {
    path: "/earnings",
    name: "Earnings",
    component: () => import("@/views/me/earnings")
  },
  {
    path: "/earningslist",
    name: "EarningsList",
    component: () => import("@/views/me/earningsList")
  },
  {
    path: "/team",
    name: "Team",
    component: () => import("@/views/me/team")
  },
  {
    path: "/share",
    name: "Share",
    component: () => import("@/views/me/share")
  },
  {
    path: "/vertify",
    name: "Vertify",
    component: () => import("@/views/me/vertify")
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import("@/views/me/shop")
  },
  {
    path: "/task",
    name: "Task",
    component: () => import("@/views/me/task")
  },
  {
    path: "/security",
    name: "Security",
    component: () => import("@/views/me/security"),
  },
  {
    path: "/security/editLoginPsw",
    name: "Security",
    component: () => import("@/views/me/security/editLoginPsw"),
  },
  {
    path: "/security/editName",
    name: "Security",
    component: () => import("@/views/me/security/editName"),
  },
  {
    path: "/security/editMobile",
    name: "Security",
    component: () => import("@/views/me/security/editMobile"),
  },
  {
    path: "/security/editPayPsw",
    name: "Security",
    component: () => import("@/views/me/security/editPayPsw"),
  },
  {
    path: "/notice",
    name: "Notice",
    component: () => import("@/views/me/notice")
  },
  {
    path: "/notice/detail",
    name: "NoticeDetail",
    component: () => import("@/views/me/noticeDetail")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/me/about")
  },
  {
    path: "/authentication/authenticationFail",
    name: "authenticationFail",
    component: () => import("@/views/me/authentication/authenticationFail"),
  },
  {
    path: "/authentication/authenticationSuccess",
    name: "authenticationSuccess",
    component: () => import("@/views/me/authentication/authenticationSuccess"),
  },
  {
    path: "/authentication/underReview",
    name: "underReview",
    component: () => import("@/views/me/authentication/underReview"),
  },
]

export default routers;
