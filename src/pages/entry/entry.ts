import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage({
  name: 'entry'
})
@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html',
})
export class Entry {

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
    this.menuCtrl.enable(false, 'menu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Entry');
  }

  login() {
    this.navCtrl.push('login');
  }

  register() {
    this.navCtrl.push('register');
  }
}
