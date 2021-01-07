/*
 * @message: Api
 * @Author: Jack
 * @Email: Jack@163.com
 * @Github: Jack@163.com
 * @Date: 2020-07-20 11:53:15
 * @LastEditors: Jack
 * @LastEditTime: 2020-08-07 16:29:09
 * @Deprecated: 否
 * @FilePath: /vue-app-framework/src/api/index.js
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const api = {};
function importAll(r) {
  r.keys().forEach((key) => {
    if (!!r(key).default) {
      for (const attr in r(key).default) {
        api[attr] = r(key).default[attr];
      }
    }
  });
}
importAll(require.context("./common", true, /\.api\.js/));

export default api;
