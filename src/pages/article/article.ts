import { UtilProvider } from './../../providers/util';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Content, LoadingController, Refresher } from 'ionic-angular';

@IonicPage({
  name: 'article'
})
@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class Article {
  articles = [];
  allPages: number = 10;
  postData = {
    page: 1
  }
  @ViewChild(Content) content: Content;
  @ViewChild(Refresher) refresher: Refresher;
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,
    private util: UtilProvider, private loadingController: LoadingController) {
    this.menuCtrl.enable(false, 'menu');
  }

  ionViewWillEnter() {
    this.refresh();
  }

  ionViewDidLoad() {
  }

  refresh() {
    let loading = this.loadingController.create({
      spinner: 'dots',
      showBackdrop: false
    })
    loading.present();
    this.util.post("/common/article", this.postData).then((result: any) => {
      loading.dismiss();
      if (result.showapi_res_code == 0) {
        this.articles = result.showapi_res_body.pagebean.contentlist;
        this.allPages = result.showapi_res_body.pagebean.allPages;
      } else {
        this.util.showLoading(result.showapi_res_error);
      }
    }).catch((error) => {
      loading.dismiss();
    })
  }

  doRefresh(refresher) {
    let loading = this.loadingController.create({
      spinner: 'dots',
      showBackdrop: false
    })
    loading.present();
    this.postData.page = parseInt((Math.random() * this.allPages).toString()) + 1;
    this.util.post("/common/article", this.postData).then((result: any) => {
      loading.dismiss();
      refresher.complete();
      if (result.showapi_res_code == 0) {
        this.articles = result.showapi_res_body.pagebean.contentlist;
        this.allPages = result.showapi_res_body.pagebean.allPages;
      } else {
        this.util.showLoading(result.showapi_res_error);
      }
    }).catch((error) => {
      loading.dismiss();
      refresher.complete();
    })

  }

  open(data) {
    this.util.openUrl(data);
  }

  playVideo(e) {
    let element = e.target || e.srcElement;
    if (element.paused) {
      e.target.play();
    }
  }
  /* 
  回到顶部
  */
  top() {
    this.content.scrollToTop();
    this.refresher._beginRefresh();
  }
}
