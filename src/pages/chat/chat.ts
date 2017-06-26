import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage({
  name: 'chat'
})
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class Chat {
  news = [
    { send_name: 'Software', send_image: 'assets/images/o.jpg', news_id: 1, news_num: 20, send_time: '下午3:33', send_content: '今天下午我要回家' },
    { send_name: 'Software', send_image: 'assets/images/o.jpg', news_id: 1, news_num: 20, send_time: '下午3:33', send_content: '今天下午我要回家' },
    { send_name: 'Software', send_image: 'assets/images/o.jpg', news_id: 1, news_num: 20, send_time: '下午3:33', send_content: '今天下午我要回家' },
    { send_name: 'Software', send_image: 'assets/images/o.jpg', news_id: 1, news_num: 20, send_time: '下午3:33', send_content: '今天下午我要回家' },
    { send_name: 'Software', send_image: 'assets/images/o.jpg', news_id: 1, news_num: 20, send_time: '下午3:33', send_content: '今天下午我要回家' },
    { send_name: 'Software', send_image: 'assets/images/o.jpg', news_id: 1, news_num: 20, send_time: '下午3:33', send_content: '今天下午我要回家' },
    { send_name: 'Software', send_image: 'assets/images/o.jpg', news_id: 1, news_num: 0, send_time: '下午3:33', send_content: '今天下午我要回家' }
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
    this.menuCtrl.enable(false, 'menu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Chat');
  }

  detail() {
    this.navCtrl.push('message');
  }

}
