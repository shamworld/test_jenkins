<template>
  <!-- 认证失败 -->
  <div class="containers">
    <nav-bar title="实名认证" />
    <div class="contents bg-view px-10">
      <div class="box d-flex ai-center jc-center flex-column">
        <div class="aside d-flex ai-center jc-center">
          <div class="insert d-flex ai-center jc-center">
            <van-image
              :src="require('@/assets/me/renzheng-fail.png')"
              width="92.5px"
              height="92.5px"
            ></van-image>
          </div>
        </div>
        <p class="fs-lg t-white m-t-60">未通过，请重新提交信息~</p>
        <van-button
          class="w-100 m-t-90 fs-lg w-white"
          color="#27A495"
          @click="toVetify"
          >提交审核</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toVetify() {
      this.$router.replace({
        path: "/vertify",
        query: { status: 0 },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  margin-top: 200px;
}
.aside {
  @include wh(310px, 310px);
  background: #5183c4;
  border-radius: 50%;
}
.insert {
  @include wh(246px, 246px);
  background: #5e96de;
  border-radius: 50%;
}
</style>