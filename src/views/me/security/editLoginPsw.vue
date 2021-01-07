<template>
  <div class="containers">
    <nav-bar title="修改登录密码" />
    <div class="contents">
      <section class="bg-view p-10 m-10 radius9">
        <!-- <van-field
          center
          class="input"
          v-model="psw"
          input-align="right border-bottom"
          :border="false"
          placeholder="请输入原密码"
          label="原密码"
        /> -->
        <van-field
          center
          class="input"
          v-model="psw1"
          type="password"
          input-align="right"
          :border="false"
          placeholder="请输入新登录密码"
          label="新登录密码"
        />
        <van-field
          center
          class="input"
          v-model="psw2"
          type="password"
          input-align="right"
          :border="false"
          placeholder="请再次输入登录密码"
          label="确定登录密码"
        />
      </section>
    </div>
    <van-button color="#27A495" class="fs-lg m-b-30 mx-10" @click="buttonClick"
      >确定</van-button
    >
    <!-- 验证码弹窗 -->
    <van-popup v-model="verificationIsShow" round position="bottom">
      <VerificationCode
        @onConfirm="onConfirm"
        @hidden="onCancel"
        @getVerificationCode="getVerificationCode"
      ></VerificationCode>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  name: "EditLoginPsw",
  data() {
    return {
      // psw: null,
      psw1: null,
      psw2: null,
      verificationIsShow: false,
      // phone: null, //手机号
      verification: null, //验证码
      repPwd: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/,
    };
  },
  methods: {
    // 验证码取消
    onCancel(value) {
      this.verificationIsShow = value;
    },
    // 验证码的值
    getVerificationCode(value) {
      this.verification = value;
    },
    // 验证码确定
    onConfirm(value) {
      this.verificationIsShow = value;
      this.onRecord();
      (this.verification = "");
    },
    // 确定
    buttonClick() {
      if (!this.psw1) {
        this.$toast("请输入新密码");
      } else if (!this.repPwd.test(this.psw1)) {
        this.$toast("密码至少8位，要求必须字母、数字");
      } else if (!this.psw2) {
        this.$toast("请再次输入新密码");
      } else if (this.psw1 != this.psw2) {
        this.$toast("两次密码输入不一致");
      } else {
        this.verificationIsShow = true;
      }
    },
    onRecord() {
      Toast({
        type: "loading",
        message: "loading...",
        duration: 0, // 持续展示 toast
      });
      this.$axios
        .post("/user/update", {
          // password: this.psw,
          password: this.psw1,
          verificationCode: this.verification
        })
        .then((res) => {
          // console.log(res);
          if (res.msg != "success") {
            this.$toast(res.msg);
          } else {
            Toast({
              type: "success",
              message: "密码修改成功,请重新登录",
            });
            this.psw1 = "";
            this.psw2 = "";
            this.$router.push("/login");
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  height: 91px;
  background-color: transparent;
  color: white;
}
</style>
