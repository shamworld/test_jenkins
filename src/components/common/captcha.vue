<template>
    <div id="captcha"></div>
</template>

<script>
import { Toast } from 'vant';
    export default {
        name: 'captcha',
        methods: {
            init() {
                let _self = this
                this.$emit('captchaFun', false)
                initNECaptcha({
                    // captchaId: '7d06d8a7bc9740ff80edd82b0127b787',
                    captchaId: '704b40a57afc43628a7373841d56ed21',
                    element: '#captcha',
                    mode: 'float',
                    protocol: 'https',
                    lang: 'zh-CN',
                    onReady: function (instance) {// 验证码一切准备就绪，此时可正常使用验证码的相关功能
                        _self.$store.commit('setValidate', '')
                    },
                    onVerify: function (err, data) {//data.validate
                        if (err) {
                             Toast({
                                message: '验证失败',
                                position:'bottom',
                                duration:2000
                            });
                        }else {
                            //update 提交放置在事件触发前面 liuwei 2019-01-16
                            _self.$store.commit('setValidate', document.getElementsByName('NECaptchaValidate')[0].value)
                            _self.$emit('captchaFun', true)

                        }
                    }
                })
            }
        },
        created() {
            this.init()
        },
        watch: {
            '$i18n.locale': 'init',
            '$store.state.captchaRefresh': 'init'
        }
    }
</script>
<style lang="scss" scoped>
    #captcha {
        margin-bottom: 0px;
    }
</style>
