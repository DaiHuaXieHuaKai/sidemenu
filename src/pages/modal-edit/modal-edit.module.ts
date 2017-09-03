import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalEditPage } from './modal-edit';

@NgModule({
  declarations: [
    ModalEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalEditPage),
  ],
})
export class ModalEditPageModule {}
