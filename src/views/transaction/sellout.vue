<template>
  <div class="containers bg-black1">
    <!-- 卖出 -->
    <navBar
      title="卖出"
      rightText="记录明细"
      @rightClick="toRecordDetails"
    ></navBar>
    <div class="contents t-white m-t-10">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="d-flex jc-between fs-min lh-5">
          <div class="price">
            <p class="opacity">昨日币价</p>
            <p class="t-green fs-lg">
              {{ detailList.lastPrice }}<span class="fs-min"> USDT</span>
            </p>
            <p class="m-t-5 opacity">今日币价</p>
            <p class="t-green fs-lg">
              {{ detailList.price }}<span class="fs-min"> USDT</span>
            </p>
          </div>
          <div class="number">
            <p class="opacity">今日交易量</p>
            <p class="t-green fs-lg">
              {{ detailList.traderNumber }}
            </p>
            <p class="m-t-5 opacity">活跃度</p>
            <p class="t-green fs-lg">
              {{ detailList.active }}
            </p>
          </div>
        </div>
        <!-- 买入数量 -->
        <div class="num radius bg-view fs-md m-t-15">
          <div class="title">
            <van-field
              v-model="number"
              placeholder="请输入卖出数量"
              type="number"
              center
              class="num-input"
              @input="selloutNumber"
            >
              <template #label>
                <span class="t-white fs-md opacity mx-10">卖出数量</span>
              </template>
              <template #right-icon>
                <van-button
                  color="linear-gradient(0deg, #1E4351 0%, #269887 100%)"
                  size="small"
                  round
                  class="fs-min opacity mx-10"
                  @click="all"
                  >全部</van-button
                >
              </template>
            </van-field>
          </div>
          <div class="lh-7 py-10 px-10">
            <p class="t-blue d-flex jc-between">
              当前HP余额 <span class="t-green">{{ list.HpBalance }} HP</span>
            </p>
            <p class="t-blue d-flex jc-between">
              订单HP单价 <span class="t-green">{{ itemData.price }} USDT</span>
            </p>
            <p class="t-blue d-flex jc-between">
              手续费
              <span class="t-green">{{ service | notation }} HP</span>
            </p>
            <p class="t-blue d-flex jc-between">
              手续费率 <span class="t-green">{{ list.feeRatio * 100 }} %</span>
            </p>
            <p class="t-blue d-flex jc-between">
              订单金额
              <span class="t-green">{{ orderPrice | notation }} USDT</span>
            </p>
          </div>
        </div>
        <!-- 按钮 -->
        <div class="d-flex jc-between m-t-35">
          <van-button
            color="#2A405C"
            class="fs-lg"
            round
            style="width: 48%"
            @click="$router.back()"
            >取消</van-button
          >
          <van-button
            color="linear-gradient(0deg, #1E4351 0%, #269887 100%)"
            class="fs-lg"
            round
            style="width: 48%"
            @click="selloutClick"
            >卖出</van-button
          >
        </div>
      </van-pull-refresh>
    </div>
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
export default {
  data() {
    return {
      safepwdIsShow: false,
      isLoading: false, //控制下拉刷新的加载动画
      detailList: [],
      list: [],
      number: null, //买入数量
      itemData: [],
      surplus: null, //剩余全部
      safeValue: null, //支付密码
    };
  },
  mounted() {
    this.requestList();
    this.detailList = JSON.parse(this.$route.query.data);
    this.itemData = JSON.parse(this.$route.query.item);
    // console.log(this.itemData);
  },
  computed: {
    service() {
      //手续费=卖出数量*手续费率
      return this.number * this.list.feeRatio;
    },
    orderPrice() {
      //订单金额=(卖出数量-手续费)*单价
      return (this.number - this.service) * this.itemData.price;
    },
  },
  methods: {
    toRecordDetails() {
      this.$router.push("/transaction/recordDetails");
    },
    // 安全密码取消
    onCancel(value) {
      this.safepwdIsShow = value;
    },
    // 安全密码值
    getpwdValue(value) {
      this.safeValue = value;
    },
    // 安全密码确定
    onConfirm(value) {
      this.safepwdIsShow = value;
      this.$axios
        .post("/commission/sell", {
          id: this.itemData.id,
          userId: this.itemData.userId,
          price: this.itemData.price,
          number: this.number,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$toast.success("支付成功");
          }
        });
    },
    onRefresh() {
      setTimeout(() => {
        this.requestList();
        this.detailList = JSON.parse(this.$route.query.data);
        this.price = this.$route.query.price;
      }, 1000);
    },
    requestList() {
      this.$axios
        .post("/wallet/hpBalance", {})
        .then((res) => {
          // console.log(res);
          this.isLoading = false;
          this.list = res.data;
        })
        .catch((err) => {
          this.isLoading = false;
        });
    },
    all() {
      this.itemData = JSON.parse(this.$route.query.item);
      this.number = this.itemData.remaining;
    },
    // 卖出
    selloutClick() {
      if (!this.number) {
        this.$toast("请输入卖出数量");
      } else if (this.number <= 0) {
        this.$toast("卖出数量不得小于零");
      } else {
        this.safepwdIsShow = true;
      }
    },
    selloutNumber() {
      // console.log(this.orderPrice);
    },
  },
};
</script>

<style lang="scss" scoped>
.contents {
  padding: 20px 24px;
  .price,
  .number {
    width: 48%;
    background: linear-gradient(90deg, #2a405b, #2a405b, #2a5567);
    border-radius: 18px;
    padding: 25px 31px;
    box-sizing: border-box;
  }
  .num {
    .title {
      border-bottom: 1px solid #2a4d62;
    }
    .num-input {
      height: 98px;
      background-color: transparent;
    }
  }
}
</style>