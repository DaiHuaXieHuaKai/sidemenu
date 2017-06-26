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
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
    this.menuCtrl.enable(false, "menu");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }
  register() {

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
