import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Music } from './music';

@NgModule({
  declarations: [
    Music,
  ],
  imports: [
    IonicPageModule.forChild(Music),
    PipesModule
  ],
  exports: [
    Music
  ]
})
export class MusicModule { }
