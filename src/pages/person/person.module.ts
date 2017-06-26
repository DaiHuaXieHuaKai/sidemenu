import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Person } from './person';

@NgModule({
  declarations: [
    Person,
  ],
  imports: [
    IonicPageModule.forChild(Person),
  ],
  exports: [
    Person
  ]
})
export class PersonModule {}
