<template>
  <div class="containers t-white fs-md">
    <nav-bar title="我的团队" />
    <div class="contents px-10">
      <van-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="onRefresh"
      >
        <section class="card d-flex flex-column jc-around ai-center p-15">
          <span class="fs-min">等级</span>
          <span class="fs-lg m-t-15 m-b-20">{{ teamtotal.level | Level }}</span>
          <div class="d-flex w-100 jc-between ai-center">
            <div class="d-flex flex-1 flex-column">
              <span class="m-b-15">直推总人数</span>
              <span class="fs-lg">{{ teamtotal.directPushNum }}</span>
            </div>
            <div class="d-flex flex-1 flex-column ai-center">
              <span class="m-b-15">团队总人数</span>
              <span class="fs-lg">{{ teamtotal.team }}</span>
            </div>
            <div class="d-flex flex-1 flex-column ai-end">
              <span class="m-b-15">团队总算力</span>
              <span class="fs-lg">{{ teamtotal.teamComputingPower }}</span>
            </div>
          </div>
        </section>
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="$t('no_more')"
          :loading-text="$t('loading')"
          @load="onLoad"
          error.sync
          error-text="加载失败，请重新加载"
          class="bg-view px-10 p-t-15 m-t-10 fs-min radius9"
        >
          <div class="d-flex jc-between ai-center border-bottom p-b-10">
            <div class="d-flex flex-column jc-between box-item">
              <span class="m-b-10">直推名称</span>
              <span>联系方式</span>
            </div>
            <div class="d-flex flex-column jc-between ai-center box-item">
              <span class="m-b-10">会员算力</span>
              <span>团队算力</span>
            </div>
            <div class="d-flex flex-column jc-between ai-end fs-md box-item">
              会员等级
            </div>
          </div>

          <div
            class="d-flex jc-between ai-center m-t-15 border-bottom p-b-10 t-blue"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="d-flex flex-column jc-between box-item">
              <span class="m-b-10 fs-md">{{ item.userName }}</span>
              <span>{{ item.phoneNumber }}</span>
            </div>
            <div class="d-flex flex-column jc-between ai-center box-item">
              <span class="m-b-10">{{ item.vipExamples }}</span>
              <span>{{ item.teamExamples }}</span>
            </div>
            <div class="d-flex flex-column jc-between ai-end fs-md box-item">
              {{ item.level | Level }}
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  name: "Team",
  data() {
    return {
      loading: false, //控制上拉加载的加载动画
      finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
      isLoading: false, //控制下拉刷新的加载动画
      totalPage: 1,
      pageNumber: 1,
      list: [],
      teamtotal: "", //我的团队统计
    };
  },
  mounted() {
    this.init();
    this.teamTotal();
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
      }, 1000);
    },
    requestList() {
      this.$axios
        .post(`/team/list?page=${this.pageNumber}&limit=${10}`, {
          page: this.pageNumber,
        })
        .then((res) => {
          this.loading = false;
          this.isLoading = false;
          this.finished = false;
          let arr = res.page.data;
          // console.log(arr);
          arr.forEach((item) => {
            var newphone =
              item.phoneNumber.substr(0, 3) +
              "****" +
              item.phoneNumber.substr(item.phoneNumber.length - 4);
            // console.log(newphone);
            item.phoneNumber = newphone;
          });
          if (this.pageNumber == 1) {
            this.list = [];
            this.list = arr;
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
    // 我的团队统计
    teamTotal() {
      this.$axios.post("/team/total", {}).then((res) => {
        this.teamtotal = res.data;
        // console.log(this.teamtotal);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  @include bis("./../../assets/me/tuandui_bg@2x.png");
}
.box-item {
  width: 33.3%;
}
</style>
