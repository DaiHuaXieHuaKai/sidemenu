import { MediaCapture } from '@ionic-native/media-capture';
import { RongcloudProvider } from './../../providers/rongcloud/rongcloud';
import { UtilProvider } from './../../providers/util';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, MenuController, Events, AlertController } from 'ionic-angular';

@IonicPage({
  name: 'message'
})
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class Message {
  @ViewChild(Content) content: Content;
  inputValue = "";
  fromUserInfo: any;
  toUserInfo: any;
  title: string = "";
  messages = [];
  emojs = [];
  emojFlag = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,
    private util: UtilProvider, private rondCloud: RongcloudProvider, private events: Events, private alertController: AlertController,
    private mediaCapture: MediaCapture) {
    this.menuCtrl.enable(false, "menu");
    this.emojs = this.util.getEmoj();
    this.title = this.navParams.data.toNickname;
    this.events.subscribe("newMessage", (message) => {
      if (message.targetId == this.navParams.data.toUid) {
        this.messages.push(message);
        this.scrollToBottom();
      }
    })
  }

  ionViewWillEnter() {
    if (this.navParams.data) {
      /* 先获取发送者和接收者的用户信息 */
      this.util.post("/user/getUsersInfo", { fromUid: this.util.getItem("User").uid, toUid: this.navParams.data.toUid }).then((result: any) => {
        if (result.err == 0) {
          this.fromUserInfo = result.fromUser;
          this.toUserInfo = result.toUser;
          /* 获取历史会话信息 */
          let data = { conversationType: 1, targetId: this.navParams.data.toUid };
          this.rondCloud.getHistroyMessage(data).then((result: any) => {
            this.messages = result;
            this.scrollToBottom();
          }).catch(error => { })
        } else {
          this.util.showLoading(result.msg);
        }
      }).catch(error => {

      })

    }
  }
  /* 清除历史消息 */
  clearHistory() {
    let alertCtrl = this.alertController.create({
      title: "提示信息",
      message: "是否确定删除历史记录？",
      buttons: [{
        text: '取消',
        handler: () => { }
      }, {
        text: "确定",
        handler: () => {
          let data = { conversationType: 1, targetId: this.navParams.data.toUid };
          this.rondCloud.clearMessages(data).then(result => {
            if (result == 1) {
              /* 获取历史会话信息 */
              let data = { conversationType: 1, targetId: this.navParams.data.toUid };
              this.rondCloud.getHistroyMessage(data).then((result: any) => {
                this.messages = result;
                this.scrollToBottom();
              }).catch(error => { })
            } else {
              this.util.showLoading("清除失败");
            }
          }).catch(error => {

          })
        }
      }]
    })
    alertCtrl.present();
  }

  /* 语音 */
  voice() {
    //参数limit默认是1，如果设置为3的话表示可以录制3个片段
    this.mediaCapture.captureAudio().then((res:any) => {
      let path = res[0].fullPath;
      let type = res[0].type;
      this.util.uploadFile(path,'/common/uploadFile',type).then((res:any)=>{
        if (res.err == 0) {
          // let data = {
          //   conversationType: 1,
          //   targetId: this.toUserInfo.uid,
          //   targetAvatar: this.toUserInfo.avatar,
          //   targetNickname: this.toUserInfo.nickname,
          //   imageUri: res.path,
          //   text: res.pathSmall,
          //   uid: this.fromUserInfo.uid,
          //   avatar: this.fromUserInfo.avatar,
          //   nickname: this.fromUserInfo.nickname
          // }
          // this.rondCloud.sendImageMessage(data).then((result: any) => {
          //   this.messages.push(result);
          //   this.scrollToBottom();
          // }).catch(error => { })
        } else {
          this.util.showLoading(res.msg);
        }
      }).catch(error=>{})
      
    }, (error) => { })
  }
  /* 
  选择图片
  */
  upload(index) {
    let this_ = this;
    /* 图库 */
    if (index == 1) {
      this.util.selectImage(1).then(result => {
        this.util.uploadImage(result, '/common/upload').then((res: any) => {
          if (res.err == 0) {
            let data = {
              conversationType: 1,
              targetId: this.toUserInfo.uid,
              targetAvatar: this.toUserInfo.avatar,
              targetNickname: this.toUserInfo.nickname,
              imageUri: res.path,
              text: res.pathSmall,
              uid: this.fromUserInfo.uid,
              avatar: this.fromUserInfo.avatar,
              nickname: this.fromUserInfo.nickname
            }
            this.rondCloud.sendImageMessage(data).then((result: any) => {
              this.messages.push(result);
              this.scrollToBottom();
            }).catch(error => { })
          } else {
            this.util.showLoading(res.msg);
          }
        }, (err) => {
          this.util.showLoading("信息发送失败，请稍后再试");
        })
      }).catch(error => {
        //this.util.showLoading("图片获取失败");
      })
    }
    /* 相机 */
    if (index == 2) {
      this.util.selectImage(0).then(result => {
        this.util.uploadImage(result, '/common/upload').then((res: any) => {
          if (res.err == 0) {
            let data = {
              conversationType: 1,
              targetId: this.toUserInfo.uid,
              targetAvatar: this.toUserInfo.avatar,
              targetNickname: this.toUserInfo.nickname,
              imageUri: res.path,
              text: res.pathSmall,
              uid: this.fromUserInfo.uid,
              avatar: this.fromUserInfo.avatar,
              nickname: this.fromUserInfo.nickname
            }
            this.rondCloud.sendImageMessage(data).then((result: any) => {
              this.messages.push(result);
              this.scrollToBottom();
            }).catch(error => { })
          } else {
            this.util.showLoading(res.msg);
          }
        }, (err) => {
          this.util.showLoading("信息发送失败，请稍后再试");
        })
      }).catch(error => {
        //this.util.showLoading("图片获取失败");
      })
    }
  }

  /* 
  打开、关闭表情
  */
  showEmoj() {
    if (this.emojFlag) {
      this.emojFlag = false;
      this.scrollToBottom();
    } else {
      this.emojFlag = true;
      this.scrollToBottom();
    }
  }
  /* 
  选择表情
  */
  selectEmoj(emoj) {
    this.inputValue = this.inputValue + emoj;
  }

  /* 
  发送定位
  */

  /* 
  发送消息
  */
  sendmessage() {
    this.emojFlag = false;
    let data = {
      conversationType: 1,
      targetId: this.toUserInfo.uid,
      targetAvatar: this.toUserInfo.avatar,
      targetNickname: this.toUserInfo.nickname,
      text: this.inputValue,
      uid: this.fromUserInfo.uid,
      avatar: this.fromUserInfo.avatar,
      nickname: this.fromUserInfo.nickname
    }
    this.rondCloud.sendTextMessage(data).then((result) => {
      if (result) {
        this.inputValue = "";
        this.messages.push(result);
        this.scrollToBottom();
      } else {
        this.util.showLoading("信息发送失败，请稍后再试");
      }
    }).catch(error => { })
  }
  /* 
  滚动到底部
  */
  scrollToBottom() {
    this.content.resize();
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 300)
  }
}