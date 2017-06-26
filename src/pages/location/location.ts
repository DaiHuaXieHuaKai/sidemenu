import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
declare const AMap: any;//声明
@IonicPage(
  { name: 'location' }
)
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})

export class Location {

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
    this.menuCtrl.enable(false, "menu");
  }


  ionViewDidLoad() {
    //初始化地图
    let map = new AMap.Map('container', {
      zoom: 10,
      center: [116.39, 39.9]
    });

    AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
      let autoOptions = {
        city: "北京", //城市，默认全国
        input: "keyword"//使用联想输入的input的id
      };
      let autocomplete = new AMap.Autocomplete(autoOptions);
      let placeSearch = new AMap.PlaceSearch({
        city: '北京',
        map: map
      })
      AMap.event.addListener(autocomplete, "select", function (e) {
        //TODO 针对选中的poi实现自己的功能
        placeSearch.search(e.poi.name)
      });
    })
  }
}
