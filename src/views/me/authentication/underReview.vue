<template>
  <!-- 审核中 -->
  <div class="containers">
    <nav-bar title="实名认证" />
    <div class="contents bg-view">
      <div class="box">
        <div class="aside d-flex ai-center jc-center">
          <div class="insert d-flex ai-center jc-center">
            <van-image
              :src="require('@/assets/me/renzheng.png')"
              width="92.5px"
              height="92.5px"
            ></van-image>
          </div>
        </div>
        <p class="fs-lg t-white m-t-50">审核中，请耐心等待~</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.box {
  @include center;
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