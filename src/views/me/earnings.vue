<!-- 收益明细 -->

<template>
  <div class="containers t-white">
    <nav-bar
      title="收益明细"
      rightText="收益明细列表"
      @rightClick="toEarningsList"
    />
    <div class="contents p-10">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="d-flex jc-between ai-center m-b-15">
          <div class="tip-info d-flex flex-column jc-center p-l-10 m-r-15">
            <span class="fs-min m-b-10">今日收益</span>
            <span class="t-green fs-lg">{{ detailList.totalIncome }}</span>
          </div>
          <div class="tip-info d-flex flex-column jc-center p-l-10">
            <span class="fs-min m-b-10">总收益</span>
            <span class="t-green fs-lg">{{ detailList.todayIncome }}</span>
          </div>
        </div>

        <div class="d-flex jc-between ai-center">
          <div class="tip-info d-flex flex-column jc-center p-l-10 m-r-15">
            <span class="fs-min m-b-10">矿场收益</span>
            <span class="t-green fs-lg">{{ detailList.mineIncome }}</span>
          </div>
          <div class="tip-info d-flex flex-column jc-center p-l-10">
            <span class="fs-min m-b-10">互助收益</span>
            <span class="t-green fs-lg">{{ detailList.helpIncome }}</span>
          </div>
        </div>
        <section class="bg-view radius9 m-t-15 py-10">
          <div class="border-bottom w-100 p-b-15 px-10">
            <span class="fs-lg">达人分红</span>
          </div>
          <div
            class="border-bottom px-10 py-15 d-flex jc-between"
            style="border-radius: 0.05rem"
          >
            <span class="m-l-10 t-blue fs-md">一星矿工达人</span>
            <span class="m-r-10 t-blue fs-md">{{ parseFloat(list.oneStr).toFixed(2) }}</span>
          </div>
          <div
            class="border-bottom px-10 py-15 d-flex jc-between"
            style="border-radius: 0.05rem"
          >
            <span class="m-l-10 t-blue fs-md">二星矿工达人</span>
            <span class="m-r-10 t-blue fs-md">{{ parseFloat(list.twoStr).toFixed(2) }}</span>
          </div>
          <div
            class="border-bottom px-10 py-15 d-flex jc-between"
            style="border-radius: 0.05rem"
          >
            <span class="m-l-10 t-blue fs-md">三星矿工达人</span>
            <span class="m-r-10 t-blue fs-md">{{ parseFloat(list.threeStr).toFixed(2) }}</span>
          </div>
          <div
            class="border-bottom px-10 py-15 d-flex jc-between"
            style="border-radius: 0.05rem"
          >
            <span class="m-l-10 t-blue fs-md">四星矿工达人</span>
            <span class="m-r-10 t-blue fs-md">{{ parseFloat(list.fourStr).toFixed(2) }}</span>
          </div>
        </section>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  name: "Earnings",
  data() {
    return {
      loading: false, //控制上拉加载的加载动画
      finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
      isLoading: false, //控制下拉刷新的加载动画
      totalPage: 1,
      pageNumber: 1,
      detailList: "",
      list: [],
    };
  },
  mounted() {
    this.requestList();
    this.bonus();
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.requestList();
      }, 1000);
    },
    requestList() {
      this.$axios
        .post("/team/incomeDetail", {})
        .then((res) => {
          this.isLoading = false;
          this.detailList = res.data;
          // console.log(this.detailList);
        })
        .catch((err) => {
          this.isLoading = false;
        });
    },
    toEarningsList() {
      this.$router.push("/earningslist");
    },
    //达人分红
    bonus() {
      this.$axios.post("/team/talentShare", {}).then((res) => {
        // console.log(res.data);
        this.list = res.data;
        // let realVal = parseFloat(res.data.threeStr).toFixed(2)
        // console.log(realVal);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tip-info {
  flex: 1;
  height: 133px;
  background: linear-gradient(90deg, #2a405b, #2a405b, #2a5567);
  border-radius: 18px;
}

::v-deep .van-cell {
  background: transparent;
}
</style>
