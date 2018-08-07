import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicPlay } from './music-play';

@NgModule({
  declarations: [
    MusicPlay,
  ],
  imports: [
    IonicPageModule.forChild(MusicPlay),
    PipesModule
  ],
  exports: [
    MusicPlay
  ]
})
export class MusicPlayModule { }
