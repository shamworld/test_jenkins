<template>
  <div>
    <!-- 选择币种弹框 -->
    <van-picker
      show-toolbar
      title="选择币种"
      :columns="pickerColumns"
      @cancel="onCancel"
      @confirm="onConfirm"
      item-height="30px"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerColumns: [],
      once: true,
    };
  },
  props: {
    choseIsShow: { type: Boolean, default: false },
    // pickerColumns: { type: Array, default: [] },
  },
  mounted() {
    if (this.once) {
      this.$axios.post("/wallet/list", {}).then((res) => {
        res.data.walletList.splice(1,2)
        // console.log(res.data.walletList);
        res.data.walletList.forEach((item) => {
          this.pickerColumns.push(item.coinName);
        });
      });
      // console.log(this.pickerColumn);
      this.once = false;
    }
  },
  methods: {
    onCancel() {
      this.$emit("choseIsShow", false);
    },
    onConfirm(value, index) {
      // console.log(value, index);
      this.$emit("choseIsShow", false);
      this.$emit("choseItem", { index: index, value: value });
    },
  },
};
</script>

<style lang='scss' scoped>
::v-deep .van-picker {
  background-color: #2a405c;
}
::v-deep .van-picker__mask {
  z-index: -1;
}
::v-deep [class*="van-hairline"]::after {
  border-color: #b7bdc5;
}
::v-deep .van-picker__cancel {
  color: #90b5cc;
}
::v-deep .van-picker__confirm {
  color: #fff;
}
::v-deep .van-picker-column__item {
  color: #fff;
}
</style>