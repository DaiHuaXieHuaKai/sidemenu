import { UtilProvider } from './../../providers/util';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage({
  name: "modal-addfriend"
})
@Component({
  selector: 'page-modal-addfriend',
  templateUrl: 'modal-addfriend.html',
})
export class ModalAddfriendPage {

  info: any;
  content = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    private util: UtilProvider) {
    this.info = this.navParams.data;
  }

  ionViewDidLoad() {
        
  }

  confirm() {
    this.util.post("/rongcloud/applyAddFriend", { fromUid: this.util.getItem("User").uid, toUid: this.info.fuid, info: this.content }).then((result: any) => {
      if (result.err == 0) {
        this.util.showLoading(result.msg);
        setTimeout(() => {
          this.viewCtrl.dismiss();
        }, 2000)
      } else {
        this.util.showLoading(result.msg);
      }
    }).catch((error) => {
      this.viewCtrl.dismiss();
    })
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
