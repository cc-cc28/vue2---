<template>
  <div class="app-container-auth">
    <div class="banner-auth">
      <span style="font-size: 40px; letter-spacing: 6px"
        >机动车驾驶员理论考核系统</span
      >
    </div>
    <div class="menu-auth">
      <el-row class="main-auth">
        <el-col
          :span="12"
          style="
            padding: 60px 0px 0px 80px;
            font-size: 18px;
            font-weight: bold;
            border-right: #cccdcc 1px solid;
          "
        >
          <span>考生须知:</span>
          <ol class="main-ol">
            <li>遵守考场纪律，服从监考人员指挥</li>
            <li>进入考场，手机关机，禁止抽烟，禁止吃零食</li>
            <li>未经工作人员允许，考生禁止随意出入考场</li>
            <li>考场内禁止大声喧哗，禁止随意走动</li>
            <li>考试中认真答题，不准交头接耳</li>
            <li>考试中不准冒名顶替，不准弄虚作假</li>
            <li>注意考场卫生，禁止随意吐痰，禁止乱扔纸屑</li>
            <li>爱护公物及考试设备</li>
          </ol>
        </el-col>
        <el-col
          :span="12"
          style="padding: 60px 0px 0px 80px; font-size: 18px; font-weight: bold"
        >
          <el-col :span="24">
            <div style="height: 50px;">
              <span style="padding-right: 25px;"
                >考生姓名 :
                <span style="color: red;">{{ student.name }}</span></span
              >
              <span style="padding-right: 25px;"
                >身份证号 :
                <span style="color: red;">{{ student.idcard }}</span></span
              >
              <span
                >车型 :
                <span style="color: red;">{{ student.trainType }}</span></span
              >
            </div>
            <div style="clear: both;padding-right: 80px;display: flex;">
              <img
                :src="student.photoPath"
                style="margin-right: 20px"
                :width="videoWidth"
                :height="videoHeight"
              />
              <div v-if="ifCamera" class="noCamera"></div>
              <div v-else>
                <video
                  ref="video"
                  class="video"
                  :width="videoWidth"
                  :height="videoHeight"
                  autoplay
                ></video>
                <canvas
                  v-show="!isShow"
                  ref="canvas"
                  :width="videoWidth"
                  :height="videoHeight"
                ></canvas>
              </div>
            </div>
          </el-col>
          <!-- <el-row style="text-align: center; margin-top: 30px">
            <el-button type="primary" @click="callCamera">打开摄像头</el-button>
            <el-button type="primary" @click="photograph">拍照</el-button>
            <el-button type="primary" @click="reset" v-show="!buttonShow"
              >重置</el-button
            >
          </el-row> -->
        </el-col>
      </el-row>
    </div>
    <div class="bottom-auth">
      <el-button
        type="primary"
        @click="back"
        style="margin-top: 130px;background-color: #fff;color: #409EFF;"
      >
        <span style="float: left; margin-left: 20px">退</span>
        <span style="float: right; margin-right: 20px">出</span>
      </el-button>
      <el-button type="primary" @click="confirm" style="margin-top: 130px">
        <span style="float: left; margin-left: 20px">确</span>
        <span style="float: right; margin-right: 20px">定</span>
      </el-button>
    </div>
  </div>
</template>

<script>
import { stuSignAPI, matchFace } from "@/api/index";
import { Card } from "@/utils/netOcx";

export default {
  name: "Main",
  components: {},
  filters: {},
  props: {
    check: Boolean,
  },
  data() {
    return {
      query: {},
      siteName: "",
      data: {},
      student: {
        idcard: "",
        name: "",
        photoPath: "",
        trainType: "",
      },

      videoWidth: 200,
      videoHeight: 230,
      headImgSrc: "",
      photoStr: "",
      timer: "",
      timer1: "",
      count: 3,
      orderId: "",
      isShow: true,
      ifCamera: false,

      buttonShow: true,

      signId: "",
    };
  },
  computed: {},
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer1);
    this.closeCamera();
  },
  async created() {
    if (localStorage.getItem("theory")) {
      let data = localStorage.getItem("theory");
      this.student.name = JSON.parse(data).name;
      this.student.idcard = JSON.parse(data).idcard;
      this.student.photoPath = JSON.parse(data).photoUrl;
      this.student.trainType = JSON.parse(data).trainType;

      // const res = await stuSignAPI(JSON.parse(data).stunum);
      // if (res.code == 1) {
      //   this.$notify({
      //     message: res.message,
      //     type: "warning",
      //   });
      // }
      // if (res.data) {
      //   this.signId = res.data;
      //   localStorage.setItem("id", res.data);
      // }
    }

    // if (!this.query.inscode || !this.query.selectCar || !this.query.siteId) {
    //   this.$router.push({path: '/theory'})
    //   return
    // }
    // const res = await getSiteById(this.query.siteId)
    // this.siteName = res.data.name
    // const res1 = await getStudentByIdcard(this.student.idcard)
    // this.student = res1.data
    // this.timer = setInterval(this.toAExam, 2000);
  },
  mounted() {
    this.callCamera();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async confirm() {
      this.photograph(); //拍照
      let data = localStorage.getItem("theory");
      const res = await stuSignAPI(JSON.parse(data).stunum);
      if (res.code == 1) {
        this.$notify({
          message: res.message,
          type: "warning",
        });
      }
      if (res.data) {
        this.signId = res.data;
        localStorage.setItem("id", res.data);
        this.$router.push({ path: "/exam" });
      }
    },
    reset() {
      this.student = {
        idcard: "请刷卡获取学员身份证",
        name: "请刷卡获取学员姓名",
        photoPath:
          "https://img0.baidu.com/it/u=1489807627,808259306&fm=26&fmt=auto",
      };
      this.isShow = true;
      this.photoStr = "";
      // if (!this.timer) {
      //   this.timer = setInterval(this.toAExam, 2000);
      // }
      this.count = 3;
    },
    toAExam() {
      // var card = new Card();
      // var data = card.readIDCard();
      // if (data != null) {
      //   clearInterval(this.timer);
      //   this.timer = "";
      //   this.student.idcard = data.idcard;
      //   this.student.name = data.name;
      //   this.student.photoPath = data.src;
      //   findHasOrder({ idcard: this.student.idcard, siteId: this.query.siteId })
      //     .then((res) => {
      //       this.orderId = res.data;
      //       this.$notify({
      //         message: "验证成功,3秒后进行人脸识别",
      //         type: "success",
      //       });
      //       this.timer1 = setInterval(this.matchFC, 1000);
      //     })
      //     .catch((error) => {
      //       this.timer = setInterval(this.toAExam, 2000);
      //     });
      //   this.buttonShow = false;
      // }queryExamInfo
    },
    //人脸识别
    matchFC() {
      this.count--;
      if (this.count < 0) {
        clearInterval(this.timer1);
        this.photograph();
        this.isShow = false;
        matchFace({
          photoUrl: this.student.photoPath,
          photoStr: this.photoStr,
          orderId: this.orderId,
        })
          .then((res) => {
            if (res.code == 200) {
              this.$router.push({
                path: "/exam",
                query: {
                  idcard: this.student.idcard,
                  siteId: this.query.siteId,
                  orderId: this.orderId,
                  selectCar: this.query.selectCar,
                },
              });
            }
          })
          .catch((error) => {
            this.reset();
            this.timer = setInterval(this.toAExam, 2000);
          });
      }
    },
    // 调用摄像头
    callCamera() {
      // H5调用电脑摄像头API
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: this.videoWidth,
            height: this.videoHeight,
            video: true,
          },
        })
        .then((success) => {
          // 摄像头开启成功
          this.$refs["video"].srcObject = success;
          // 实时拍照效果
          this.$refs["video"].play();
        })
        .catch((error) => {
          this.ifCamera = true;
          console.error("摄像头开启失败，请检查摄像头是否可用！");
        });
    },
    // 拍照
    photograph() {
      let ctx = this.$refs["canvas"].getContext("2d");
      // 把当前视频帧内容渲染到canvas上
      ctx.drawImage(
        this.$refs["video"],
        0,
        0,
        this.videoWidth,
        this.videoHeight
      );
      // 转base64格式、图片格式转换、图片质量压缩
      let imgBase64 = this.$refs["canvas"].toDataURL("image/jpeg", 0.7);

      // 由字节转换为KB 判断大小
      let str = imgBase64.replace("data:image/jpeg;base64,", "");
      let strLength = str.length;
      let fileLength = parseInt(strLength - (strLength / 8) * 2);
      // 图片尺寸  用于判断
      let size = (fileLength / 1024).toFixed(2);

      // 上传拍照信息  调用接口上传图片 .........
      this.photoStr = str;

      // 保存到本地
      // this.dialogCamera = false
      // let ADOM = document.createElement('a')
      // ADOM.href = this.headImgSrc
      // ADOM.download = new Date().getTime() + '.jpeg'
      // ADOM.click()
    },
    // 关闭摄像头
    closeCamera() {
      if (!this.$refs["video"].srcObject) {
        this.dialogCamera = false;
        return;
      }
      let stream = this.$refs["video"].srcObject;
      let tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      this.$refs["video"].srcObject = null;
    },
  },
};
</script>

<style lang="less" scoped>
.app-container-auth {
  width: 100%;
  height: 100%;
  position: absolute;
  border-color: #fff;
  padding: 0px;
  min-width: 1280px;
  //background-image: url(../../../../assets/images/exam-bg.png);
  background-size: cover;
}

.banner-auth {
  width: 100%;
  text-align: center;
  line-height: 100px;
  margin-top: 10px;
  height: 100px;
  background-color: #02b2f4;
  color: #ffffff;
}

.menu-auth {
  margin-top: 20px;
  padding: 10px 30px 10px 30px;
  min-width: 500px;
}

.main-auth {
  //height: 700px;
  background-color: #efefef;
  //background-clip: content-box;
  border-radius: 10px;
  min-width: 1000px;
}

.main-ol {
  margin-top: 30px;
}

.main-ol li {
  height: 50px;
}

.auth-button {
  height: 40px !important;
  font-size: 17px;
  border-radius: 5px;
  margin-top: 50px;
  width: 80px;
}

.bottom-auth {
  text-align: center;
}

.bottom-auth button {
  margin-top: 300px;
  height: 50px;
  font-size: 22px;
  font-weight: bold;
  //border: #FFFFFF 3px solid;
  width: 150px;
  border-radius: 10px;
}

.noCamera {
  background: black;
  width: 200px;
  height: 230px;
}
</style>
