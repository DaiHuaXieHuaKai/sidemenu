import { UtilProvider } from './../../providers/util';
import { Storage } from '@ionic/storage';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, MenuController, LoadingController } from 'ionic-angular';

@IonicPage({
  name: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  loginData = {
    username: "18428359173",
    password: "123456"
  };
  @ViewChild(Nav) nav: Nav;
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,
    private loadingCtrl: LoadingController, private util: UtilProvider, private storage: Storage) {
    this.menuCtrl.enable(false, "menu");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  login() {
    if (this.loginData.username.trim() == "") {
      this.util.showLoading("请填写用户名");
      return;
    }
    if (this.loginData.password.trim() == "") {
      this.util.showLoading("请填写密码");
      return;
    }
    //处理登录逻辑
    this.util.post("/login/doLogin", this.loginData).then((result: any) => {
      if (result.err == 0) {
        this.storage.set("User", result.data).then(() => {
          this.navCtrl.setRoot("home");
        })
      } else {
        this.util.showLoading(result.msg);
      }
    }).catch((error) => {

    })
  }
  forget() {

  }
}
