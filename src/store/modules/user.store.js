/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2020-07-18 10:20:28
 * @LastEditors: Roy
 * @LastEditTime: 2020-10-21 10:09:22
 * @Deprecated: 否
 * @FilePath: /hp_h5/src/store/modules/user.store.js
 */
import storage from "storejs";
import axios from "./../../api/request";
import { Toast } from "vant";

const app = {
    state: {
        keys: 'user',
        isLogin: false,
        obtainState: false,
        obtainTime: "60s",
        obtainTimer: null,
        obtainState2: false,
        obtainTime2: "60s",
        obtainTimer2: null,
        userInfo: {},
        tokens: localStorage.getItem('tokens')
    },
    mutations: {
        setIsLogin(state) {
            state.isLogin = localStorage.getItem("isLogin");
        },
        setToken(state, token) {
            state.token = token
            localStorage.token = token //同步存储token至localStorage
        },
        obtainClear(state) {
            clearInterval(state.obtainTimer);
            state.obtainTimer = null;
            state.obtainState = false;
        },
        obtainClear2(state) {
            clearInterval(state.obtainTimer2);
            state.obtainTimer2 = null;
            state.obtainState2 = false;
        },
        setLang(state, params) {
            state.lang = params;
        },
        getUserInfo(state) {
            if (!storage("tokens")) return;
            // state.userInfo = {};
            axios.post("/user/info", {}, true).then(res => {
                state.userInfo = res.data;
            });
        },
    },
    actions: {
        sms_codeFun({ commit, state }, obj) {
            //获取手机短信验证码
            // if (!storage("tokens")) return;
            state.obtainState = true;
            axios
                .post("/user/sendMessage", obj.params)
                .then(res => {
                    console.log(res);
                    // Toast.clear();
                    if (res.code != 200) {
                        Toast({
                            message: res.msg,
                            duration: 2000
                        });
                    } else {
                        Toast({
                            type: 'success',
                            message: "验证码发送成功",
                            duration: 2000
                        });
                        state.obtainTime = "60s";
                        var count = state.obtainTime.split("s")[0];
                        state.obtainTimer = setInterval(() => {
                            count--;
                            state.obtainTime = count + "s";
                            if (count <= 0) commit("obtainClear");
                        }, 1000);
                    }
                })
                .catch(err => {
                    state.obtainState = false;
                    commit("captchaRefreshFun");
                });
        },
        sms_codeFun2({ commit, state }, obj) {
            //获取手机短信验证码
            // if (!storage("tokens")) return;
            state.obtainState2 = true;
            axios
                .post("/user/sendMessage", obj.params)
                .then(res => {
                    console.log(res);
                    // Toast.clear();
                    if (res.code != 200) {
                        Toast({
                            message: res.msg,
                            duration: 2000
                        });
                    } else {
                        Toast({
                            type: 'success',
                            message: "验证码发送成功",
                            duration: 2000
                        });
                        state.obtainTime2 = "60s";
                        var count = state.obtainTime2.split("s")[0];
                        state.obtainTimer2 = setInterval(() => {
                            count--;
                            state.obtainTime2 = count + "s";
                            if (count <= 0) commit("obtainClear2");
                        }, 1000);
                    }
                })
                .catch(err => {
                    state.obtainState2 = false;
                    commit("captchaRefreshFun");
                });
        },
        //获取token方法
        //判断是否有token,如果没有重新赋值，返回给state的token
        // getToken(state) {
        //     if (!state.tokens) {
        //         state.tokens = localStorage.getItem('tokens')
        //     }
        //     return state.tokens
        // }
    },
    getters: {

    },
    modules: {
    }
}

export default app;
