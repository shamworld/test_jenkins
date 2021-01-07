/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2020-06-22 17:42:55
 * @LastEditors: Roy
 * @LastEditTime: 2020-06-28 17:40:56
 * @Deprecated: 否
 * @FilePath: /vue-app-framework/babel.config.js
 */
module.exports = {
  presets: [
    // '@vue/cli-plugin-babel/preset',
    ["@babel/preset-env", { "modules": false }]
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant'],
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
  ]
}
