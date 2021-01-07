<template>
  <div class="containers">
    <!-- 购买记录 -->
    <navBar title="购买记录"></navBar>
    <div class="contents">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多"
          loading-text="Loading..."
          @load="onLoad"
        >
          <ul>
            <li
              class="fs-min t-grey lh-6 bg-view m-t-15"
              v-for="item in list"
              :key="item.id"
            >
              <p class="d-flex jc-between">
                {{ item.createTime }}<span>{{item.status==1?'正常运行':'已过期'}}</span>
              </p>
              <p class="d-flex jc-between t-black2 m-t-7">
                购买类型<span class="fs-sm t-white">{{ item.millName }}</span>
              </p>
              <p class="d-flex jc-between t-black2">
                购买数量<span class="fs-sm t-white">1</span>
              </p>
              <p class="d-flex jc-between t-black2">
                消耗金额<span class="fs-sm t-white">{{ item.millPrice }}{{item.millName=='USDT矿机'?'USDT':'HP'}}</span>
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
      list: [

      ],
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
        .post(this.$api.millbuyrecord, {
          page: this.pageNumber,
        })
        .then((res) => {
          this.loading = false;
          this.isLoading = false;
          this.finished = false;
          let arr = res.data.data;
          if (this.pageNumber == 1) {
            this.list = [];
            this.list = arr;
            this.totalPage = res.data.totalPage;
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
  // height: 88vh;
  ul li {
    padding: 17px 24px;
  }
}
</style>