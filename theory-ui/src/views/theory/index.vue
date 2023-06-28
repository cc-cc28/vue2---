<template>
  <el-row class="app-container-main">
    <el-row class="banner">
      <span
        style="font-size:40px;letter-spacing: 6px;text-align: center;font-weight: bold"
        >机动车驾驶员理论考核系统</span
      >
    </el-row>
    <div class="menu-main">
      <el-input
        v-model="data.idNum"
        placeholder="请输入身份证号码"
        style="width: 280px;"
        class="filter-item main-input"
        show-password
        maxlength="18"
      />
      <el-select
        placeholder="考核车型"
        style="width: 280px;margin-left: 70px"
        class="filter-item main-input"
        v-model="data.selectCar"
      >
        <el-option
          v-for="item in carTypeOptions"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
        />
      </el-select>
    </div>
    <div class="bottom">
      <el-button type="primary" @click="toAuthentication">
        <span style="float: left;margin-left: 30px">确</span>
        <span style="float: right;margin-right: 30px">定</span>
      </el-button>
    </div>
  </el-row>
</template>

<script>
import { getTheoryAPI } from "@/api/index";
import enums from "@/store/enum";

export default {
  name: "Main",
  filters: {},
  data() {
    return {
      carTypeOptions: enums.carTypeOptions,
      data: {
        idNum: "",
        selectCar: "",
      },
    };
  },
  mounted() {},
  beforeDestroy() {},
  computed: {},
  created() {
    localStorage.clear();
  },
  methods: {
    async toAuthentication() {
      if (!this.data.idNum) {
        this.$notify({
          message: "身份证为空",
          type: "warning",
        });
        return;
      }
      if (!this.data.selectCar) {
        this.$notify({
          message: "车型为空",
          type: "warning",
        });
        return;
      }
      const res = await getTheoryAPI(this.data.idNum, this.data.selectCar);
      if (res.code == 0) {
        localStorage.setItem("theory", JSON.stringify(res.data));
        this.$router.push({ path: "/authentication" });
        this.data.idNum = "";
        this.data.idNum = "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.app-container-main {
  width: 100%;
  height: 100%;
  position: absolute;
  min-height: 700px;
  border-color: #fff;
  padding: 0px;
  background-image: url(../../assets/images/bg.png);
  background-size: cover;
}

.banner {
  text-align: center;
  margin-top: 110px;
}

.menu-main {
  margin-top: 140px;
  text-align: center;
}

.bottom {
  text-align: center;
  position: absolute;
  bottom: 20%;
  width: 100%;
}

.bottom button {
  text-align: center;
  height: 55px;
  font-size: 28px;
  font-weight: bold;
  border: #ffffff 2px solid;
  width: 230px;
  border-radius: 25px;
}

.bottom button:hover {
  border: #ffffff 2px solid;
}

::v-deep .main-input .el-input__inner {
  height: 40px !important;
  font-size: 15px;
  border-radius: 15px;
  padding-left: 18px;
  border-color: #409eff;
}
</style>
