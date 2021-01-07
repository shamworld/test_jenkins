<template>
  <div class="container bg-black1">
    <!-- 提币 -->
    <navBar
      title="提币"
      rightText="提币记录"
      @rightClick="toWithdrawRecord"
      isactive
    ></navBar>
    <div class="bg bg-green w-100"></div>
    <div class="contents t-white m-t-15">
      <div
        class="type d-flex jc-between ai-center fs-md py-15 px-5"
        style="border-radius: 4px"
        @click="choseIsShow = true"
      >
        <p>选择币种</p>
        <p class="d-flex ai-center">{{ currency }}<van-icon name="arrow" /></p>
      </div>
      <div class="bg-view radius px-10 py-20 m-t-15">
        <h4 class="t-center">{{ blance | notation }}</h4>
        <p class="t-center fs-min t-blue my-10">可用余额({{ currency }})</p>
        <van-field
          v-model="address"
          placeholder="请输入提币地址"
          class="input bg-black1 m-t-20"
          center
          input-align="right"
          :border="false"
        >
          <template #label>
            <span class="fs-md t-white mx-10">提币地址</span>
          </template>
        </van-field>
        <van-field
          v-model="number"
          :placeholder="'请输入提币数量(' + currency + ')'"
          class="input bg-black1 m-t-20"
          center
          :border="false"
        >
          <template #label>
            <span class="fs-md t-white mx-10">提币数量</span>
          </template>
          <template #extra>
            <span class="fs-md t-green mx-10" @click="all">| 全部</span>
          </template>
        </van-field>
        <div class="m-t-15 lh-6">
          <p class="fs-md d-flex jc-between">
            手续费 <span class="t-blue">{{ exportFee }} USDT</span>
          </p>
          <p class="fs-md d-flex jc-between">
            实际到账
            <span class="t-blue" v-if="number == 0">- {{ currency }}</span>
            <span class="t-blue" v-else
              >{{ actualReceipt }} {{ currency }}</span
            >
          </p>
        </div>
      </div>
    </div>
    <van-button
      color="#27A495"
      class="sure-btn w-100 fs-lg"
      @click="onsrueRecord"
      >确定</van-button
    >
    <van-popup v-model="choseIsShow" round position="bottom" class="picker">
      <ChosePopup
        :choseIsShow="choseIsShow"
        :pickerColumns="pickerColumns"
        @choseIsShow="getIsShow"
        @choseItem="getItem"
      ></ChosePopup>
    </van-popup>
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
export default {
  data() {
    return {
      address: "", //提币地址
      number: null, //提币数量
      verification: null, //安全密码
      choseIsShow: false,
      currency: "USDT", //币种
      verificationIsShow: false,
      pickerColumns: [],
      exportFee: null, //手续费
      blance: null, //币种余额
    };
  },
  computed: {
    actualReceipt() {
      return this.number - this.exportFee;
    },
  },
  mounted() {
    this.getwalletInfo();
    this.getBlance();
  },
  methods: {
    toWithdrawRecord() {
      this.$router.push("/withdrawMoney/withdrawRecord");
    },
    getIsShow(param) {
      this.choseIsShow = param;
    },
    getItem(value) {
      this.number = "";
      this.address = "";
      this.currency = value.value;
      this.getwalletInfo();
      this.getBlance();
    },
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
    },
    // 提币确定
    onsrueRecord() {
      if (!this.address) {
        this.$toast("请输入地址");
      } else if (!this.number) {
        this.$toast("请输入提币数量");
      } else if (this.number <= 0) {
        this.$toast("提币数量不得小于等于零");
      } else if (this.actualReceipt <= 0) {
        this.$toast("实际到账不得小于等于零");
      } else {
        this.verificationIsShow = true;
      }
    },
    onRecord() {
      this.$toast.loading("loading");
      this.$axios
        .post("/walletmention/transfer", {
          address: this.address,
          coinName: this.currency,
          number: this.number,
          verification: this.verification,
        })
        .then((res) => {
          // console.log(res);
          if (res.msg != "success") {
            this.$toast(res.msg);
          } else {
            this.$toast.success("提币成功");
          }
        });
    },
    //查询币种信息
    getwalletInfo() {
      // console.log(this.currency);
      this.$axios
        .post("/coins/info", {
          name: this.currency,
        })
        .then((res) => {
          // console.log(res.coins.exportFee);
          this.exportFee = res.coins.exportFee;
        });
    },
    //根据币种名称查询钱包信息(余额)
    getwalletbalance() {
      this.$axios
        .post("/wallet/infoByName", {
          coinName: this.currency,
        })
        .then((res) => {
          // console.log(res.data);
          this.number = res.data.balance;
        });
    },
    getBlance() {
      this.$axios
        .post("/wallet/infoByName", {
          coinName: this.currency,
        })
        .then((res) => {
          // console.log(res.data);
          this.blance = res.data.balance;
        });
    },
    // 全部
    all() {
      this.getwalletbalance();
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  height: 310px;
  position: absolute;
  margin-top: -10px;
}
.contents {
  padding: 24px;
  position: relative;
  z-index: 99;
  .type {
    background-color: rgba(255, 255, 255, 0.4);
  }
  .input {
    height: 78px;
    border-radius: 8px;
    ::-webkit-input-placeholder {
      text-align: right;
    }
  }
}
.sure-btn {
  width: 93%;
  position: absolute;
  bottom: 100px;
  @include cl;
}
.picker {
  color: #fff;
}
</style>