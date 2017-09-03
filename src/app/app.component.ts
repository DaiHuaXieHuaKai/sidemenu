import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'entry';

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, public alertController: AlertController, private storage: Storage) {
    this.initializeApp();
    this.pages = [
      { title: '朋友', component: 'friends' },
      { title: '消息', component: 'message' },
      { title: '聊天', component: 'chat' },
      { title: '图库', component: 'photo' },
      { title: '音乐', component: 'music' },
      { title: '电影', component: 'movie' }
    ];

  }

  initializeApp() {
    let this_ = this;
    this.platform.ready().then(() => {
      this_.statusBar.styleDefault();
      this_.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.push(page.component);
  }

  logout() {
    let alert = this.alertController.create({
      title: '提示信息',
      message: '是否确定退出?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: '确认退出',
          handler: () => {
            this.storage.clear().then(() => {
              this.nav.setRoot('entry');
            })
          }
        }
      ]
    })
    alert.present();
  }
}
