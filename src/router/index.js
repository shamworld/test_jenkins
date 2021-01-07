/*
 * @message: 描述
 * @Author: 徐聪
 * @Email: 15072443716@163.com
 * @Github: 15072443716@163.com
 * @Date: 2020-04-14 20:02:23
 * @LastEditors: Roy
 * @LastEditTime: 2020-07-18 11:24:52
 * @Deprecated: 否
 * @FilePath: /vue-app-framework/src/router/index.js
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routerList = [];

function importAll(r){
  r.keys().forEach(
    (key) => {
      if(!!r(key).default){
        routerList.push(...r(key).default)
      }
      
    }
  )
}


importAll(require.context('./modules',true,/\.router\.js$/));

const routers = [
  ...routerList
]



export default routers
