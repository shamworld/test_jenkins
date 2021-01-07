/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2020-06-22 17:42:55
 * @LastEditors: Roy
 * @LastEditTime: 2020-07-18 11:25:15
 * @Deprecated: 否
 * @FilePath: /vue-app-framework/src/store/index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modules = {}
function importAll(r) {
  r.keys().forEach(key => {
    if (r(key).default && r(key).default.state && r(key).default.state.keys) {
      modules[r(key).default.state.keys] = r(key).default;
    }
  })
}

importAll(require.context('./modules', true, /\.store\.js/));


export default new Vuex.Store({
  modules: {
    ...modules
  },
  getters: {
    captchaRefresh: state => state.captcha.captchaRefresh, //极验刷新
    validate: state => state.captcha.validate, //极验二次验证
    isLogin: state => state.user.isLogin,
    obtainState: state => state.user.obtainState,
    obtainTime: state => state.user.obtainTime,
    obtainTimer: state => state.user.obtainTimer,
    obtainState2: state => state.user.obtainState2,
    obtainTime2: state => state.user.obtainTime2,
    obtainTimer2: state => state.user.obtainTimer2,
    userInfo: state => state.user.userInfo
  }
})
