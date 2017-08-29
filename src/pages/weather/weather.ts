import { AppConfig } from './../../app/app.config';
import { UtilProvider } from './../../providers/util';
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
  base_url = AppConfig.Url;;
  weather = {};
  cancelText = "取消";
  inputValue = "";
  postData = {
    province: "四川",
    city: "成都"
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,
    private util: UtilProvider) {
    this.menuCtrl.enable(false, "menu");
  }

  ionViewWillEnter() {
    this.refresh();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Weather');
  }

  refresh() {
    this.util.post("/common/weather", this.postData).then((result: any) => {
      if (result.retCode == 200) {
        this.weather = result.result[0];
      } else {
        this.util.showLoading(result.msg);
      }
    }).catch((error) => {

    })
  }

  onInput() {
    if (this.inputValue.trim().length > 0) {
      this.cancelText = "确定";
    } else {
      this.cancelText = "取消";
    }
  }

  cancelBtn() {
    if (this.cancelText == "确定") {
      this.postData.city = this.inputValue;
      this.refresh();
    }
  }
}
