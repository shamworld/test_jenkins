<template>
  <div class="containers bg-black1">
    <!-- 交易 -->
    <navBar
      title="交易"
      rightText="记录明细"
      :isShowLeft="false"
      @rightClick="toRecordDetails"
    ></navBar>
    <div class="contents t-white">
      <van-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="onRefresh"
      >
        <div class="d-flex jc-between fs-min lh-5">
          <div class="price">
            <p class="opacity">昨日币价</p>
            <p class="t-green fs-lg">
              {{ detailList.lastPrice }}<span class="fs-min mx-2">USDT</span>
            </p>
            <p class="m-t-5 opacity">今日币价</p>
            <p class="t-green fs-lg">
              {{ detailList.price }}<span class="fs-min mx-2">USDT</span>
            </p>
          </div>
          <div class="number">
            <p class="opacity">今日交易量</p>
            <p class="t-green fs-lg">{{ detailList.traderNumber }}</p>
            <p class="m-t-5 opacity">活跃度</p>
            <p class="t-green fs-lg">{{ detailList.active }}</p>
          </div>
        </div>
        <!-- 手续费 -->
        <div class="charge radius bg-view fs-min lh-5 d-flex my-15">
          <div>
            <p class="opacity">HP今日手续费</p>
            <p class="t-green fs-lg">
              {{ detailList.poundage }}<span class="fs-min">HP</span>
            </p>
          </div>
          <div>
            <p class="opacity">HP总手续费</p>
            <p class="t-green fs-lg">
              {{ detailList.poundageTotal }}<span class="fs-min">HP</span>
            </p>
          </div>
        </div>
        <!-- 折线图 -->
        <div class="chart radius bg-view t-white">
          <div id="mychart"></div>
        </div>
        <div class="d-flex jc-center my-20 opacity">
          <van-button
            color="linear-gradient(0deg, #1E4351 0%, #269887 100%)"
            round
            class="buy-btn fs-lg"
            @click="toPurchase"
            >我要买入</van-button
          >
        </div>
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
          <!-- 求购列表 我的订单 -->
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
              @change="tabsChange"
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
              <van-tab title="我的订单">
                <div class="myorder">
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
                          @click="cancelOrder(item.id)"
                          >撤单</van-button
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
            <van-field
              v-model="serchPhone"
              type="search"
              placeholder="请输入手机号"
              class="search-input"
              right-icon="search"
              @click-right-icon="searchClick"
              autofocus
            ></van-field>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { Dialog } from "vant";
export default {
  data() {
    return {
      active: 0,
      loading: false, //控制上拉加载的加载动画
      finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
      isLoading: false, //控制下拉刷新的加载动画
      totalPage: 1,
      pageNumber: 1,
      list: [], //求购列表
      datax: [],
      datay: [],
      detailList: "", //交易首页详情
      serchPhone: "",
    };
  },
  mounted() {
    this.init();
    this.drawLine();
    this.detail(); //交易首页详情
  },
  methods: {
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
        this.detail();
        this.drawLine();
      }, 1000);
    },
    requestList(status) {
      this.$axios
        .post(`/commission/list?page=${this.pageNumber}&limit=${10}`, {
          // page: this.pageNumber,
          status: status,
        })
        .then((res) => {
          this.loading = false;
          this.isLoading = false;
          this.finished = false;
          let arr = res.page.data;
          // console.log(arr);
          // console.log(this.pageNumber);
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
          this.$toast("加载失败，请重试");
        });
    },
    // 页面初始化之后会触发一次，在页面往下加载的过程中会多次调用【上拉加载】
    onLoad() {
      // console.log(this.pageNumber, this.totalPage);
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
    toPurchase() {
      this.$router.push({
        path: "/transaction/purchase",
        query: { data: JSON.stringify(this.detailList) },
      });
    },

    //交易首页详情
    detail() {
      this.$axios.post("/coinprice/infoDetail", {}).then((res) => {
        // console.log(res);
        if (res.msg != "success") {
          this.$toast(res.msg);
        } else {
          this.detailList = res.data;
        }
      });
    },
    tabsChange(active) {
      // console.log(active);
      this.pageNumber = 1;
      this.$toast.loading("loading...");
      if (active == 0) {
        this.requestList()
        this.onLoad();
        this.$toast.clear();
      } else {
        this.requestList(1);
        this.onLoad();
        this.$toast.clear();
      }
    },
    //搜索
    searchClick() {
      // this.requestList();
      this.$toast.loading("loading");
      // console.log(this.active);
      let status;
      if (this.active == 0) {
      } else {
        status = 1;
      }
      this.$axios
        .post(`/commission/list?page=${this.pageNumber}&limit=${10}`, {
          phoneNumber: this.serchPhone,
          status: status,
        })
        .then((res) => {
          // console.log(res.page.data);
          this.list = [];
          this.list = res.page.data;
          this.finished = true;
          console.log(this.list);
          this.$toast.clear();
        });
    },
    // 折线图
    drawLine() {
      var echarts = require("echarts");
      // 基于准备好的dom，初始化echarts实例
      let lineChart = echarts.init(document.getElementById("mychart"));
      // 绘制图表
      // lineChart.showLoading({
      //   text: "正在努力加载中...",
      // });
      //echarts折线图
      let dataList = [];
      this.$axios.post("/coinprice/list", {}).then((res) => {
        // console.log(res.data);
        if (res.msg != "success") {
          this.$toast(res.msg);
        } else {
          dataList = res.data;
          this.datax = [];
          this.datay = [];
          for (let i = 0; i < dataList.length; i++) {
            this.datax.push(dataList[i].createTime.split(" ")[0]);
            this.datay.push(dataList[i].price);
          }
          // console.log(this.datay);
          this.showLine(lineChart);
        }
      });
    },
    showLine(lineChart) {
      lineChart.setOption({
        backgroundColor: "#2A405C",
        tooltip: {
          trigger: "axis",
        },
        title: {
          left: 26,
          top: 26,
          textStyle: {
            color: "#FFFFFF",
            fontSize: 15,
            fontWeight: 50000,
            fontFamily: "PingFang SC",
          },
        },
        grid: {
          left: "2%",
          right: "2%",
          bottom: "5%",
          top: "8%",
          containLabel: true,
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: this.datay.length > 15 ? 35 : 100,
          },
        ],
        xAxis: {
          axisLine: {
            lineStyle: {
              color: "#2A4C61",
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          //轴线上的字
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: "12",
            },
          },
          //网格线
          splitLine: {
            show: true,
            lineStyle: {
              color: "#2A4C61",
            },
          },
          data: this.datax,
        },
        yAxis: [
          {
            type: "value",
            splitNumber: 4,
            axisTick: {
              show: false,
            },
            //轴线上的字
            axisLabel: {
              textStyle: {
                fontSize: "12",
                color: "#fff",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#2A4C61",
              },
            },
            //网格线
            splitLine: {
              lineStyle: {
                color: "#2A4C61",
              },
            },
            // data: this.datay,
          },
        ],
        series: [
          {
            name: "币价",
            type: "line",
            smooth: false, //是否平滑曲线显示
            showSymbol: false,
            markPoint: {
              data: [
                {
                  name: "周最高",
                  value: 320,
                  xAxis: 4,
                  yAxis: 320,
                },
              ],
            },
            itemStyle: {
              color: "#00D0AA",
              borderColor: "#00D0AA",
              borderWidth: 1,
            },
            lineStyle: {
              normal: {
                width: 3,
                color: "#00D0AA",
                shadowColor: "rgba(249,165,137, 0.5)",
                shadowBlur: 30,
                shadowOffsetY: 5,
              },
            },
            areaStyle: {
              //区域填充样式
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(58,182,224, 0.6)",
                    },
                    {
                      offset: 0.6,
                      color: "rgba(58,182,224, 0.2)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(58,182,224, 0.01)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(58,182,224, 0.1)",
                shadowBlur: 10,
              },
            },
            data: this.datay,
          },
        ],
      });
    },
    // 撤单
    cancelOrder(itemId) {
      Dialog.confirm({
        message: "是否撤单",
        className: "cancel",
        confirmButtonColor: "red",
        cancelButtonColor: "gray",
      })
        .then((res) => {
          this.$toast.loading("loading...");
          this.$axios
            .post("/commission/cancelOrder", {
              id: itemId,
            })
            .then((res) => {
              // console.log(res);
              this.$toast.success("撤单成功");
              this.requestList(1);
            });
        })
        .catch((err) => {});
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
::v-deep .van-field__right-icon {
  color: #fff;
  padding: 0 13px;
}
// ::v-deep .van-dialog{
//   background-color: #2A405C !important;
// }
.contents {
  padding: 24px;
  padding-bottom: 80px;
  .price,
  .number {
    width: 48%;
    background: linear-gradient(90deg, #2a405b, #2a405b, #2a5567);
    border-radius: 18px;
    padding: 25px 31px;
    box-sizing: border-box;
  }
  .charge {
    padding: 24px 32px;
    div {
      width: 50%;
    }
  }
  .chart {
    height: 301px;
    overflow: hidden;
    padding: 10px 0;
    #mychart {
      width: 100%;
      height: 100%;
    }
  }
  .buy-btn {
    width: 60%;
    height: 80px;
  }
  .order {
    overflow: hidden;
    position: relative;
    ul li {
      padding: 23px 16px;
      border-bottom: 1px solid #2a4d62;
    }
    .search-input {
      height: 70px;
      width: 50%;
      position: absolute;
      z-index: 99;
      right: 0;
      top: 0;
      background-color: transparent;
    }
  }
  .left,
  .right {
    width: 35%;
    margin-right: 100px;
  }
}
</style>