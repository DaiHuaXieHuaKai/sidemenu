import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviePlayPage } from './movie-play';

@NgModule({
  declarations: [
    MoviePlayPage,
  ],
  imports: [
    IonicPageModule.forChild(MoviePlayPage),
  ],
  exports: [
    MoviePlayPage
  ]
})
export class MoviePlayPageModule {}
