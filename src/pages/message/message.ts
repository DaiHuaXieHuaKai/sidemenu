import { UtilProvider } from './../../providers/util';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, MenuController, AlertController, ActionSheetController } from 'ionic-angular';

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
  messages = [
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: 'http://172.20.10.15:8888/imageUpload/infinite_1504074972822.jpg', type: 1 },
    { sender_id: 1, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课', type: 0 },
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课', type: 0 },
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课', type: 0 },
    { sender_id: 1, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课', type: 0 },
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课', type: 0 },
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '金华市工业银行', type: 0 },
    { sender_id: 1, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课', type: 0 },
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课', type: 0 },
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课', type: 0 },
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课', type: 0 },
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课', type: 0 },
    { sender_id: 1, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '度有意义欧耶耶', type: 0 },
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课', type: 0 },
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课', type: 0 },
    { sender_id: 1, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: 'assets/images/o.jpg', type: 1 }
  ];
  emojs = [];
  emojFlag = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,
    private util: UtilProvider, private actionsheetCtrl: ActionSheetController) {
    this.menuCtrl.enable(false, "menu");
    this.emojs = this.util.getEmoj();
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad Message');
  }





  /* 
  选择图片
  */
  upload(index) {
    let this_ = this;
    /* 图库 */
    if (index == 1) {
      this.util.selectImage(1).then(result => {
        this.util.uploadImage(result,'/common/upload').then((res: any) => {
          if (res.err == 0) {
            let mes = { sender_id: 1, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: res.path, type: 1 };
            this_.messages.push(mes);
            this_.scrollToBottom();
          } else {
            this.util.showLoading(res.msg);
          }
        }, (err) => {
          this.util.showLoading("图片上传失败");
        })
      }).catch(error => {
        this.util.showLoading("图片获取失败");
      })
    }
    /* 相机 */
    if (index == 2) {
      this.util.selectImage(0).then(result => {
        this.util.uploadImage(result,'/common/upload').then((res: any) => {
          if (res.err == 0) {
            let mes = { sender_id: 1, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: res.path, type: 1 };
            this_.messages.push(mes);
            this_.scrollToBottom();
          } else {
            this.util.showLoading(res.msg);
          }
        }, (err) => {
          this.util.showLoading("图片上传失败");
        })
      }).catch(error => {
        this.util.showLoading("图片获取失败");
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
    let mes = { sender_id: 1, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: this.inputValue, type: 0 };
    this.inputValue = "";
    this.messages.push(mes);
    this.scrollToBottom();
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

