(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0224254f"],{b72d:function(e,s,t){},e02b:function(e,s,t){"use strict";var o=t("b72d"),r=t.n(o);r.a},fd9a:function(e,s,t){"use strict";t.r(s);var o=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"containers bg-black1"},[t("navBar",{attrs:{title:"充币",rightText:"充币记录"},on:{rightClick:e.toRechargeRecord}}),t("div",{staticClass:"contents t-white m-t-10"},[t("div",{staticClass:"d-flex jc-between ai-center fs-md bg-view py-15 px-5",staticStyle:{"border-radius":"4px"},on:{click:e.chose}},[t("p",[e._v("选择币种")]),t("p",{staticClass:"d-flex ai-center"},[e._v(e._s(e.currency)),t("van-icon",{attrs:{name:"arrow"}})],1)]),t("div",{staticClass:"code-box m-t-15 bg-view radius"},[t("div",{staticClass:"code bg-white"},[t("VueQr",{attrs:{margin:10,colorDark:"#000",size:250,text:this.address}})],1),t("p",{staticClass:"address mx-5 lh-5 fs-min t-blue t-center"},[e._v(e._s(e.address))])]),t("van-button",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.address,expression:"address",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:e.onError,expression:"onError",arg:"error"}],staticClass:"m-t-30 fs-lg w-100",attrs:{color:"#27A495"}},[e._v("复制地址")])],1),t("van-popup",{staticClass:"picker",attrs:{round:"",position:"bottom"},model:{value:e.choseIsShow,callback:function(s){e.choseIsShow=s},expression:"choseIsShow"}},[t("ChosePopup",{attrs:{choseIsShow:e.choseIsShow},on:{choseIsShow:e.getIsShow,choseItem:e.getItem}})],1)],1)},r=[],a=t("847d");function c(e,s,t){return s in e?Object.defineProperty(e,s,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[s]=t,e}var n={data:function(){var e;return e={address:"",choseIsShow:!1,currency:"USDT"},c(e,"address",""),c(e,"i",0),e},components:{ChosePopup:a["default"]},mounted:function(){var e=this;this.$axios.post("/wallet/list",{}).then((function(s){s.data.walletList.forEach((function(s,t){e.i==t&&(e.address=s.address)}))}))},methods:{toRechargeRecord:function(){this.$router.push("/rechargeCurrency/rechargeRecord")},getIsShow:function(e){this.choseIsShow=e},getItem:function(e){this.currency=e.value,this.i=e.index,this.choseCurrency()},chose:function(){this.choseIsShow=!0,this.choseCurrency()},onCopy:function(){this.$toast("复制成功")},onError:function(){this.$toast("复制失败")},choseCurrency:function(){var e=this;this.$axios.post("/wallet/list",{}).then((function(s){s.data.walletList.forEach((function(s,t){e.i==t&&(e.address=s.address)}))}))}}},i=n,d=(t("e02b"),t("2877")),h=Object(d["a"])(i,o,r,!1,null,"560bf0e5",null);s["default"]=h.exports}}]);
//# sourceMappingURL=chunk-0224254f.97239497.js.map