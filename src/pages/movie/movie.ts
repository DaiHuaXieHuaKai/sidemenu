import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage({
  name: 'movie'
})
@Component({
  selector: 'page-movie',
  templateUrl: 'movie.html',
})
export class Movie {
  movies = [{
    cover_img: 'https://img.alicdn.com/imgextra/i3/1118401292/TB2M_WPtrBkpuFjy1zkXXbSpFXa_!!1118401292-2-beehive-scenes.png',
    title: '我的愿望是吃遍中国好吃的零食',
    url: 'https://cloud.video.taobao.com/play/u/1118401292/p/1/e/6/t/1/d/ld/50010550524.mp4'
  }, {
    cover_img: 'assets/images/movie1.jpg',
    title: '摔跤吧！爸爸',
    url: '',
  }, {
    cover_img: 'assets/images/movie2.jpg',
    title: '异星觉醒',
    url: '',
  }, {
    cover_img: 'assets/images/movie3.jpg',
    title: '异形：契约',
    url: '',
  }, {
    cover_img: 'assets/images/movie4.jpg',
    title: '新木乃伊',
    url: '',
  }, {
    cover_img: 'assets/images/movie1.jpg',
    title: '摔跤吧！爸爸摔跤吧！爸爸摔跤吧！爸爸',
    url: '',
  }, {
    cover_img: 'assets/images/movie2.jpg',
    title: '异星觉醒',
    url: '',
  }, {
    cover_img: 'assets/images/movie3.jpg',
    title: '异形：契约',
    url: '',
  }, {
    cover_img: 'assets/images/movie4.jpg',
    title: '新木乃伊',
    url: '',
  }];
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
    this.menuCtrl.enable(false, "menu");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Movie');
  }

  play(data) {
    this.navCtrl.push('movie-play', { data: data })
  }

}
