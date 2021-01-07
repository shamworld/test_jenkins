/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2020-06-28 16:40:41
 * @LastEditors: Roy
 * @LastEditTime: 2020-06-28 16:40:41
 * @Deprecated: 否
 * @FilePath: /vue-app-framework/src/common/fastclick.js
 */ 
// 添加Fastclick移除移动端点击延迟
import FastClick from 'fastclick'
//FastClick的ios点击穿透解决方案
FastClick.prototype.focus = function (targetElement) {
    let length;
    if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
        length = targetElement.value.length;
        targetElement.focus();
        targetElement.setSelectionRange(length, length);
    } else {
        targetElement.focus();
    }
};