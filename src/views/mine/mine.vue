<template>
  <div class="container bg-black1" style="padding-bottom: 80px">
    <!-- 矿场 -->
    <div class="getmine t-white fs-sm">
      <div class="person">个人持有算力：{{ power | notation }}</div>
      <div class="activity m-t-10">活跃度：{{ active | notation }}</div>
      <div class="btn fs-lg t-center" @click="getmillrelease">一键收矿</div>
      <transition name="fade">
        <div v-if="flag">
          <li
            class="circular d-flex jc-center ai-center"
            v-for="item in circularList"
            :key="item.id"
            :style="item.style"
          >
            {{ item.number }}
          </li>
        </div>
      </transition>
    </div>
    <div class="contents t-white fs-md">
      <div class="shop bg-view">
        <p class="d-flex jc-between ai-center">
          矿池商城<span class="fs-min d-flex ai-center" @click="tomine"
            >更多<van-icon name="arrow"
          /></span>
        </p>
        <van-grid :border="false" :column-num="3" class="grid">
          <van-grid-item>
            <template #default>
              <van-image
                :src="require('@/assets/mine/kuangji1.png')"
                width="81px"
                height="75px"
              />
              <span class="t-grey">小矿机</span>
            </template>
          </van-grid-item>
          <van-grid-item>
            <template #default>
              <van-image
                :src="require('@/assets/mine/kuangji2.png')"
                width="81px"
                height="75px"
              />
              <span class="t-grey">中矿机</span>
            </template>
          </van-grid-item>
          <van-grid-item>
            <template #default>
              <van-image
                :src="require('@/assets/mine/kuangji3.png')"
                width="81px"
                height="75px"
              />
              <span class="t-grey">大矿机</span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="section d-flex jc-between m-t-15">
        <div class="item d-flex ai-center px-20" @click="toMachinery(0)">
          <van-image
            :src="require('@/assets/mine/kuangji01.png')"
            width="28px"
            height="28px"
          ></van-image>
          <div class="lh-4 mx-20">
            <p class="fs-min">持有矿机</p>
            <p class="t-green fs-lg">{{ hold }}</p>
          </div>
        </div>
        <div class="item d-flex ai-center px-20" @click="toMachinery(1)">
          <van-image
            :src="require('@/assets/mine/kuangji02.png')"
            width="28px"
            height="28px"
          ></van-image>
          <div class="lh-4 mx-20">
            <p class="fs-min">过期矿机</p>
            <p class="t-green fs-lg">{{ overDie }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      power: 0.0, //个人持币算力
      active: 0.0, //活跃度
      hold: 0, //持有矿机
      overDie: 0, //过期矿机
      circularList: [],
      leftArr: [15, 30, 45, 60, 75],
      topArr: [30, 38, 45],
      flag: true,
    };
  },
  mounted() {
    this.requestHomeInfo();
    this.circularRecord(); //收益记录
  },
  methods: {
    Gets(Arr, num) {
      var arr = new Array(); //这个数组的目的是把传入进来的数组复制一份
      for (var i in Arr) {
        arr.push(Arr[i]);
      } //这个for 循环用来把传入的数组复制一份

      var return_arr = new Array(); //存储随机数用的数组
      for (var i = 0; i < num; i++) {
        //获取随机数
        if (arr.length > 0) {
          var nums = Math.floor(Math.random() * arr.length); //从arr里面随机一个地址并 赋给变量nums
          return_arr[i] = arr[nums]; //将arr地址里的值 给   return_arr[i];
          arr.splice(nums, 1); //删除 地址上的数字，防止在随机出来重复的
        } else {
          break;
        }
      }
      // console.log(return_arr[0]);
      return return_arr[0] + parseInt(Math.random() * 8); //返回获取的1个值
    },
    tomine() {
      this.$router.push("/mine/mall");
    },
    circularRecord() {
      //收益记录
      this.$axios.post("/millreleaserecord/list", {}).then((res) => {
        res.data.forEach((elem) => {
          elem.style = { top: "", left: "" };
        });
        this.circularList = res.data;
        this.circularList.forEach((elem) => {
          elem.style.left = this.Gets(this.leftArr, 1) + "%";
          elem.style.top = this.Gets(this.topArr, 1) + "%";
        });
      });
    },
    toMachinery(num) {
      // console.log(num);
      this.$router.push({
        path: "/mine/miningMachinery",
        query: { active: num },
      });
    },
    requestHomeInfo() {
      this.$axios.post(this.$api.homeInfo).then((res) => {
        let { active, power, hold, overDie } = res.data;
        this.active = active;
        this.power = power;
        this.hold = hold;
        this.overDie = overDie;
      });
    },
    // 一键收矿
    getmillrelease() {
      this.$axios.post("/millreleaserecord/extract", {}).then((res) => {
        console.log(res.data);
        if (res.code == 200) {
          this.flag = false;
          this.$toast.success("收取成功");
          this.circularList = [];
          this.circularRecord();
          this.requestHomeInfo();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
//自上向下
@keyframes fadeInDownBig {
  from {
    opacity: 1;
    -webkit-transform: translate3d(0, 4rem, 0);
    transform: translate3d(0, 4rem, 0);
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, 8rem, 0);
    transform: translate3d(0, 8rem, 0);
  }
}
.fade-leave-active {
  transform-origin: center center;
  animation: fadeInDownBig 1s linear;
}
.container {
  padding-bottom: 100px;
}

.getmine {
  height: 817px;
  position: relative;
  background: url("https://i.loli.net/2020/10/14/vMkRmrlxV1qfU4i.png") no-repeat
    center center/cover;

  .person,
  .activity {
    padding: 15px 56px;
    box-sizing: border-box;
    background: #23716f;
    opacity: 0.5;
    border-radius: 0px 28px 28px 0px;
    position: absolute;
    left: 0;
    top: 157px;
  }

  .person {
    top: 92px;
  }

  .btn {
    width: 410px;
    line-height: 80px;
    background: linear-gradient(0deg, #1e4351 0%, #269887 100%);
    border-radius: 40px;
    position: absolute;
    bottom: 25px;
    @include cl;
  }
  .circular {
    @include wh(100px, 100px);
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid #2ac8ae;
    border-radius: 50%;
    position: absolute;
    box-shadow: 0px 0px 8px #ccc inset;
    animation: scaleDraw 3s linear infinite;
  }
}

.contents {
  padding: 32px 24px;
  box-sizing: border-box;

  .shop {
    padding: 18px 15px;
    border-radius: 18px;
  }

  .section {
    .item {
      @include wh(48%, 162px);
      background: linear-gradient(90deg, #2a405b, #2a405b, #2a5567);
      border-radius: 18px;
      box-sizing: border-box;
    }
  }
}

::v-deep .van-grid-item__content {
  background-color: transparent;
}
</style>
