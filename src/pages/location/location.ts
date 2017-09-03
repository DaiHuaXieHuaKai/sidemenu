import { UtilProvider } from './../../providers/util';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
declare let AMap: any;//声明
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private util: UtilProvider) {
    this.menuCtrl.enable(false, "menu");
  }


  ionViewWillEnter() {
    //初始化地图
    let map = new AMap.Map(this.container.nativeElement, {
      zoom: 10,
      resizeEnable: true,
      center: [116.39, 39.9]
    });
    //自动完成搜索
    let autoOptions = {
      input: this.keywords.nativeElement//使用联想输入的input的id
    };
    let autocomplete = new AMap.Autocomplete(autoOptions);
    let placeSearch = new AMap.PlaceSearch({ map: map })
    AMap.event.addListener(autocomplete, "select", function (e) {
      //TODO 针对选中的poi实现自己的功能
      placeSearch.setCity(e.poi.adcode);
      placeSearch.search(e.poi.name)
    });
    //获取位置
    this.util.getLocation().then((result: any) => {
      map.setZoom(17);
      map.setCenter([result.lng, result.lat]);
      let marker = new AMap.Marker({
        position: [result.lng, result.lat]
      });
      marker.setMap(map);
    }).catch((error) => {
    })
  }
}
