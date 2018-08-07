import { UtilProvider } from './../../providers/util';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage({
  name: 'modal-city'
})
@Component({
  selector: 'page-modal-city',
  templateUrl: 'modal-city.html',
})
export class ModalCityPage {
  uid: '';
  /* 定义省市区名称 */
  provinceName = "";
  cityName = "";
  areaName = "";
  /* 定义flag用于控制显示省市区视图 */
  provinceFlag: boolean = true;
  cityFlag: boolean = false;
  areaFlag: boolean = false;
  /* 定义省市区数组 */
  provinces = [];
  cities = [];
  areas = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private util: UtilProvider,
    private elementRef: ElementRef, private renderer: Renderer2, private viewCtrl: ViewController) {
    this.uid = navParams.data.uid;
    this.provinceName = navParams.data.province;
    this.cityName = navParams.data.city;
    this.areaName = navParams.data.area;
  }

  ionViewWillEnter() {
    /* 如果没有省市区默认加载省份,否则根据省份和城市和区域查询出对应的数据 */
    if (this.provinceName && this.cityName && this.areaName) {
      this.util.post("/province/full", { province: this.provinceName, city: this.cityName, area: this.areaName }).then((result: any) => {
        if (result.err == 0) {
          this.provinces = result.data.provinces;
          this.cities = result.data.cities;
          this.areas = result.data.areas;
        }
      }).catch((error) => {

      })
    } else {
      this.util.get("/province/all").then((result: any) => {
        if (result.err == 0) {
          this.provinces = result.data;
        }
      }).catch((error) => {

      })
    }
  }

  /* 选中省，获取对应的下级市 */
  selectProvince(data) {
    this.provinceName = data.province;
    this.util.post("/city/province_city", { provinceid: data.provinceid }).then((result: any) => {
      if (result.err == 0) {
        this.cityName = "";
        this.areaName = "";
        let btns = this.elementRef.nativeElement.querySelectorAll(".item_btn");
        btns.forEach(element => {
          this.renderer.removeClass(element, 'active_btn');
        });
        this.renderer.addClass(this.elementRef.nativeElement.querySelector(".select"), 'active_btn');
        this.provinceFlag = false;
        this.cityFlag = true;
        this.areaFlag = false;
        this.cities = result.data;
      }
    }).catch((error) => {

    })
  }
  /* 选中市，获取对应的下级区 */
  selectCity(data) {
    this.cityName = data.city;
    this.util.post("/area/city_area", { cityid: data.cityid }).then((result: any) => {
      if (result.err == 0) {
        this.areaName = "";
        let btns = this.elementRef.nativeElement.querySelectorAll(".item_btn");
        btns.forEach(element => {
          this.renderer.removeClass(element, 'active_btn');
        });
        this.renderer.addClass(this.elementRef.nativeElement.querySelector(".select"), 'active_btn');
        this.provinceFlag = false;
        this.cityFlag = false;
        this.areaFlag = true;
        this.areas = result.data;
      }
    }).catch((error) => {

    })
  }
  /* 选中区 */
  selectArea(data) {
    this.areaName = data.area;
    /* 将地址信息存入数据库 */
    if (this.provinceName && this.cityName && this.areaName) {
      let data = { province: this.provinceName, city: this.cityName, area: this.areaName, uid: this.uid }
      this.util.post("/user/update", data).then((result: any) => {
        if (result.err == 0) {
          this.close();
        }
      }).catch((error) => {

      })
    }
  }

  /* 点击已选择的省 */
  currentProvince(e: any) {
    let btns = this.elementRef.nativeElement.querySelectorAll(".item_btn");
    btns.forEach(element => {
      this.renderer.removeClass(element, 'active_btn');
    });
    this.renderer.addClass(e.target, 'active_btn');
    this.provinceFlag = true;
    this.cityFlag = false;
    this.areaFlag = false;
  }
  /* 点击已选择的市 */
  currentCity(e) {
    let btns = this.elementRef.nativeElement.querySelectorAll(".item_btn");
    btns.forEach(element => {
      this.renderer.removeClass(element, 'active_btn');
    });
    this.renderer.addClass(e.target, 'active_btn');
    this.provinceFlag = false;
    this.cityFlag = true;
    this.areaFlag = false;
  }
  /* 点击已选择的区 */
  currentArea(e) {
    let btns = this.elementRef.nativeElement.querySelectorAll(".item_btn");
    btns.forEach(element => {
      this.renderer.removeClass(element, 'active_btn');
    });
    this.renderer.addClass(e.target, 'active_btn');
    this.provinceFlag = false;
    this.cityFlag = false;
    this.areaFlag = true;
  }
  /* 关闭modal */
  close() {
    let data = { province: "", city: "", area: "" };
    if (this.provinceName && this.cityName && this.areaName) {
      data.province = this.provinceName;
      data.city = this.cityName;
      data.area = this.areaName;
    }
    this.viewCtrl.dismiss(data);
  }
}
