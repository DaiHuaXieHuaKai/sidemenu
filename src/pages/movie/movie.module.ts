import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Movie } from './movie';

@NgModule({
  declarations: [
    Movie,
  ],
  imports: [
    IonicPageModule.forChild(Movie),
  ],
  exports: [
    Movie
  ]
})
export class MovieModule {}
