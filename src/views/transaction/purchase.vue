<template>
  <div class="containers bg-black1">
    <!-- 我要买入 -->
    <navBar
      title="我要买入"
      rightText="记录明细"
      @rightClick="toRecordDetails"
    ></navBar>
    <div class="contents t-white m-t-10">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="d-flex jc-between fs-min lh-5">
          <div class="price">
            <p class="opacity">昨日币价</p>
            <p class="t-green fs-lg">
              {{ detailList.lastPrice }}<span class="fs-min">USDT</span>
            </p>
            <p class="m-t-5 opacity">今日币价</p>
            <p class="t-green fs-lg">
              {{ detailList.price }}<span class="fs-min">USDT</span>
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
        <div class="content m-t-15 bg-view radius">
          <ul>
            <li class="d-flex jc-between ai-center">
              <span class="t-white fs-md opacity mx-10">挂单价格</span>
              <span class="t-white fs-md opacity mx-10">{{
                detailList.price
              }}</span>
            </li>
            <li>
              <van-field
                v-model="number"
                placeholder="请输入买入数量"
                type="number"
                center
                class="input num-input"
              >
                <template #label>
                  <span class="t-white fs-md opacity mx-10">买入数量</span>
                </template>
                <template #right-icon>
                  <van-button
                    color="linear-gradient(0deg, #1E4351 0%, #269887 100%)"
                    size="small"
                    round
                    class="fs-min opacity mx-10"
                    >全部</van-button
                  >
                </template>
              </van-field>
            </li>
            <li class="d-flex jc-between ai-center" style="border: none">
              <span class="t-white fs-md opacity mx-10">USDT 总价</span>
              <span class="t-green fs-md mx-10"
                >{{ (detailList.price * number) | notation }} USDT</span
              >
            </li>
          </ul>
        </div>
        <div class="d-flex jc-between my-35">
          <van-button
            color="#2A405C"
            class="fs-lg opacity"
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
            @click="buyClick"
            >我要买入</van-button
          >
        </div>
        <!-- 求购列表 我的订单 -->
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="$t('no_more')"
          :loading-text="$t('loading')"
          error.sync
          error-text="加载失败，请重新加载"
          @load="onLoad"
          class="bg-view p-t-5 m-t-10 fs-min radius9"
        >
          <div class="order bg-view radius">
            <van-tabs
              v-model="active"
              color="#2AB4A1"
              title-active-color="#2AB4A1"
              title-inactive-color="#7494AD"
              line-height="2px"
              line-width="85px"
              :border="false"
              class="tabs"
            >
              <van-tab title="求购列表">
                <div class="buy t-white w-100">
                  <ul>
                    <li
                      class="fs-min t-grey lh-7 bg-view"
                      v-for="(item, index) in list"
                      :key="index"
                    >
                      <div class="d-flex jc-between ai-center">
                        <p class="d-flex jc-between t-black2">
                          {{ item.createTime }}
                        </p>
                        <van-button
                          color="linear-gradient(0deg, #1E4351 0%, #269887 100%)"
                          round
                          size="mini"
                          @click="toSellout(item)"
                          >卖出</van-button
                        >
                      </div>
                      <div class="d-flex fs-min">
                        <div class="left">
                          <p class="d-flex jc-between">
                            价格 <span>{{ item.price }}</span>
                          </p>
                          <p class="d-flex jc-between">
                            已成交 <span>{{ item.alreadyTraded }}</span>
                          </p>
                        </div>
                        <div class="right">
                          <p class="d-flex jc-between">
                            数量 <span>{{ item.number }}</span>
                          </p>
                          <p class="d-flex jc-between">
                            剩余 <span>{{ item.remaining }}</span>
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </van-tab>
            </van-tabs>
          </div>
        </van-list>
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
      active: 0,
      safepwdIsShow: false,
      isLoading: false, //控制下拉刷新的加载动画
      finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
      loading: false, //控制上拉加载的加载动画
      totalPage: 1,
      pageNumber: 1,
      detailList: [],
      list: [],
      price: null, //挂单价格
      number: null, //买入数量
    };
  },
  mounted() {
    this.init();
    // console.log(JSON.parse(this.$route.query.data));
    this.detailList = JSON.parse(this.$route.query.data);
  },
  methods: {
    toRecordDetails() {
      this.$router.push("/transaction/recordDetails");
    },
    toSellout(value) {
      this.$router.push({
        path: "/sellout",
        query: {
          data: JSON.stringify(this.detailList),
          item: JSON.stringify(value),
        },
      });
    },
    // 支付密码取消
    onCancel(value) {
      this.safepwdIsShow = value;
    },
    // 支付密码确定
    onConfirm(value) {
      // console.log(typeof(this.number));
      this.safepwdIsShow = value;
      this.$axios
        .post("/commission/save", {
          number: Number(this.number),
          price: this.detailList.price,
        })
        .then((res) => {
          if (res.code != 200) {
            this.$toast(res.msg);
          } else {
            console.log(res);
            if (res.code == 200) {
              this.$toast.success("支付成功");
              this.number = '';
            }
          }
        });
    },
    // 买入
    buyClick() {
      if (!this.number) {
        this.$toast("请输入买入数量");
      } else if (this.number <= 0) {
        this.$toast("买入数量不得为零或者小于零");
      } else {
        this.safepwdIsShow = true;
      }
    },
    // 安全密码值
    getpwdValue(value) {},
    init() {
      this.totalPage = 1;
      this.pageNumber = 1;
      this.requestList();
    },
    onRefresh() {
      setTimeout(() => {
        this.totalPage = 1;
        this.pageNumber = 1;
        this.requestList();
        this.detailList = JSON.parse(this.$route.query.data);
      }, 1000);
    },
    requestList() {
      this.$axios
        .post(`/commission/list?page=${this.pageNumber}&limit=${10}`, {
          page: this.pageNumber,
        })
        .then((res) => {
          this.loading = false;
          this.isLoading = false;
          this.finished = false;
          let arr = res.page.data;
          // console.log(arr);
          if (this.pageNumber == 1) {
            this.list = [];
            this.list = arr;
            this.finished = true;
            this.totalPage = res.page.totalPage;
          } else {
            this.list.push(...arr);
          }
        })
        .catch((err) => {
          this.isLoading = false;
        });
    },
    //页面初始化之后会触发一次，在页面往下加载的过程中会多次调用【上拉加载】
    onLoad() {
      setTimeout(() => {
        if (this.pageNumber >= this.totalPage) {
          this.finished = true;
          this.loading = false;
        } else {
          this.pageNumber++;
          this.requestList();
        }
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-tabs--line .van-tabs__wrap {
  height: 35px;
}
::v-deep .van-tabs__wrap {
  background-color: transparent !important;
}
::v-deep .van-tabs__nav--line {
  width: 25%;
}
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
  .content {
    ul li {
      height: 98px;
      border-bottom: 1px solid #2a4d62;
      .input {
        height: 98px;
        background-color: transparent;
      }
    }
  }
  .order {
    overflow: hidden;
    ul li {
      padding: 23px 16px;
      border-bottom: 1px solid #2a4d62;
    }
  }
  .left,
  .right {
    width: 37%;
    margin-right: 90px;
  }
}
</style>