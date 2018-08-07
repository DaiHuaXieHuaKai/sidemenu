import { UtilProvider } from './../providers/util';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeAudio } from '@ionic-native/native-audio';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { RongcloudProvider } from '../providers/rongcloud/rongcloud';
import { MediaCapture } from '@ionic-native/media-capture';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      backButtonText: ''
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeAudio,
    UtilProvider,
    ThemeableBrowser,
    Camera,
    File,
    FileTransfer,
    Geolocation,
    MediaCapture,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RongcloudProvider
  ]
})
export class AppModule { }
