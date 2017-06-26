import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Message } from './message';

@NgModule({
  declarations: [
    Message,
  ],
  imports: [
    IonicPageModule.forChild(Message),
  ],
  exports: [
    Message
  ]
})
export class MessageModule {}
