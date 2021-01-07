/*
 * @message: 描述
 * @Author: 徐聪
 * @Email: 15072443716@163.com
 * @Github: 15072443716@163.com
 * @Date: 2020-04-11 15:44:14
 * @LastEditors: 徐聪
 * @LastEditTime: 2020-04-16 10:30:42
 * @Deprecated: 否
 * @FilePath: /app-vue-framework/src/lang/zh-cn.js
 */
import cnLocale from 'vant/lib/locale/lang/zh-CN'

const cn = {
    ...cnLocale,
    //語種+圖片
    lang:'简体中文',
    tabbar:{
        home:'首页',trade:'交易',news:'资讯',me:'我的',
    },
    drop_down :'下拉即可刷新...', release :'释放即可刷新...',
    loading:'Loading...',success:'成功',no_more:'没有更多',fail:'失败',billion:'亿',tips:'提示',cancel:'取消',determine:'确定',
    copy:'复制',replication_success:'复制成功',copy_failed:'复制失败', cancel_order :"是否撤单",
    

}
export default cn;