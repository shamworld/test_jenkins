<template>
  <!-- 认证成功 -->
  <div class="containers">
    <nav-bar title="实名认证" />
    <div class="contents px-10">
      <div class="d-flex ai-center jc-center m-t-50">
        <van-image
          :src="require('@/assets/me/yirenzheng.png')"
          width="17.5px"
          height="20px"
        ></van-image>
        <span class="t-green fs-md m-l-10">已认证</span>
      </div>
      <div class="bg-view fs-md t-white m-t-30" style="border-radius: 4px">
        <div class="cell d-flex ai-center jc-between px-10">
          <span>姓名</span>
          <span>{{ info.name }}</span>
        </div>
        <div class="cell d-flex ai-center jc-between px-10">
          <span>身份证</span>
          <span>{{ info.idCard }}</span>
        </div>
      </div>
      <!-- 身份证图片 -->
      <div class="card d-flex jc-between m-t-20">
        <div>
          <van-image
            :src="info.idCardPositive"
            width="100%"
            height="100%"
          ></van-image>
        </div>
        <div>
          <van-image
            :src="info.idCardNegative"
            width="100%"
            height="100%"
          ></van-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: "",
    };
  },
  computed: {},
  mounted() {
    this.info = JSON.parse(this.$route.query.info);
    this.info.idCard = `${this.info.idCard.substring(
      0,
      6
    )}****${this.info.idCard.substring(this.info.idCard.length - 4)}`;
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
::v-deep .van-cell {
  background: transparent;
}
.cell {
  height: 45px;
}
.card {
  div {
    @include wh(48%, 194px);
    background-color: white;
  }
}
</style>