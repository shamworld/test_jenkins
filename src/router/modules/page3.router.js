/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2020-07-17 23:18:40
 * @LastEditors: Roy
 * @LastEditTime: 2020-07-17 23:18:41
 * @Deprecated: 否
 * @FilePath: /vue-app-framework/src/router/page3.js
 */ 
const routers = [
  {
    path: "/transaction/purchase",
    name: "purchase",
    component: () => import("@/views/transaction/purchase"),
  },
  {
    path: "/sellout",
    name: "sellout",
    component: () => import("@/views/transaction/sellout")
  },
  {
    path: "/transaction/recordDetails",
    name: "recordDetails",
    component: () => import("@/views/transaction/recordDetails")
  },
]

export default routers;