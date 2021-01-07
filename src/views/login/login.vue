<template>
  <div class="containers">
    <!-- 登录 -->
    <div class="t-white fs-lg t-center m-t-35">登录</div>
    <div class="d-flex jc-center m-t-30">
      <van-image
        :src="require('@/assets/login/logo.png')"
        width="75px"
        height="75px"
      ></van-image>
    </div>
    <van-form @submit="onSubmit" class="input-group">
      <van-field
        v-model="phone"
        name="手机号"
        type="number"
        placeholder="输入手机号"
        :border="false"
        class="input"
        :left-icon="require('@/assets/login/shouji.png')"
      />
      <van-field
        v-model="passWord"
        type="password"
        name="密码"
        placeholder="密码"
        class="input"
        :border="false"
        :left-icon="require('@/assets/login/mima.png')"
      />
      <van-button
        round
        block
        native-type="submit"
        class="login-btn t-white fs-lg"
      >
        登录
      </van-button>
    </van-form>
    <ul class="fs-sm t-green d-flex ai-center jc-center m-t-10">
      <li @click="forget">忘记密码</li>
      <li class="mx-7">|</li>
      <li @click="Register">注册账号</li>
    </ul>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      phone: "",
      passWord: "",
      rep: /^1[3456789]\d{9}$/,
      repPwd: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/,
      // banben: "", //线上版本
      // isUptoDate: false,
    };
  },
  mounted() {
    // this.$axios.post("/user/checkVersion", {}).then((res) => {
    //   console.log(res.data);
    //   const version = res.data; //本地版本
    //   if (this.banben == version) {
    //     this.isUptoDate = true; //线上版本与本地版本相同
    //   } else {
    //     //有更新版本
    //     this.isUptoDate = false;
    //     this.banben = version;
    //     Dialog.confirm({
    //       title: "请下载更新",
    //       showCancelButton: false
    //     }).then(() => {});
    //   }
    // });
  },
  methods: {
    //登录
    onSubmit() {
      if (!this.phone) {
        this.$toast("请输入手机号");
      } else if (!this.rep.test(this.phone)) {
        this.$toast("手机号格式不正确");
      } else if (!this.passWord) {
        this.$toast("请输入您的密码");
      } else if (!this.repPwd.test(this.passWord)) {
        this.$toast("密码至少8位，要求必须字母、数字");
      } else {
        this.$toast.loading("loading...");
        this.$axios
          .post("/user/login", {
            phoneNumber: this.phone,
            password: this.passWord,
          })
          .then((res) => {
            // console.log(res);
            if (res.code != 200) {
              this.$toast.fail(res.msg);
            } else {
              this.$toast.success("登录成功");
              localStorage.setItem("isLogin", true);
              localStorage.setItem("tokens", res.data.token);
              // this.$store.dispatch("getToken");
              // this.$store.dispatch("getUserInfo");
              this.$router.replace("/mine");
              this.$toast.clear();
            }
          });
      }
    },
    // 注册
    Register() {
      this.$router.push("/register");
    },
    // 忘记密码
    forget() {
      this.$router.push("/forget");
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-icon__image {
  @include wh(22px, 22px);
}
.containers {
  background: url("https://i.loli.net/2020/10/13/FlmhzE5TNngr9XJ.png") no-repeat;
  background-size: 100% 606px;
  padding: 0 38px;
  .input-group {
    margin-top: 240px;
    background-color: transparent;
    .input {
      height: 120px;
      background-color: transparent;
      border-bottom: 1px solid #2a4d62;
    }
  }
  .login-btn {
    width: 452px;
    height: 90px;
    background: linear-gradient(0deg, #1f5f63 0%, #29c7ad 100%);
    border-radius: 45px;
    margin: 202px auto 0 auto;
  }
}
</style>