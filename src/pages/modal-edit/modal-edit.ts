import { ModalCityPage } from './../modal-city/modal-city';
import { UtilProvider } from './../../providers/util';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController, AlertController, ModalController } from 'ionic-angular';

@IonicPage({
  name: 'modal-edit'
})
@Component({
  selector: 'page-modal-edit',
  templateUrl: 'modal-edit.html',
})
export class ModalEditPage {
  userInfo: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    private actionSheetCtrl: ActionSheetController, private util: UtilProvider, private alertController: AlertController,
    private modalCtrl: ModalController) {
    this.userInfo = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalEditPage');
  }

  /* 修改头像 */
  head() {
    let actionsheet = this.actionSheetCtrl.create({
      title: '选择头像',
      buttons: [
        {
          text: '从相册选择',
          handler: () => {
            this.util.selectImage(1).then(result => {
              this.util.uploadImage(result, '/common/headerImg?uid=' + this.userInfo.uid).then((res: any) => {
                if (res.err == 0) {
                  this.userInfo.avatar = res.path;
                } else {
                  this.util.showLoading(res.msg);
                }
              }, (err) => {
                this.util.showLoading("图片上传失败");
              })
            }).catch(error => {
              this.util.showLoading("图片获取失败");
            })
          }
        },
        {
          text: '拍照',
          handler: () => {
            this.util.selectImage(0).then(result => {
              this.util.uploadImage(result, '/common/headerImg?uid=' + this.userInfo.uid).then((res: any) => {
                if (res.err == 0) {
                  this.userInfo.avatar = res.path;
                } else {
                  this.util.showLoading(res.msg);
                }
              }, (err) => {
                this.util.showLoading("图片上传失败");
              })
            }).catch(error => {
              this.util.showLoading("图片获取失败");
            })
          }
        },
        {
          text: '取消',
          role: 'destructive',
          handler: () => {

          }
        }
      ]
    })
    actionsheet.present();
  }

  nickname() {
    let alert = this.alertController.create({
      title: "设置昵称",
      inputs: [{
        name: 'nickname',
        placeholder: '请输入昵称'
      }],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {

          }
        }, {
          text: '确定',
          handler: (data) => {
            this.util.post("/user/update", { nickname: data.nickname, uid: this.userInfo.uid }).then((result: any) => {
              if (result.err == 0) {
                this.userInfo.nickname = data.nickname;
              }
            }).catch((error) => {

            })
          }
        }
      ]
    })
    alert.present();
  }

  sex() {
    let alert = this.alertController.create({
      title: '设置性别',
      inputs: [{
        type: 'radio',
        label: '男',
        value: '男',
        checked: true
      }, {
        type: 'radio',
        label: '女',
        value: '女',
        checked: false
      }],
      buttons: [{
        text: '取消',
        role: 'cancle',
        handler: data => {
        }
      }, {
        text: '确定',
        handler: data => {
          this.util.post("/user/update", { sex: data, uid: this.userInfo.uid }).then((result: any) => {
            if (result.err == 0) {
              this.userInfo.sex = data;
            }
          }).catch((error) => {

          })
        }
      }]
    });
    alert.present();
  }

  area() {
    let modal = this.modalCtrl.create('modal-city', this.userInfo);
    modal.onDidDismiss(data => {
      this.userInfo.province = data.province;
      this.userInfo.city = data.city;
      this.userInfo.area = data.area;
    })
    modal.present();
  }
  /* 关闭modal */
  close() {
    this.viewCtrl.dismiss();
  }
}
