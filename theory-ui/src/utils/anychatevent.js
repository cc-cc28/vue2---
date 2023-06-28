// // AnyChat for Web SDK

// import {
//   BRAC_GetOnlineUser,
//   BRAC_VIDEOCALL_EVENT_FINISH,
//   BRAC_VIDEOCALL_EVENT_REPLY,
//   BRAC_VIDEOCALL_EVENT_REQUEST, BRAC_VIDEOCALL_EVENT_START,
//   WM_GV_CAMERASTATE,
//   WM_GV_CONNECT,
//   WM_GV_ENTERROOM,
//   WM_GV_FRIENDSTATUS,
//   WM_GV_H5MEDIAOPENSTATUS,
//   WM_GV_ICELINKCLOSE,
//   WM_GV_LINKCLOSE,
//   WM_GV_LOGINSYSTEM,
//   WM_GV_MEDIAAUTHORITY,
//   WM_GV_MICSTATECHANGE,
//   WM_GV_ONLINEUSER,
//   WM_GV_P2PCONNECTSTATE,
//   WM_GV_PRIVATEECHO,
//   WM_GV_PRIVATEEXIT,
//   WM_GV_PRIVATEREQUEST,
//   WM_GV_QUERYINFOFORMSERVER,
//   WM_GV_USERATROOM,
//   WM_GV_USERINFOUPDATE,
//   WM_GV_VIDEOSIZECHG,
//   WM_GV_STREAMRECORDCTRLEX
// } from "@/utils/anychatsdk";
// import videoIndex from "@/views/manager/monitor/video/index"
// import context from '../main.js'

// let vm = null;

// export function sendThis(_this) {
//   vm = _this;
// }


// /********************************************
//  *        事件回调部分        *
//  *******************************************/

// // 异步消息通知，包括连接服务器、登录系统、进入房间等消息
// export function OnAnyChatNotifyMessage(dwNotifyMsg, wParam, lParam) {
//   switch (dwNotifyMsg) {
//     case WM_GV_CONNECT:
//       OnAnyChatConnect(wParam, lParam);
//       break;
//     case WM_GV_LOGINSYSTEM:
//       OnAnyChatLoginSystem(wParam, lParam);
//       break;
//     case WM_GV_ENTERROOM:
//       OnAnyChatEnterRoom(wParam, lParam);
//       break;
//     case WM_GV_ONLINEUSER:
//       OnAnyChatRoomOnlineUser(wParam, lParam);
//       break;
//     case WM_GV_USERATROOM:
//       OnAnyChatUserAtRoom(wParam, lParam);
//       break;
//     case WM_GV_LINKCLOSE:
//       OnAnyChatLinkClose(wParam, lParam);
//       break;
//     case WM_GV_MICSTATECHANGE:
//       OnAnyChatMicStateChange(wParam, lParam);
//       break;
//     case WM_GV_CAMERASTATE:
//       OnAnyChatCameraStateChange(wParam, lParam);
//       break;
//     case WM_GV_P2PCONNECTSTATE:
//       OnAnyChatP2PConnectState(wParam, lParam);
//       break;
//     case WM_GV_PRIVATEREQUEST:
//       OnAnyChatPrivateRequest(wParam, lParam);
//       break;
//     case WM_GV_PRIVATEECHO:
//       OnAnyChatPrivateEcho(wParam, lParam);
//       break;
//     case WM_GV_PRIVATEEXIT:
//       OnAnyChatPrivateExit(wParam, lParam);
//       break;
//     case WM_GV_USERINFOUPDATE:
//       OnAnyChatUserInfoUpdate(wParam, lParam);
//       break;
//     case WM_GV_FRIENDSTATUS:
//       OnAnyChatFriendStatus(wParam, lParam);
//       break;
//     case WM_GV_VIDEOSIZECHG:
//       OnAnyChatVideoSizeChange(wParam, lParam);
//       break;
//     case WM_GV_ICELINKCLOSE:
//       OnAnyChatIceLinkClose(wParam, lParam);
//       break;
//     case WM_GV_MEDIAAUTHORITY:
//       OnAnyChatMediaAuthority(wParam, lParam);
//       break;
//     case WM_GV_H5MEDIAOPENSTATUS:
//       OnAnyChatH5MediaOpenStatus(wParam, lParam);
//       break
//     case WM_GV_QUERYINFOFORMSERVER:
//       OnAnyChatQueryInfoFromServer(wParam, lParam);
//       break
//     case WM_GV_STREAMRECORDCTRLEX:
//       OnAnyChatStreamRecordCtrlExReply(wParam, lParam)
//       break;
//     default:
//       break;
//   }
// }

// // 收到文字消息
// export function OnAnyChatTextMessage(dwFromUserId, dwToUserId, bSecret, lpMsgBuf, dwLen) {
//   console.log('sourceuid:' + dwFromUserId + ', destuid:' + dwToUserId + ', secrtc:' + bSecret + ', testMsg:' + lpMsgBuf)
//   onTextMessage(lpMsgBuf);
// }

// // 收到透明通道传输数据
// export function OnAnyChatTransBuffer(dwUserId, lpBuf, dwLen) {
//   console.log('Event OnAnyChatTransBuffer: userid:' + dwUserId + ", len:" + dwLen);
//   onTransMessage(lpBuf);
// }

// // 收到透明通道（扩展）传输数据
// export function OnAnyChatTransBufferEx(dwUserId, lpBuf, dwLen, wParam, lParam, dwTaskId) {
//   console.log('Event OnAnyChatTransBufferEx: userid:' + dwUserId + ", len:" + dwLen);
//   onTransMessage(lpBuf)
// }

// //文件传输
// export function OnAnyChatTransFileEx(dwTaskId, dwUserId, dwStatus, dwParam, lpParam) {
//   console.log('Event OnAnyChatTransFileEx: dwTaskId:' + dwTaskId + ", dwUserId:" + dwUserId + ", dwStatus:" + dwStatus + ", dwParam:" + dwParam + ", lpParam:" + lpParam);
// }

// // 文件传输完成通知
// function OnAnyChatTransFile(dwUserId, lpFileName, lpTempFilePath, dwFileLength, wParam, lParam, dwTaskId) {

// }

// // 系统音量改变通知
// function OnAnyChatVolumeChange(device, dwCurrentVolume) {

// }

// // 收到服务器发送的SDK Filter数据
// function OnAnyChatSDKFilterData(lpBuf, dwLen) {

// }

// // 收到录像或拍照完成事件
// export function OnAnyChatRecordSnapShot(dwUserId, lpFileName, dwParam, dwFlags) {
//   console.log('filename:' + lpFileName.length);
//   $('#pictu').attr('src', lpFileName);
// }

// // 收到录像或拍照完成事件（扩展）
// export function OnAnyChatRecordSnapShotEx(dwUserId, lpFileName, dwElapse, dwFlags, dwParam, lpUserStr) {
//   if ((dwElapse & BRAC_RECORD_FLAGS_SNAPSHOT) != 0) {
//     console.log('SnapShot successfully! name:' + lpFileName);
//     // var urlFile = BRAC_GetUserStreamInfoString(BRAC_SO_LOCALPATH2URL,lpFileName,0);
//     // console.console.log('snapshot successfully! fileName:' + lpFileName);
//     // onShowSnapShot(lpFileName);
//   } else {
//     show_local_record(lpFileName);
//     console.log('record successfully! name:' + lpFileName)
//   }
// }

// // 收到录像或拍照完成事件（扩展2：增加errorcode）
// export function OnAnyChatRecordSnapShotEx2(dwUserId, dwErrorCode, lpFileName, dwElapse, dwFlags, dwParam, lpUserStr) {
//   console.log("OnAnyChatRecordSnapShotEx2: dwUserId:" + dwUserId + ", dwErrorCode:" + dwErrorCode + ", lpFileName:" + lpFileName + ", dwElapse:" + dwElapse + ", dwFlags:" + dwFlags + ", dwParam:" + dwParam + ", lpUserStr:" + lpUserStr);
//   if (dwErrorCode == 0) {
//     if ((dwFlags & BRAC_RECORD_FLAGS_SNAPSHOT) != 0) {
//       //拍照触发的
//       console.log('OnAnyChatRecordSnapShotEx2: SnapShot successfully! name:' + lpFileName);
//     } else {
//       console.log('OnAnyChatRecordSnapShotEx2: record successfully! name:' + lpFileName);
//     }
//   }
// }

// //录像指令回应
// function OnAnyChatStreamRecordCtrlExReply(bStartRecord, dwErrorCode) {
//   console.log('OnAnyChatStreamRecordReply:' + dwErrorCode);
// }

// // AnyChatCoreSDK异步事件
// export function OnAnyChatCoreSDKEvent(dwEventType, lpEventJsonStr, dwErrorCode) {
//   console.log("OnAnyChatCoreSDKEvent: eventType:" + dwEventType + ", json:" + lpEventJsonStr + ", errorCode:" + dwErrorCode);
// }


// /********************************************
//  *    AnyChat SDK核心业务流程        *
//  *******************************************/

// // 客户端连接服务器，bSuccess表示是否连接成功，errorcode表示出错代码
// function OnAnyChatConnect(bSuccess, errorcode) {
//   //console.console.log("OnAnyChatConnect(errorcode=" + errorcode + ")");
//   if (errorcode == 0) {
//     // console.log('链接成功 errorcode:'+errorcode);


//   } else {
//     // console.log('链接失败 errorcode:' + errorcode);
//   }
// }

// // 客户端登录系统，dwUserId表示自己的用户ID号，errorcode表示登录结果：0 成功，否则为出错代码，参考出错代码定义
// function OnAnyChatLoginSystem(dwUserId, errorcode) {
//   console.log("OnAnyChatLoginSystem(userid=" + dwUserId + ", errorcode=" + errorcode + ")");
//   if (errorcode == 0) {

//     //同步
//     // InitClientObjectInfo(dwUserId, 1, 5)

//   } else {

//   }
// }

// // 客户端进入房间，dwRoomId表示所进入房间的ID号，errorcode表示是否进入房间：0成功进入，否则为出错代码
// function OnAnyChatEnterRoom(dwRoomId, errorcode) {

//   if (errorcode == 0) {
//     vm.opencamera(1) //打开自己摄像头

//   } else {
//     // console.log('进入房间失败，errorcode：' + errorcode);
//   }

//   /**
//    * 获取设备
//    */

// }

// // 收到当前房间的在线用户信息，进入房间后触发一次，dwUserCount表示在线用户数（包含自己），dwRoomId表示房间ID
// function OnAnyChatRoomOnlineUser(dwUserCount, dwRoomId) {
//   // console.log('房间人数' + dwUserCount);
//   var userList = BRAC_GetOnlineUser();
//   for (var i in userList) {
//     // vm.opencamera_user_id(userList[i], 1)
//     // videoIndex.methods.opencamera_user_id(userList[i], 1);
//   }


//   // console.log('房间都有谁：' + userList);
// }

// // 用户进入（离开）房间，dwUserId表示用户ID号，bEnterRoom表示该用户是进入（1）或离开（0）房间
// function OnAnyChatUserAtRoom(dwUserId, bEnterRoom) {
//   if (bEnterRoom == 1) {
//     vm.opencamera_user_id(dwUserId, 1);

//   } else {
//     vm.opencamera_user_id(dwUserId, 0);
//   }
//    console.log("OnAnyChatUserAtRoom(userid=" + dwUserId + ", benter=" + bEnterRoom + ")");
// }

// // 网络连接已关闭，该消息只有在客户端连接服务器成功之后，网络异常中断之时触发，reason表示连接断开的原因
// function OnAnyChatLinkClose(reason, errorcode) {
//   //  console.log('anychat 网络关闭：' + errorcode);

// }

// //网络连接断开瞬间，该消息只有在客户端连接服务器成功之后，网络异常中断开始时触发
// function OnAnyChatLinkCloseInstant() {
//   console.log('anychat 网络断开！');
// }

// //网络重连成功，该消息只有在客户端连接服务器成功之后，网络异常中断后重连成功后触发
// function OnAnyChatRelink() {
//   console.log('anychat 网络重连成功！');
// }

// // 用户网络异常，音视频链接建立失败
// function OnAnyChatIceLinkClose(dwUserId, errorcode) {
//   // console.log('anychat 用户网络异常：' + errorcode);

// }

// // 媒体权限获取
// function OnAnyChatMediaAuthority(iSuccess, errorInfo) {
//   onMediaAuthority(iSuccess, errorInfo);
//   console.log("OnAnyChatMediaAuthority: success:" + iSuccess + ", errorInfo:" + errorInfo);
// }

// function OnAnyChatH5MediaOpenStatus(iStatus, errorInfo) {
//   console.log("OnAnyChatH5MediaOpenStatus: mediaStatus:" + iStatus + ", errorInfo:" + errorInfo);
// }


// function OnAnyChatQueryInfoFromServer(result, errorcode) {
//   if (typeof result == "object") {
//     console.log("OnAnyChatQueryInfoFromServer: result:" + JSON.stringify(result) + ", errorcode:" + errorcode);
//   } else {
//     console.log("OnAnyChatQueryInfoFromServer: result:" + result + ", errorcode:" + errorcode);
//   }
// }

// // 用户的音频设备状态变化消息，dwUserId表示用户ID号，State表示该用户是否已打开音频采集设备（0：关闭，1：打开）
// function OnAnyChatMicStateChange(dwUserId, State) {

// }

// // 用户摄像头状态发生变化，dwUserId表示用户ID号，State表示摄像头的当前状态（0：没有摄像头，1：有摄像头但没有打开，2：打开）
// function OnAnyChatCameraStateChange(dwUserId, State) {

// }

// // 本地用户与其它用户的P2P网络连接状态发生变化，dwUserId表示其它用户ID号，State表示本地用户与其它用户的当前P2P网络连接状态（0：没有连接，1：仅TCP连接，2：仅UDP连接，3：TCP与UDP连接）
// function OnAnyChatP2PConnectState(dwUserId, State) {

// }

// // 用户发起私聊请求，dwUserId表示发起者的用户ID号，dwRequestId表示私聊请求编号，标识该请求
// function OnAnyChatPrivateRequest(dwUserId, dwRequestId) {

// }

// // 用户回复私聊请求，dwUserId表示回复者的用户ID号，errorcode为出错代码
// function OnAnyChatPrivateEcho(dwUserId, errorcode) {

// }

// // 用户退出私聊，dwUserId表示退出者的用户ID号，errorcode为出错代码
// function OnAnyChatPrivateExit(dwUserId, errorcode) {

// }

// // 视频通话消息通知回调函数
// export function OnAnyChatVideoCallEvent(dwEventType, dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr) {
//    console.log("OnAnyChatVideoCallEvent(dwEventType=" + dwEventType + ", dwUserId=" + dwUserId + ", dwErrorCode=" + dwErrorCode + ", dwFlags=" + dwFlags + ", dwParam=" + dwParam + ", szUserStr=" + szUserStr + ")");
//   switch (+dwEventType) {
//     case BRAC_VIDEOCALL_EVENT_REQUEST:
//       //收到视频呼叫请求
//       onVideoCallControlRequest(dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr);
//       break;
//     case BRAC_VIDEOCALL_EVENT_REPLY:
//       ////视频呼叫请求回复
//       onVideoCallControlReply(dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr);
//       break;
//     case BRAC_VIDEOCALL_EVENT_START:
//       //通话开始
//       onVideoCallControlStart(dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr);
//       break;
//     case BRAC_VIDEOCALL_EVENT_FINISH:
//       //视频通话结束
//       onVideoCallControlFinish(dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr);
//       break;

//   }
// }

// // 用户信息更新通知，dwUserId表示用户ID号，dwType表示更新类别
// function OnAnyChatUserInfoUpdate(dwUserId, dwType) {

// }

// // 好友在线状态变化，dwUserId表示好友用户ID号，dwStatus表示用户的当前活动状态：0 离线， 1 上线
// function OnAnyChatFriendStatus(dwUserId, dwStatus) {

//   //console.console.log("OnAnyChatFriendStatus(dwUserId=" + dwUserId + ", dwStatus=" + dwStatus + ")", console.log_TYPE_EVENT);

// }

// //业务对象事件通知
// export function OnAnyChatObjectEvent(dwObjectType, dwObjectId, dwEventType, dwParam1, dwParam2, dwParam3, dwParam4, strParam) {
//   //log("OnAnyChatObjectEvent(dwObjectType=" + dwObjectType + ", dwObjectId=" + dwObjectId +  ", dwEventType=" + dwEventType + ")", LOG_TYPE_EVENT);
//   //refreshAgentServiceInfo();
//   switch (dwEventType) {
//     case ANYCHAT_OBJECT_EVENT_UPDATE:
//       OnAnyChatObjectUpdate(dwObjectType, dwObjectId);
//       break;
//     case ANYCHAT_OBJECT_EVENT_SYNCDATAFINISH:
//       OnAnyChatObjectSyncDataFinish(dwObjectType, dwObjectId);
//       break;
//     case ANYCHAT_AREA_EVENT_ENTERRESULT:
//       OnAnyChatEnterAreaResult(dwObjectType, dwObjectId, dwParam1);
//       break;
//     case ANYCHAT_AREA_EVENT_LEAVERESULT:
//       OnAnyChatLeaveAreaResult(dwObjectType, dwObjectId, dwParam1);
//       break;
//     case ANYCHAT_AREA_EVENT_STATUSCHANGE:
//       OnAnyChatAreaStatusChange(dwObjectType, dwObjectId, dwParam1);
//       break;
//     case ANYCHAT_QUEUE_EVENT_STATUSCHANGE:
//       OnAnyChatQueueStatusChanged(dwObjectType, dwObjectId);
//       break;
//     case ANYCHAT_QUEUE_EVENT_ENTERRESULT:
//       OnAnyChatEnterQueueResult(dwObjectType, dwObjectId, dwParam1);
//       break;
//     case ANYCHAT_QUEUE_EVENT_LEAVERESULT:
//       OnAnyChatLeaveQueueResult(dwObjectType, dwObjectId, dwParam1);
//       break;
//     case ANYCHAT_AGENT_EVENT_STATUSCHANGE:
//       OnAnyChatAgentStatusChanged(dwObjectType, dwObjectId, dwParam1);
//       break;
//     case ANYCHAT_AGENT_EVENT_SERVICENOTIFY:
//       OnAnyChatServiceStart(dwParam1, dwParam2, dwParam3);
//       break;
//     case ANYCHAT_AGENT_EVENT_WAITINGUSER:
//       OnAnyChatAgentWaitingUser();
//       break;
//     case ANYCHAT_AGENT_EVENT_ISREADY:
//       OnAnyChatAgentprepared(dwParam1, dwParam2, dwParam3);
//       break;
//     default:
//       break;
//   }
// }


// //业务对象数据更新事件
// function OnAnyChatObjectUpdate(dwObjectType, dwObjectId) {
//   // console.log('OnAnyChatObjectUpdate(' + dwObjectType + ',' + dwObjectId + ')');
//   if (dwObjectType == ANYCHAT_OBJECT_TYPE_AREA) {
//     areaIdArray[areaArrayIdx] = dwObjectId;
//     areaArrayIdx++;
//   } else if (dwObjectType == ANYCHAT_OBJECT_TYPE_QUEUE) {


//   } else if (dwObjectType == ANYCHAT_OBJECT_TYPE_AGENT) {

//   }

// }

// //业务对象同步完成事件
// function OnAnyChatObjectSyncDataFinish(dwObjectType, dwObjectId) {
//   console.log('OnAnyChatObjectSyncDataFinish(' + dwObjectType + ',' + dwObjectId + ')');
//   if (dwObjectType == ANYCHAT_OBJECT_TYPE_AREA) {
//     showSerivceArea();
//   }

// }

// // 进入服务区域通知事件
// function OnAnyChatEnterAreaResult(dwObjectType, dwObjectId, dwErrorCode) {
//   console.log('OnAnyChatEnterAreaResult(' + dwObjectType + ',' + dwObjectId + ',' + dwErrorCode + ')');
//   if (dwErrorCode == 0) {
//     areaEnter();
//   }

// }

// // 离开服务区域通知事件
// function OnAnyChatLeaveAreaResult(dwObjectType, dwObjectId, dwErrorCode) {
//   document.getElementById('queue').innerHTML = '';
//   console.log('OnAnyChatLeaveAreaResult(' + dwObjectType + ',' + dwObjectId + ',' + dwErrorCode + ')');
// }

// //营业厅状态变化
// function OnAnyChatAreaStatusChange(dwObjectType, dwObjectId, dwErrorCode) {
//   console.log('OnAnyChatAreaStatusChange(' + dwObjectType + ',' + dwObjectId + ',' + dwErrorCode + ')');

// }

// // 队列状态变化
// function OnAnyChatQueueStatusChanged(dwObjectType, dwObjectId) {
//   console.log('OnAnyChatQueueStatusChanged(' + dwObjectType + ',' + dwObjectId + ')');

// }

// // 本地用户进入队列结果
// function OnAnyChatEnterQueueResult(dwObjectType, dwObjectId, dwErrorCode) {
//   queuetime(0);
//   console.log('OnAnyChatEnterQueueResult(' + dwObjectType + ',' + dwObjectId + ',' + dwErrorCode + ')');


// }

// // 本地用户离开队列结果
// function OnAnyChatLeaveQueueResult(dwObjectType, dwObjectId, dwErrorCode) {
//   queuetime(1);
//   console.log('OnAnyChatLeaveQueueResult(' + dwObjectType + ',' + dwObjectId + ',' + dwErrorCode + ')');

// }

// // 坐席状态变化
// function OnAnyChatAgentStatusChanged(dwObjectType, dwObjectId, dwParam1) {
//   console.log('OnAnyChatAgentStatusChanged(' + dwObjectType + ',' + dwObjectId + ',' + dwParam1 + ')');


// }

// // 坐席服务开始
// function OnAnyChatServiceStart(dwAgentId, clientId, dwQueueId) {
//   console.log('OnAnyChatServiceStart(' + dwAgentId + ',' + clientId + ',' + dwQueueId + ')');

// }

// //队列里没有客户，坐席端处理方式
// function OnAnyChatAgentWaitingUser() {
//   console.log('OnAnyChatAgentWaitingUser()');

// }

// //客户收到坐席准备好
// function OnAnyChatAgentprepared(dwAgentId, clientId, dwQueueId) {
//   console.log('开始呼叫坐席:' + dwAgentId);
//   callAgent(dwAgentId);
//   console.log('OnAnyChatAgentprepared(' + dwAgentId + ',' + clientId + ',' + dwQueueId + ')');
// }


// function onVideoCallControlReply(dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr) {
//   switch (dwErrorCode) {
//     case GV_ERR_SUCCESS:
//       console.log('呼叫-发送成功:' + dwUserId);
//       break;
//     case GV_ERR_SESSION_QUIT:
//       console.log("呼叫-源用户主动放弃会话");
//       break;
//     case GV_ERR_SESSION_OFFLINE:
//       console.log("呼叫-目标用户不在线");
//       break;
//     case GV_ERR_SESSION_BUSY:
//       console.log("呼叫-目标用户忙");
//       break;
//     case GV_ERR_SESSION_REFUSE:
//       console.log("呼叫-目标用户拒绝会话");
//       break;
//     case GV_ERR_SESSION_TIMEOUT:
//       console.log("呼叫-会话请求超时");
//       break;
//     case GV_ERR_SESSION_DISCONNECT:
//       console.log("呼叫-网络断线");
//       break;
//     default:
//       break;
//   }
// }
