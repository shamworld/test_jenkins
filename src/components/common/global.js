/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2020-07-17 23:02:22
 * @LastEditors: Roy
 * @LastEditTime: 2020-07-17 23:55:51
 * @Deprecated: 否
 * @FilePath: /vue-app-framework/src/components/common/global.js
 */ 
import Vue from 'vue'

function changeStr(str){
    return str.charAt(0).toUpperCase()+str.slice(1);
}
//require.context
//第一个参数是指你读取文件的路径
//第二个参数是指是否遍历文件的子目录
//第三个参数是匹配对应文件的正则表达式(获取common文件夹下所有的.vue文件)
const requireComponent = require.context('.',false,/\.vue$/);

requireComponent.keys().forEach(fileName=>{
    //获取文件名
    const config = requireComponent(fileName);
    const compontentName = changeStr(
        fileName.replace(/^\.\//,'').replace(/\.\w+$/, '')
    );
    // 要在初始化根实例之前注册组件
    Vue.component(compontentName, config.default || config)
})





