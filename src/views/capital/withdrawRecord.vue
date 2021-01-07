<template>
  <div class="containers bg-black1">
    <!-- 提现记录 -->
    <navBar title="提现记录"></navBar>
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
                <span>{{ item.createTime }}</span>
                <span v-if="(item.status = 'create')">处理中</span>
                <span v-else-if="(item.status = 'yes')" class="t-green"
                  >已完成</span
                >
                <span v-else class="t-red">失败</span>
              </p>
              <p class="d-flex jc-between t-black2 m-t-7">
                提币币种<span class="fs-sm t-white">{{ item.coinName }}</span>
              </p>
              <p class="d-flex jc-between t-black2 m-t-7">
                提币数量<span class="fs-sm t-white">{{ item.number }}</span>
              </p>
              <p class="d-flex jc-between t-black2">
                矿工费<span class="fs-sm t-white">{{ item.fee }}</span>
              </p>
              <p class="address d-flex jc-between t-black2">
                对方账户<span class="fs-min t-white opacity t-right">{{
                  item.address
                }}</span>
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
        .post("/walletmention/list", {
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
    .address {
      word-break: break-all;
      word-wrap: break-word;
      span {
        width: 80%;
        text-indent: 1em;
      }
    }
  }
}
</style>