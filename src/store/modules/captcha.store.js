/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2020-07-18 10:20:20
 * @LastEditors: Roy
 * @LastEditTime: 2020-07-18 10:54:43
 * @Deprecated: 否
 * @FilePath: /vue-app-framework/src/store/captcha.store.js
 */

const captcha = {
    state: {
        keys: 'captcha',
        captchaRefresh: 1, //极验刷新
        validate: "", //极验二次验证

        isWeb3: false, //默认没有web3环境
        isMm: true, //默认非metamask环境
        isNetworkId: null,//当前网络id
        isVersion: '', //当前web3版本号
        isAddress: '',//当前账户地址
        isBalance: '',//当前余额
        isTokens: [],//代币列表
        isToken: '',

        issol: '',//合约数据
        accounts: '', //用户账号
        toPath: '', //跳转地址
    },
    mutations: {
        accounts(state, e){
            state.accounts = e;
        },
        // 跳转地址
        getPath(state, e){
            state.toPath = e;
        },
        //设置token
        setToken(state, e) {
            state.isToken = e;
        },
        //查询合约数据
        getIssol(state, e) {
            state.issol = e;
        },
        //代币列表
        setIsTokens(state, e) {
            state.isTokens = e;
        },
        //当前账户余额
        setIsBalance(state, e) {
            state.isBalance = e;
        },
        //当前账户地址
        setIsAddress(state, e) {
            state.isAddress = e;
        },
        //监听网络id
        setIsNetworkId(state, e) {
            state.isNetworkId = e;
            state.isAddress = '';
        },
        //监听web3环境
        setIsWeb3(state, e) {
            state.isWeb3 = e;
        },
        //监听metamsk环境
        setIsMm(state, e) {
            state.isMm = e;
        },
        //监听web3版本
        setIsVersion(state, e) {
            state.isVersion = e;
        },
        setValidate(state, params) {
            state.validate = params;
        },
        captchaRefreshFun(state) {
            //极验刷新
            state.captchaRefresh++;
        },
    },
    actions: {
    },
    modules: {
    }
}
export default captcha;