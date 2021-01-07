<template>
  <div class="containers t-white">
    <!-- 资产 -->
    <nav-bar title="资产" :isShowLeft="false"></nav-bar>
    <div class="contents t-white">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        success-text="刷新成功"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多"
          loading-text="Loading..."
          error.sync
          error-text="加载失败，请重新加载"
          @load="onLoad"
        >
          <div class="card">
            <p class="fs-min">总资产</p>
            <h4 class="my-15">{{ totalAssets }} USDT</h4>
            <div class="btn fs-md d-flex jc-between">
              <div class="t-center" @click="toRechargeCurrency">充币</div>
              <div class="t-center" @click="toWithdrawMoney">提币</div>
              <div class="t-center" @click="toTransfer">划转</div>
            </div>
          </div>
          <!-- 资金账户 互转账户 -->
          <div class="account m-t-15 bg-view radius">
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
              <van-tab title="资金账户">
                <div class="priceAccount t-white w-100">
                  <ul>
                    <li
                      class="fs-min t-grey lh-5 bg-view m-t-10 py-10 px-10"
                      v-for="item in capitalList"
                      :key="item.id"
                    >
                      <h5 class="fs-lg t-green">{{ item.coinName }}</h5>
                      <div class="d-flex m-t-5">
                        <div class="available">
                          <p class="t-blue">可用</p>
                          <p class="fs-md">{{ item.balance }}</p>
                        </div>
                        <div class="frozen">
                          <p class="t-blue">冻结</p>
                          <p class="fs-md">{{ item.freezeBalance }}</p>
                        </div>
                        <div class="conversion">
                          <p class="t-blue">折合</p>
                          <p class="fs-md">{{ item.toUsdtNumber }}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </van-tab>
              <!-- <van-tab title="互助账户">
                <div class="history">
                  <ul>
                    <li
                      class="fs-min t-grey lh-5 bg-view m-t-10 py-10 px-10"
                      v-for="item in turnList"
                      :key="item.id"
                    >
                      <h5 class="fs-lg t-green">{{ item.coinName }}</h5>
                      <div class="d-flex m-t-5">
                        <div class="available">
                          <p class="t-blue">可用</p>
                          <p class="fs-md">{{ item.balance }}</p>
                        </div>
                        <div class="frozen">
                          <p class="t-blue">冻结</p>
                          <p class="fs-md">{{ item.staticBalance }}</p>
                        </div>
                        <div class="conversion">
                          <p class="t-blue">折合</p>
                          <p class="fs-md">{{ item.toUsdtNumber }}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </van-tab> -->
            </van-tabs>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      isLoading: false, //控制下拉刷新的加载动画
      finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
      loading: false, //控制上拉加载的加载动画
      totalPage: 1,
      pageNumber: 1,
      totalAssets: "", //总资产
      capitalList: [], //资金账户列表
      turnList: [], //互助资金列表
    };
  },
  mounted() {
    this.init();
    this.getList();
  },
  methods: {
    // 充币
    toRechargeCurrency() {
      this.$router.push("/capital/rechargeCurrency");
    },
    // 提币
    toWithdrawMoney() {
      this.$router.push("/capital/withdrawMoney");
    },
    // 划转
    toTransfer() {
      // this.$router.push("/capital/transfer");
    },
    init() {
      this.totalPage = 1;
      this.pageNumber = 1;
      this.getList();
    },
    onRefresh() {
      setTimeout(() => {
        this.totalPage = 1;
        this.pageNumber = 1;
        this.getList();
      }, 1000);
    },
    //页面初始化之后会触发一次，在页面往下加载的过程中会多次调用【上拉加载】
    onLoad() {
      this.finished = true;
      this.loading = false;
    },
    getList() {
      this.$axios.post("/wallet/list", {}).then((res) => {
        // console.log(res.data.walletList);
        this.totalAssets = res.data.number;
        this.capitalList = res.data.walletList;
        // this.turnList = res.data.walletList;
        this.isLoading = false;
      });
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
  padding: 24px;
  padding-bottom: 75px;
  .card {
    border-radius: 36px;
    background: url("https://i.loli.net/2020/10/15/OADhoLrZVdpxNq5.png")
      no-repeat center center/cover;
    // background-size: 100% 272px;
    padding: 44px 42px;
    box-sizing: border-box;
    // overflow: hidden;
    .btn {
      line-height: 50px;
      div {
        width: 30%;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.35);
        opacity: 0.85;
      }
    }
  }
  .account {
    overflow: hidden;
    padding-bottom: 50px;
  }
  .available {
    width: 40%;
  }
  .frozen {
    width: 30%;
  }
  .conversion {
    width: 30%;
  }
}
</style>