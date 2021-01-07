<template>
  <div class="pop px-30 py-20">
    <p class="fs-lg t-center t-white">图形验证码</p>
    <div class="box d-flex jc-between ai-center px-1 m-t-40">
      <van-field
        v-model="captcha.code"
        :border="false"
        placeholder="请输入图形验证码"
        class="code-input"
      />
      <van-image
        width="180px"
        height="44px"
        :src="captcha.img"
        @click="getCaptcha"
      >
        <template #error>
          <van-loading type="circular" size="20" v-if="loading" />
        </template>
        <!-- <template #error>
          <span @click="getCaptcha">点击重试</span>
        </template> -->
      </van-image>
    </div>
    <div class="m-t-30 d-flex jc-between fs-lg">
      <div class="cancel t-center bg-green" @click="onClose">取消</div>
      <div class="confirm t-center bg-green t-white" @click="confirm">确定</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapState } from "vuex";

export default {
  name: "codePopup",
  data() {
    return {
      loading: false,
      captcha: {
        code: "",
        img: "",
        key: "",
      },
    };
  },
  props: {
    phone: { type: String },
  },
  mounted() {
    this.getCaptcha();
  },
  methods: {
    onClose() {
      this.captcha.code = "";
      this.$emit("onClose");
    },
    confirm() {
      if (!this.phone) {
        this.$toast("请输入手机号");
        return;
      } else if (!this.captcha.code) {
        this.$toast("请输入图形验证码");
        return;
      }
      if (this.obtainTimer) {
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
          verificationCode: this.captcha.code,
        },
      });
      this.$emit("confirm", this.captcha);
      this.captcha.code = "";
    },
    getCaptcha() {
      this.loading = true;
      this.$axios.post("/user/captcha").then((res) => {
        // console.log(res.data);
        // res.code === "0" &&
        //   (this.captcha.img = "data:image/png;base64," + res.data),
        //   (this.captcha.key = res.data.key);
        res.code === "0";
        this.captcha.img = "data:image/png;base64," + res.data;
        this.captcha.key = res.data.key;
        this.loading = false
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.pop {
  width: 100%;
  background: #2a405c;
  box-sizing: border-box;
}
.box {
  // height: 0.5rem;
  // border: 0.5px solid #5f5a5c;
  .code-input {
    height: 88px;
    background-color: #1b2c42;
  }
}
.cancel,
.confirm {
  width: 47%;
  line-height: 44px;
  border-radius: 4px;
}
.cancel {
  opacity: 0.5;
  color: #90b5cc;
}
</style>
