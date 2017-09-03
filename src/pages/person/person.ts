import { UtilProvider } from './../../providers/util';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
    private alertController: AlertController, private storage: Storage, private modalCtrl: ModalController,
    private util: UtilProvider) {
    this.menuCtrl.enable(false, "menu");
  }

  ionViewWillEnter() {
    this.getUserDetail();
  }

  /* 获取用户信息 */
  getUserDetail() {
    this.util.post('/user/userDetail', { uid: 19 }).then((result: any) => {
      if (result.err == 0) {
        this.userInfo = result.data;
      } else {
        this.util.showLoading(result.msg);
      }
    }).catch((error) => {

    })
  }

  /* 编辑信息 */
  edit() {
    let modal = this.modalCtrl.create('modal-edit');
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
            this.storage.clear().then(() => {
              this.navCtrl.setRoot('entry');
            })
          }
        }
      ]
    })
    alert.present();
  }
}
