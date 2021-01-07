<template>
  <div class="t-white bg-view py-15 px-20">
    <!-- 验证码 -->
    <p class="fs-lg t-center">验证码</p>
    <!-- <van-field
      v-model="phone"
      placeholder="输入手机号"
      :border="false"
      class="input m-t-10"
      center
      input-align="right"
    >
      <template #label>
        <span class="t-white">手机号</span>
      </template>
    </van-field> -->
    <div class="d-flex ai-center jc-between phone fs-sm">
      <span>手机号</span>
      <span class="t-blue">{{ userInfo.phoneNumber }}</span>
    </div>
    <van-field
      v-model="verificationCode"
      placeholder="请输入验证码"
      :border="false"
      class="input m-t-10"
      center
      input-align="right"
    >
      <template #label>
        <span class="t-white">验证码</span>
      </template>
      <template #button>
        <van-button
          size="small"
          color="#27A395"
          @click="getCode()"
          :disabled="obtainState"
          >{{ obtainTimer ? obtainTime : "获取验证码" }}</van-button
        >
      </template>
    </van-field>
    <div class="d-flex jc-between ai-center fs-lg my-20">
      <van-button class="btn bg-green t-white" @click="onCancel"
        >取消</van-button
      >
      <van-button class="btn bg-green t-white" @click="onConfirm"
        >确定</van-button
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      // phone: "",
      verificationCode: "",
      rep: /^1[3456789]\d{9}$/,
    };
  },
  props: ["verificationIsShow"],
  computed: {
    ...mapState({
      obtainTime: (state) => state.user.obtainTime,
      obtainTimer: (state) => state.user.obtainTimer,
      obtainState: (state) => state.user.obtainState,
    }),
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    this.$store.commit("getUserInfo");
  },
  methods: {
    onCancel() {
      this.$emit("hidden", false);
    },
    onConfirm() {
      if (!this.verificationCode) {
        this.$toast("请输入验证码");
      }else {
        // this.$emit("phone", this.phone);
        this.$emit("getVerificationCode", this.verificationCode);
        this.$emit("onConfirm", false);
      }
    },
    getCode() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: "spinner",
        message: "loading...",
      });
      console.log(this.userInfo.phoneNumber);
      this.$store.dispatch("sms_codeFun", {
        params: {
          phoneNumber: this.userInfo.phoneNumber,
          verificationCode: this.verificationCode,
        },
      });
    },
  },
  destroyed() {
    this.$store.commit("obtainClear");
  },
};
</script>

<style lang="scss" scoped>
.btn {
  width: 48%;
  height: 88px;
  &:nth-child(1) {
    opacity: 0.5;
  }
}
.input,
.phone {
  height: 91px;
  background-color: transparent;
}
</style>