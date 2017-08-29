import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage({
  name: "home"
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  inputValue = '';
  menus = [
    { icon: 'assets/images/menu/person.png', text: '个人', id: 0 },
    { icon: 'assets/images/menu/friends.png', text: '朋友', id: 1 },
    { icon: 'assets/images/menu/email.png', text: '消息', id: 2 },
    { icon: 'assets/images/menu/chat.png', text: '聊天', id: 3 },
    { icon: 'assets/images/menu/events.png', text: '事件', id: 4 },
    { icon: 'assets/images/menu/setting.png', text: '设置', id: 5 },
    { icon: 'assets/images/menu/location.png', text: '位置', id: 6 },
    { icon: 'assets/images/menu/article.png', text: '文章', id: 7 },
    { icon: 'assets/images/menu/weather.png', text: '天气', id: 8 },
    { icon: 'assets/images/menu/photo.png', text: '图库', id: 9 },
    { icon: 'assets/images/menu/music.png', text: '音乐', id: 10 },
    { icon: 'assets/images/menu/movie.png', text: '电影', id: 11 }
  ]
  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true, "menu");
  }

  search(e) {
    if (e.keyCode == 13) {
      this.navCtrl.push('person');
    }

  }

  onInput() {

  }

  into(index) {
    switch (index) {
      case 0:
        this.navCtrl.push('person');
        break;
      case 1:
        this.navCtrl.push('friends');
        break;
      case 2:
        this.navCtrl.push('message');
        break;
      case 3:
        this.navCtrl.push('chat');
        break;
      case 4:
        this.navCtrl.push('events');
        break;
      case 5:
        this.navCtrl.push('setting');
        break;
      case 6:
        this.navCtrl.push('location');
        break;
      case 7:
        this.navCtrl.push('article');
        break;
      case 8:
        this.navCtrl.push('weather');
        break;
      case 9:
        this.navCtrl.push('photo');
        break;
      case 10:
        this.navCtrl.push('music');
        break;
      case 11:
        this.navCtrl.push('movie');
        break;
    }

  }
}
