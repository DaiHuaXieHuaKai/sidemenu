import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Message } from './message';

@NgModule({
  declarations: [
    Message
  ],
  imports: [
    IonicPageModule.forChild(Message),
    PipesModule
  ],
  exports: [
    Message
  ]
})
export class MessageModule {}
