(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-56c5e73a"],{6664:function(t,e,n){},"7f09":function(t,e,n){"use strict";var i=n("6664"),a=n.n(i);a.a},c252:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"containers"},[n("navBar",{attrs:{title:"收益明细列表"}}),n("div",{staticClass:"contents"},[n("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[n("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多","loading-text":"Loading..."},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[n("ul",[n("li",{staticClass:"fs-min t-grey lh-6 bg-view m-t-15"},[n("div",{staticClass:"d-flex ai-center list-box m-b-7"},[n("span",[t._v("时间")]),n("span",[t._v("币种")]),n("span",[t._v("数量")]),n("span",[t._v("类型")])]),t._l(t.list,(function(e,i){return n("div",{key:i,staticClass:"d-flex ai-center t-white list-box m-t-4"},[n("span",[t._v(t._s(e.createTime))]),n("span",[t._v(t._s(e.coinName))]),n("span",[t._v(t._s(e.changeBalance))]),n("span",[t._v(t._s(e.operationType))])])}))],2)])])],1)],1)],1)},a=[];function s(t){return c(t)||l(t)||r(t)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function r(t,e){if(t){if("string"===typeof t)return u(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(t,e):void 0}}function l(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function c(t){if(Array.isArray(t))return u(t)}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}var f={data:function(){return{isLoading:!1,finished:!1,loading:!1,totalPage:1,pageNumber:1,list:[]}},mounted:function(){this.init()},methods:{init:function(){this.totalPage=1,this.pageNumber=1,this.requestList()},onRefresh:function(){var t=this;setTimeout((function(){t.totalPage=1,t.pageNumber=1,t.requestList()}),1e3)},requestList:function(){var t=this;this.$axios.post("/walletbalancedetail/list?page=".concat(this.pageNumber,"&limit=",10),{page:this.pageNumber,type:1}).then((function(e){t.loading=!1,t.isLoading=!1,t.finished=!1;var n,i=e.page.data;(console.log(i),1==t.pageNumber)?(t.list=[],t.list=i,t.totalPage=e.page.totalPage):(n=t.list).push.apply(n,s(i))})).catch((function(e){t.isLoading=!1}))},onLoad:function(){var t=this;setTimeout((function(){t.pageNumber>=t.totalPage?(t.finished=!0,t.loading=!1):(t.pageNumber++,t.requestList())}),500)}}},d=f,p=(n("7f09"),n("2877")),g=Object(p["a"])(d,i,a,!1,null,"6e77e5d6",null);e["default"]=g.exports}}]);
//# sourceMappingURL=chunk-56c5e73a.3f370e3d.js.map