import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage({
  name: 'photo'
})
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
})
export class Photo {
  photos = [{
    cover: 'assets/images/2.jpg', num: 99
  }, {
    cover: 'assets/images/3.jpg', num: 30
  }, {
    cover: 'assets/images/4.jpg', num: 55
  }];
  major = { cover: 'assets/images/1.jpg', num: 100 };
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
    this.menuCtrl.enable(false, "menu");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Photo');
  }

}
