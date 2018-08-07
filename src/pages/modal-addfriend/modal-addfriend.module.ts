import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAddfriendPage } from './modal-addfriend';

@NgModule({
  declarations: [
    ModalAddfriendPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAddfriendPage),
  ],
})
export class ModalAddfriendPageModule {}
