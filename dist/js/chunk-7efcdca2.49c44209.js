(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7efcdca2"],{"2b66":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"containers bg-black1"},[s("navBar",{attrs:{title:"提现记录"}}),s("div",{staticClass:"contents"},[s("van-pull-refresh",{attrs:{"success-text":"刷新成功"},on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[s("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多","loading-text":"Loading...","error.sync":"","error-text":"加载失败，请重新加载"},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[s("ul",t._l(t.list,(function(e){return s("li",{key:e.id,staticClass:"fs-min t-grey lh-6 bg-view m-t-15"},[s("p",{staticClass:"d-flex jc-between"},[s("span",[t._v(t._s(e.createTime))]),(e.status="create")?s("span",[t._v("处理中")]):(e.status="yes")?s("span",{staticClass:"t-green"},[t._v("已完成")]):s("span",{staticClass:"t-red"},[t._v("失败")])]),s("p",{staticClass:"d-flex jc-between t-black2 m-t-7"},[t._v(" 提币币种"),s("span",{staticClass:"fs-sm t-white"},[t._v(t._s(e.coinName))])]),s("p",{staticClass:"d-flex jc-between t-black2 m-t-7"},[t._v(" 提币数量"),s("span",{staticClass:"fs-sm t-white"},[t._v(t._s(e.number))])]),s("p",{staticClass:"d-flex jc-between t-black2"},[t._v(" 矿工费"),s("span",{staticClass:"fs-sm t-white"},[t._v(t._s(e.fee))])]),s("p",{staticClass:"address d-flex jc-between t-black2"},[t._v(" 对方账户"),s("span",{staticClass:"fs-min t-white opacity t-right"},[t._v(t._s(e.address))])])])})),0)])],1)],1)],1)},n=[];function i(t){return l(t)||c(t)||o(t)||r()}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(t,e){if(t){if("string"===typeof t)return u(t,e);var s=Object.prototype.toString.call(t).slice(8,-1);return"Object"===s&&t.constructor&&(s=t.constructor.name),"Map"===s||"Set"===s?Array.from(t):"Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s)?u(t,e):void 0}}function c(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function l(t){if(Array.isArray(t))return u(t)}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var s=0,a=new Array(e);s<e;s++)a[s]=t[s];return a}var f={data:function(){return{isLoading:!1,finished:!1,loading:!1,totalPage:1,pageNumber:1,list:[]}},mounted:function(){this.init()},methods:{init:function(){this.totalPage=1,this.pageNumber=1,this.requestList()},onRefresh:function(){var t=this;setTimeout((function(){t.totalPage=1,t.pageNumber=1,t.requestList()}),1e3)},requestList:function(){var t=this;this.$axios.post("/walletmention/list",{page:this.pageNumber}).then((function(e){t.loading=!1,t.isLoading=!1,t.finished=!1;var s,a=e.page.data;1==t.pageNumber?(t.list=[],t.list=a,t.totalPage=e.page.totalPage):(s=t.list).push.apply(s,i(a))})).catch((function(e){t.isLoading=!1}))},onLoad:function(){var t=this;setTimeout((function(){t.pageNumber>=t.totalPage?(t.finished=!0,t.loading=!1):(t.pageNumber++,t.requestList())}),500)}}},d=f,p=(s("99e7"),s("2877")),b=Object(p["a"])(d,a,n,!1,null,"21396c55",null);e["default"]=b.exports},"99e7":function(t,e,s){"use strict";var a=s("bb72"),n=s.n(a);n.a},bb72:function(t,e,s){}}]);
//# sourceMappingURL=chunk-7efcdca2.49c44209.js.map