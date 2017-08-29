import { UtilProvider } from './../../providers/util';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage({
  name: 'register'
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {
  totalTime = 10;
  verifyString = '获取验证码';
  verifyFlag: boolean = false;
  registerData = {
    username: "",
    password: "",
    code: ""
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,
    private util: UtilProvider, private storage: Storage) {
    this.menuCtrl.enable(false, "menu");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }
  register() {
    if (this.registerData.username.trim() == "") {
      this.util.showLoading("请填写用户名");
      return;
    }
    if (this.registerData.password.trim() == "") {
      this.util.showLoading("请填写密码");
      return;
    }
    //处理注册逻辑
    this.util.post("/login/register", this.registerData).then((result: any) => {
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

  verify() {
    this.verifyFlag = true;
    this.verifyString = this.totalTime + 's';
    let interval: any = setInterval(() => {
      if (this.totalTime > 1) {
        this.totalTime--;
        this.verifyString = this.totalTime + 's';
      } else {
        clearInterval(interval);
        this.totalTime = 10;
        this.verifyString = '重新获取';
        this.verifyFlag = false;
      }
    }, 1000)
  }
}
