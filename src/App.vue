<!--
 * @message: 描述
 * @Author: 徐聪
 * @Email: 15072443716@163.com
 * @Github: 15072443716@163.com
 * @Date: 2020-01-01 11:44:21
 * @LastEditors: Roy
 * @LastEditTime: 2020-11-11 14:33:12
 * @Deprecated: 否
 * @FilePath: /hp_h5/src/App.vue
 -->
<template>
  <div id="app">
    <!-- 需要缓存的视图组件 -->
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>-->

    <!-- 不需要缓存的视图组件 -->
    <!-- <router-view v-if="!$route.meta.keepAlive" /> -->

    <router-view></router-view>
    <tabbar v-show="$route.meta.isShowBottomTabbar" />
    <!-- <van-popup v-model="drawlShow">
      <div
        class="border-r boxxx d-flex ai-center flex-cloumn px-2 m-b-5"
        style="box-sizing: border-box"
      >
        <h4 class="fs-xxxl m-t-3" style="color: #f8f8fa">全新升级</h4>
        <van-button
          size="large"
          @click="scannClick()"
          class="m-t-2"
          style="height: 0.38rem; border-radius: 0.19rem; line-height: 0.38rem"
          >立即升级</van-button
        >

        <i class="cha" @click="Close"></i>
      </div>
    </van-popup> -->
  </div>
</template>

<script>
import tabbar from "./components/common/tabbar";
import { mapState, mapGetters } from "vuex";
import { Dialog } from "vant";
export default {
  name: "App",
  components: {
    tabbar,
  },
  created() {
    this.isLogin && this.$store.commit("getUserInfo");
    // !this.$storage("locale") && this.$storage("locale", "cn");
    // this.$store.commit("setLang", this.$storage("locale"));
  },
  data() {
    return {
      show: true,
      drawlShow: true,
      version_code: 110,
      link: "",
      make: "",
    };
  },
  mounted() {
    window.readDeviceId = this.readDeviceId;
    window.getClientId = this.getClientId;
    this.fullscreenJs();
    this.getCode();
  },
  methods: {
    onClose() {
      this.show = false;
    },
    Close() {
      this.drawlShow = false;
    },
    readDeviceId(params) {
      console.log(params);
      localStorage.setItem("readDeviceId", params);
      return;
    },
    getCode() {
      let that = this;
      const u = navigator.userAgent;
      const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      let client_type = "";
      if (isAndroid) {
        client_type = "android";
      } else if (isIOS) {
        client_type = "ios";
      }
      this.$axios
        .post("/user/checkVersion", {
          client_type: client_type,
        })
        .then((res) => {
          this.link = "https://app.hpl.plus/";
          //   this.make = res.data.mark;
          console.log(res.data);
          // console.log(this.version_code);
          if (this.version_code < res.data) {
            // this.drawlShow = true;
            console.log("请下载更新");
            // console.log(that.version_code);
            Dialog.confirm({
              title: "请下载更新",
              showCancelButton: false,
            }).then((e) => {
              that.scannClick();
              window.location.href = that.link;
              that.version_code = res.data;
            });
          }
        });
    },
    getClientId(params) {
      localStorage.setItem("getClientId", params);
      return params;
    },
    //方法暴露给原生
    fullscreenJs() {
      (function () {
        var sdk = window.SDK || {};
        sdk.openUrl = function (str) {
          window.top.postMessage({ action: "openUrl" }, "*");
        };
        window.SDK = sdk;
      })();
    },
    scannClick() {
      var that = this;
      try {
        android.linkUrl(that.link); //安卓调用 camera安卓提供对象调用openUrl
      } catch (e) {
        try {
          window.webkit.messageHandlers.openUrl.postMessage(that.link);
        } catch (e) {
          window.SDK.openUrl(that.link); //iOS调用
        }
      }
    },
  },
  computed: {
    ...mapGetters(["isLogin"]),
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;
  background: #1b2c42;
  width: 100%;
}
</style>
