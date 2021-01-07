<template>
  <div class="containers">
    <nav-bar title="修改昵称" />
    <div class="contents">
      <section class="bg-view px-10 mx-10 m-t-20 radius9">
        <van-field
          center
          class="input"
          v-model="name"
          input-align="left"
          :border="false"
          placeholder="请输入新的名称"
        />
      </section>
    </div>
    <van-button color="#27A495" class="fs-lg m-b-30 mx-10" @click="buttonClick"
      >确定</van-button
    >
  </div>
</template>

<script>
export default {
  name: "EditName",
  data() {
    return {
      name: null,
    };
  },
  methods: {
    buttonClick() {
      this.$toast({
        type: "loading",
        message: "loading...",
        duration: 0, // 持续展示 toast
      });
      this.$axios
        .post("/user/update", {
          userName: this.name,
        })
        .then((res) => {
          if (res.msg != "success") {
            this.$toast(res.msg);
          } else {
            this.$toast({
              type: "success",
              message: "昵称修改成功",
            });
            this.name = "";
            this.$router.back();
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  height: 91px;
  background-color: transparent;
  color: white;
}
</style>
