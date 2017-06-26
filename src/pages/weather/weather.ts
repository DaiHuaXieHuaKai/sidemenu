import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage({
  name: 'weather'
})
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class Weather {

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
    this.menuCtrl.enable(false, "menu");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Weather');
  }

}
