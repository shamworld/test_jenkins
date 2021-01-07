<template>
  <div class="containers bg-black1">
    <!-- 充币 -->
    <navBar
      title="充币"
      rightText="充币记录"
      @rightClick="toRechargeRecord"
    ></navBar>
    <div class="contents t-white m-t-10">
      <div
        class="d-flex jc-between ai-center fs-md bg-view py-15 px-5"
        style="border-radius: 4px"
        @click="chose"
      >
        <p>选择币种</p>
        <p class="d-flex ai-center">{{ currency }}<van-icon name="arrow" /></p>
      </div>
      <div class="code-box m-t-15 bg-view radius">
        <!-- 二维码 -->
        <div class="code bg-white">
          <VueQr
            :margin="10"
            colorDark="#000"
            :size="250"
            :text="this.address"
          ></VueQr>
        </div>
        <p class="address mx-5 lh-5 fs-min t-blue t-center">{{ address }}</p>
      </div>
      <van-button
        color="#27A495"
        class="m-t-30 fs-lg w-100"
        v-clipboard:copy="address"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        >复制地址</van-button
      >
    </div>
    <van-popup v-model="choseIsShow" round position="bottom" class="picker">
      <ChosePopup
        :choseIsShow="choseIsShow"
        @choseIsShow="getIsShow"
        @choseItem="getItem"
      ></ChosePopup>
    </van-popup>
  </div>
</template>

<script>
import ChosePopup from "../../components/common/ChosePopup";
export default {
  data() {
    return {
      address: "",
      choseIsShow: false,
      currency: "USDT", //币种
      // pickerColumns: [],
      address: "",
      i: 0,
    };
  },
  components: { ChosePopup },
  mounted() {
    this.$axios.post("/wallet/list", {}).then((res) => {
      // console.log(res.data.walletList);
      // this.pickerColumns = res.data.walletList;
      res.data.walletList.forEach((item, index) => {
        if (this.i == index) {
          this.address = item.address;
        }
      });
    });
  },
  methods: {
    toRechargeRecord() {
      this.$router.push("/rechargeCurrency/rechargeRecord");
    },
    getIsShow(param) {
      this.choseIsShow = param;
    },
    getItem(value) {
      this.currency = value.value;
      this.i = value.index;
      this.choseCurrency();
      // console.log(value);
    },
    chose() {
      this.choseIsShow = true;
      this.choseCurrency();
    },
    //复制成功
    onCopy() {
      this.$toast("复制成功");
    },
    //复制失败
    onError() {
      this.$toast("复制失败");
    },
    choseCurrency() {
      var that = this;
      this.$axios.post("/wallet/list", {}).then((res) => {
        // console.log(res.data.walletList);
        res.data.walletList.forEach((item, index) => {
          if (this.i == index) {
            this.address = item.address;
          }
        });
        // console.log(this.address);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.contents {
  padding: 24px;
  .code-box {
    padding: 77px 0;
    .address {
      margin-top: 102px;
      word-break: break-all;
      word-wrap: break-word;
    }
  }
  .code {
    @include wh(500px, 500px);
    margin: 0px auto;
  }
}
.picker {
  color: #fff;
}
</style>