import { UtilProvider } from './../../providers/util';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Content } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,
    private util: UtilProvider) {
    this.menuCtrl.enable(false, 'menu');
  }

  ionViewWillEnter() {
    this.refresh();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Article');
  }

  refresh() {
    this.util.post("/common/article", this.postData).then((result: any) => {
      if (result.showapi_res_code == 0) {
        this.articles = result.showapi_res_body.pagebean.contentlist;
        this.allPages = result.showapi_res_body.pagebean.allPages;
      } else {
        this.util.showLoading(result.showapi_res_error);
      }
    }).catch((error) => {

    })
  }

  doRefresh(refresher) {
    this.postData.page = parseInt((Math.random() * this.allPages).toString()) + 1;
    this.util.post("/common/article", this.postData).then((result: any) => {
      refresher.complete();
      if (result.showapi_res_code == 0) {
        this.articles = result.showapi_res_body.pagebean.contentlist;
        this.allPages = result.showapi_res_body.pagebean.allPages;
      } else {
        this.util.showLoading(result.showapi_res_error);
      }
    }).catch((error) => {
      refresher.complete();
    })

  }

  open(data) {
    this.util.openUrl(data);
  }
  /* 
  回到顶部
  */
  top() {
   this.content.scrollToTop();
  }
}
