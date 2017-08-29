import { UtilProvider } from './../../providers/util';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, MenuController } from 'ionic-angular';

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
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课' },
    { sender_id: 1, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课' },
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课' },
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课' },
    { sender_id: 1, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课' },
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课' },
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '金华市工业银行' },
    { sender_id: 1, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课' },
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课' },
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课' },
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课' },
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课' },
    { sender_id: 1, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '度有意义欧耶耶' },
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课' },
    { sender_id: 2, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '灵界基友两节课' },
    { sender_id: 1, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '积分回复并不适合' }
  ];
  emojs = [];
  emojFlag = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private util: UtilProvider) {
    this.menuCtrl.enable(false, "menu");
    this.emojs = this.util.getEmoj();
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad Message');
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
  发送消息
  */
  sendmessage() {
    this.emojFlag = false;
    let mes = { sender_id: 1, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: this.inputValue };
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

