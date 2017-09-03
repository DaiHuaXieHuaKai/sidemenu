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
  currentDate = new Date();//当前日期 不变动，仅用于判断当前年月日
  currentDay = this.currentDate.getDate();//返回当前几号（1-31） 固定不变动
  currentMonth: number = this.currentDate.getMonth();//返回当前月份（0-11）固定不变动
  currentYear: number = this.currentDate.getFullYear();//返回当前时间年份固定不变动

  nowDate = new Date();//当前时间，该时间随着月份变动而变动
  nowDay = this.nowDate.getDate();//返回当前几号（1-31） 变动
  nowMonth: number = this.nowDate.getMonth();//返回当前月份（0-11）变动
  nowYear: number = this.nowDate.getFullYear();//返回当前时间年份，变动
  days = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,
    private popoverCtrl: PopoverController) {
    this.menuCtrl.enable(false, 'menu');
  }

  ionViewDidLoad() {
    this.initDateByMonthNew(this.nowDate.getMonth());
  }
  //上一月
  previous() {
    let mon = this.nowDate.getMonth() - 1;
    this.initDateByMonthNew(mon);
  }
  //下一月
  next() {
    let mon = this.nowDate.getMonth() + 1;
    this.initDateByMonthNew(mon);
  }

  //左右滑动
  swipe(event) {
    //向左滑
    if (event.direction == 2) {
      this.next();
    }
    //向右滑
    if (event.direction == 4) {
      this.previous();
    }
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



  initDateByMonthNew(month) {
    //通过传递的月份初始化日期为yyyy-MM-01,即当前月的1号
    let showDate = new Date(this.nowDate.getFullYear(), month, 1);

    this.nowDate = new Date(this.nowDate.getFullYear(), month, 1);
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
        year: showDate.getFullYear(),
        month: showDate.getMonth(),
        date: new Date(showDate.getFullYear(), showDate.getMonth(), d)
      }
      this.days.push(date);
      showDate.setDate(d + 1);
    }
  }

















  initDateByMonth(month) {
    //通过传递的月份初始化日期为yyyy-MM-01
    let showDate = new Date(this.currentDate.getFullYear(), month, 1);
    this.currentDate = new Date(this.currentDate.getFullYear(), month, this.nowDay);
    //创建日历上面的日期行数
    //获取当前星期几，0为星期天
    console.log(showDate.getDay());
    let day = 1 - showDate.getDay();
    this.nowMonth = showDate.getMonth();
    if (day == 1) {
      day = -6;
    }
    showDate.setDate(day);//设置 Date 对象中月的某一天 (1 ~ 31)。如果n为负数，则减少月份.在用这个月最后一天减去这个值就可以获得日历从哪天开始的。

    console.log(showDate.getDate())
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
