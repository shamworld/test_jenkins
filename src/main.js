import Vue from "vue";
import App from "./App";
import routes from "./router";
import VueRouter from "vue-router";
import api from "./api";
import "./config/util";
import "./style/index.scss";
import "./common/fastclick";
import moment from "moment";
import storage from "storejs";
import store from "./store";
import "vant/lib/index.css";
import 'element-ui/lib/theme-chalk/index.css';
import i18n from "./lang/index";
import VueQr from "vue-qr";
import "./components/common/global";
import "amfe-flexible";
import navBar from './components/header/navBar';
import ChosePopup from './components/common/ChosePopup'
import SafePwdPopup from './components/common/SafePwdPopup'
import CodePopup from './components/common/CodePopup'
import VerificationCode from './components/common/VerificationCode'

// import './vconsole'
//粘贴板
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

import * as filters from "./filters";
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

import {
  PullRefresh,
  List,
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  Popup,
  Dialog,
  ActionSheet,
  Field,
  Tag,
  Notify,
  Cell,
  CellGroup,
  Button,
  Form,
  Toast,
  Grid, GridItem,
  Icon,
  Picker,
  PasswordInput, NumberKeyboard, Uploader,
  Loading,
} from "vant";
import { navBar as VanNavBar } from "vant";
import { Image as VanImage } from "vant";
Vue.use(VanNavBar);
Vue.use(Uploader);
Vue.use(PullRefresh).use(List);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Tag);
Vue.use(Tab).use(Tabs);
Vue.use(Popup);
Vue.use(Dialog);
Vue.use(Field);
Vue.use(ActionSheet);
Vue.use(VueRouter);
Vue.use(VanImage);
Vue.use(Notify);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Button);
Vue.use(Form);
Vue.use(Toast);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Icon);
Vue.use(Picker);
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.use(Loading);
Vue.component("VueQr", VueQr);
Vue.component("navBar", navBar);
Vue.component("ChosePopup", ChosePopup);
Vue.component("SafePwdPopup", SafePwdPopup);
Vue.component("CodePopup", CodePopup);
Vue.component("VerificationCode", VerificationCode);

import { Popover } from 'element-ui';
Vue.use(Popover);


const router = new VueRouter({
  routes,
  // mode: routerMode,
  // hashbang: false,
  // history: true,
  strict: process.env.NODE_ENV !== "production",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const role = localStorage.getItem("tokens");
  store.commit("setIsLogin");
  if (
    !role &&
    to.path !== "/" &&
    to.path !== "/login" &&
    to.path !== "/forget" &&
    to.path !== "/register"
  ) {
    next({ path: "/login" });
  } else {
    next();
  }
});

// 解决IOS上输入和滑动冲突
window.document.ontouchmove = (e) => {
  document.querySelectorAll("input").forEach((e) => {
    e.blur();
  });
  document.querySelectorAll("textarea").forEach((e) => {
    e.blur();
  });
};
// 解决ios，input关闭键盘后导致页面底部空缺问题
document.body.addEventListener(
  "blur",
  function () {
    window.scrollTo(0, 0);
  },
  true
);

Vue.filter("dateformat", function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
});

Vue.config.productionTip = false;
import http from "./api/request";
Vue.prototype.$axios = http;
Vue.prototype.$api = api;
Vue.prototype.$storage = storage;
Vue.prototype.$moment = moment; 

/* eslint-disable no-new */
window.vm = new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render: (h) => h(App),
});
