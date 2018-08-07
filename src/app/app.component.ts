import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = '';

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, public alertController: AlertController) {
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
    this.platform.ready().then(() => {
      this.checkIsLogin();
    });
  }

  checkIsLogin() {
    if (localStorage.getItem("User")) {
      this.rootPage = "home";
    } else {
      this.rootPage = "entry";
    }
    setTimeout(()=>{
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    },1000)
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
            localStorage.clear();
            this.nav.setRoot('entry');
          }
        }
      ]
    })
    alert.present();
  }
}
