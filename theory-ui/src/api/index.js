/*
 * @Author: chizhigao户名 2279648073@qq.com邮箱
 * @Date: 2023-06-19 14:53:33
 * @LastEditors: chizhigao户名 2279648073@qq.com邮箱
 * @LastEditTime: 2023-06-19 18:21:46
 * @FilePath: \theory\theory-ui\src\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 接口地址封装
 * Github: https://github.com/osuuu
 */

import request from "@/utils/request";

// get接口示例
export function getExample(params) {
  return request({
    url: "/example",
    method: "get",
    params,
  });
}
// put接口示例
export function putExample(data) {
  return request({
    url: "/example",
    method: "put",
    data,
  });
}
// post接口示例
export function postExample(data) {
  return request({
    url: "/example",
    method: "post",
    data,
  });
}
// delete接口示例
export function delExample(params) {
  return request({
    url: "/example",
    method: "delete",
    params,
  });
}

/* 登录 */
export function getTheoryAPI(idcard, trainType) {
  return request({
    url: `/${idcard}-stuInfo-${trainType}`,
    method: "get",
  });
}

/* 签到 */
export function stuSignAPI(num) {
  return request({
    url: `/signIn/${num}`,
    method: "get",
  });
}

/* 题目 */
export function queryQuestionAPI(id) {
  return request({
    url: `/queryExamInfo/${id}`,
    method: "get",
  });
}

/* 答题 */
export function answerAPI(examNum, questionId, answer) {
  return request({
    url: `/answer`,
    method: "get",
    params: {
      examNum: examNum,
      questionId: questionId,
      answer: answer,
    },
  });
}

/* 交卷 */
export function signOutAPI(id) {
  return request({
    url: `/signOut/${id}`,
    method: "get",
  });
}
