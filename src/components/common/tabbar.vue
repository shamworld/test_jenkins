<template>
  <div class="bottom-tab">
    <span class="tab-item fs-min" @click="switchTo('/mine')" v-if="isShow">
      <img
        :src="
          $route.path.includes('/mine')
            ? tabBarImgArr[0].selected
            : tabBarImgArr[0].normal
        "
        alt
      />
      <span
        :class="{ on: $route.path.includes('/mine') }"
        >矿场</span
      >
    </span>
    <span class="tab-item fs-min" @click="switchTo('/mutualaid')">
      <img
        :src="
          $route.path.includes('/mutualaid')
            ? tabBarImgArr[1].selected
            : tabBarImgArr[1].normal
        "
        alt
      />
      <span
        :class="{ on: $route.path.includes('/mutualaid') }"
        >互助</span
      >
    </span>
    <span class="tab-item fs-min" @click="switchTo('/transaction')">
      <img
        :src="
          $route.path.includes('/transaction')
            ? tabBarImgArr[2].selected
            : tabBarImgArr[2].normal
        "
        alt
      />
      <span
        :class="{ on: $route.path.includes('/transaction') }"
        >交易</span
      >
    </span>
    <span class="tab-item fs-min" @click="switchTo('/capital')" v-if="isShow">
      <img
        :src="
          $route.path.includes('/capital')
            ? tabBarImgArr[3].selected
            : tabBarImgArr[3].normal
        "
        alt
      />
      <span
        :class="{ on: $route.path.includes('/capital') }"
        >资产</span
      >
    </span>
    <span class="tab-item fs-min" @click="switchTo('/me')">
      <img
        :src="
          $route.path.includes('/me')
            ? tabBarImgArr[4].selected
            : tabBarImgArr[4].normal
        "
        alt
      />
      <span
        :class="{ on: $route.path.includes('/me') }"
        >个人</span
      >
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabBarImgArr: [
        {
          normal: require("./../../assets/tabbar/kuangchang01.png"),
          selected: require("./../../assets/tabbar/kuangchang02.png"),
        },
        {
          normal: require("./../../assets/tabbar/huzhu01.png"),
          selected: require("./../../assets/tabbar/huzhu02.png"),
        },
        {
          normal: require("./../../assets/tabbar/jiaoyi01.png"),
          selected: require("./../../assets/tabbar/jiaoyi02.png"),
        },
        {
          normal: require("./../../assets/tabbar/zichan01.png"),
          selected: require("./../../assets/tabbar/zichan02.png"),
        },
        {
          normal: require("./../../assets/tabbar/geren01.png"),
          selected: require("./../../assets/tabbar/geren02.png"),
        },
      ],
      isShow: true,
    };
  },
  methods: {
    switchTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom-tab {
  width: 100%;
  height: 98px;
  background: #2A405C;
  border-radius: 20px 20px 0px 0px;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  z-index: 999;
}
.tab-item {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9f9f9f;
}
img {
  width: 43px;
  height: 43px;
  margin-top: 3px;
  margin-bottom: 12px;
}
.on {
  color: #2ab4a1;
}
span {
  margin-bottom: 2px;
  color: #90b5cc;
}
/*无限旋转动画*/
// @keyframes changView {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }
</style>