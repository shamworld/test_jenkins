<template>
  <div class="containers bg-black1">
    <!-- 获得帮助 -->
    <navBar title="获得帮助"></navBar>
    <div class="main my-20 t-white">
      <div class="help bg-view">
        <div class="title">
          <span class="fs-lg opacity">获得帮助</span>
          <span class="t-blue fs-min">（最大可获得多少USDT）</span>
        </div>
        <div class="money">
          <van-field
            placeholder="0"
            :border="false"
            center
            input-align="right"
            class="input"
          >
            <template #label>
              <span class="t-white opacity fs-md mx-10">USDT</span>
            </template>
            <template #extra>
              <span class="t-white opacity mx-5">USDT</span>
            </template>
          </van-field>
        </div>
      </div>
      <van-button color="#27A495" class="btn fs-lg w-100">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.main {
  padding: 0 25px;
  overflow: hidden;
  .help {
    border-radius: 9px;
    .title {
      padding: 12px 9px;
      border-bottom: 1px solid #2a4d62;
    }
  }
  .input {
    height: 98px;
    background-color: transparent;
  }
  ::-webkit-input-placeholder {
    text-align: right;
  }
  .btn {
    margin-top: 206px;
  }
}
::v-deep .van-field__control::-webkit-input-placeholder {
  color: $white;
  opacity: 0.85;
}
</style>