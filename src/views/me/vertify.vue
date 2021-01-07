<template>
  <div class="containers t-white">
    <nav-bar title="实名认证" />
    <div class="contents">
      <section class="bg-view p-10 m-10 radius9">
        <label class="fs-lg">身份信息</label>
        <van-field
          center
          class="input"
          v-model="name"
          input-align="right border-bottom"
          :border="false"
          placeholder="请输入真实姓名"
          label="姓名"
        />
        <van-field
          center
          class="input"
          v-model="idcard"
          input-align="right"
          :border="false"
          placeholder="请输入身份号"
          label="身份号"
        />
      </section>

      <section class="bg-view p-10 m-10 radius9">
        <label class="fs-lg">上传身份证</label>
        <div class="d-flex jc-around m-t-20">
          <div class="d-flex flex-column ai-center">
            <van-uploader
              v-model="fileFront"
              :max-count="1"
              :before-read="beforeRead"
              :after-read="afterFrontRead"
            >
              <div class="front d-flex flex-cloumn jc-center ai-center">
                <van-image
                  class="avatar"
                  width="154"
                  height="100"
                  :src="require('@/assets/me/icon_shengfenz01@2x.png')"
                />
              </div>
            </van-uploader>
            <span class="my-10 fs-min t-blue">请上传身份证正面</span>
          </div>

          <div class="d-flex flex-column ai-center">
            <van-uploader
              v-model="fileBack"
              :max-count="1"
              :before-read="beforeRead"
              :after-read="afterBackRead"
            >
              <div class="back d-flex flex-cloumn jc-center ai-center">
                <van-image
                  class="avatar"
                  width="154"
                  height="100"
                  :src="require('@/assets/me/icon_shengfenz02@2x.png')"
                />
              </div>
            </van-uploader>
            <span class="my-10 fs-min t-blue">请上传身份证反面</span>
          </div>
        </div>

        <p class="t-blue fs-sm bg tips p-10 radius9 m-t-20">
          认证说明：手机号和身份证一致，一个设备只能实 名一个账号
        </p>
      </section>

      <van-button color="#27A495" class="btn fs-lg w-100" @click="buttonClick"
        >提交审核</van-button
      >
    </div>

    <van-popup v-model="show" round position="center" class="picker">
      <section
        class="d-flex ai-center jc-center flex-column"
        style="width: 100vw; height: 100vh"
      >
        <div class="bg-img p-30 d-flex flex-column jc-center ai-center">
          <div class="fs-xl t-red m-t-60">赠送一台体验矿机！</div>
          <van-image
            :src="require('@/assets/mine/kuangji1.png')"
            width="154"
            height="142"
          />
          <b class="fs-xl t-black m-b-20 p-t-10">体验矿机</b>
          <span class="fs-min m-b-20 t-black px-60"
            >用户领取完后可以在矿场“持有矿机”中查看</span
          >
        </div>
        <van-button
          color="#F7C707"
          round
          class="fs-lg m-b-50 btn-popop"
          @click="obtain"
          >立即领取</van-button
        >
        <van-icon name="clear" color="#FF5454" @click="show = !show" />
      </section>
    </van-popup>
  </div>
</template>

<script>
import * as qiniu from "qiniu-js";
import md5 from "md5";
import Exif from "exif-js";
export default {
  name: "Vertify",
  data() {
    return {
      show: false,
      idcard: "", //身份证号
      name: "", //姓名
      qiniu: {},
      fileFront: [],
      fileBack: [],
      front: "", //身份证正面路径
      back: "", //身份证反面路径
      rep: /([A-Za-z](\d{6})\d)|(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)/,  //香港、大陆
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    uploaderFile(event, index) {
      // console.log(event)
      let _self = this;
      let file = event.file;

      let putExtra = {
        fname: file.name,
        mimeType: ["image/png", "image/jpeg", "image/gif"],
      };

      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function () {
        Orientation = Exif.getTag(this, "Orientation");
      });
      var reader = new FileReader();
      let url = "";
      let formData = new FormData();
      //   formData.append("file", file);
      reader.readAsDataURL(file);

      reader.onload = function (e) {
        url = this.result.substring(this.result.indexOf(",") + 1);
        url = "data:image/png;base64," + url;
        let img = new Image();
        img.src = this.result;
        img.onload = function () {
          let data = self.compress(img, Orientation);
          // console.log(data);
          //   console.log(_self.convertBase64UrlToBlob(data));
          formData.append(
            "file",
            _self.convertBase64UrlToBlob(data),
            "image.png"
          );
          _self.$axios.upFile(`${_self.$api.upFile}`, formData).then((res) => {
            if (index == 0) {
              _self.front = res.data;
            }
            if (index == 1) {
              _self.back = res.data;
            }
            // console.log(_self.front);
            // console.log(_self.back);
          });
        };
      };
    },
    rotateImg(img, direction, canvas) {
      //最小与最大旋转方向，图片旋转4次后回到原方向
      const min_step = 0;
      const max_step = 3;
      if (img == null) return;
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height;
      let width = img.width;
      let step = 2;
      if (step == null) {
        step = min_step;
      }
      if (direction == "right") {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
      } else {
        step--;
        step < min_step && (step = max_step);
      }
      //旋转角度以弧度值为参数
      let degree = (step * 90 * Math.PI) / 180;
      let ctx = canvas.getContext("2d");
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    },
    compress(img, Orientation) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      //瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = (width * height) / 4000000) > 1) {
        console.log("大于400万像素");
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      //        铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = (width * height) / 1000000) > 1) {
        console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(
              img,
              i * nw * ratio,
              j * nh * ratio,
              nw * ratio,
              nh * ratio,
              0,
              0,
              nw,
              nh
            );
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //修复ios上传图片的时候 被旋转的问题
      if (Orientation != "" && Orientation != 1) {
        switch (Orientation) {
          case 6: //需要顺时针（向左）90度旋转
            this.rotateImg(img, "left", canvas);
            break;
          case 8: //需要逆时针（向右）90度旋转
            this.rotateImg(img, "right", canvas);
            break;
          case 3: //需要180度旋转
            this.rotateImg(img, "right", canvas); //转两次
            this.rotateImg(img, "right", canvas);
            break;
        }
      }
      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.5);
      // console.log("压缩前：" + initSize);
      // console.log("压缩后：" + ndata.length);
      // console.log(
      //   "压缩率：" + ~~((100 * (initSize - ndata.length)) / initSize) + "%"
      // );
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      return ndata;
    },
    // base64转blob对象
    convertBase64UrlToBlob: function (urlData) {
      var arr = urlData.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {
        type: mime,
      });
    },
    // 返回布尔值
    beforeRead(file) {
      if (
        file.type == "image/jpeg" ||
        file.type == "image/png" ||
        file.type == "image/jpg"
      ) {
        return true;
      }
      this.$toast("请上传jpg、jpeg、jpg格式图片");
      return false;
    },
    afterFrontRead(file) {
      this.uploaderFile(file, 0);
    },
    afterBackRead(file) {
      this.uploaderFile(file, 1);
    },
    //立即领取
    obtain() {},
    buttonClick() {
      //  else if (!this.rep.test(this.idcard)) {
      //   this.$toast("身份证号格式错误");
      // } 
      if (!this.name) {
        this.$toast("请输入您的真实姓名");
      } else if (!this.idcard) {
        this.$toast("请输入身份证号");
      }else if (!this.front) {
        this.$toast("请上传身份证正面");
      } else if (!this.back) {
        this.$toast("请上传身份证反面");
      } else {
        // console.log(this.front);
        // console.log(this.back);
        this.$toast.loading("正在提交验证...");
        this.$axios
          .post("realname/save", {
            name: this.name,
            idCard: this.idcard,
            idCardPositive: this.front, //身份证正面路径
            idCardNegative: this.back, //身份证反面路径
          })
          .then((res) => {
            console.log(res);
            if (res.msg != "success") {
              this.$toast.fail(res.msg);
            } else {
              this.name = null;
              this.idcard = null;
              this.front = null;
              this.back = null;
              this.fileFront = [];
              this.fileBack = [];
              this.$toast.success("提交成功");
              this.$router.replace("/authentication/underReview"); //跳转到审核中
            }
          });
      }
    },
    getInfo() {
      var that = this;
      this.$axios.post(this.$api.realnameInfo, {}).then((res) => {
        if (res.code != 200) {
          this.$toast(res.msg);
        } else {
          this.$toast.loading("loding...");
          // console.log(that.$route.query.status);
          if (res.data.status == 0 || this.$route.query.status == 0) {
            // this.$toast("未实名");
          } else if (res.data.status == 3) {
            this.$toast.success("认证成功");
            this.$router.replace({
              path: "/authentication/authenticationSuccess",
              query: { info: JSON.stringify(res.data) },
            }); //跳转到认证成功
          } else if (res.data.status == 2) {
            this.$toast("正在审核中");
            this.$router.replace("/authentication/underReview"); //跳转到审核中
          } else {
            this.$toast.fail("认证失败");
            this.$router.replace("/authentication/authenticationFail"); //跳转到认证失败
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  position: absolute;
  bottom: 100px;
  width: 93%;
  @include cl;
}

.tips {
  background-color: rgba($color: #27a495, $alpha: 0.1);
  line-height: 1.2;
}

.input {
  height: 91px;
  background-color: transparent;
  color: white;
}

.btn-popop {
  height: 72px;
}

.bg-img {
  width: 100%;
  height: 695px;
  @include bis("./../../assets/me/bg_tanchuang@2x.png");
}
</style>
