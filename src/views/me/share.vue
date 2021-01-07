<!--
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2020-10-20 19:02:09
 * @LastEditors: Roy
 * @LastEditTime: 2020-10-21 10:20:22
 * @Deprecated: 否
 * @FilePath: /hp_h5/src/views/me/share.vue
-->
<template>
  <div class="containers">
    <nav-bar title="邀请好友" />
    <div class="contents">
      <div class="d-flex ai-center jc-center flex-column">
        <van-image
          :src="require('@/assets/me/yaoqing.png')"
          class="app-invitate"
        />
        <span class="fs-lg t-white app-title">邀请码</span>
        <span class="fs-max t-white m-t-20" style="font-weight: bold">{{
          userInfo.invitationCode
        }}</span>
        <div class="m-t-20 card">
          <VueQr
            :margin="10"
            colorDark="#000"
            :size="130"
            :text="userInfo.invitationLink"
          ></VueQr>
        </div>
        <div>
          <van-button
            block
            class="copy-btn fs-lg"
            color="linear-gradient(0deg, #1E4351 0%, #269887 100%)"
            round
            native-type="submit"
            v-clipboard:copy="userInfo.invitationCode"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            >复制邀请码</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Share",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    this.$store.commit("getUserInfo");
  },
  methods: {
    //复制成功
    onCopy() {
      this.$toast("复制成功");
    },
    //复制失败
    onError() {
      this.$toast("复制失败");
    },
  },
};
</script>

<style lang="scss" scoped>
.containers {
  background: url("../../assets/mine/bg0001.png");
  background-size: 100% 100%;

  .app-invitate {
    width: 500px;
    height: 140px;
    margin-top: 100px;
  }

  .app-title {
    margin-top: 240px;
  }

  .copy-btn {
    width: 340px;
    height: 80px;
    border-radius: 40px;
    margin-top: 50px;
    background: linear-gradient(0deg, #1e4452 0%, #269888 100%);
  }
}

/deep/ .van-nav-bar {
  background: transparent;
}
</style>
