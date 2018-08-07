import { UtilProvider } from './../../providers/util';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ModalController } from 'ionic-angular';

@IonicPage({
  name: 'person'
})
@Component({
  selector: 'page-person',
  templateUrl: 'person.html',
})
export class Person {

  userInfo = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,
    private alertController: AlertController, private modalCtrl: ModalController,
    private util: UtilProvider) {
    this.menuCtrl.enable(false, "menu");
  }

  ionViewDidLoad() {
    this.getUserDetail();
  }

  /* 获取用户信息 */
  getUserDetail() {
    this.util.post('/user/userDetail', { uid: this.util.getItem("User").uid }).then((result: any) => {
      if (result.err == 0) {
        this.userInfo = result.data;
      } else {
        this.util.showLoading(result.msg);
      }
    }).catch((error) => {

    })
  }

  clickItem(index){
    switch(index){
      case 0:
      this.navCtrl.push("friends");
      break;
      case 1:
      this.navCtrl.push("message");
      break;
      case 2:
      this.navCtrl.push("chat");
      break;
      case 3:
      this.navCtrl.push("photo");
      break;
      case 4:
      this.navCtrl.push("music");
      break;
      case 5:
      this.navCtrl.push("movie");
      break;
    }
  }
  /* 编辑信息 */
  edit() {
    let modal = this.modalCtrl.create('modal-edit',this.userInfo);
    modal.present();
  }

  /* 退出登录 */
  logout() {
    let alert = this.alertController.create({
      title: '提示信息',
      message: '是否确定退出?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: '确认退出',
          handler: () => {
              localStorage.clear();
              this.navCtrl.setRoot('entry');
          }
        }
      ]
    })
    alert.present();
  }
}
