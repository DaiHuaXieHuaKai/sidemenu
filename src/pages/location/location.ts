import { Component, ViewChild } from '@angular/core';
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

  @ViewChild("container") container;
  @ViewChild("keywords") keywords;
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
    this.menuCtrl.enable(false, "menu");
  }


  ionViewDidLoad() {
    let this_ = this;
    //初始化地图
    let map = new AMap.Map(this.container.nativeElement, {
      zoom: 10,
      center: [116.39, 39.9]
    });

    // 添加定位控件
    map.plugin('AMap.Geolocation', function () {
      let geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      map.addControl(geolocation);
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, 'complete', (data) => {
        console.log(data)
      });//返回定位信息
      AMap.event.addListener(geolocation, 'error', (error) => {
        console.log(error)
      });      //返回定位出错信息
    });
    //自动完成搜索
    map.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
      let autoOptions = {
        input: this_.keywords.nativeElement//使用联想输入的input的id
      };
      let autocomplete = new AMap.Autocomplete(autoOptions);
      let placeSearch = new AMap.PlaceSearch({
        city: '北京',
        map: map
      })
      map.addControl(placeSearch);
      AMap.event.addListener(autocomplete, "select", function (e) {
        //TODO 针对选中的poi实现自己的功能
        placeSearch.search(e.poi.name)
      });
    })
  }
}
