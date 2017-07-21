import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';

@Injectable()
export class UtilProvider {

  constructor(public http: Http, private themeableBrowser: ThemeableBrowser) {
    console.log('Hello UtilProvider Provider');
  }

  openUrl(data) {
    let options = {
      statusbar: {
        color: '#b7ebf9'
      },
      toolbar: {
        height: 44,
        color: '#b7ebf9'
      },
      title: {
        color: '#0b71a5',
        staticText: '百度',
        showPageTitle: true
      },
      backButton: {
        wwwImage: 'assets/images/back/back.png',
        wwwImagePressed: 'assets/images/back/back-press.png',
        wwwImageDensity: 2,
        align: 'left',
        event: 'backPressed'
      },
      backButtonCanClose: true
    }
     this.themeableBrowser.create('http://www.baidu.com', '_blank', options);
  }
}
