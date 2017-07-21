import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

@IonicPage({
  name: 'photo'
})
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
})
export class Photo {
  photos = [{
    title: "Boss 1", cover: 'assets/images/2.jpg', num: 99
  }, {
    title: "Boss 2", cover: 'assets/images/3.jpg', num: 30
  }, {
    title: "Boss 3", cover: 'assets/images/4.jpg', num: 55
  }];
  major = { title: "Boss", cover: 'assets/images/1.jpg', num: 100 };
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,
    private alertCtrl: AlertController) {
    this.menuCtrl.enable(false, "menu");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Photo');
  }

  //新建相册
  newPhoto() {
    let this_ = this;
    let prompt = this.alertCtrl.create({
      title: '新建相册',
      message: "",
      inputs: [
        {
          name: 'title',
          placeholder: '请输入新建相册名称'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: (data: any) => {
            if (data.title) {
              let obj = {
                title: data.title, cover: 'assets/images/4.jpg', num: 0
              }
              this_.photos.push(obj);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  //显示所有图片
  showAll(data){
    this.navCtrl.push('photo-detail',data);
  }
}
