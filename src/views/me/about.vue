<template>
<div class="containers">
  <nav-bar title="联系我们" />
  <div class="contents">
    <section class="bg-view px-10 mx-10 m-t-20 radius9">
      <van-cell disabled center class="input" title="官方邮箱" input-align="right" :border="false" :value="email" />
    </section>
  </div>
  <van-button color="#27A495" class="fs-lg m-b-30 mx-10" v-clipboard:copy="email" v-clipboard:success="() => $toast('复制成功')" v-clipboard:error="() => $toast('复制失败')">复制邮箱号码</van-button>
</div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      email: "www.baidu.com",
    }
  },
  methods: {
    buttonClick() {}
  },
}
</script>

<style lang="scss" scoped>
.input {
  height: 91px;
  background-color: transparent;
  color: white;
}
</style>
