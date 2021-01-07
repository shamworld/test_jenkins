<template>
  <div class="containers t-white">
    <!-- 个人 -->

    <div class="contents m-b-50">
      <div class="d-flex px-10 py-20">
        <van-image
          :src="require('@/assets/me/avatar.png')"
          width="44"
          height="44"
        ></van-image>
        <div class="d-flex flex-column m-l-10 fs-lg jc-between flex-1">
          <span>{{ userInfo.userName }}</span>
          <span class="t-blue">ID：{{ userInfo.phoneNumber }}</span>
        </div>
        <div class="d-flex ai-center">
          <!-- <span class="bg-primary fs-min p-5 radius9">二星达人</span> -->
        </div>
      </div>
      <ul class="bg-view m-10 radius9">
        <li
          class="border-bottom px-10 py-15"
          v-for="item in list"
          :key="item.title"
        >
          <van-cell center is-link :to="item.to" @click="cellClick(item)">
            <template #icon>
              <van-image :src="item.icon" width="22" height="22"></van-image>
            </template>
            <template #title>
              <span class="m-l-10 t-white fs-md">{{ item.title }}</span>
            </template>

            <template #right-icon>
              <van-image
                :src="require('@/assets/me/icon_jinru03@2x.png')"
                width="12"
                height="12"
              ></van-image>
            </template>
          </van-cell>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      verify: "21427fad735545f4a2933f0630c3674b",
      list: [
        {
          icon: require("@/assets/me/wd_icon_symx@2x.png"),
          title: "收益明细",
          to: "/earnings",
        },
        {
          icon: require("@/assets/me/wd_icon_wdtd@2x.png"),
          title: "我的团队",
          to: "/team",
        },
        {
          icon: require("@/assets/me/wd_icon_yqhy@2x.png"),
          title: "邀请好友",
          to: "/share",
        },
        {
          icon: require("@/assets/me/wd_icon_smrz@2x.png"),
          title: "实名认证",
          to: "",
        },
        {
          icon: require("@/assets/me/wd_icon_rwsy@2x.png"),
          title: "任务收益",
          to: "",
          // /task
        },
        {
          icon: require("@/assets/me/wd_icon_bxsc@2x.png"),
          title: "保险商城",
          to: "",
          // /shop
        },
        {
          icon: require("@/assets/me/wd_icon_aqsz@2x.png"),
          title: "安全设置",
          to: "/security",
        },
        {
          icon: require("@/assets/me/wd_icon_ptgg@2x.png"),
          title: "平台公告",
          to: "/notice",
        },
        // {
        //   icon: require("@/assets/me/wd_icon_lxwm@2x.png"),
        //   title: "联系我们",
        //   // to: "/about",
        // },
        {
          icon: require("@/assets/me/wd_icon_tcdl@2x.png"),
          title: "退出登录",
          to: "/",
        },
      ],
    };
  },
  computed: {
    // ...mapState({
    //   tokens: (state) => state.user.tokens,
    // }),
    ...mapGetters(["userInfo"]),
  },
  methods: {
    cellClick(item) {
      if(item.title=="实名认证"){
        if(this.userInfo.level==0){
          this.getVerifyToken();
        }else{
          this.$toast("已实名");
        }
      }else if (!item.to) {
        this.$toast("暂未开放");
      }
    },
    getVerifyToken(){
      this.$toast.loading("loading...");
      this.$axios.post(this.$api.getToken).then((res) => {
        this.$toast.clear();
        this.verify = res.data;
        this.verifyClick();
      });
      
    },
    getVerifyStauts(params) {
      this.$axios
          .post(this.$api.verifySave,{})
          .then((res) => {
            this.$store.commit("getUserInfo");
          });
    },
    //方法暴露给原生
    fullscreenJs() {
      (function () {
        var sdk = window.SDK || {};
        sdk.verify = function (str) {
          window.top.postMessage({ action: "verify" }, "*");
        };
        window.SDK = sdk;
      })();
    },
    verifyClick() {
      var that = this;
      try {
        android.verify(that.verify); //安卓调用 camera安卓提供对象调用openUrl
      } catch (e) {
        try {
          window.webkit.messageHandlers.verify.postMessage(that.verify);
        } catch (e) {
          window.SDK.verify(that.verify); //iOS调用
        }
      }
    },
  },
  mounted() {

    this.$store.commit("getUserInfo");
    window.getVerifyStauts = this.getVerifyStauts;
    this.fullscreenJs();
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-cell {
  background: transparent;
}
</style>
