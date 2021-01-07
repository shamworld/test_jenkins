<template>
  <div class="containers">
    <nav-bar title="平台公告" />
    <div class="contents">
      <van-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="onRefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="$t('no_more')"
          :loading-text="$t('loading')"
          @load="onLoad"
          error.sync
          error-text="加载失败，请重新加载"
          class="px-10 fs-min"
        >
          <div
            class="d-flex bg-view radius9 flex-column m-t-15 border-bottom p-b-10 t-blue"
            v-for="item in list"
            :key="item.id"
          >
            <div class="p-8 t-white fs-md" v-html="item.noticeTitle"></div>
            <div
              class="p-8 t-black9 lh-3 border-bottom content-text"
              v-html="item.noticeContent"
            ></div>
            <van-cell
              center
              is-link
              :to="{
                path: '/notice/detail',
                query: { list: JSON.stringify(item) },
              }"
            >
              <template #title>
                <span class="m-l-10 t-black9 fs-md">查看详情</span>
              </template>

              <template #right-icon>
                <van-image
                  :src="require('@/assets/me/icon_jinru03@2x.png')"
                  width="12"
                  height="12"
                ></van-image>
              </template>
            </van-cell>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notice",
  data() {
    return {
      loading: false, //控制上拉加载的加载动画
      finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
      isLoading: false, //控制下拉刷新的加载动画
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
        .post("/platformnotice/list", {
          page: this.pageNumber,
        })
        .then((res) => {
          this.loading = false;
          this.isLoading = false;
          this.finished = false;
          let arr = res.page.data;
          // console.log(res);
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
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-cell {
  background: transparent;
}
.content-text {
  height: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
