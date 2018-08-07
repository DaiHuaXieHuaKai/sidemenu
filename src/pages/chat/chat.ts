import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage({
  name: 'chat'
})
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class Chat {
  segmentsArray = ['segmentOne', 'segmentTwo', 'segmentThree'];
  segmentModel: string = this.segmentsArray[0];
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
    this.menuCtrl.enable(false, 'menu');
  }

  ionViewWillEnter() {

  }

  swipeEvent(event) {
    alert(1)
    //向左滑
    if (event.direction == 2) {
      if (this.segmentsArray.indexOf(this.segmentModel) < 2) {
        this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel) + 1];
      }
    }
    //向右滑
    if (event.direction == 4) {
      if (this.segmentsArray.indexOf(this.segmentModel) > 0) {
        this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel) - 1];
      }
    }

  }


}
