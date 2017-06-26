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

}
