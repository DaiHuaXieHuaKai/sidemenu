import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventsPopoverPage } from './events-popover';

@NgModule({
  declarations: [
    EventsPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(EventsPopoverPage),
  ],
  exports: [
    EventsPopoverPage
  ]
})
export class EventsPopoverPageModule {}
