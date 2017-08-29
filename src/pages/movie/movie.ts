import { UtilProvider } from './../../providers/util';
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
  movies = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,
    private util: UtilProvider) {
    this.menuCtrl.enable(false, "menu");
  }

  ionViewWillEnter() {
    this.init();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Movie');
  }

  init() {
    this.util.get("/movie/all").then((result: any) => {
      if (result.err == 0) {
          this.movies = result.data;
      } else {
        this.util.showLoading(result.msg);
      }
    }).catch((error) => {

    })
  }

  play(data) {
    this.navCtrl.push('movie-play', { data: data })
  }

}
