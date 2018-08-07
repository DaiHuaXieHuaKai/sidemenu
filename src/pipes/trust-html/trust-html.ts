import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'trustHtml',
})
export class TrustHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {

  }

  transform(value: string, ...args) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + value);
  }
}
