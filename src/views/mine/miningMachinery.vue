<template>
  <div class="containers bg-black1">
    <!-- 持有矿机 -->
    <navBar :title="title"></navBar>
    <div class="contents m-t-20 t-white">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多"
          loading-text="Loading..."
          @load="onLoad"
        >
          <div class="card fs-min t-white d-flex jc-around ai-center lh-8">
            <div>
              <p>总收益</p>
              <h2 class="fs-xl t-center">{{ reward | notation }}</h2>
            </div>
            <div>
              <p>活跃度</p>
              <h2 class="fs-xl t-center">{{ active | notation }}</h2>
            </div>
            <div>
              <p>总矿机</p>
              <h2 class="fs-xl t-center">{{ millCount | notation }}</h2>
            </div>
          </div>
          <!-- 进行中 已过期 -->
          <div class="experience bg-view m-t-15">
            <van-tabs
              v-model="selected"
              color="#2AB4A1"
              title-active-color="#2AB4A1"
              title-inactive-color="#7494AD"
              line-height="2px"
              line-width="85px"
              :border="false"
              @change="changeClick()"
              class="tabs"
            >
              <van-tab title="进行中">
                <div class="conduct t-white w-100">
                  <ul>
                    <li
                      class="d-flex ai-center"
                      v-for="item in list"
                      :key="item.id"
                    >
                      <van-image
                        :src="item.millLogo"
                        width="77px"
                        height="77px"
                      ></van-image>
                      <div class="flex-1 lh-7 mx-15">
                        <h5 class="fs-md">{{ item.millName }}</h5>
                        <p class="fs-min d-flex jc-between">
                          矿机数量：1<span
                            >产出币：{{ item.relHp | notation }}</span
                          >
                        </p>
                        <p class="fs-min d-flex jc-between">
                          剩余天数：{{
                            item.day - item.digDay > 0
                              ? item.day - item.digDay
                              : 0
                          }}<span>活跃度：{{ item.relActive }}</span>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </van-tab>
              <van-tab title="已过期">
                <div class="overdue">
                  <ul>
                    <li
                      class="d-flex ai-center"
                      v-for="item in list"
                      :key="item.id"
                    >
                      <van-image
                        :src="item.millLogo"
                        width="77px"
                        height="77px"
                      ></van-image>
                      <div class="flex-1 lh-7 mx-15">
                        <h5 class="fs-md">{{ item.millName }}</h5>
                        <p class="fs-min d-flex jc-between">
                          矿机数量：1<span
                            >产出币：{{ item.relHp | notation }}</span
                          >
                        </p>
                        <p class="fs-min d-flex jc-between">
                          剩余天数：{{
                            item.day - item.digDay > 0
                              ? item.day - item.digDay
                              : 0
                          }}<span>活跃度：{{ item.relActive }}</span>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </van-tab>
            </van-tabs>
          </div>
        </van-list>
        <!-- <div class="mine bg-view m-t-15 t-white">
          <ul>
            <li class="d-flex ai-center">
              <van-image
                :src="require('@/assets/mine/kuangji1.png')"
                width="77px"
                height="77px"
              ></van-image>
              <div class="flex-1 lh-7 mx-15">
                <h5 class="fs-md">微型矿机</h5>
                <p class="fs-min d-flex jc-between">
                  矿机数量：0<span>产出币：0</span>
                </p>
                <p class="fs-min d-flex jc-between">
                  剩余天数：0<span>活跃度：0</span>
                </p>
              </div>
            </li>
          </ul>
        </div> -->
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "持有矿机",
      reward: 0.0, //总收益
      active: 0.0, //活跃度
      selected: this.$route.query.active,
      millCount: 0, //持有矿机
      isLoading: false, //控制下拉刷新的加载动画
      finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
      loading: false, //控制上拉加载的加载动画
      totalPage: 1,
      pageNumber: 1,
      list: [],
      // 进行中
      conductList: [],
      // 已过期
      overdueList: [],
    };
  },
  mounted() {
    this.requestHomeInfo();
    this.init();
  },
  methods: {
    init() {
      this.totalPage = 1;
      this.pageNumber = 1;
      this.list = [];
      this.requestList();
    },
    onRefresh() {
      setTimeout(() => {
        this.init();
      }, 1000);
    },
    requestList() {
      this.$axios
        .get(this.$api.millbuyrecord, {
          page: this.pageNumber,
          status: this.selected == 0 ? 1 : 2,
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
    requestHomeInfo() {
      this.$axios.post(this.$api.homeInfo).then((res) => {
        let { reward, active, millCount } = res.data;
        this.reward = reward;
        this.active = active;
        this.millCount = millCount;
      });
    },
    changeClick() {
      this.init();
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
  padding: 0 24px;
  .card {
    height: 252px;
    background: url('../../assets/mine/bg_chiyou.png')
      no-repeat center center/cover;
  }
  .experience,
  .mine {
    border-radius: 8px;
  }
  .conduct,
  .overdue,
  .mine {
    ul li {
      padding: 24px 100px 30px 19px;
    }
  }
}
</style>