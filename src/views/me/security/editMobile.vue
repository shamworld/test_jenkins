<template>
  <div class="containers">
    <nav-bar title="修改手机号" />
    <div class="contents">
      <section class="bg-view px-10 mx-10 m-t-20 radius9">
        <van-field
          center
          class="input"
          v-model="number1"
          input-align="right"
          :border="false"
          placeholder="请输入手机号"
          label="原手机号"
        />
        <van-field
          v-model="code1"
          placeholder="请输入验证码"
          :border="false"
          class="input"
          center
        >
          <template #label>
            <span class="t-white">验证码</span>
          </template>
          <template #button>
            <van-button
              size="small"
              color="#27A395"
              @click="getCode1()"
              :disabled="obtainState"
              >{{ obtainTimer ? obtainTime : "获取验证码" }}</van-button
            >
          </template>
        </van-field>
      </section>

      <section class="bg-view px-10 mx-10 m-t-20 radius9">
        <van-field
          center
          class="input"
          v-model="number2"
          input-align="right"
          :border="false"
          placeholder="请输入手机号"
          label="新手机号"
        />
        <van-field
          v-model="code2"
          placeholder="请输入验证码"
          :border="false"
          class="input"
          center
        >
          <template #label>
            <span class="t-white">验证码</span>
          </template>
          <template #button>
            <van-button
              size="small"
              color="#27A395"
              @click="getCode2()"
              :disabled="obtainState2"
              >{{ obtainTimer2 ? obtainTime2 : "获取验证码" }}</van-button
            >
          </template>
        </van-field>
      </section>
    </div>
    <van-button color="#27A495" class="fs-lg m-b-30 mx-10" @click="buttonClick"
      >确定</van-button
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "EditMobile",
  data() {
    return {
      number1: null,
      code1: null,

      number2: null,
      code2: null,
    };
  },
  computed: {
    ...mapState({
      obtainTime: (state) => state.user.obtainTime,
      obtainTimer: (state) => state.user.obtainTimer,
      obtainTime2: (state) => state.user.obtainTime2,
      obtainTimer2: (state) => state.user.obtainTimer2,
      obtainState: (state) => state.user.obtainState,
      obtainState2: (state) => state.user.obtainState2,
    }),
  },
  methods: {
    buttonClick() {
      if (!this.number1) {
        this.$toast("请输入原手机号");
      } else if (!this.number2) {
        this.$toast("请输入新手机号");
      } else if (!this.code1) {
        this.$toast("请输入验证码");
      } else if (!this.code2) {
        this.$toast("请输入验证码");
      } else if (this.number1 == this.number2) {
        this.$toast("原手机号与新手机号不能一致");
      } else {
        this.$toast({
          type: "loading",
          message: "loading...",
          duration: 0, // 持续展示 toast
        });
        this.$axios
          .post("/user/update", {
            phoneNumber: this.number1,
            verificationCode: this.code1,
            newPhoneNumber: this.number2,
            newVerificationCode: this.code2,
          })
          .then((res) => {
            if (res.msg != "success") {
              this.$toast(res.msg);
            } else {
              this.$toast({
                type: "success",
                message: "手机号修改成功，请重新登录",
              });
              this.number1 = "";
              this.number2 = "";
              this.code1 = "";
              this.code2 = "";
              this.$router.push("/login");
            }
          });
      }
    },
    same() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: "spinner",
        message: "loading...",
      });
    },
    getCode1() {
      if (!this.number1) {
        this.$toast("请输入原手机号");
        return;
      }
      this.same();
      this.$store.dispatch("sms_codeFun", {
        params: {
          phoneNumber: this.number1,
          verificationCode: this.code1,
        },
      });
    },
    getCode2() {
      if (!this.number2) {
        this.$toast("请输入新手机号");
        return;
      }
      this.same();
      this.$store.dispatch("sms_codeFun2", {
        params: {
          phoneNumber: this.number2,
          verificationCode: this.code2,
        },
      });
    },
    onRecord() {},
  },
  destroyed() {
    this.$store.commit("obtainClear");
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
