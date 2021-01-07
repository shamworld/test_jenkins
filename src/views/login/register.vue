<template>
  <div class="containers">
    <!-- 注册 -->
    <navBar title="注册"></navBar>
    <div class="main">
      <div class="main-item m-t-30">
        <van-form>
          <ul class="t-white bg-blue1">
            <li>
              <van-field
                v-model="phone"
                placeholder="输入手机号"
                type="number"
                :border="false"
                class="input"
                center
                input-align="right"
              >
                <template #label>
                  <span class="t-white">手机号</span>
                </template>
              </van-field>
            </li>
            <li>
              <van-field
                v-model="code"
                type="number"
                placeholder="请输入验证码"
                :border="false"
                class="input"
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
            </li>
            <li>
              <van-field
                v-model="password"
                type="password"
                placeholder="请输入登录密码"
                :border="false"
                class="input"
                center
                input-align="right"
              >
                <template #label>
                  <span class="t-white">登录密码</span>
                </template>
              </van-field>
            </li>
            <li>
              <van-field
                v-model="surePassword"
                type="password"
                placeholder="请再次输入登录密码"
                :border="false"
                class="input"
                center
                input-align="right"
              >
                <template #label>
                  <span class="t-white">确定登录密码</span>
                </template>
              </van-field>
            </li>
            <li>
              <van-field
                v-model="paymentPwd"
                placeholder="请输入支付密码"
                type="password"
                :border="false"
                class="input"
                center
                input-align="right"
              >
                <template #label>
                  <span class="t-white">支付密码</span>
                </template>
              </van-field>
            </li>
            <li>
              <van-field
                v-model="surePaymentPwd"
                placeholder="请再次输入支付密码"
                type="password"
                :border="false"
                class="input"
                center
                input-align="right"
              >
                <template #label>
                  <span class="t-white">确定支付密码</span>
                </template>
              </van-field>
            </li>
            <li>
              <van-field
                v-model="invitationCode"
                placeholder="请输入邀请码"
                :border="false"
                class="input"
                center
                input-align="right"
              >
                <template #label>
                  <span class="t-white">邀请码（必填）</span>
                </template>
              </van-field>
            </li>
          </ul>
          <van-button
            block
            native-type="submit"
            color="#27A395"
            class="register-btn t-white fs-lg"
            @click="getregister"
          >
            注册
          </van-button>
        </van-form>
      </div>
    </div>
    <!-- 验证码弹窗 -->
    <!-- <van-popup v-model="codeIsShow" position="bottom">
      <CodePopup
        @onClose="onClose"
        @confirm="confirm"
        :phone="phone"
      ></CodePopup>
    </van-popup> -->
  </div>
</template>

<script>
import * as sysTool from "../../assets/js/systemTool";
import { mapState } from "vuex";
export default {
  data() {
    return {
      phone: "", //手机号
      code: "", //验证码
      password: "", //登录密码
      surePassword: "", //确定登录密码
      paymentPwd: "", //支付密码
      surePaymentPwd: "", //确定支付密码
      invitationCode: "", //邀请码
      codeIsShow: false,
      captcha: {},
      readDeviceId: localStorage.getItem("readDeviceId"), //设备号
      os: "",
      rep: /^1[3456789]\d{9}$/,
      repPwd: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/,
    };
  },
  // components: {
  //   CodePopup,
  // },
  computed: {
    ...mapState({
      obtainTime: (state) => state.user.obtainTime,
      obtainTimer: (state) => state.user.obtainTimer,
      obtainState: (state) => state.user.obtainState,
    }),
  },
  methods: {
    // 注册
    getregister() {
      var that = this;
      this.os = sysTool.GetOs();
      console.log(this.os);
      if (!this.phone) {
        this.$toast("请输入手机号");
        return;
      }
      if (!this.rep.test(this.phone)) {
        this.$toast("手机号格式不正确");
        return;
      }
      if (!this.code) {
        this.$toast("请输入短信验证码");
        return;
      }
      if (!this.password) {
        this.$toast("请输入密码");
        return;
      }
      if (!this.repPwd.test(this.password)) {
        this.$toast("密码至少8位，要求必须字母、数字");
        return;
      }
      if (!this.surePassword) {
        this.$toast("请再次输入密码");
        return;
      }
      if (this.password != this.surePassword) {
        this.$toast("两次密码输入不一致");
        return;
      }
      if (!this.paymentPwd) {
        this.$toast("请输入支付密码");
        return;
      }
      if (!this.repPwd.test(this.password)) {
        this.$toast("支付密码至少8位，要求必须字母、数字");
        return;
      }
      if (!this.surePassword) {
        this.$toast("请再次输入支付密码");
        return;
      }
      if (this.paymentPwd != this.surePaymentPwd) {
        this.$toast("两次支付密码输入不一致");
        return;
      }
      if (!this.invitationCode) {
        this.$toast("请输入邀请码");
        return;
      }
      // 注册
      this.$toast.loading("loading...");
      this.$axios
        .post("/user/register", {
          phoneNumber: that.phone, //手机号
          password: that.password, //登录密码
          passwordTwo: that.surePassword, //确定登录密码
          payPassword: that.paymentPwd, //支付密码
          payPasswordTwo: that.surePaymentPwd, //确定支付密码
          invitationCode: that.invitationCode, //邀请码
          verificationCode: that.code, //验证码
          deviceNumber: that.readDeviceId,
        })
        .then((res) => {
          console.log(res);
          if (res.msg === "success") {
            this.$toast.success("注册成功");
            this.$router.push("/login");
          } else {
            this.$toast(res.msg);
            if (res.msg == "当前手机号已注册") {
              this.$router.push("/login");
            }
            this.phone = "";
            this.code = "";
            this.invitationCode = "";
            this.password = "";
            this.surePassword = "";
            this.paymentPwd = "";
            this.surePaymentPwd = "";
          }
        });
    },
    // 获取验证码
    getCode() {
      // if (this.obtainTimer == null) {
      //   this.codeIsShow = true;
      // } else {
      //   this.codeIsShow = false;
      // }

      if (!this.phone) {
        this.$toast("请输入手机号");
        return;
      }
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: "spinner",
        message: "loading...",
      });
      this.$store.dispatch("sms_codeFun", {
        params: {
          phoneNumber: this.phone,
        },
      });
    },
    // 取消
    onClose() {
      this.codeIsShow = false;
    },
    // 确定
    confirm(captcha) {
      this.codeIsShow = false;
      this.captcha = captcha;
    },
  },
  mounted() {},
  destroyed() {
    this.$store.commit("obtainClear");
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 0 24px;

  .main-item {
    ul {
      border-radius: 8px;
    }

    ul li {
      border-bottom: 1px solid #2a4d62;
      padding: 0 19px;
      box-sizing: border-box;
      font-size: 15px;

      .input {
        height: 91px;
        background-color: transparent;
      }

      ::-webkit-input-placeholder {
        text-align: right;
      }
    }

    .register-btn {
      width: 93%;
      position: absolute;
      bottom: 97px;
    }
  }
}
</style>
