<template>
  <div class="containers bg-black1">
    <!-- 投诉记录 -->
    <navBar title="投诉记录"></navBar>
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
              class="bg-view fs-sm t-white m-t-15"
              v-for="item in list"
              :key="item.id"
            >
              <div class="title d-flex jc-between">
                <p class="opacity">{{ item.time }}</p>
                <span class="t-green opacity">已完成</span>
              </div>
              <div class="content lh-7">
                <p class="t-blue fs-min">投诉内容</p>
                <p class="fs-md t-black9">{{ item.content }}</p>
                <p class="t-blue fs-min">投诉用户</p>
                <p class="fs-md t-black9">{{ item.user }}</p>
              </div>
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
        {
          time: "2020-10-10 10:10:10",
          content: "对方不打款，或者收款不确认",
          user: "小明",
        },
        {
          time: "2020-10-10 10:10:10",
          content: "对方不打款，或者收款不确认",
          user: "小明",
        },
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
        this.list = [];
        this.list = arr;
        this.totalPage = res.data.last_page;
      } else {
        this.list.push(...arr);
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
.contents {
  padding: 0 24px;
  ul li {
    border-radius: 8px;
    .title,
    .content {
      padding: 21px 12px;
      box-sizing: border-box;
      border-bottom: 1px solid #2a4d62;
    }
    .content {
      border: none;
    }
  }
}
</style>