<template>
  <el-row class="app-container">
    <el-row>
      <el-col :span="2" style="height: 100%; height: inherit" :xs="24">
        <el-row class="lf2">
          <span class="exam-kaoshi-span">考生信息</span>
          <div style="text-align: center; height: 120px; padding: 8px">
            <img
              :src="student.photoUrl"
              height="100%"
              width="80%"
              style="margin-top: 10px"
            />
          </div>
          <div
            style="
              text-align: center;
              margin-top: 30px;
              line-height: 30px;
              letter-spacing: 1px;
            "
          >
            <el-row>姓名:{{ student.name }}</el-row>
            <el-row
              >身份证:{{
                student.idcard.substr(
                  student.idcard.length - 4,
                  student.idcard.length
                )
              }}</el-row
            >
            <el-row>车型:{{ student.trainType }}</el-row>

            <el-row>
              <video
                ref="video"
                v-show="isShow"
                width="80%"
                height="120px"
                autoplay
              ></video>
              <canvas
                v-show="!isShow"
                ref="canvas"
                width="85%"
                height="120px"
              ></canvas>
            </el-row>
          </div>
        </el-row>
      </el-col>
      <el-col :span="16" :xs="24">
        <el-row class="cen1">
          <span class="exam-kaoshi-span2">考试题目</span>
          <div style="position: relative">
            <span>{{ index + 1 }}.{{ question.question }}</span>
            <el-row style="margin-top: 30px">
              <el-col :span="12" class="mt20"
                ><span v-if="question.optionA"
                  >A.{{ question.optionA }}</span
                ></el-col
              >
              <el-col :span="12" class="mt20"
                ><span v-if="question.optionB"
                  >B.{{ question.optionB }}</span
                ></el-col
              >
              <el-col :span="12" class="mt20"
                ><span v-if="question.optionC"
                  >C.{{ question.optionC }}</span
                ></el-col
              >
              <el-col :span="12" class="mt20"
                ><span v-if="question.optionD"
                  >D.{{ question.optionD }}</span
                ></el-col
              >
            </el-row>
            <div>
              <el-row v-if="question.optionType != 2">
                <el-radio-group
                  v-model="question.userAnswer"
                  size="small"
                  style="margin-top: 20px"
                >
                  <el-radio
                    label="A"
                    border
                    @click.native="debouncedAnswerQuestion('A', index)"
                    v-if="question.optionA"
                    >A</el-radio
                  >
                  <el-radio
                    label="B"
                    border
                    @click.native="debouncedAnswerQuestion('B', index)"
                    v-if="question.optionB"
                    >B</el-radio
                  >
                  <el-radio
                    label="C"
                    border
                    @click.native="debouncedAnswerQuestion('C', index)"
                    v-if="question.optionC"
                    >C</el-radio
                  >
                  <el-radio
                    label="D"
                    border
                    @click.native="debouncedAnswerQuestion('D', index)"
                    v-if="question.optionD"
                    >D</el-radio
                  >
                </el-radio-group>
              </el-row>
              <el-row v-if="question.optionType == 2">
                <el-checkbox-group
                  v-model="newUserAnswerList"
                  style="margin-top: 20px"
                >
                  <el-checkbox label="A" key="A" border></el-checkbox>
                  <el-checkbox label="B" key="B" border></el-checkbox>
                  <el-checkbox label="C" key="C" border></el-checkbox>
                  <el-checkbox label="D" key="D" border></el-checkbox>

                  <el-button
                    style="position: absolute;right: 20px;"
                    @click="answerQuestion(newUserAnswerList, index)"
                  >
                    确定
                  </el-button>
                </el-checkbox-group>
              </el-row>
            </div>
          </div>

          <div class="time">
            <span class="exam-kaoshi-span">剩余时间</span>
            <div style="text-align: center; color: #dd1100">
              {{ showTime }}
            </div>
          </div>

          <div class="btn">
            <div style="padding: 0 20px; text-align: center">
              <el-col :span="8">
                <el-button
                  size="mini"
                  @click="changeQuestion(index - 1 > 0 ? index - 1 : 0)"
                  style="background-color: #fff;color: #409EFF;border-color: #409EFF;"
                >
                  上一题
                </el-button>
              </el-col>
              <el-col :span="8">
                <el-button
                  size="mini"
                  style="background-color: #409EFF;color: #fff;border-color:#409EFF"
                  @click="
                    changeQuestion(
                      index + 1 < questionList.length - 1
                        ? index + 1
                        : questionList.length - 1
                    )
                  "
                >
                  下一题
                </el-button>
              </el-col>
              <el-col :span="8">
                <el-button size="mini" class="answerY" @click="endExam">
                  交卷
                </el-button>
              </el-col>
            </div>
          </div>
        </el-row>
      </el-col>
      <el-col :span="6" :xs="24">
        <el-row class="cen1" style="overflow: auto;padding-top: 15px;">
          <span
            class="exam-kaoshi-span2"
            style="    
                    position: fixed;
                    top: 0px;"
            >答题信息</span
          >
          <div style="word-break: break-word">
            <div
              class="exam-dati"
              v-for="(item, i) in questionList"
              @click="changeQuestion(i)"
            >
              <span
                v-if="item.userAnswer"
                class="exam-site-span"
                style="color: #fff;"
                :style="{
                  background: index == i ? '#409eff' : '#7c98fc',
                  border:
                    index == i ? '#409eff solid 1px' : '#7c98fc solid 1px',
                }"
                >{{ i + 1 }}</span
              >
              <span
                v-else
                class="exam-site-span"
                :style="{
                  background: index == i ? '#409eff' : '#fff',
                  border:
                    index == i ? '#409eff solid 1px' : '#c3c6ca solid 1px',
                  color: index == i ? '#fff' : '#38485a',
                }"
                >{{ i + 1 }}</span
              >
            </div>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px" v-if="question.mediaType == 1">
      <el-col :span="24">
        <el-row class="lf3">
          <span class="exam-kaoshi-span">考题图片信息</span>
          <div style="text-align: center">
            <img
              :src="question.mediaContent"
              style="margin-top: 20px"
              :width="question.mediaWidth * 0.7"
              :height="question.mediaHeight * 0.7"
            />
          </div>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px" v-if="question.mediaType == 2">
      <el-col :span="24">
        <el-row class="lf3">
          <span class="exam-kaoshi-span">考题视频信息</span>
          <div style="text-align: center">
            <video
              :src="question.mediaContent"
              style="margin-top: 20px"
              muted
              autoplay
              loop
            ></video>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { answerAPI, queryQuestionAPI, signOutAPI } from "@/api/index";
import { sendThis } from "@/utils/anychatevent";
import {
  BRAC_Connect,
  BRAC_DEVICE_AUDIOCAPTURE,
  BRAC_DEVICE_VIDEOCAPTURE,
  BRAC_EnterRoom,
  BRAC_EnumDevices,
  BRAC_GetSDKOptionString,
  BRAC_InitSDK,
  BRAC_LeaveRoom,
  BRAC_Login,
  BRAC_SetSDKOption,
  BRAC_SetUserStreamInfo,
  BRAC_SetVideoPos,
  BRAC_SO_CLOUD_APPGUID,
  BRAC_SO_CORESDK_BUILDTIME,
  BRAC_SO_LOCALVIDEO_HEIGHTCTRL,
  BRAC_SO_LOCALVIDEO_WIDTHCTRL,
  BRAC_STREAMINFO_AUDIOFLAG,
  BRAC_STREAMINFO_VIDEOFLAG,
  BRAC_UserCameraControl,
  BRAC_UserSpeakControl,
  GV_ERR_BROWSERNOWEBRTC,
} from "@/utils/anychatsdk";
import _ from "lodash";
const defaultDataFile = {
  file: undefined,
  type: undefined,
  district: undefined,
  version: undefined,
  memo: undefined,
};

export default {
  name: "SystemUpgrade",
  filters: {},
  props: {
    check: Boolean,
  },
  data() {
    return {
      videoWidth: 135,
      videoHeight: 135,
      photoStr: "",
      isShow: true,
      query: {},
      siteName: "",
      student: {
        idcard: "",
        name: "",
        sex: "",
        photoUrl: "",
      },
      questionList: [],
      question: {
        userAnswer: "",
      },
      newUserAnswerList: [],
      index: 0,
      timer: "",
      startTime: "",

      limit: 0,
      showTime: "00:00",
      timer2: "",
      timer3: "",
      timer4: "",
      randomInteger: 0,
      count: 5,

      // 监控
      ip: "mini.anychat.cn",
      port: "9940",
      appid: "",
      roomid: 4881,
      ids: new Map(),
    };
  },
  computed: {},
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer2);
    clearInterval(this.timer3);
    clearInterval(this.timer4);

    // BRAC_LeaveRoom(this.roomid);
  },
  async created() {
    this.query = this.$route.query;
    // if (
    //   !this.query.idcard ||
    //   !this.query.selectCar ||
    //   !this.query.siteId ||
    //   !this.query.orderId
    // ) {
    //   this.$router.push({ path: "/theory" });
    //   return;
    // }
    // const res = await answerAPI(localStorage.getItem("id"));
    if (!localStorage.getItem("randomInteger")) {
      this.randomInteger = Math.floor(Math.random() * (5400 - 4800 + 1)) + 4800;
      localStorage.setItem("randomInteger", this.randomInteger);
    } else {
      this.randomInteger = localStorage.getItem("randomInteger");
    }
    await this.queryQuestion();
    this.callCamera();
    // this.siteName = res.data.name;
    // const res1 = await getStudentByIdcard(this.query.idcard);
    // this.student = res1.data;
    // await this.queryQuestion();
    // getStudentOrderStartTime(this.query.orderId).then((res) => {
    //   this.startTime = res.data;
    //   this.timer = setInterval(this.jishi, 1000);
    //   this.timer3 = setInterval(this.savePhoto, 1000 * 60 * 5);
    // });
    // 监控
    // sendThis(this);
    // await this.init();
  },
  mounted() {
    // this.callCamera();
  },
  methods: {
    async init() {
      var errorCode = await BRAC_InitSDK(1);
      if (errorCode === GV_ERR_BROWSERNOWEBRTC) {
        console.error("不支持webRTC");
      }
      setTimeout(async () => {
        await this.connect();
        setTimeout(async () => {
          await this.login();
          setTimeout(async () => {
            await this.enterroom();
          }, 1000);
        }, 1000);
      }, 1000);
    },

    connect() {
      BRAC_Connect(this.ip, this.port);
    },

    login() {
      BRAC_SetSDKOption(BRAC_SO_CLOUD_APPGUID, this.appid);
      BRAC_Login(this.student.idcard, "", "");
    },

    enterroom() {
      BRAC_GetSDKOptionString(BRAC_SO_CORESDK_BUILDTIME);
      //进房间
      // BRAC_EnterRoomEx(roomid, '');
      BRAC_EnterRoom(this.roomid, "", 0);
      console.log(BRAC_EnumDevices(BRAC_DEVICE_AUDIOCAPTURE));
      console.log(BRAC_EnumDevices(BRAC_DEVICE_VIDEOCAPTURE));
    },

    savePhoto() {
      this.photograph();
      // savePhoto({
      //   photoStr: this.photoStr,
      //   orderId: this.query.orderId,
      //   type: 5,
      // });
    },

    jishi() {
      let end = new Date(this.startTime);
      end.setMinutes(end.getMinutes() + this.limit);
      let now = new Date();
      if (now > end) {
        this.showTime = "00:00";
        this.endExamForce();
        clearInterval(this.timer);
        return;
      }
      //时间差
      var differTime = Math.floor((end - now) / 1000);
      if (this.randomInteger == differTime) {
        console.log("前十分钟随机拍照");
        this.savePhoto();
      }
      //定义变量,h,m,s保存倒计时的时间
      var m, s;
      if (differTime >= 0) {
        m = Math.floor(differTime / 60); // 计算分钟数
        s = differTime % 60; // 计算秒数
        m = m < 10 ? "0" + m : m; // 格式化分钟数
        s = s < 10 ? "0" + s : s; // 格式化秒数
        this.showTime = m + ":" + s;
      }
    },

    /* 交卷 */
    endExam() {
      let list = this.questionList;
      let result = 0;
      let messageNo = "";
      for (let i = 0; i < list.length; i++) {
        if (list[i].userAnswer == null) {
          result++;
        }
      }
      if (result > 0) {
        messageNo = "当前还有" + result + "题未答,";
      }
      this.$confirm(messageNo + "确定要交卷吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.endExamForce();
      });
    },

    endExamForce() {
      signOutAPI(localStorage.getItem("id"))
        .then((res) => {
          let [str1, str2] = this.showTime.split(":");
          if (res.data >= 0 && res.data < 60 && this.showTime != "00:00") {
            /* 没到时间并且每及格 */
            this.$notify({
              message: "当前分数为" + res.data + "分未及格，请继续考试",
              type: "warning",
            });
            this.queryQuestion();
            this.index = 0;
          } else if (str1 == "00" && str2 == "00") {
            /* 到时间 */
            this.toAlert(res.data);
          } else if (res.data > 60 && str1 != "00" && str2 != "00") {
            /* 及格直接交卷 */
            this.toAlert(res.data);
          }
        })
        .catch((error) => {
          // this.$router.push({
          //   path: "/theory",
          //   query: { inscode: this.student.inscode },
          // });
        });
    },

    /* 提示 */
    toAlert(fen) {
      let that = this;
      let message = "您的得分为" + fen;
      this.$alert(
        '<p style="text-align: center"><strong>' + message + "</strong></p>",
        "提示",
        {
          dangerouslyUseHTMLString: true,
          showCancelButton: false,
          showConfirmButton: false,
          callback: function() {
            // 关闭事件的回调函数
            that.toTheoryPage();
          },
        }
      );
    },

    /* 退出页面 */
    toTheoryPage() {
      this.$router.push({
        path: "/",
      });
    },

    getImgUrl(item) {
      return "http://121.196.36.25:8080/gzpt/file/question/" + item;
    },

    debouncedAnswerQuestion: _.debounce(function(option, index) {
      // 在这里执行你想要的操作
      this.answerQuestion(option, index);
    }, 200), // 在200毫秒内只执行最后一次

    async answerQuestion(answer, index) {
      if (this.question.optionType == 2) {
        answer = answer
          .sort()
          .toString()
          .replaceAll(",", "");
      }
      const res = await answerAPI(
        localStorage.getItem("id"),
        this.question.id,
        answer
      );
      if (res.code == 0) {
        await this.queryQuestion(); //查题目
        this.changeQuestion(
          //下一题
          index + 1 < this.questionList.length - 1
            ? index + 1
            : this.questionList.length - 1
        );
      }
    },

    changeQuestion(index) {
      this.question = this.questionList[index];
      if (this.question.userAnswer && this.question.optionType == 2) {
        this.newUserAnswerList = this.question.userAnswer.split("");
      } else {
        this.newUserAnswerList = [];
      }
      this.index = index;
    },

    async queryQuestion() {
      const res = await queryQuestionAPI(localStorage.getItem("id"));
      if (res.code == 0) {
        this.student.idcard = res.data.idcard;
        this.student.name = res.data.stuName;
        this.student.trainType = res.data.trainType;
        this.student.photoUrl = res.data.photoUrl;

        /* 计时 */
        this.limit = res.data.limit;
        this.startTime = res.data.startTime;
        this.timer = setInterval(this.jishi, 1000);
        /* 每隔15分钟拍照一次啊 */
        this.timer3 = setInterval(this.savePhoto, 1000 * 60 * 15);

        this.questionList = res.data.questions;
        this.question = this.questionList[this.index];
        if (this.question.userAnswer && this.question.optionType == 2) {
          this.newUserAnswerList = this.question.userAnswer.split("");
        } else {
          this.newUserAnswerList = [];
        }
      } else {
        this.$notify({
          message: res.message,
          type: "warning",
        });
        setTimeout(() => {
          this.$router.push({
            path: "/",
          });
        }, 2000);
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
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  padding: 10px;
  color: #38485a;
  min-width: 1280px;
}

.mt20 {
  margin-top: 20px;
}

.lf1 {
  height: 50px;
  //width: 150px;
  border: 1px solid #b5b5b5;
  box-sizing: border-box;
}

.lf2 {
  // margin-top: 20px;
  height: 520px;
  //width: 150px;
  border: 1px solid #b5b5b5;
  box-sizing: border-box;
  //text-align: center;
}

.lf3 {
  margin-top: 20px;
  //height: 390px;
  border: 1px solid #b5b5b5;
  box-sizing: border-box;
}

.cen1 {
  height: inherit;
  height: 520px;
  border: 1px solid #b5b5b5;
  box-sizing: border-box;
  // border-left: none;
  padding: 10px;
  margin-left: 10px;
}

.cen2 {
  height: 50px;
  border: 1px solid #b5b5b5;
  box-sizing: border-box;
  // border-left: none;
  padding: 10px;
  margin-left: 10px;
}

.exam-kaoshi-span {
  color: #dd1100;
  display: inline-block;
  background-color: #ffffff;
  position: relative;
  top: -10px;
  left: 10px;
  padding: 0 5px;
}

.exam-kaoshi-span2 {
  color: #dd1100;
  display: inline-block;
  background-color: #ffffff;
  position: relative;
  top: -20px;
  padding: 0 5px;

  //left: 10px;
}

.exam-site-span {
  display: block;
  // position: relative;
  top: -27px;
  text-align: center;
  width: 33px;
  border-radius: 5px;
}

.exam-dati {
  height: 30px;
  margin-left: 12px;
  margin-bottom: 5px;
  cursor: pointer;
  display: inline-block;
  padding: 0;
}

.time {
  height: 50px;
  border: 1px solid #b5b5b5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 115px;
  position: absolute;
  bottom: 20px;
}

.btn {
  width: 33%;
  position: absolute;
  bottom: 30px;
  right: 20px;
}

.answerY {
  background: #7c98fc;
  color: #fff;
  border: #7c98fc solid 1px;
}
</style>
