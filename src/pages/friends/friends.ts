import { RongcloudProvider } from './../../providers/rongcloud/rongcloud';
import { UtilProvider } from './../../providers/util';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, MenuController, ModalController, LoadingController } from 'ionic-angular';

@IonicPage({
  name: 'friends'
})
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class Friends {
  activePage = 1;
  selected = 'lists';//默认选中
  friends = [];//好友列表
  notFriends = [];//推荐好友列表
  applyList = [];//申请列表
  conversationLists = [];//会话列表
  uid = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,
    private util: UtilProvider, private modalCtrl: ModalController, private loadingController: LoadingController,
    private rongCloud: RongcloudProvider) {
    this.menuCtrl.enable(false, "menu");
    this.uid = this.util.getItem("User").uid;
  }

  ionViewWillEnter() {
    this.getFriendsLists();
  }

  //获取好友列表
  getFriendsLists() {
    let loading = this.loadingController.create({
      spinner: 'dots',
      showBackdrop: false
    })
    loading.present();
    this.util.post("/friend/queryFriends", { uid: this.util.getItem("User").uid }).then((result: any) => {
      loading.dismiss();
      if (result.err == 0) {
        this.friends = result.data;
      } else {
        this.util.showLoading(result.msg);
      }
    }).catch((error) => {
      loading.dismiss();
    })
  }

  //获取推荐好友列表
  getNotFriendsLists() {
    let loading = this.loadingController.create({
      spinner: 'dots',
      showBackdrop: false
    })
    loading.present();
    this.util.post("/friend/queryNotFriends", { uid: this.util.getItem("User").uid }).then((result: any) => {
      loading.dismiss();
      if (result.err == 0) {
        this.notFriends = result.data;
      } else {
        this.util.showLoading(result.msg);
      }
    }).catch((error) => {
      loading.dismiss();
    })
  }

  /* 获取会话列表 */
  getMessageList() {
    let loading = this.loadingController.create({
      spinner: 'dots',
      showBackdrop: false
    })
    loading.present();
    this.rongCloud.getConversationList().then((res: any) => {
      loading.dismiss();
      this.conversationLists = res;
    }).catch(error => {
      loading.dismiss();
    })
  }

  /* 进入会话 */
  conversation(cs) {
    this.rongCloud.clearUnreadCount({ conversationType: cs.conversationType, targetId: cs.targetId });
    let data = { toUid: "", toNickname: "" };
    if (cs.latestMessage.messageDirection == 2) {
      data.toUid = cs.latestMessage.content.user.uid;
      data.toNickname = cs.latestMessage.content.user.name;
    }
    if (cs.latestMessage.messageDirection == 1) {
      data.toUid = JSON.parse(cs.latestMessage.content.extra).uid;
      data.toNickname = JSON.parse(cs.latestMessage.content.extra).nickname;
    }
    this.navCtrl.push("message", data);
  }

  /* 获取好友申请列表 */
  getApplyList() {
    let loading = this.loadingController.create({
      spinner: 'dots',
      showBackdrop: false
    })
    loading.present();
    this.util.post("/apply/undeal", { uid: this.util.getItem("User").uid }).then((result: any) => {
      loading.dismiss();
      if (result.err == 0) {
        this.applyList = result.data;
      } else {
        this.util.showLoading(result.msg);
      }
    }).catch((error) => {
      loading.dismiss();
    })
  }


  selectedSegment(index) {
    switch (index) {
      case 0:
        this.activePage = index;
        this.getNotFriendsLists();
        break;
      case 1:
        this.activePage = index;
        this.getFriendsLists();
        break;
      case 2:
        this.activePage = index;
        this.getMessageList();
        break;
      case 3:
        this.activePage = index;
        this.getApplyList();
        break;
    }
  }

  //添加朋友
  addFriend(data) {
    let modal = this.modalCtrl.create("modal-addfriend", data);
    modal.present();
  }

  //拨打电话
  call(slidingItem: ItemSliding, friend) {
    slidingItem.close();
  }
  //聊天
  chat(slidingItem: ItemSliding, friend) {
    let data = { toUid: "", toNickname: "" };
    data.toUid = friend.fuid;
    data.toNickname = friend.nickname;
    this.navCtrl.push("message", data);
    slidingItem.close();
  }
  //标为已读
  hasread(slidingItemNews: ItemSliding, data) {
    this.rongCloud.clearUnreadCount({ conversationType: data.conversationType, targetId: data.targetId });
    slidingItemNews.close();
  }
  //删除
  delete(slidingItemNews: ItemSliding, data) {
    slidingItemNews.close();
    this.rongCloud.removeConversation({ conversationType: data.conversationType, targetId: data.targetId }).then((result) => {
      if (result == 1) {
        this.getMessageList();
      } else {
        this.util.showLoading("删除失败");
      }
    })
  }


  /* 处理好友请求 */
  deal(data, index) {
    this.util.post("/apply/deal", { fromUid: data.fromUid, uid: this.util.getItem("User").uid, status: index }).then((result: any) => {
      if (result.err == 0) {
        this.getApplyList();
      } else {
        this.util.showLoading(result.msg);
      }
    }).catch((error) => {

    })
  }
}
