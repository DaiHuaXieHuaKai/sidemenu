import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCityPage } from './modal-city';

@NgModule({
  declarations: [
    ModalCityPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalCityPage),
  ],
})
export class ModalCityPageModule {}
