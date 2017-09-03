import { UtilProvider } from './../../providers/util';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';

@IonicPage({
  name: 'modal-edit'
})
@Component({
  selector: 'page-modal-edit',
  templateUrl: 'modal-edit.html',
})
export class ModalEditPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    private actionSheetCtrl: ActionSheetController, private util: UtilProvider) {
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
              this.util.uploadImage(result,'/common/headerImg').then((res: any) => {
                if (res.err == 0) {
                  alert(res.path);
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
              this.util.uploadImage(result,'/common/headerImg').then((res: any) => {
                if (res.err == 0) {

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


  /* 关闭modal */
  close() {
    this.viewCtrl.dismiss();
  }
}
