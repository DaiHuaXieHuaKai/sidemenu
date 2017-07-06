import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare let videojs;
@IonicPage({
  name: 'movie-play'
})
@Component({
  selector: 'page-movie-play',
  templateUrl: 'movie-play.html',
})
export class MoviePlayPage {
  title = "";
  @ViewChild('container') container;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = this.navParams.data.data.title;
  }

  ionViewDidLoad() {
    let player = videojs(this.container.nativeElement, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      poster: this.navParams.data.data.cover_img,
      height: 250,
      width: window.screen.width
    });
    player.src(this.navParams.data.data.url);
    player.ready(() => {
      console.log("ready")
      // player.play();
      //player.pause();
    })
    //不建议使用
    player.ended(() => {
      player.dispose();
    });

  }

}
