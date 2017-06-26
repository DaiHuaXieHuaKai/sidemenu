import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, PopoverController } from 'ionic-angular';

@IonicPage({
  name: 'events'
})
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class Events {
  events = [];
  weeks = [{ name: '日' }, { name: '一' }, { name: '二' }, { name: '三' }, { name: '四' }, { name: '五' }, { name: '六' }]
  currentDate = new Date();
  nowDay = this.currentDate.getDate();
  nowMonth: number = this.currentDate.getMonth();
  days = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,
    private popoverCtrl: PopoverController) {
    this.menuCtrl.enable(false, 'menu');
  }

  ionViewDidLoad() {
    this.initDateByMonth(this.currentDate.getMonth());
  }
  //上一月
  previous() {
    this.initDateByMonth(--this.nowMonth);
  }
  //下一月
  next() {
    this.initDateByMonth(++this.nowMonth);
  }
  //添加事件
  addEvents(data) {
    let popover = this.popoverCtrl.create('events-popover', data);
    popover.present();

    popover.onDidDismiss((data) => {
      if (data) {
        if (data.time && data.content) {
          this.events.push(data);
        }
      }
    })
  }
  initDateByMonth(month) {
    //通过传递的月份初始化日期为yyyy-MM-01
    let showDate = new Date(this.currentDate.getFullYear(), month, 1);
    this.currentDate = new Date(this.currentDate.getFullYear(), month, this.nowDay);
    //创建日历上面的日期行数
    //获取当前星期几，0为星期天
    let day = 1 - showDate.getDay();
    this.nowMonth = showDate.getMonth();
    if (day == 1) {
      day = -6;
    }
    showDate.setDate(day);//设置 Date 对象中月的某一天 (1 ~ 31)。如果n为负数，则减少月份.在用这个月最后一天减去这个值就可以获得日历从哪天开始的。
    this.days = [];
    for (let i = 0; i < 42; i++) {
      let d = showDate.getDate();
      let date = {
        name: d,
        nowMonth: showDate.getMonth(),
        date: new Date(this.currentDate.getFullYear(), showDate.getMonth(), d)
      }
      this.days.push(date);
      showDate.setDate(d + 1);
    }
  }
}
