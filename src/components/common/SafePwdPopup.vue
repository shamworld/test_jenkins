<template>
  <div class="t-white bg-view py-15 px-20">
    <!-- 安全密码 -->
    <p class="fs-lg t-center">支付密码</p>
    <van-field
      placeholder="请输入支付密码"
      type="password"
      :border="false"
      v-model="pwdValue"
      class="inputpwd bg-black1 m-t-30"
    ></van-field>
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
export default {
  data() {
    return {
      pwdValue: null,
    };
  },
  methods: {
    onCancel() {
      this.pwdValue = "";
      this.$emit("hidden", false);
    },
    onConfirm() {
      if (!this.pwdValue) {
        this.$toast("请输入支付密码");
        return;
      }
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: "spinner",
        message: "loading...",
      });
      this.$axios
        .post("/user/check/payPassword", {
          payPassword: this.pwdValue,
        })
        .then((res) => {
          // console.log(res);
          this.$emit("pwdValue", this.pwdValue);
          this.$emit("onConfirm", false);
        });
      this.pwdValue = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.inputpwd {
  height: 88px;
}
.btn {
  width: 48%;
  height: 88px;
  &:nth-child(1) {
    opacity: 0.5;
  }
}
</style>