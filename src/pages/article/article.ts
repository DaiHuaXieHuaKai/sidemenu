import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage({
  name: 'article'
})
@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class Article {
  articles = [{
    author_img: 'assets/images/o.jpg', title: '关于从客户立场考虑问题的困难', send_time: '2017-01-01',
    cover_image: 'assets/images/1.jpg', content: '无论以什么样的理由做包装，你要让同事作出购买行为，就要让他们以最舒服的购买方式去对待。', likes: 100, comments: 200, view: 300
  }, {
    author_img: 'assets/images/o.jpg', title: '男生要明白哪些道理才能得到好姑娘的爱？', send_time: '2017-01-01',
    cover_image: 'assets/images/2.jpg', content: '一段感情的走向，在很大程度上取决于感情中的那个男生是否有驾驭并且维护好这段感情的能力。', likes: 100, comments: 200, view: 300
  }, {
    author_img: 'assets/images/o.jpg', title: '那怕只有一个读者，我都想一直写下去', send_time: '2017-01-01',
    cover_image: 'assets/images/3.jpg', content: '这个世界上很多事情都看起来很神奇，我从十几岁开始写小说，用笔在一个个漂亮的笔记本上，写下故事，写下我心里的小世界。', likes: 100, comments: 200, view: 300
  }];
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
    this.menuCtrl.enable(false, 'menu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Article');
  }

}
