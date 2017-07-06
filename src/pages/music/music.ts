import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage({
  name: 'music'
})
@Component({
  selector: 'page-music',
  templateUrl: 'music.html',
})
export class Music {
  selected = {};;
  musics = [
    {
      songname: "那个男孩",
      seconds: 216,
      albummid: "001XR7Lu0AvpIZ",
      songid: 202656275,
      singerid: 3954,
      albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/I/Z/001XR7Lu0AvpIZ.jpg",
      albumpic_small: "http://i.gtimg.cn/music/photo/mid_album_90/I/Z/001XR7Lu0AvpIZ.jpg",
      downUrl: "http://dl.stream.qqmusic.qq.com/202656275.mp3?vkey=8C289E9026B25C7AD9D7FF793F8D701CFFDAA292B46496FC9624C74911210A5AEA06BB247594F3AF67514453D5D9DD18C436CEF5EA7BBB41&guid=2718671044",
      url: "http://ws.stream.qqmusic.qq.com/202656275.m4a?fromtag=46",
      singername: "汪苏泷",
      albumid: 2099284
    },
    {
      songname: "夏至未至",
      seconds: 284,
      albummid: "003pJsXg3Jwpxs",
      songid: 202710989,
      singerid: 24833,
      albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/x/s/003pJsXg3Jwpxs.jpg",
      albumpic_small: "http://i.gtimg.cn/music/photo/mid_album_90/x/s/003pJsXg3Jwpxs.jpg",
      downUrl: "http://dl.stream.qqmusic.qq.com/202710989.mp3?vkey=8C289E9026B25C7AD9D7FF793F8D701CFFDAA292B46496FC9624C74911210A5AEA06BB247594F3AF67514453D5D9DD18C436CEF5EA7BBB41&guid=2718671044",
      url: "http://ws.stream.qqmusic.qq.com/202710989.m4a?fromtag=46",
      singername: "胡夏",
      albumid: 2104033
    },
    {
      songname: "凉凉",
      seconds: 333,
      albummid: "0011IIJE3XYf9L",
      songid: 200380820,
      singerid: 11608,
      albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/9/L/0011IIJE3XYf9L.jpg",
      albumpic_small: "http://i.gtimg.cn/music/photo/mid_album_90/9/L/0011IIJE3XYf9L.jpg",
      downUrl: "http://dl.stream.qqmusic.qq.com/200380820.mp3?vkey=8C289E9026B25C7AD9D7FF793F8D701CFFDAA292B46496FC9624C74911210A5AEA06BB247594F3AF67514453D5D9DD18C436CEF5EA7BBB41&guid=2718671044",
      url: "http://ws.stream.qqmusic.qq.com/200380820.m4a?fromtag=46",
      singername: "杨宗纬",
      albumid: 1853998
    },
    {
      songname: "Torches",
      seconds: 207,
      albummid: "003WtvKg1VtaTV",
      songid: 202712590,
      singerid: 6499,
      albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/T/V/003WtvKg1VtaTV.jpg",
      albumpic_small: "http://i.gtimg.cn/music/photo/mid_album_90/T/V/003WtvKg1VtaTV.jpg",
      downUrl: "http://dl.stream.qqmusic.qq.com/202712590.mp3?vkey=8C289E9026B25C7AD9D7FF793F8D701CFFDAA292B46496FC9624C74911210A5AEA06BB247594F3AF67514453D5D9DD18C436CEF5EA7BBB41&guid=2718671044",
      url: "http://ws.stream.qqmusic.qq.com/202712590.m4a?fromtag=46",
      singername: "张杰",
      albumid: 2104339
    },
    {
      songname: "安和桥",
      seconds: 251,
      albummid: "002VeS6r4L5fLZ",
      songid: 5002687,
      singerid: 61620,
      albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/L/Z/002VeS6r4L5fLZ.jpg",
      albumpic_small: "http://i.gtimg.cn/music/photo/mid_album_90/L/Z/002VeS6r4L5fLZ.jpg",
      downUrl: "http://dl.stream.qqmusic.qq.com/5002687.mp3?vkey=8C289E9026B25C7AD9D7FF793F8D701CFFDAA292B46496FC9624C74911210A5AEA06BB247594F3AF67514453D5D9DD18C436CEF5EA7BBB41&guid=2718671044",
      url: "http://ws.stream.qqmusic.qq.com/5002687.m4a?fromtag=46",
      singername: "宋冬野",
      albumid: 436025
    },
    {
      songname: "告白气球",
      seconds: 215,
      albummid: "003RMaRI1iFoYd",
      songid: 107192078,
      singerid: 4558,
      albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/Y/d/003RMaRI1iFoYd.jpg",
      albumpic_small: "http://i.gtimg.cn/music/photo/mid_album_90/Y/d/003RMaRI1iFoYd.jpg",
      downUrl: "http://dl.stream.qqmusic.qq.com/107192078.mp3?vkey=8C289E9026B25C7AD9D7FF793F8D701CFFDAA292B46496FC9624C74911210A5AEA06BB247594F3AF67514453D5D9DD18C436CEF5EA7BBB41&guid=2718671044",
      url: "http://ws.stream.qqmusic.qq.com/107192078.m4a?fromtag=46",
      singername: "周杰伦",
      albumid: 1458791
    },
    {
      songname: "Faded",
      seconds: 212,
      albummid: "002Nt51E0q8Zoo",
      songid: 105030812,
      singerid: 944940,
      albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/o/o/002Nt51E0q8Zoo.jpg",
      albumpic_small: "http://i.gtimg.cn/music/photo/mid_album_90/o/o/002Nt51E0q8Zoo.jpg",
      downUrl: "http://dl.stream.qqmusic.qq.com/105030812.mp3?vkey=8C289E9026B25C7AD9D7FF793F8D701CFFDAA292B46496FC9624C74911210A5AEA06BB247594F3AF67514453D5D9DD18C436CEF5EA7BBB41&guid=2718671044",
      url: "http://ws.stream.qqmusic.qq.com/105030812.m4a?fromtag=46",
      singername: "Alan Walker",
      albumid: 1211728
    },
    {
      songname: "致爱 Your Song",
      seconds: 191,
      albummid: "002hgsbR1NFFdx",
      songid: 104251904,
      singerid: 204664,
      albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/d/x/002hgsbR1NFFdx.jpg",
      albumpic_small: "http://i.gtimg.cn/music/photo/mid_album_90/d/x/002hgsbR1NFFdx.jpg",
      downUrl: "http://dl.stream.qqmusic.qq.com/104251904.mp3?vkey=8C289E9026B25C7AD9D7FF793F8D701CFFDAA292B46496FC9624C74911210A5AEA06BB247594F3AF67514453D5D9DD18C436CEF5EA7BBB41&guid=2718671044",
      url: "http://ws.stream.qqmusic.qq.com/104251904.m4a?fromtag=46",
      singername: "鹿晗",
      albumid: 1147271
    },
    {
      songname: "成都",
      seconds: 328,
      albummid: "000jE4g74VS43p",
      songid: 108963136,
      singerid: 40449,
      albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/3/p/000jE4g74VS43p.jpg",
      albumpic_small: "http://i.gtimg.cn/music/photo/mid_album_90/3/p/000jE4g74VS43p.jpg",
      downUrl: "http://dl.stream.qqmusic.qq.com/108963136.mp3?vkey=8C289E9026B25C7AD9D7FF793F8D701CFFDAA292B46496FC9624C74911210A5AEA06BB247594F3AF67514453D5D9DD18C436CEF5EA7BBB41&guid=2718671044",
      url: "http://ws.stream.qqmusic.qq.com/108963136.m4a?fromtag=46",
      singername: "赵雷",
      albumid: 1666157
    },
    {
      songname: "There For You (试听版)",
      seconds: 221,
      albummid: "001qFqX12ELeXe",
      songid: 202440947,
      singerid: 160774,
      albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/X/e/001qFqX12ELeXe.jpg",
      albumpic_small: "http://i.gtimg.cn/music/photo/mid_album_90/X/e/001qFqX12ELeXe.jpg",
      downUrl: "http://dl.stream.qqmusic.qq.com/202440947.mp3?vkey=8C289E9026B25C7AD9D7FF793F8D701CFFDAA292B46496FC9624C74911210A5AEA06BB247594F3AF67514453D5D9DD18C436CEF5EA7BBB41&guid=2718671044",
      url: "http://ws.stream.qqmusic.qq.com/202440947.m4a?fromtag=46",
      singername: "Martin Garrix",
      albumid: 2074255
    }
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
    this.menuCtrl.enable(false, "menu");
    if (this.musics.length > 0) {
      console.log(this.musics[0].songname)
      this.selected = this.musics[0];
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Music');
  }

  select(data) {
    this.navCtrl.push('music-play', data);
    this.selected = data;
  }

  play(data) {

  }
}
