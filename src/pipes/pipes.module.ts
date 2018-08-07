import { SecondsToMinute } from './seconds-to-minute/seconds-to-minute';
import { NgModule } from '@angular/core';
import { ApplyStatusPipe } from './apply-status/apply-status';
import { NicknamePipe } from './nickname/nickname';
import { AvatarPipe } from './avatar/avatar';
import { TrustHtmlPipe } from './trust-html/trust-html';
@NgModule({
    declarations: [ApplyStatusPipe, SecondsToMinute,
        NicknamePipe,
        AvatarPipe,
        TrustHtmlPipe],
    imports: [],
    exports: [ApplyStatusPipe, SecondsToMinute,
        NicknamePipe,
        AvatarPipe,
        TrustHtmlPipe]
})
export class PipesModule { }
