<template>
<div class="containers">
  <nav-bar title="安全设置" />
  <div class="contents">
    <ul class="bg-view m-10 radius9">
      <li class="border-bottom px-10 py-15">
        <van-cell center is-link to="/security/editLoginPsw">
          <template #title>
            <span class="m-l-10 t-blue fs-md">修改登录密码</span>
          </template>
          <template #right-icon>
            <van-image :src="require('@/assets/me/icon_jinru03@2x.png')" width="12" height="12"></van-image>
          </template>
        </van-cell>
      </li>

      <li class="border-bottom px-10 py-15">
        <van-cell center is-link to="/security/editPayPsw">
          <template #title>
            <span class="m-l-10 t-blue fs-md">修改支付密码</span>
          </template>
          <template #right-icon>
            <van-image :src="require('@/assets/me/icon_jinru03@2x.png')" width="12" height="12"></van-image>
          </template>
        </van-cell>
      </li>

      <li class="border-bottom px-10 py-15">
        <van-cell center is-link to="/security/editName">
          <template #title>
            <span class="m-l-10 t-blue fs-md">修改昵称</span>
          </template>
          <template #right-icon>
            <van-image :src="require('@/assets/me/icon_jinru03@2x.png')" width="12" height="12"></van-image>
          </template>
        </van-cell>
      </li>

      <li class="border-bottom px-10 py-15">
        <van-cell center is-link to="/security/editMobile">
          <template #title>
            <span class="m-l-10 t-blue fs-md">修改手机号</span>
          </template>
          <template #right-icon>
            <van-image :src="require('@/assets/me/icon_jinru03@2x.png')" width="12" height="12"></van-image>
          </template>
        </van-cell>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: "Security"
}
</script>

<style lang="scss" scoped>
::v-deep .van-cell {
  background: transparent;
}
</style>
