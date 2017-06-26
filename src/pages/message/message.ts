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
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
    this.menuCtrl.enable(false, "menu");
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad Message');
  }

  sendmessage() {
    let mes = { sender_id: 1, sender: 'Dai Hua Xie Hua Kai', reciver: '我', sender_image: 'assets/images/o.jpg', reciver_image: 'assets/images/o.jpg', content: '回复一个新的消息。' };
    this.messages.push(mes);
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 300)
  }
}
