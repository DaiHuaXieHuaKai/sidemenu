import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage({
  name: 'events-popover'
})
@Component({
  selector: 'page-events-popover',
  templateUrl: 'events-popover.html',
})
export class EventsPopoverPage {
  addDate: any = {};
  eventContent = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController) {
    this.addDate = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPopoverPage');
  }

  add() {
    let data = {
      time: this.addDate.date,
      content: this.eventContent
    }
    this.viewCtrl.dismiss(data);
  }

}
