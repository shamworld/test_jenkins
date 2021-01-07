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
    path: "/capital/rechargeCurrency",
    name: "rechargeCurrency",
    component: () => import("@/views/capital/rechargeCurrency")
  },
  {
    path: "/rechargeCurrency/rechargeRecord",
    name: "rechargeRecord",
    component: () => import("@/views/capital/rechargeRecord")
  },
  {
    path: "/capital/withdrawMoney",
    name: "withdrawMoney",
    component: () => import("@/views/capital/withdrawMoney")
  },
  {
    path: "/withdrawMoney/withdrawRecord",
    name: "withdrawRecord",
    component: () => import("@/views/capital/withdrawRecord")
  },
  {
    path: "/capital/transfer",
    name: "transfer",
    component: () => import("@/views/capital/transfer")
  },
  {
    path: "/transfer/transferRecord",
    name: "transferRecord",
    component: () => import("@/views/capital/transferRecord")
  },
]

export default routers;