<template>
  <div class="containers">
    <!-- 收益明细列表 -->
    <navBar title="收益明细列表"></navBar>
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
            <li class="fs-min t-grey lh-6 bg-view m-t-15">
              <div class="d-flex ai-center list-box m-b-7">
                <span>时间</span>
                <span>币种</span>
                <span>数量</span>
                <span>类型</span>
              </div>
              <div class="d-flex ai-center t-white list-box m-t-4" v-for="(item,index) in list" :key="index">
                <span>{{item.createTime}}</span>
                <span>{{item.coinName}}</span>
                <span>{{item.changeBalance}}</span>
                <span>{{item.operationType}}</span>
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
        .post(`/walletbalancedetail/list?page=${this.pageNumber}&limit=${10}`, {
          page: this.pageNumber,
          type: 1
        })
        .then((res) => {
          this.loading = false;
          this.isLoading = false;
          this.finished = false;
          let arr = res.page.data;
          console.log(arr);
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
  // height: 88vh;
  ul li {
    padding: 17px 24px;
    .list-box{
      span{
        display: inline-block;
        &:nth-child(1){
          width: 42%;
        }
        &:nth-child(2),&:nth-child(3),&:nth-child(4){
          width: 20%;
        }
      }
    }
  }
}
</style>