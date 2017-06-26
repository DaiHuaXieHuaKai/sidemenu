import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, MenuController } from 'ionic-angular';

@IonicPage({
  name: 'friends'
})
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class Friends {
  activePage = 0;
  selected = 'add';
  friends = [
    { name: 'Zhao Ying', location: '四川.成都', phone: '18428359173', email: '842159717@qq.com', number: 1, status: 0, image: 'assets/images/o.jpg' },
    { name: 'Zhao Ying', location: '四川.成都', phone: '18428359173', email: '842159717@qq.com', number: 1, status: 2, image: 'assets/images/o.jpg' },
    { name: 'Zhao Ying', location: '四川.成都', phone: '18428359173', email: '842159717@qq.com', number: 1, status: 1, image: 'assets/images/o.jpg' },
    { name: 'Zhao Ying', location: '四川.成都', phone: '18428359173', email: '842159717@qq.com', number: 1, status: 2, image: 'assets/images/o.jpg' },
    { name: 'Zhao Ying', location: '四川.成都', phone: '18428359173', email: '842159717@qq.com', number: 1, status: 0, image: 'assets/images/o.jpg' }]

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
    this.menuCtrl.enable(false, "menu");
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad Friends');
  }

  selectedSegment(index) {
    this.activePage = index;
  }

  //添加朋友
  addFriend(data) {

  }
  //添加
  add(slidingItem: ItemSliding, friend) {
    slidingItem.close();
  }
  //电话
  call(slidingItem: ItemSliding, friend) {
    slidingItem.close();
  }
  //邮件
  mail(slidingItem: ItemSliding, friend) {
    slidingItem.close();
  }
  //置顶
  totop(slidingItem: ItemSliding, friend) {
    slidingItem.close();
  }
  //标为已读
  hasread(slidingItem: ItemSliding, friend) {
    slidingItem.close();
  }
  //删除
  delete(slidingItem: ItemSliding, friend) {
    slidingItem.close();
  }
}
