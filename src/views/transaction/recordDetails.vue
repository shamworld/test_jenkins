<template>
  <div class="containers bg-black1">
    <!-- 记录明细 -->
    <navBar title="记录明细"></navBar>
    <div class="contents">
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
          <ul>
            <li
              class="fs-min t-grey lh-6 bg-view m-t-15"
              v-for="item in list"
              :key="item.id"
            >
              <p class="d-flex jc-between">
                {{ item.createTime }}<span>已完成</span>
              </p>
              <p class="d-flex jc-between t-black2 m-t-7">
                <span>类型</span>
                <span class="fs-sm t-white opacity" v-if="item.type == 1"
                  >买入</span
                >
                <span class="fs-sm t-white opacity" v-else>卖出</span>
              </p>
              <p class="d-flex jc-between t-black2">
                <span v-if="item.type == 1">挂单价格</span>
                <span v-else>订单金额</span>
                <span class="fs-sm t-white opacity">{{ item.price }}</span>
              </p>
              <p class="d-flex jc-between t-black2">
                <span>买入数量</span>
                <span class="fs-sm t-white opacity">{{ item.number }}</span>
              </p>
              <p class="d-flex jc-between t-black2" v-if="item.type == 2">
                手续费<span class="fs-sm t-white opacity">{{ item.fee }}</span>
              </p>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false, //控制下拉刷新的加载动画
      finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
      loading: false, //控制上拉加载的加载动画
      totalPage: 1,
      pageNumber: 1,
      list: [],
    };
  },
  mounted() {
    this.init();
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
        .post(`/orderdetail/list?page=${this.pageNumber}&limit=${10}`, {
          page: this.pageNumber,
          // limit: 10,
        })
        .then((res) => {
          // console.log(res);
          this.loading = false;
          this.isLoading = false;
          this.finished = false;
          let arr = res.page.data;
          // console.log(arr);
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
.contents {
  ul li {
    padding: 17px 24px;
  }
}
</style>