import { UtilProvider } from './../util';
import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
declare let RongIMLib: any;
declare let RongIMClient: any;
@Injectable()
export class RongcloudProvider {
  appkey = "cpj2xarlc11bn";

  /* 
  //一定要注意传递参数的类型
  PRIVATE 为单聊、
  DISCUSSION 为讨论组、
  GROUP 为群组、
  CHATROOM 为聊天室、
  CUSTOMER_SERVICE 为客服、
  SYSTEM 为系统消息、
  APP_PUBLIC_SERVICE 为应用公众账号（应用内私有）、
  PUBLIC_SERVICE 为公众账号 (公有)
  
  */
  constructor(public util: UtilProvider, private events: Events) {
    this.init();
  }

  /* 初始化 */
  init() {
    RongIMLib.RongIMClient.init(this.appkey, null, {});
    this.setConnectionStatusListener();
    this.setOnReceiveMessageListener();
    this.connect();
  }

  /* 设置连接状态监听,在init后，connect前 */
  setConnectionStatusListener() {
    RongIMClient.setConnectionStatusListener({
      onChanged: function (status) {
        console.log(status)
        switch (status) {
          case 0:
            console.log("CONNECTED连接成功");
            break;
          case 1:
            console.log("CONNECTING连接中");
            break;
          case 2:
            console.log("DISCONNECTED断开连接");
            break;
          case 6:
            console.log("KICKED_OFFLINE_BY_OTHER_CLIENT用户账户在其他设备登录，本机会被踢掉线。");
            break;
          case -1:
            console.log("NETWORK_UNAVAILABLE网络不可用");
            break;
        }
      }
    });
  }

  /* 设置消息监听 */
  setOnReceiveMessageListener() {
    let this_ = this;
    RongIMClient.setOnReceiveMessageListener({
      // 接收到的消息
      onReceived: function (message) {
        this_.events.publish('newMessage', message);
      }
    });
  }


  /* 连接 */
  connect() {
    if (JSON.stringify(this.util.getItem("RongCloudToken")) == "{}") {
      this.util.post('/rongcloud/getToken', { uid: this.util.getItem("User").uid }).then((result: any) => {
        if (result.err == 0) {
          this.util.setItem("RongCloudToken", result.data.token);
          RongIMClient.connect(result.data.token, {
            onSuccess: function (userId) {
              console.log("链接成功，用户id：" + userId);
            },
            onTokenIncorrect: function () {
              console.log('token无效');
            },
            onError: function (errorCode) {
              console.log("=============================================");
              console.log(errorCode);
            }
          });
        } else {
          this.util.showLoading("Token获取失败");
        }
      }).catch((error) => {

      })
    } else {
      RongIMClient.connect(this.util.getItem("RongCloudToken"), {
        onSuccess: function (userId) {
          console.log("链接成功，用户id：" + userId);
        },
        onTokenIncorrect: function () {
          console.log('token无效');
        },
        onError: function (errorCode) {
          console.log("=============================================");
          console.log(errorCode);
        }
      });
    }



  }

  /* 获取会话列表 
  
   @params 
   conversationTypes = null;  //具体格式设置需要补充
   limit = 1000; //获取会话的数量，不传或传null为全部，暂不支持分页
  */
  getConversationList() {
    return new Promise((resolve, reject) => {
      let conversationTypes = null;  //具体格式设置需要补充
      let limit = null; //获取会话的数量，不传或传null为全部，暂不支持分页
      RongIMClient.getInstance().getConversationList({
        onSuccess: function (list) {
          resolve(list)
        },
        onError: function (error) {
          resolve([]);
        }
      }, conversationTypes, limit);
    })
  }
  /* 获取会话 */
  getConversation(data) {
    //需在 getConversationList 方法执行之后执行，否则返回null
    RongIMClient.getInstance().getConversation(data.conversationType, data.targetId, {
      onSuccess: function (result) {
        console.log(result)
      },
      onError: function (error) {
        console.log(error)
      }
    });
  }
  /* 移除某条会话 */
  removeConversation(data) {
    return new Promise((resolve, reject) => {
      RongIMClient.getInstance().removeConversation(data.conversationType, data.targetId, {
        onSuccess: function (result) {
          resolve(1);
        },
        onError: function (error) {
          resolve(0);
        }
      });
    })
  }

  /* 清除会话列表 */
  clearConversation() {
    RongIMClient.getInstance().clearConversations({
      onSuccess: function () {
        console.log("清除会话成功");
      },
      onError: function (error) {
        // error => 清除会话错误码。 
        console.log("清除会话失败");
      }
    });
  }

  /* 清除未读数 */
  clearUnreadCount(data) {
    RongIMClient.getInstance().clearUnreadCount(data.conversationType, data.targetId, {
      onSuccess: function () {
        console.log("清除成功");
      },
      onError: function (error) {
        console.log("清除失败");
      }
    });
  }

  /* 获取历史消息 */
  getHistroyMessage(data) {
    /*
    注意事项：
      1：一定一定一定要先开通 历史消息云存储 功能，本服务收费，测试环境可免费开通
      2：登录开发者后台可以直接开启 https://developer.rongcloud.cn/app
      2：timestrap第二次拉取必须为null才能实现循环拉取
    */
    return new Promise((resolve, reject) => {
      let count = 20;  // 2 <= count <= 20
      var timestrap = 0; //0, 1483950413013
      RongIMClient.getInstance().getHistoryMessages(data.conversationType, JSON.stringify(data.targetId), timestrap, count, {
        onSuccess: function (list, hasMsg) {
          //可通过sort订制其他顺序
          list.sort(function (a, b) {
            return a.sentTime > b.sentTime;
          });
          resolve(list);
        },
        onError: function (error) {
          resolve([]);
        }
      });
    })
  }
  clearMessages(data) {
    console.log(data)
    return new Promise((resolve, reject) => {
      RongIMClient.getInstance().clearMessages(data.conversationType, JSON.stringify(data.targetId), {
        onSuccess: function (isClear) {
          if (isClear) {
            resolve(1);
          } else {
            resolve(0);
          }
        },
        onError: function () {
          resolve(0);
        }
      });
    })
  }

  /* 发送文本消息 
  conversationType:number
  targetId:string
  */
  sendTextMessage(data) {
    return new Promise((resolve, reject) => {
      let pushData = "pushData" + Date.now();
      let content = {
        content: data.text,
        user: {
          "uid": data.uid,	//不支持中文及特殊字符
          "name": data.nickname,
          "portrait": data.avatar
        },
        extra: JSON.stringify({ avatar: data.targetAvatar, nickname: data.targetNickname, uid: data.targetId })
      };
      let msg = new RongIMLib.TextMessage(content);
      RongIMClient.getInstance().sendMessage(data.conversationType, JSON.stringify(data.targetId), msg, {
        onSuccess: function (message) {
          resolve(message);
        },
        onError: function (errorCode, message) {
          resolve("");
        }
      }, false, pushData);
    })
  }

  /* 发送图片消息 */
  sendImageMessage(data) {
    /*
    需自行解决文件上传  
    缩略图必须是base64码的jpg图，而且不带前缀"data:image/jpeg;base64,"，不得超过100K
    */
    return new Promise((resolve, reject) => {
      let content = {
        imageUri: data.imageUri,
        content: "",
        user: {
          "uid": data.uid,
          "name": data.nickname,
          "portrait": data.avatar
        },
        extra: JSON.stringify({ avatar: data.targetAvatar, nickname: data.targetNickname, uid: data.targetId })
      };
      this.util.url2Base64(data.text).then((result:any) => {
        content.content = result;
        let msg = new RongIMLib.ImageMessage(content);
        RongIMClient.getInstance().sendMessage(data.conversationType, JSON.stringify(data.targetId), msg, {
          onSuccess: function (message) {
            resolve(message);
          },
          onError: function (errorCode, message) {
            resolve("");
          }
        });
      }).catch(error => { });
    })
  }
}
