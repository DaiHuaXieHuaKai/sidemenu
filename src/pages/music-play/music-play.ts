import { NativeAudio } from '@ionic-native/native-audio';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'music-play'
})
@Component({
  selector: 'page-music-play',
  templateUrl: 'music-play.html',
})
export class MusicPlay {
  music: any = {};
  seconds = 0;
  hasplay = 0;
  playStatus: boolean = false;
  timer: any = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeAudio: NativeAudio) {
    this.music = this.navParams.data;
    this.seconds = this.navParams.data.seconds;
  }

  ionViewDidLoad() {

  }

  play() {
    this.nativeAudio.preloadSimple('played', this.music.url).then(() => {
      this.nativeAudio.play('played');
    }, () => {

    });


    this.timer = setInterval(() => {
      if (this.hasplay < this.seconds) {
        this.hasplay++;
      } else {
        clearInterval(this.timer);
      }
    }, 1000)
  }
  pause() {
    clearInterval(this.timer);
    this.nativeAudio.stop('played');
  }
  //上一曲
  previous() {

  }
  //下一曲
  next() {

  }
}
