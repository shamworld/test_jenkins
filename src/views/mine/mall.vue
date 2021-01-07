<template>
  <div class="containers bg-black1">
    <!-- 矿机商城 -->
    <navBar
      title="矿机商城"
      rightText="购买记录"
      @rightClick="toRecords"
    ></navBar>
    <div class="contents t-white">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <ul>
          <li
            class="m-t-15 bg-view d-flex ai-center"
            v-for="item in list"
            :key="item.id"
          >
            <van-image :src="item.logo" width="77px" height="77px"></van-image>
            <div class="fs-md lh-5 mx-15 flex-1">
              <h4 class="fs-lg">{{ item.name }}</h4>
              <p class="t-grey">
                {{ `${item.price}${item.payName.toUpperCase()} ${item.day}天`
                }}{{ item.payName.toUpperCase() == "USDT" ? "（金本位）" : "" }}
              </p>
              <div class="d-flex ai-center jc-between t-grey">
                <p v-if="item.payName.toUpperCase() == 'USDT'">
                  {{ `${item.outputHp}+${item.outputActive}活跃度` }}
                </p>
                <p v-else>
                  {{
                    `${item.outputHp}${item.payName.toUpperCase()}+${
                      item.outputActive
                    }活跃度`
                  }}
                </p>
                <div
                  class="buy t-center t-white"
                  @click="buyPopup(item)"
                  ref="item"
                >
                  一键购买
                </div>
              </div>
            </div>
          </li>
        </ul>
      </van-pull-refresh>
    </div>

    <!-- 购买弹窗 -->
    <van-popup v-model="buyIsShow">
      <div class="buypopup bg-view t-white fs-md">
        <p class="fs-lg t-center">购买矿机</p>
        <p class="d-flex jc-between m-t-20 t-white1">
          矿机名称 <span>{{ content.name }}</span>
        </p>
        <p class="d-flex jc-between m-t-30 t-white1">
          价格
          <span v-if="content.payName == 'USDT'">{{
            `${content.day}产出${content.outputHp}+${content.outputActive}活跃度`
          }}</span>
          <span v-else>{{
            `${content.day}产出${content.outputHp}${content.payName}+${content.outputActive}活跃度`
          }}</span>
        </p>
        <van-field
          v-model="content.price"
          class="buyinput m-t-10"
          disabled
          :border="false"
        >
          <template #right-icon>
            <span>{{ content.payName }}</span>
          </template>
        </van-field>
        <p class="fs-min my-10 t-black2">{{ content.payName }}余额：{{walletBalance}}</p>
        <div class="d-flex jc-between fs-lg">
          <div class="cancel t-center bg-green" @click="onClose">取消</div>
          <div class="confirm t-center bg-green t-white" @click="confirm">
            确定
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buyIsShow: false, //购买弹窗
      list: [],
      content: {}, //当前点击的内容
      isLoading: false, //控制下拉刷新的加载动画
      walletBalance: null, //钱包余额
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    toRecords() {
      this.$router.push("/mall/records");
    },
    // 一键购买
    buyPopup(item) {
      this.content = item;
      this.buyIsShow = true;
      this.getwalletInfo();
    },
    onClose() {
      this.buyIsShow = false;
    },
    confirm() {
      this.$toast.loading("loading...");
      this.$axios
        .post(this.$api.millBuy, {
          millId: this.content.id,
        })
        .then((res) => {
          this.$toast.clear();
          if (res.code != 200) {
            this.$toast(res.msg);
          } else {
            this.$toast.success("购买成功");
          }
          this.buyIsShow = false;
          this.requestList();
        });
    },
    init() {
      this.requestList();
    },
    onRefresh() {
      setTimeout(() => {
        this.requestList();
      }, 1000);
    },
    requestList() {
      this.$axios
        .get(this.$api.millList)
        .then((res) => {
          this.isLoading = false;
          let arr = res.data;
          this.list = [];
          this.list = arr;
        })
        .catch((err) => {
          this.isLoading = false;
        });
    },
    //根据币种名称查询钱包信息
    getwalletInfo() {
      // console.log(this.content.payName);
      this.$axios
        .post("/wallet/infoByName", {
          coinName: this.content.payName,
        })
        .then((res) => {
          // console.log(res.data.balance);
          this.walletBalance = res.data.balance
        });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-field__right-icon {
  color: #fff;
  margin-right: 4px;
}

.contents {
  ul li {
    padding: 20px 24px;

    .buy {
      line-height: 53px;
      background: linear-gradient(0deg, #1e4351 0%, #269887 100%);
      border-radius: 27px;
      padding: 2px 24px;
    }
  }
}

.buypopup {
  width: 607px;
  // height: 532px;
  border-radius: 12px;
  padding: 27px;
  box-sizing: border-box;

  .buyinput {
    background-color: #1b2c42;
    height: 88px;
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
}
</style>
