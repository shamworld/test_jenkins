<template>
  <van-nav-bar
    :title="title"
    :border="false"
    :right-text="rightText"
    @click-left="leftClick"
    @click-right="rightClick"
    :class="[{ active: isactive }]"
  >
    <template #left>
      <van-image
        :src="require('@/assets/login/fanhui.png')"
        width="20px"
        height="20px"
        v-if="isShowLeft"
      ></van-image>
    </template>
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #right>
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    title: { type: String, default: "标题" },
    rightText: { type: String, default: "" },
    isShowLeft: { type: Boolean, default: true },
    isGoBack: { type: Boolean, default: true },
    isactive: { type: Boolean, default: false },
  },

  methods: {
    leftClick() {
      if (this.isGoBack) {
        this.$router.back();
      } else {
        this.$emit("leftClick");
      }
    },
    rightClick() {
      this.$emit("rightClick");
    },
  },
};
</script>

<style lang="scss" scoped>
.van-nav-bar {
  height: 60px;
  background: $black1;
}
.active {
  background-color: $green;
}
::v-deep .van-nav-bar__left {
  top: 20px;
  > span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .van-icon {
    font-size: 0.22rem !important;
    color: aliceblue;
  }
}
::v-deep .van-nav-bar__right {
  top: 25px;
  span {
    font-size: 15px;
    color: #fff;
    opacity: 0.85;
    margin-top: -0.08rem;
    img {
      margin-top: 0.08rem;
    }
  }
}
::v-deep .van-nav-bar__title {
  margin-top: 20px;
  font-size: 18px !important;
  color: #ffffff !important;
}
</style>


<!--

    用法API
    一、可以使用模板。
        
        属性: isShowLeft： 是否显示左边的默认箭头
              如果自定义左边的内容。
              可以使用模板 slot=“left”
              title：标题
              leftText: 左边文字


        <NavBar :title="title" isShowLeft :leftText="leftText" :rightText="'右边文字'" @leftClick="leftClick" @rightClick="rightClick">
            <span slot='left'> left</span>
            <span slot='title'> title </span>
            <span slot='right'>  right </span>
        </NavBar>

 -->