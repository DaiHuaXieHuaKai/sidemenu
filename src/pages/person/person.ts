import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage({
  name: 'person'
})
@Component({
  selector: 'page-person',
  templateUrl: 'person.html',
})
export class Person {

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
    this.menuCtrl.enable(false, "menu");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Person');
  }

}
