<template>
  <div class="containers bg-black1">
    <!-- 划转 -->
    <navBar
      title="划转"
      rightText="划转记录"
      @rightClick="toTransferRecord"
    ></navBar>
    <div class="contents t-white m-t-10">
      <div
        class="d-flex jc-between ai-center fs-md bg-view py-15 px-5"
        style="border-radius: 4px"
        @click="choseIsShow = true"
      >
        <p>选择币种</p>
        <p class="d-flex ai-center">{{ currency }}<van-icon name="arrow" /></p>
      </div>
      <div class="bg-view radius px-10 py-20 m-t-15">
        <h4 class="t-center">0.0000</h4>
        <p class="t-center fs-min t-blue my-10">可用余额({{ currency }})</p>
        <van-field
          v-model="accountNumber"
          :placeholder="'请输入' + currency + '账户或地址'"
          class="input bg-black1 m-t-20"
          center
          :border="false"
          input-align="right"
        >
          <template #label>
            <span class="fs-md t-white mx-10">对方账号</span>
          </template>
        </van-field>
        <van-field
          v-model="number"
          placeholder="请输入数量"
          class="input bg-black1 m-t-15"
          center
          :border="false"
          input-align="right"
        >
          <template #label>
            <span class="fs-md t-white mx-10">数量</span>
          </template>
          <template #extra>
            <span class="fs-md t-green mx-10">| 全部</span>
          </template>
        </van-field>
      </div>
      <van-button color="#27A495" class="btn fs-lg w-100" @click="onsrueRecord"
        >确定</van-button
      >
    </div>
    <van-popup v-model="choseIsShow" round position="bottom" class="picker">
      <ChosePopup
        :choseIsShow="choseIsShow"
        @choseIsShow="getIsShow"
        @choseItem="getItem"
      ></ChosePopup>
    </van-popup>
    <van-popup v-model="safepwdIsShow" round position="bottom">
      <SafePwdPopup
        @onConfirm="onConfirm"
        @hidden="onCancel"
        @pwdValue="getpwdValue"
      ></SafePwdPopup>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      accountNumber: "", //账号
      number: null, //数量
      safepwd: null, //安全密码
      choseIsShow: false,
      currency: "USDT", //币种
      safepwdIsShow: false,
    };
  },
  computed: {
    ...mapState({
      tokens: (state) => state.user.tokens,
    }),
  },
  methods: {
    toTransferRecord() {
      // this.$router.push("/transfer/transferRecord");
    },
    getIsShow(param) {
      this.choseIsShow = param;
    },
    getItem(value) {
      this.currency = value.value;
    },
    // 安全密码值
    getpwdValue(value) {
      this.safepwd = value;
    },
    // 安全密码取消
    onCancel(value) {
      this.safepwdIsShow = value;
    },
    // 安全密码确定
    onConfirm(value) {
      this.safepwdIsShow = value;
      this.onRecord();
    },
    // 划转确定
    onsrueRecord() {
      if (!this.accountNumber) {
        this.$toast("请输入账号或者地址");
      } else if (!this.number) {
        this.$toast("请输入数量");
      } else {
        this.safepwdIsShow = true;
      }
    },
    onRecord() {
      this.$toast.loading("loading");
      this.$axios
        .post(`/wallettrade/change?token=${this.tokens}`, {
          address: this.accountNumber,
          coinName: this.currency,
          number: this.number,
          verification: this.safepwd,
        })
        .then((res) => {
          console.log(res);
          if (res.msg != "success") {
            this.$toast(res.msg);
          } else {
            this.$toast.success("提币成功");
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.contents {
  padding: 24px;
  .input {
    height: 78px;
    border-radius: 8px;
    ::-webkit-input-placeholder {
      text-align: right;
    }
  }
  .btn {
    position: absolute;
    bottom: 100px;
    width: 93%;
    @include cl;
  }
}
.picker {
  color: #fff;
}
</style>