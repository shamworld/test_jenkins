<template>
  <div class="containers">
    <!-- 忘记密码 -->
    <navBar title="忘记密码"></navBar>
    <div class="main">
      <div class="main-item m-t-30">
        <van-form>
          <ul class="t-white bg-blue1">
            <li>
              <van-field
                v-model="phone"
                type="number"
                placeholder="输入手机号"
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
                placeholder="请输入新的登录密码"
                :border="false"
                class="input"
                center
                input-align="right"
              >
                <template #label>
                  <span class="t-white">新登录密码</span>
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
          </ul>
          <van-button
            block
            native-type="submit"
            color="#27A395"
            class="submit-btn t-white fs-lg"
            @click="onsubmit"
          >
            确定
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
import { mapState } from "vuex";

export default {
  data() {
    return {
      phone: "", //手机号
      code: "", //验证码
      password: "", //新的登录密码
      surePassword: "", //确定新的登录密码
      codeIsShow: false,
      captcha: {},
      token: "",
      rep: /^1[3456789]\d{9}$/,
      repPwd: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/,
    };
  },
  computed: {
    ...mapState({
      obtainTime: (state) => state.user.obtainTime,
      obtainTimer: (state) => state.user.obtainTimer,
      obtainState: (state) => state.user.obtainState,
    }),
  },
  mounted() {},
  methods: {
    // 提交确定
    onsubmit() {
      // console.log(localStorage.getItem("tokens"));
      if (!this.phone) {
        this.$toast("请输入手机号");
      } else if (!this.rep.test(this.phone)) {
        this.$toast("手机号格式不正确");
      } else if (!this.code) {
        this.$toast("请输入短信验证码");
      } else if (!this.password) {
        this.$toast("请输入新密码");
      } else if (!this.repPwd.test(this.password)) {
        this.$toast("密码至少8位，要求必须字母、数字");
      } else if (!this.surePassword) {
        this.$toast("请再次输入新密码");
      } else if (this.password != this.surePassword) {
        this.$toast("两次密码输入不一致");
      } else {
        // 修改密码
        this.$toast.loading("loading...");
        this.$axios
          .post("/user/forgetPassword", {
            phoneNumber: this.phone,
            verificationCode: this.code,
            password: this.password,
          })
          .then((res) => {
            console.log(res);
            if (res.msg === "success") {
              this.$toast.success("密码修改成功，请重新登录");
              this.$router.push("/login");
            } else {
              this.$toast.fail(res.msg);
            }
          })
          .catch((err) => {
            this.$toast.fail(err.msg);
          });
      }
    },
    // 获取验证码
    getCode() {
      // this.codeIsShow = true;

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
  // components: { CodePopup },
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
    .submit-btn {
      width: 93%;
      position: absolute;
      bottom: 97px;
    }
  }
}
</style>