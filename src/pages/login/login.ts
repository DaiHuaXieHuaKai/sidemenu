import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, MenuController } from 'ionic-angular';

@IonicPage({
  name: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  @ViewChild(Nav) nav: Nav;
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
    this.menuCtrl.enable(false, "menu");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  login() {
    this.navCtrl.setRoot('home');
  }
  forget() {

  }
}
