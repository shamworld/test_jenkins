<template>
  <div class="containers">
    <!-- 投诉 -->
    <navBar title="投诉" rightText="投诉记录" @rightClick="toRecords"></navBar>
    <div class="main m-t-25">
      <div class="complaint bg-view">
        <ul class="fs-md t-white">
          <li class="d-flex ai-center jc-between">
            <p class="opacity">投诉用户</p>
            <span class="t-blue">小明</span>
          </li>
          <li>
            <p class="opacity">投诉内容</p>
            <van-field
              type="textarea"
              placeholder="请输入投诉内容"
              class="input bg-black1 m-t-10"
              :autosize="autosize"
            ></van-field>
          </li>
        </ul>
      </div>
      <van-button color="#27A495" class="btn fs-lg w-100">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autosize: { maxHeight: 400, minHeight: 200 },
    };
  },
  methods: {
    toRecords() {
      // this.$router.push('/complaint/complaintRecord')
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 0 25px;
  .complaint {
    border-radius: 18px;
    ul li {
      padding: 39px 17px;
      box-sizing: border-box;
      &:nth-child(1) {
        border-bottom: 1px solid #2a4d62;
      }
      .input {
        border-radius: 8px;
      }
    }
  }
  .btn {
    margin-top: 308px;
  }
}
</style>