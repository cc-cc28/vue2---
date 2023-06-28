/*精伦身份证阅读器火狐 谷歌版本*/
var IDCertCtl = function () {
  this.xhr = this.createXmlHttp();
  this.type = "CertCtl";
  this.height = 0;
  this.width = 0;
  // 连接
  this.connect = this.CertCtl_connect;
  // 断开
  this.disconnect = this.CertCtl_disconnect;
  // 获取状态
  this.getStatus = this.CertCtl_getStatus;
  // 读卡
  this.readCert = this.CertCtl_readCert;
  // 读IC卡序列号
  this.readICCardSN = this.CertCtl_readICCardSN;
  // 读身份证物理卡号
  this.readIDCardSN = this.CertCtl_readIDCardSN;
};
IDCertCtl.prototype = {
  createXmlHttp: function () {// 创建XMLHttpRequest 对象，用于在后台与服务器交换数据
    var xmlHttp = null;
    // 根据window.XMLHttpRequest对象是否存在使用不同的创建方式
    if (window.XMLHttpRequest) {
      xmlHttp = new XMLHttpRequest(); // FireFox、Opera等浏览器支持的创建方式
    } else {
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");// IE浏览器支持的创建方式
    }
    return xmlHttp;
  },
  CertCtl_connect: function () {// 连接方法
    var result = "";
    // 创建请求 第一个参数是代表以post方式发送；第二个是请求端口和地址；第三个表示是否异步
    CertCtl.xhr.open("POST", "http://127.0.0.1:18889/api/connect", false);
    // 发送请求
    try {
      CertCtl.xhr.send();
    } catch (e) {

    }
    if (CertCtl.xhr.readyState == 4 && CertCtl.xhr.status == 200) {
      result = CertCtl.xhr.responseText;
      CertCtl.xhr.readyState = 1;
    }
    return result;
  },
  CertCtl_disconnect: function () {// 断开方法
    var result = "";
    // 创建请求 第一个参数是代表以post方式发送；第二个是请求端口和地址；第三个表示是否异步
    CertCtl.xhr
      .open("POST", "http://127.0.0.1:18889/api/disconnect", false);
    // 发送请求
    try {
      CertCtl.xhr.send();
    } catch (e) {
    }
    if (CertCtl.xhr.readyState == 4 && CertCtl.xhr.status == 200) {
      result = CertCtl.xhr.responseText;
      CertCtl.xhr.readyState = 1;
    }
    return result;
  },
  CertCtl_getStatus: function () {// 获取状态方法
    var result = "";
    // 创建请求 第一个参数是代表以post方式发送；第二个是请求端口和地址；第三个表示是否异步
    CertCtl.xhr.open("POST", "http://127.0.0.1:18889/api/getStatus", false);
    // 发送请求
    try {
      CertCtl.xhr.send();
    } catch (e) {
    }
    if (CertCtl.xhr.readyState == 4 && CertCtl.xhr.status == 200) {
      result = CertCtl.xhr.responseText;
      CertCtl.xhr.readyState = 1;
    }
    return result;
  },
  CertCtl_readCert: function () {// 执行读卡操作
    var result = "";
    try {
      // 创建请求 第一个参数是代表以post方式发送；第二个是请求端口和地址；第三个表示是否异步
      CertCtl.xhr.open("POST", "http://127.0.0.1:18889/api/readCert",
        false);
      // 发送请求
      CertCtl.xhr.send();
      if (CertCtl.xhr.readyState == 4 && CertCtl.xhr.status == 200) {
        result = CertCtl.xhr.responseText;
        CertCtl.xhr.readyState = 1;
      }
    } catch (e) {

    }
    return result;
  },
  CertCtl_readICCardSN: function () {// 获取IC卡序列号
    var result = "";
    // 创建请求 第一个参数是代表以post方式发送；第二个是请求端口和地址；第三个表示是否异步
    CertCtl.xhr.open("POST", "http://127.0.0.1:18889/api/readICCardSN",
      false);
    // 发送请求
    try {
      CertCtl.xhr.send();
    } catch (e) {
    }
    if (CertCtl.xhr.readyState == 4 && CertCtl.xhr.status == 200) {
      result = CertCtl.xhr.responseText;
      console.log(result)
      // CertCtl.xhr.readyState = 1;
    }
    return result;
  },
  CertCtl_readIDCardSN: function () {//获取身份证物理卡号
    var result = "";
    //创建请求 第一个参数是代表以post方式发送；第二个是请求端口和地址；第三个表示是否异步
    CertCtl.xhr.open("POST", "http://127.0.0.1:18889/api/readIDCardSN", false);
    //发送请求
    try {
      CertCtl.xhr.send();
    } catch (e) {
    }
    if (CertCtl.xhr.readyState == 4 && CertCtl.xhr.status == 200) {
      result = CertCtl.xhr.responseText;
      CertCtl.xhr.readyState = 1;
    }
    return result;
  }

};
export var Card = function () {

};
let CertCtl
Card.prototype = {
  CertCtl: null,
  readIDCard: function (flag) {	//读身份证信息
    if (this.CertCtl == null) {
      CertCtl = new IDCertCtl();
    }
    var result = CertCtl.readCert();
    if (result == "") {
      alert("未启动读卡插件,请检查读卡器是否连接正常!");
      return null;
    }
    var resultObj = JSON.parse(result);
    if (resultObj.resultFlag != 0) {
      // if (flag == null) {
      //   alert(resultObj.errorMsg);
      // }
      return null;
    }
    var retVal = {};
    retVal.name = resultObj.resultContent.partyName;
    retVal.idcard = resultObj.resultContent.certNumber;
    retVal.address = resultObj.resultContent.certAddress;
    retVal.sex = resultObj.resultContent.gender;
    if (retVal.sex == 0) {
      retVal.sex = 2;
    }
    retVal.certOrg = resultObj.resultContent.certOrg;
    retVal.src = "data:image/jpeg;base64," + resultObj.resultContent.identityPic;
    //民族
    retVal.folk = resultObj.resultContent.nation;
    retVal.birth = resultObj.resultContent.bornDay;
    retVal.valid = resultObj.resultContent.expDate;
    return retVal;
  },
  readIDCardSn: function () {	//读身份证卡号
    if (this.CertCtl == null) {
      CertCtl = new IDCertCtl();
    }
    var result = CertCtl.readIDCardSN();

    if (result == "") {
      alert("未启动读卡插件,请检查读卡器是否连接正常!");
      return null;
    }
    console.log(result)
    var resultObj = JSON.parse(result);
    if (resultObj.resultFlag != 0) {
      alert(resultObj.errorMsg);
      return null;
    }
    return resultObj.IDCardSerial;
  },
  readICCardSn: function () { //读IC卡卡号
    if (this.CertCtl == null) {
      CertCtl = new IDCertCtl();
    }
    var result = CertCtl.readICCardSN();
    if (result == "") {
      alert("未启动读卡插件,请检查读卡器是否连接正常!");
      return null;
    }
    console.log(result)
    var resultObj = JSON.parse(result);
    if (resultObj.resultFlag != 0) {
      alert(resultObj.errorMsg);
      return null;
    }
    return "00000000" + resultObj.ICCardSerial;
  }
}
