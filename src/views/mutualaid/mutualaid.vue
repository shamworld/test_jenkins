<template>
  <div class="containers bg-black1">
    <!-- 互助 -->
    <navBar title="互助" :isShowLeft="false"></navBar>
    <div class="contents t-white">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多"
          loading-text="Loading..."
          @load="onLoad"
        >
          <div class="top bg-view d-flex ai-center jc-around lh-5">
            <div class="t-center">
              <p class="fs-min opacity">HP质押数量</p>
              <p class="fs-lg t-green">0.0000</p>
            </div>
            <div class="t-center">
              <p class="fs-min opacity">HP质押数量</p>
              <p class="fs-lg t-green">0.0000</p>
            </div>
          </div>
          <!-- 提供帮助 获得帮助 -->
          <div class="help-box my-15 d-flex jc-between">
            <div
              class="item t-green d-flex ai-center jc-around lh-4"
              @click="toProvidehelp"
            >
              <div>
                <p class="fs-lg">提供帮助</p>
                <p class="fs-min">HELP</p>
              </div>
              <van-image
                :src="require('@/assets/mutualaid/banmgzhu02.png')"
                width="47px"
                height="48.5px"
              ></van-image>
            </div>
            <div
              class="item t-green d-flex ai-center jc-around lh-4"
              @click="toGethelp"
            >
              <div>
                <p class="fs-lg">获得帮助</p>
                <p class="fs-min">GET HELP</p>
              </div>
              <van-image
                :src="require('@/assets/mutualaid/banmgzhu01.png')"
                width="47px"
                height="48.5px"
              ></van-image>
            </div>
          </div>
          <!-- 匹配订单 订单历史 -->
          <div class="order my-15 bg-view radius">
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
              <van-tab title="匹配订单">
                <div class="matching t-white w-100">
                  <ul>
                    <li
                      class="fs-min t-grey lh-5 bg-view m-t-10"
                      v-for="item in matchingList"
                      :key="item.id"
                    >
                      <p class="d-flex jc-between t-black2">
                        {{ item.time
                        }}<span
                          class="t-green d-flex ai-center"
                          @click="toComplaint"
                          >申诉<van-icon
                            name="arrow"
                            class="mx-2 t-black2 opacity"
                        /></span>
                      </p>
                      <p class="d-flex jc-between t-white opacity m-t-7">
                        倒计时<span class="fs-sm t-white opacity">{{
                          item.countdown
                        }}</span>
                      </p>
                      <p class="d-flex jc-between t-white opacity">
                        帮助信息<span class="fs-sm t-white opacity">{{
                          item.info
                        }}</span>
                      </p>
                      <p class="d-flex jc-between t-white opacity">
                        USDT地址<span class="fs-sm t-white opacity">{{
                          item.address
                        }}</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </van-tab>
              <van-tab title="订单历史">
                <div class="history">
                  <ul>
                    <li
                      class="fs-min t-grey lh-5 bg-view m-t-10"
                      v-for="item in historyList"
                      :key="item.id"
                    >
                      <p class="d-flex jc-between t-black2">
                        {{ item.time
                        }}<span class="t-green d-flex ai-center">{{
                          item.state
                        }}</span>
                      </p>
                      <p class="d-flex jc-between t-white opacity m-t-7">
                        类型<span class="fs-sm t-white opacity">{{
                          item.type
                        }}</span>
                      </p>
                      <p class="d-flex jc-between t-white opacity">
                        金额<span class="fs-sm t-white opacity">{{
                          item.money
                        }}</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </van-tab>
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
      matchingList: [
        // {
        //   time: "2020-05-28 12:12:12",
        //   countdown: "24:00:00",
        //   info: "小明→小李",
        //   address: "oxsda132ds1a3ds1a3sdadsa3d56",
        // },
        // {
        //   time: "2020-05-28 12:12:12",
        //   countdown: "24:00:00",
        //   info: "小李→小明",
        //   address: "oxsda132ds1a3ds1a3sdadsa3d56",
        // },
      ],
      historyList: [
        // {
        //   time: "2020-05-28 12:12:12",
        //   state: "排队中",
        //   type: "提供帮助",
        //   money: "10000.0000 USDT",
        // },
        // {
        //   time: "2020-05-28 12:12:12",
        //   state: "排队中",
        //   type: "获得帮助",
        //   money: "10000.0000 USDT",
        // },
        // {
        //   time: "2020-05-28 12:12:12",
        //   state: "代收款",
        //   type: "获得帮助",
        //   money: "10000.0000 USDT",
        // },
        // {
        //   time: "2020-05-28 12:12:12",
        //   state: "已完成",
        //   type: "获得帮助",
        //   money: "10000.0000 USDT",
        // },
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 提供帮助
    toProvidehelp() {
      this.$router.push("/mutualaid/providehelp");
    },
    // 获得帮助
    toGethelp() {
      this.$router.push("/mutualaid/gethelp");
    },
    // 投诉
    toComplaint() {
      this.$router.push("/mutualaid/complaint");
    },
    init() {
      this.totalPage = 1;
      this.pageNumber = 1;
      // this.requestList();
    },
    onRefresh() {
      setTimeout(() => {
        this.totalPage = 1;
        this.pageNumber = 1;
        this.requestList();
      }, 1000);
    },
    requestList() {
      let api = "";

      // this.$axios
      //   .get(api, {
      //     page: this.pageNumber
      //   })
      //   .then(res => {
      this.loading = false;
      this.isLoading = false;
      this.finished = false;
      let arr = res.data.data;
      if (this.pageNumber == 1) {
        this.matchingList = [];
        this.matchingList = arr;
        this.totalPage = res.data.last_page;
      } else {
        this.matchingList.push(...arr);
      }
      // })
      // .catch(err => {
      //   this.isLoading = false;
      // });
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
  width: 50%;
}
.contents {
  padding: 31px 24px 70px 24px;
  .top {
    height: 230px;
    border-radius: 18px;
  }
  .help-box {
    .item {
      @include wh(48%, 74.5px);
      background: linear-gradient(90deg, #2a405b, #2a405b, #2a5567);
      border-radius: 9px;
    }
  }
  .order {
    overflow: hidden;
    // padding-bottom: 80px;
    ul li {
      padding: 20px 18px;
      border-bottom: 1px solid #2a4d62;
      &:last-child {
        border: none;
      }
    }
  }
}
</style>