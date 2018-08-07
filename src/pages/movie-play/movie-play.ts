import { UtilProvider } from './../../providers/util';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'movie-play'
})
@Component({
  selector: 'page-movie-play',
  templateUrl: 'movie-play.html',
})
export class MoviePlayPage {
  movie = {};
  @ViewChild('container') container;
  constructor(public navCtrl: NavController, public navParams: NavParams, private util: UtilProvider) {
    this.movie = this.navParams.data.data;
    console.log(this.movie)
  }

  ionViewDidLoad() {

  }

  play(data) {
    this.util.openMovieUrl(data);
  }

}
