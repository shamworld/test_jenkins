<template>
  <div class="containers t-white fs-min">
    <nav-bar title="公告详情" />
    <div class="contents">
      <div
        class="d-flex bg-view radius9 flex-column border-bottom p-10 m-10 t-blue"
      >
        <div class="t-white fs-lg" v-html="list.noticeTitle"></div>
        <div class="t-black9 my-10 fs-min" v-html="list.createTime"></div>
        <div class="t-white fs-min lh-5" v-html="list.noticeContent"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoticeDetail",
  data() {
    return {
      list: '',
    };
  },
  mounted() {
    this.list = JSON.parse(this.$route.query.list);
    // console.log(this.list);
  },
};
</script>

<style>
</style>
