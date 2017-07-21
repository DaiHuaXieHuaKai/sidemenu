import { Component, ViewChild } from '@angular/core';
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
  musics: any = {};
  seconds = 0;
  hasplay = 0;
  playStatus: boolean = false;
  timer: any = '';
  player: any;
  shuffleFlag: boolean = true;//默认随机播放
  @ViewChild('container') container;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.music = this.navParams.data.selectMusic;
    this.musics = this.navParams.data.arryMusics;
  }

  ionViewDidLoad() {
    this.init();
  }

  //初始化音乐
  init() {
    let this_ = this;
    this.player = this.container.nativeElement;
    this.player.src = this.music.url;
    this.seconds = this.music.seconds;
    this.player.addEventListener('timeupdate', () => {
      this.hasplay = parseInt(this.player.currentTime);
    })
    this.player.addEventListener('ended', () => {
      //随机播放
      if (this_.shuffleFlag) {
        let index = Math.floor(Math.random() * this_.musics.length);
        this_.music = this_.musics[index];
        this_.init();
        this_.player.play();
      }
    })
  }

  play() {
    this.player.play();
  }
  pause() {
    this.player.pause();
  }
  //上一曲
  previous() {
    let index = Math.floor(Math.random() * this.musics.length);
    this.music = this.musics[index];
    this.init();
    this.player.play();
  }
  //下一曲
  next() {
    let index = Math.floor(Math.random() * this.musics.length);
    this.music = this.musics[index];
    this.init();
    this.player.play();
  }
  //单曲循环
  repeat() {
    this.shuffleFlag = false;
    this.player.loop = true;
  }
  //随机播放
  shuffle() {
    this.shuffleFlag = true;
    this.player.loop = false;
  }

  //进度改变
  rangChange() {
    this.player.currentTime = this.hasplay;
  }
}
